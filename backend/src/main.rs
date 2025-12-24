use tracing::{info, level_filters::LevelFilter};
use tracing_subscriber::{fmt::Layer, layer::SubscriberExt, util::SubscriberInitExt, Layer as _};

#[tokio::main]
async fn main() {
    let layer = Layer::new()
        .with_target(true) // 显示日志属于哪个模块/文件名
        .with_line_number(true) // 显示源代码行号
        .with_thread_ids(true) // 异步环境下查看线程 ID 非常有用
        .pretty() // 更加易读的多行格式（适合开发环境）
        .with_filter(LevelFilter::INFO); // 设置日志级别为 INFO
    tracing_subscriber::registry().with(layer).init();

    info!("Hello, world!");
}

#[cfg(test)]
mod tests {

    #[test]
    fn test_main() {
        assert_eq!(1, 1);
    }
}
