# 梦幻西游交易贴吧平台 - 需求与设计文档

## 1. 项目概述

本项目旨在为“梦幻西游”游戏玩家打造一个安全、便捷的交易贴吧平台。用户可以在平台上发布装备、账号等交易信息，寻找心仪的商品，并与其他玩家进行交流。平台分为移动端（H5）、PC端和后台管理系统三个部分，共享同一套后端服务。

特别强调交易的安全性和信息的真实性，引入严格的后台审核机制，对所有帖子、回复及联系方式请求进行人工或自动审核。

## 2. 技术栈架构

所有前端应用均采用最新的技术栈版本。

### 2.1 目录结构
- **Mobile (H5)**: `/frontend/apps/mobile`
- **PC Web**: `/frontend/apps/pc`
- **Admin Manage**: `/frontend/apps/manage`
- **Backend**: `/backend`

### 2.2 前端技术栈

#### 移动端 (Mobile H5)
- **核心框架**: React (Latest)
- **状态管理**: Zustand
- **UI 组件库**: Ant Design Mobile
- **样式方案**: TailwindCSS
- **构建工具**: Vite (推荐) 或 Rsbuild

#### PC 端 (PC Web)
- **核心框架**: React (Latest) / Next.js (App Router 推荐)
- **状态管理**: Zustand
- **UI 组件库**: Ant Design (Antd)
- **样式方案**: TailwindCSS

#### 后台管理系统 (Admin Manage)
- **核心框架**: React (Latest)
- **状态管理**: Zustand
- **UI 组件库**: Ant Design (Antd)
- **样式方案**: TailwindCSS

### 2.3 后端技术栈 (参考)
- **语言**: Rust
- **框架**: Axum 或 Actix-web (根据 `backend/Cargo.toml` 实际情况)
- **数据库**: PostgreSQL 或 MySQL
- **缓存**: Redis

## 3. 功能需求详情

### 3.1 用户系统 (C端通用)
- **注册/登录**:
  - 支持手机号注册，需发送并验证短信验证码。
  - 支持手机号 + 验证码/密码登录。
  - 登出功能。
- **个人信息管理**:
  - 修改头像 (上传图片)。
  - 修改昵称。
  - 修改联系方式 (QQ/微信/手机号，需加密存储，仅在申请通过后对特定用户可见)。

### 3.2 积分系统
- **积分获取**:
  - 每日签到。
  - 发布高质量帖子 (需审核通过)。
  - 实名认证或完善信息。
- **积分消耗**:
  - 申请查看卖家联系方式。
  - 帖子置顶或高亮 (可选)。
- **积分记录**: 用户可查看积分收支明细。

### 3.3 交易帖子系统
- **发布帖子**:
  - 填写标题、描述、价格。
  - 选择分类 (如: 角色、装备、宝宝)。
  - 添加标签 (如: 69级、109级、全红)。
  - 上传图片/截图。
  - **审核**: 发布后状态为“待审核”，管理员审核通过后对公众可见。
- **编辑帖子**:
  - 作者可修改帖子内容，修改后需重新进入“待审核”状态。
- **回复帖子**:
  - **限制**: 仅允许作者本人在自己的帖子下进行回复 (用于补充信息或顶贴)。
  - **审核**: 回复内容同样需要后台审核通过后显示。
- **互动**:
  - **点赞**: 用户可对帖子点赞。
  - **关注/收藏**: 用户可收藏感兴趣的帖子。

### 3.4 搜索与发现
- **列表展示**: 支持按时间、热度、价格排序。
- **筛选**: 根据分类、等级、价格区间进行筛选。
- **搜索**: 关键词搜索标题及描述内容。

### 3.5 联系方式请求机制 (核心交互)
- **流程**:
  1. 买家浏览帖子，对商品感兴趣。
  2. 点击“获取联系方式”按钮。
  3. 系统扣除一定积分 (若积分不足提示充值或获取)。
  4. 生成一条“联系方式申请”记录，状态为“待审核” (或由卖家确认，根据需求描述这里明确为**后台审核**)。
     *注：通常此类C2C交互由卖家同意即可，但根据需求“申请获取联系方式的消息都需要通过后台审核”，此处流程设计为：用户申请 -> 管理员审核(防止骚扰/欺诈) -> 系统自动发放或通知卖家。*
     *(优化建议：如果审核量过大，可调整为系统自动风控+卖家同意。但在本需求中，严格执行后台审核)*
  5. 审核通过后，买家可在“我的消息/通知”中查看卖家的联系方式。

### 3.6 通知系统
- **通知类型**:
  - **系统通知**: 审核结果 (帖子通过/驳回、联系方式申请通过/驳回)、积分变动。
  - **交互通知**: 虽仅作者可回复，但可保留点赞/收藏的通知。
- **操作**: 用户点击通知可跳转至相应页面。

### 3.7 后台管理系统 (Admin)
- **用户管理**: 封禁/解封用户，查看用户详情，修改用户积分。
- **内容审核 (核心)**:
  - **帖子审核**: 列表展示待审核帖子，支持批量通过/驳回 (需填写驳回理由)。
  - **回复审核**: 列表展示待审核的自回复，支持通过/驳回。
  - **联系申请审核**: 查看买家对卖家的联系方式申请，判断是否有恶意骚扰嫌疑，进行通过/驳回。
- **分类/标签管理**: 配置前台可见的交易分类和筛选标签。
- **日志/统计**: 查看每日新增帖子数、注册用户数、积分消耗情况等。

## 4. 数据库设计 (概念模型)

### Users (用户表)
- `id`: UUID, PK
- `phone`: Varchar, Unique, Indexed
- `nickname`: Varchar
- `avatar_url`: Varchar
- `contact_info`: JSON (QQ/WeChat, Encrypted)
- `points`: Integer (Default 0)
- `status`: Enum (Active, Banned)
- `created_at`: Timestamp

### Posts (帖子表)
- `id`: UUID, PK
- `user_id`: UUID, FK -> Users
- `title`: Varchar
- `content`: Text
- `price`: Decimal
- `images`: JSON Array
- `category`: Varchar (Enum or FK)
- `tags`: JSON Array
- `status`: Enum (Pending, Approved, Rejected, Closed)
- `audit_reason`: Varchar (若被驳回)
- `view_count`: Integer
- `like_count`: Integer
- `created_at`: Timestamp
- `updated_at`: Timestamp

### PostReplies (帖子回复表 - 仅作者)
- `id`: UUID, PK
- `post_id`: UUID, FK -> Posts
- `user_id`: UUID, FK -> Users (Must be post owner)
- `content`: Text
- `status`: Enum (Pending, Approved, Rejected)
- `created_at`: Timestamp

### ContactRequests (联系方式申请表)
- `id`: UUID, PK
- `requester_id`: UUID, FK -> Users (买家)
- `target_post_id`: UUID, FK -> Posts
- `target_user_id`: UUID, FK -> Users (卖家)
- `status`: Enum (Pending, Approved, Rejected)
- `admin_comment`: Varchar
- `created_at`: Timestamp

### Notifications (通知表)
- `id`: UUID, PK
- `user_id`: UUID, FK -> Users
- `type`: Enum (System, AuditResult, ContactInfo, etc.)
- `title`: Varchar
- `content`: Text
- `related_id`: UUID (PostID or RequestID)
- `is_read`: Boolean
- `created_at`: Timestamp

### PointLogs (积分记录表)
- `id`: UUID, PK
- `user_id`: UUID, FK -> Users
- `amount`: Integer (+/-)
- `reason`: Varchar (e.g., "CheckContact", "DailyLogin")
- `created_at`: Timestamp

## 5. 接口设计 (核心部分)

### Auth
- `POST /api/auth/send-code`: 发送验证码
- `POST /api/auth/register`: 注册
- `POST /api/auth/login`: 登录

### User
- `GET /api/user/profile`: 获取个人信息
- `PUT /api/user/profile`: 更新信息
- `GET /api/user/points/logs`: 获取积分记录

### Posts (C端)
- `GET /api/posts`: 获取帖子列表 (支持分页、筛选，仅返回 Status=Approved)
- `GET /api/posts/:id`: 获取详情
- `POST /api/posts`: 发布帖子
- `PUT /api/posts/:id`: 修改帖子
- `POST /api/posts/:id/reply`: 回复帖子 (仅作者)

### Interaction
- `POST /api/posts/:id/contact-request`: 申请获取联系方式
- `POST /api/posts/:id/like`: 点赞

### Admin (后台)
- `GET /api/admin/audit/posts`: 获取待审核帖子
- `POST /api/admin/audit/posts/:id`: 审核操作 (通过/驳回)
- `GET /api/admin/audit/replies`: 获取待审核回复
- `POST /api/admin/audit/replies/:id`: 审核回复
- `GET /api/admin/audit/contact-requests`: 获取待审核联系申请
- `POST /api/admin/audit/contact-requests/:id`: 审核申请

## 6. 安全与风控
- **验证码频率限制**: 防止短信接口被刷。
- **图片审核**: 集成第三方图片鉴黄/鉴暴服务 (可选，初期可人工)。
- **敏感词过滤**: 帖子内容和回复内容需经过敏感词过滤。
- **联系方式保护**: 只有审核通过的请求才能通过接口获取到卖家的真实联系字段。

## 7. 开发计划建议
1. **第一阶段**: 完成后端数据库设计及用户认证、帖子CRUD接口。
2. **第二阶段**: 开发PC端和移动端的基础UI及发布、浏览流程。
3. **第三阶段**: 实现后台管理系统的审核流程，并打通C端与管理端的状态同步。
4. **第四阶段**: 完善积分系统、通知系统及整体联调。
