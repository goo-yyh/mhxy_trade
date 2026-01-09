use base64::Engine;
use chrono::Utc;
use hmac::{Hmac, Mac};
use serde::{Deserialize, Serialize};
use sha1::Sha1;
use std::collections::BTreeMap;
use url::form_urlencoded;

type HmacSha1 = Hmac<Sha1>;

#[derive(Debug, Clone)]
pub struct AliyunClient {
    access_key_id: String,
    access_key_secret: String,
    endpoint: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SendSmsVerifyCodeRequest {
    #[serde(rename = "SignName")]
    pub sign_name: String,
    #[serde(rename = "TemplateCode")]
    pub template_code: String,
    #[serde(rename = "PhoneNumber")]
    pub phone_number: String,
    #[serde(rename = "TemplateParam")]
    pub template_param: Option<String>,
    #[serde(rename = "ReturnVerifyCode")]
    pub return_verify_code: Option<bool>,
    #[serde(rename = "CodeLength")]
    pub code_length: Option<u32>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SendSmsVerifyCodeResponse {
    #[serde(rename = "RequestId")]
    pub request_id: Option<String>,
    #[serde(rename = "Code")]
    pub code: Option<String>,
    #[serde(rename = "Message")]
    pub message: Option<String>,
    #[serde(rename = "Success")]
    pub success: Option<bool>,
    #[serde(rename = "Model")]
    pub model: Option<SmsVerifyCodeModel>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SmsVerifyCodeModel {
    #[serde(rename = "VerifyCode")]
    pub verify_code: Option<String>,
    #[serde(rename = "RequestId")]
    pub request_id: Option<String>,
    #[serde(rename = "OutId")]
    pub out_id: Option<String>,
    #[serde(rename = "BizId")]
    pub biz_id: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CheckSmsVerifyCodeRequest {
    #[serde(rename = "PhoneNumber")]
    pub phone_number: String,
    #[serde(rename = "VerifyCode")]
    pub verify_code: String,
    #[serde(rename = "OutId")]
    pub out_id: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CheckSmsVerifyCodeResponse {
    #[serde(rename = "RequestId")]
    pub request_id: Option<String>,
    #[serde(rename = "Code")]
    pub code: Option<String>,
    #[serde(rename = "Message")]
    pub message: Option<String>,
    #[serde(rename = "Success")]
    pub success: Option<bool>,
    #[serde(rename = "Model")]
    pub model: Option<CheckSmsVerifyCodeModel>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CheckSmsVerifyCodeModel {
    #[serde(rename = "VerifyResult")]
    pub verify_result: Option<String>,
    #[serde(rename = "RequestId")]
    pub request_id: Option<String>,
}

impl AliyunClient {
    pub fn new(access_key_id: String, access_key_secret: String, endpoint: Option<String>) -> Self {
        Self {
            access_key_id,
            access_key_secret,
            endpoint: endpoint.unwrap_or_else(|| "dypnsapi.aliyuncs.com".to_string()),
        }
    }

    /// 生成阿里云 API 签名
    fn generate_signature(&self, params: &BTreeMap<String, String>) -> String {
        // 构建待签名字符串
        let query_string = params
            .iter()
            .map(|(k, v)| format!("{}={}", percent_encode(k), percent_encode(v)))
            .collect::<Vec<_>>()
            .join("&");

        let string_to_sign = format!("GET&%2F&{}", percent_encode(&query_string));

        // 使用 HMAC-SHA1 签名
        let mut mac = HmacSha1::new_from_slice(format!("{}&", self.access_key_secret).as_bytes())
            .expect("HMAC can take key of any size");
        mac.update(string_to_sign.as_bytes());
        let result = mac.finalize();

        base64::engine::general_purpose::STANDARD.encode(result.into_bytes())
    }

    /// 发送短信验证码
    pub async fn send_code(
        &self,
        request: SendSmsVerifyCodeRequest,
    ) -> Result<SendSmsVerifyCodeResponse, Box<dyn std::error::Error>> {
        let action = "SendSmsVerifyCode";
        let version = "2017-05-25";
        let timestamp = Utc::now().format("%Y-%m-%dT%H:%M:%SZ").to_string();
        let request_id = uuid::Uuid::new_v4().to_string();

        // 构建公共参数
        let mut params = BTreeMap::new();
        params.insert("Format".to_string(), "JSON".to_string());
        params.insert("Version".to_string(), version.to_string());
        params.insert("AccessKeyId".to_string(), self.access_key_id.clone());
        params.insert("SignatureMethod".to_string(), "HMAC-SHA1".to_string());
        params.insert("Timestamp".to_string(), timestamp.clone());
        params.insert("SignatureVersion".to_string(), "1.0".to_string());
        params.insert("SignatureNonce".to_string(), request_id.clone());
        params.insert("Action".to_string(), action.to_string());

        // 添加业务参数
        params.insert("SignName".to_string(), request.sign_name);
        params.insert("TemplateCode".to_string(), request.template_code);
        params.insert("PhoneNumber".to_string(), request.phone_number);

        if let Some(template_param) = request.template_param {
            params.insert("TemplateParam".to_string(), template_param);
        }
        if let Some(return_verify_code) = request.return_verify_code {
            params.insert(
                "ReturnVerifyCode".to_string(),
                return_verify_code.to_string(),
            );
        }
        if let Some(code_length) = request.code_length {
            params.insert("CodeLength".to_string(), code_length.to_string());
        }

        // 生成签名
        let signature = self.generate_signature(&params);
        params.insert("Signature".to_string(), signature);

        // 构建请求 URL
        let query_string = params
            .iter()
            .map(|(k, v)| format!("{}={}", percent_encode(k), percent_encode(v)))
            .collect::<Vec<_>>()
            .join("&");

        let url_str = format!("https://{}/?{}", self.endpoint, query_string);
        let url = reqwest::Url::parse(&url_str)?;

        // 发送 HTTP 请求
        let client = reqwest::Client::new();
        let response = client.get(url).send().await?;

        let response_text = response.text().await?;
        let result: SendSmsVerifyCodeResponse = serde_json::from_str(&response_text)?;

        Ok(result)
    }

    /// 验证短信验证码
    pub async fn valid_code(
        &self,
        request: CheckSmsVerifyCodeRequest,
    ) -> Result<CheckSmsVerifyCodeResponse, Box<dyn std::error::Error>> {
        let action = "CheckSmsVerifyCode";
        let version = "2017-05-25";
        let timestamp = Utc::now().format("%Y-%m-%dT%H:%M:%SZ").to_string();
        let request_id = uuid::Uuid::new_v4().to_string();

        // 构建公共参数
        let mut params = BTreeMap::new();
        params.insert("Format".to_string(), "JSON".to_string());
        params.insert("Version".to_string(), version.to_string());
        params.insert("AccessKeyId".to_string(), self.access_key_id.clone());
        params.insert("SignatureMethod".to_string(), "HMAC-SHA1".to_string());
        params.insert("Timestamp".to_string(), timestamp.clone());
        params.insert("SignatureVersion".to_string(), "1.0".to_string());
        params.insert("SignatureNonce".to_string(), request_id.clone());
        params.insert("Action".to_string(), action.to_string());

        // 添加业务参数
        params.insert("PhoneNumber".to_string(), request.phone_number);
        params.insert("VerifyCode".to_string(), request.verify_code);

        if let Some(out_id) = request.out_id {
            params.insert("OutId".to_string(), out_id);
        }

        // 生成签名
        let signature = self.generate_signature(&params);
        params.insert("Signature".to_string(), signature);

        // 构建请求 URL
        let query_string = params
            .iter()
            .map(|(k, v)| format!("{}={}", percent_encode(k), percent_encode(v)))
            .collect::<Vec<_>>()
            .join("&");

        let url_str = format!("https://{}/?{}", self.endpoint, query_string);
        let url = reqwest::Url::parse(&url_str)?;

        // 发送 HTTP 请求
        let client = reqwest::Client::new();
        let response = client.get(url).send().await?;

        let response_text = response.text().await?;
        let result: CheckSmsVerifyCodeResponse = serde_json::from_str(&response_text)?;

        Ok(result)
    }
}

/// URL 编码（RFC 3986）
fn percent_encode(s: &str) -> String {
    form_urlencoded::byte_serialize(s.as_bytes()).collect()
}
