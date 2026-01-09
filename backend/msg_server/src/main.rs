use msg_server::{AliyunClient, CheckSmsVerifyCodeRequest, SendSmsVerifyCodeRequest};
use std::env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // 从环境变量或直接设置获取 AccessKey
    // 注意：实际项目中应该从环境变量或配置文件读取，不要硬编码
    let access_key_id = env::var("ALIYUN_ACCESS_KEY_ID").expect("ALIYUN_ACCESS_KEY_ID is not set");
    let access_key_secret =
        env::var("ALIYUN_ACCESS_KEY_SECRET").expect("ALIYUN_ACCESS_KEY_SECRET is not set");

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
    match client.send_code(request).await {
        Ok(response) => {
            println!("发送短信响应: {}", serde_json::to_string_pretty(&response)?);

            // 如果返回了验证码，可以进行验证测试
            if let Some(model) = &response.model
                && let Some(verify_code) = &model.verify_code
            {
                println!("\n收到验证码: {}", verify_code);

                // 验证短信验证码示例
                let check_request = CheckSmsVerifyCodeRequest {
                    phone_number: "19548180231".to_string(),
                    verify_code: verify_code.clone(),
                    out_id: model.out_id.clone(),
                };

                match client.valid_code(check_request).await {
                    Ok(check_response) => {
                        println!(
                            "验证短信响应: {}",
                            serde_json::to_string_pretty(&check_response)?
                        );
                    }
                    Err(error) => {
                        eprintln!("验证短信错误: {}", error);
                    }
                }
            }
        }
        Err(error) => {
            eprintln!("错误: {}", error);
            return Err(error);
        }
    }

    Ok(())
}
