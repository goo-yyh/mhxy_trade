# Instructions

## project alpha 需求和设计文档
这是一个有h5移动端、pc端的项目和后台管理系统，代码在 /frontend 下
移动端的代码在/frontend/apps/mobile下，技术栈为 react + zustand + antd-mobile + tailwindcss,
pc端的代码在/frontend/apps/pc下，技术栈为 react + zustand + antd + tailwindcss,
后台管理系统的代码在/frontend/apps/manage下，技术栈为 react + zustand + antd + tailwindcss,
请都为技术栈选择最新的版本。

面向用户的功能是一样的，是为梦幻西游这个游戏设计的一个交易贴吧，大致具有以下功能。
  - 注册登录功能，注册时候时候需要发送手机验证码
  - 修改个人信息功能，比如头像、昵称、联系方式等
  - 积分功能，用户在网站内的部分操作可以赢得积分，也有部分操作需要消耗积分
  - 用户可以发帖子来售卖自己的装备账号，并且可以编辑自己的帖子，也可以回复自己的帖子，只有本人可以回复自己的帖子
  - 其他可以查看帖子内容，并且关注点赞
  - 用户可以根据设置的分类和标签来搜索帖子，或者根据
  - 用户看到自己感兴趣的装备或者账号，可以向发帖者发送一条信息，来请求获取发帖者的联系方式
  - 通知功能，用户收到通知后，可以查看通知并进行操作

后台管理系统的功能需要覆盖以上内容，还需要新增审核功能，所有的帖子和回复还有申请获取联系方式的消息都需要通过后台审核才能发送。

按照这个想法，帮我生成详细的需求和设计文档，放在 ./specs/0001-spec-gemini.md 文件中，输出为中文。

## implementation plan

按照 ./specs/0001-spec-claude.md 中的需求和设计文档，生成一个详细的前端代码的实现计划，放在 ./specs/0002-implementation-plan.md 文件中，输出为中文。

## design api
按照 ./specs/0001-spec-claude.md 和 ./specs/0002-implementation-plan.md 中的需求和设计文档，列举出所有的后端接口，放在 ./specs/api.md 中

## phased implementation
按照 ./specs/0002-implementation-plan.md 完整实现 /frontend 这个项目的前端部分的代码

## review implementation
按照 ./specs/0002-implementation-plan.md 中的设计，review /frontend 下的前端代码，补充未完成的需求，修复代码中的错误，优化代码质量
