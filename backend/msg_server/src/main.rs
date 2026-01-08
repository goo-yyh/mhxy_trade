use msg_server::{AliyunClient, SendSmsVerifyCodeRequest};
use std::env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // 从环境变量读取 AccessKey
    let access_key_id = env::var("ALIYUN_ACCESS_KEY_ID")
        .expect("ALIYUN_ACCESS_KEY_ID environment variable is required");
    let access_key_secret = env::var("ALIYUN_ACCESS_KEY_SECRET")
        .expect("ALIYUN_ACCESS_KEY_SECRET environment variable is required");

    // 创建客户端
    let client = AliyunClient::new(
        access_key_id,
        access_key_secret,
        Some("dypnsapi.aliyuncs.com".to_string()),
    );

    // 构建请求
    let request = SendSmsVerifyCodeRequest {
        sign_name: "速通互联验证码".to_string(),
        template_code: "100003".to_string(),
        phone_number: "19548180231".to_string(),
        template_param: Some(r###"{"code":"##code##","min":"5"}"###.to_string()),
        return_verify_code: Some(true),
        code_length: Some(6),
    };

    // 发送请求
    match client.send_sms_verify_code(request).await {
        Ok(response) => {
            println!("{}", serde_json::to_string_pretty(&response)?);
        }
        Err(error) => {
            eprintln!("错误: {}", error);
            return Err(error);
        }
    }

    Ok(())
}
