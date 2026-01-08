use anyhow::Result;
use axum::{Router, routing::get};
use tokio::net::TcpListener;
use tracing::{info, level_filters::LevelFilter};
use tracing_subscriber::{Layer as _, fmt::Layer, layer::SubscriberExt, util::SubscriberInitExt};

#[tokio::main]
async fn main() -> Result<()> {
    let layer = Layer::new()
        .with_target(true) // 显示日志属于哪个模块/文件名
        .with_line_number(true) // 显示源代码行号
        .with_thread_ids(true) // 异步环境下查看线程 ID 非常有用
        .pretty() // 更加易读的多行格式（适合开发环境）
        .with_filter(LevelFilter::INFO); // 设置日志级别为 INFO
    tracing_subscriber::registry().with(layer).init();

    // build our application with a single route
    let app = Router::new().route("/", get(|| async { "Hello, World!" }));
    let addr = format!("0.0.0.0:{}", 3000);
    // run our app with hyper, listening globally on port 3000
    let listener = TcpListener::bind(&addr).await?;
    info!("listening on {}", addr);
    axum::serve(listener, app).await?;

    Ok(())
}

#[cfg(test)]
mod tests {

    #[test]
    fn test_main() {
        assert_eq!(1, 1);
    }
}
