# 梦幻西游交易贴吧 - 需求与设计文档

> 文档版本：v1.0
> 创建日期：2026-01-06
> 项目代号：MHXY-Trade

---

## 目录

1. [项目概述](#1-项目概述)
2. [技术栈](#2-技术栈)
3. [功能需求](#3-功能需求)
4. [数据模型设计](#4-数据模型设计)
5. [API 接口设计](#5-api-接口设计)
6. [页面设计](#6-页面设计)
7. [积分系统设计](#7-积分系统设计)
8. [审核流程设计](#8-审核流程设计)
9. [通知系统设计](#9-通知系统设计)
10. [安全设计](#10-安全设计)
11. [性能优化](#11-性能优化)

---

## 1. 项目概述

### 1.1 项目背景

本项目是为《梦幻西游》游戏玩家设计的装备账号交易平台，采用贴吧形式，让玩家可以发布、浏览、搜索交易信息，并通过平台进行初步沟通。

### 1.2 项目目标

- 提供安全、便捷的游戏装备/账号交易信息发布平台
- 支持多端访问（H5移动端、PC端）
- 提供完善的后台管理和审核机制
- 建立积分激励体系，促进用户活跃度

### 1.3 用户角色

| 角色 | 描述 |
|------|------|
| 游客 | 未登录用户，可浏览帖子列表和详情 |
| 普通用户 | 已注册登录用户，可发帖、回复、点赞、关注、请求联系方式 |
| 管理员 | 后台管理人员，负责内容审核、用户管理、系统配置 |
| 超级管理员 | 拥有全部权限，包括管理员账号管理 |

---

## 2. 技术栈

### 2.1 前端技术栈

#### 移动端 (H5)
| 技术 | 版本 | 说明 |
|------|------|------|
| React | ^19.2.0 | UI 框架 |
| Zustand | ^5.0.9 | 状态管理 |
| Antd Mobile | ^5.41.1 | 移动端 UI 组件库 |
| TailwindCSS | ^4.1.18 | CSS 框架 |
| Vite | ^7.2.4 | 构建工具 |
| React Query | ^5.90.12 | 服务端状态管理 |
| React Router | ^7.x | 路由管理 |

#### PC 端
| 技术 | 版本 | 说明 |
|------|------|------|
| React | ^19.2.1 | UI 框架 |
| Next.js | ^16.0.10 | React 全栈框架 |
| Zustand | ^5.x | 状态管理 |
| Ant Design | ^5.x | PC 端 UI 组件库 |
| TailwindCSS | ^4.x | CSS 框架 |
| React Query | ^5.x | 服务端状态管理 |

#### 后台管理系统
| 技术 | 版本 | 说明 |
|------|------|------|
| React | ^19.2.1 | UI 框架 |
| Next.js | ^16.0.10 | React 全栈框架 |
| Zustand | ^5.x | 状态管理 |
| Ant Design | ^5.x | PC 端 UI 组件库 |
| TailwindCSS | ^4.x | CSS 框架 |
| React Query | ^5.x | 服务端状态管理 |

### 2.2 公共依赖

| 技术 | 用途 |
|------|------|
| TypeScript | ^5.9.x | 类型安全 |
| Axios | HTTP 请求 |
| Day.js | 日期处理 |
| Zod | 表单验证 |
| Immer | 不可变数据处理 |

---

## 3. 功能需求

### 3.1 用户模块

#### 3.1.1 注册功能

**功能描述**：用户通过手机号注册账号

**业务流程**：
```
1. 用户输入手机号
2. 点击获取验证码
3. 系统发送短信验证码（60秒倒计时）
4. 用户输入验证码
5. 用户设置密码（8-20位，包含字母和数字）
6. 用户同意用户协议
7. 提交注册
8. 注册成功，自动登录
```

**输入字段**：
| 字段 | 类型 | 必填 | 校验规则 |
|------|------|------|----------|
| 手机号 | string | 是 | 11位有效手机号 |
| 验证码 | string | 是 | 6位数字 |
| 密码 | string | 是 | 8-20位，包含字母和数字 |
| 确认密码 | string | 是 | 与密码一致 |

**积分奖励**：注册成功 +100 积分

#### 3.1.2 登录功能

**功能描述**：支持密码登录和验证码登录

**密码登录**：
- 输入手机号 + 密码
- 连续5次错误锁定30分钟

**验证码登录**：
- 输入手机号
- 获取并输入验证码

**登录状态**：
- Token 有效期 7 天
- 支持「记住我」延长至 30 天
- 单设备登录（可配置多设备）

#### 3.1.3 个人信息管理

**可修改字段**：
| 字段 | 说明 | 限制 |
|------|------|------|
| 头像 | 用户头像 | 支持 jpg/png，最大 2MB |
| 昵称 | 显示名称 | 2-12 个字符，不可重复 |
| 个人简介 | 自我介绍 | 最多 200 字 |
| 游戏服务器 | 所在服务器 | 从预设列表选择 |
| 联系方式 | 微信/QQ等 | 加密存储，需审核通过后才可被查看 |

**密码修改**：
- 需验证原密码或手机验证码
- 新密码不能与最近3次密码相同

### 3.2 帖子模块

#### 3.2.1 发布帖子

**功能描述**：用户发布装备/账号交易信息

**帖子类型**：
| 类型 | 说明 |
|------|------|
| 出售装备 | 出售游戏装备 |
| 出售账号 | 出售游戏账号 |
| 出售召唤兽 | 出售游戏召唤兽 |
| 收购装备 | 求购游戏装备 |
| 收购账号 | 求购游戏账号 |
| 收购召唤兽 | 出售游戏召唤兽 |

**帖子字段**：
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| 标题 | string | 是 | 5-50 个字符 |
| 类型 | enum | 是 | 帖子类型 |
| 分类 | enum | 是 | 装备分类（武器/防具/饰品/坐骑等） |
| 标签 | array | 否 | 最多 5 个标签 |
| 服务器 | string | 是 | 游戏服务器 |
| 价格 | number | 是 | 期望价格（元） |
| 详情 | richtext | 是 | 富文本描述，最多 5000 字 |
| 图片 | array | 否 | 最多 9 张图片 |

**审核流程**：
- 帖子发布后进入待审核状态
- 管理员审核通过后才会公开显示
- 审核不通过需说明原因

**积分消耗**：发布帖子 -10 积分

#### 3.2.2 编辑帖子

**功能描述**：用户编辑自己发布的帖子

**规则**：
- 仅帖子作者可编辑
- 编辑后需重新审核
- 保留编辑历史记录

#### 3.2.3 帖子回复

**功能描述**：帖子作者可以回复自己的帖子（用于补充信息）

**规则**：
- 仅帖子作者可回复
- 回复内容需审核
- 支持文字和图片
- 每条回复最多 500 字，3 张图

**积分消耗**：回复帖子 -5 积分

#### 3.2.4 帖子状态管理

**帖子状态**：
| 状态 | 说明 |
|------|------|
| draft | 草稿 |
| pending | 待审核 |
| published | 已发布 |
| rejected | 已拒绝 |
| sold | 已售出 |
| closed | 已关闭 |
| deleted | 已删除 |

**状态流转**：
```
draft → pending → published → sold/closed
              ↓
           rejected → pending (修改后重新提交)
```

### 3.3 浏览与互动模块

#### 3.3.1 帖子列表

**展示内容**：
- 帖子标题
- 帖子类型标签
- 分类标签
- 价格
- 服务器
- 发布者信息（头像、昵称）
- 发布时间
- 点赞数、关注数
- 缩略图（首图）

**筛选条件**：
| 筛选项 | 类型 | 说明 |
|--------|------|------|
| 类型 | 多选 | 出售/收购/装备/账号 |
| 分类 | 多选 | 武器/防具/饰品等 |
| 服务器 | 单选 | 游戏服务器 |
| 价格区间 | 范围 | 最低价-最高价 |
| 标签 | 多选 | 帖子标签 |
| 关键词 | 文本 | 标题/内容搜索 |

**排序方式**：
- 最新发布（默认）
- 最多点赞
- 最多关注
- 价格从低到高
- 价格从高到低

**分页**：
- 移动端：无限滚动加载
- PC 端：分页导航，每页 20 条

#### 3.3.2 帖子详情

**展示内容**：
- 完整帖子信息
- 作者信息及其他帖子
- 回复列表
- 点赞/关注按钮
- 请求联系方式入口

#### 3.3.3 点赞功能

**功能描述**：用户对帖子点赞表示感兴趣

**规则**：
- 每个用户对同一帖子只能点赞一次
- 支持取消点赞
- 点赞数实时更新

**积分奖励**：被点赞 +1 积分（每日上限 50）

#### 3.3.4 关注功能

**功能描述**：用户关注感兴趣的帖子

**规则**：
- 关注后可在「我的关注」中查看
- 帖子有更新时收到通知
- 支持取消关注

### 3.4 联系方式申请模块

#### 3.4.1 申请联系方式

**功能描述**：用户申请获取帖子作者的联系方式

**申请流程**：
```
1. 用户点击「获取联系方式」
2. 填写申请留言（必填，10-200字）
3. 提交申请（消耗积分）
4. 系统创建审核工单
5. 管理员审核
6. 审核通过：通知帖子作者
7. 作者确认：向申请者展示联系方式
```

**审核要点**：
- 留言内容是否合规
- 是否有恶意行为记录
- 申请频率是否正常

**积分消耗**：申请联系方式 -20 积分

#### 3.4.2 处理联系方式申请

**功能描述**：帖子作者处理收到的联系方式申请

**操作选项**：
- 同意：向申请者展示联系方式
- 拒绝：可填写拒绝原因

**积分奖励**：申请被同意时，作者 +10 积分

### 3.5 通知模块

#### 3.5.1 通知类型

| 类型 | 触发条件 | 通知内容 |
|------|----------|----------|
| 系统通知 | 系统公告、活动等 | 通知标题和内容 |
| 审核通知 | 帖子/回复审核结果 | 审核结果及原因 |
| 点赞通知 | 帖子被点赞 | 点赞者信息 |
| 关注通知 | 帖子被关注 | 关注者信息 |
| 申请通知 | 收到联系方式申请 | 申请者信息和留言 |
| 回复通知 | 申请被处理 | 处理结果 |
| 积分通知 | 积分变动 | 变动原因和金额 |

#### 3.5.2 通知设置

用户可配置接收哪些类型的通知：
- 站内信（默认开启，不可关闭）
- 短信通知（可选）
- 消息免打扰时段

### 3.6 积分模块

详见 [7. 积分系统设计](#7-积分系统设计)

---

## 4. 数据模型设计

### 4.1 用户表 (users)

```sql
CREATE TABLE users (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    phone           VARCHAR(11) NOT NULL UNIQUE COMMENT '手机号',
    password_hash   VARCHAR(255) NOT NULL COMMENT '密码哈希',
    nickname        VARCHAR(24) COMMENT '昵称',
    avatar          VARCHAR(255) COMMENT '头像URL',
    bio             VARCHAR(400) COMMENT '个人简介',
    game_server     VARCHAR(50) COMMENT '游戏服务器',
    contact_info    VARCHAR(255) COMMENT '联系方式（加密存储）',
    points          INT DEFAULT 0 COMMENT '积分余额',
    status          ENUM('active', 'banned', 'deleted') DEFAULT 'active',
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login_at   DATETIME COMMENT '最后登录时间',
    INDEX idx_phone (phone),
    INDEX idx_nickname (nickname),
    INDEX idx_status (status)
);
```

### 4.2 帖子表 (posts)

```sql
CREATE TABLE posts (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id         BIGINT NOT NULL COMMENT '作者ID',
    title           VARCHAR(100) NOT NULL COMMENT '标题',
    type            ENUM('sell_equipment', 'sell_account', 'buy_equipment', 'buy_account') NOT NULL COMMENT '帖子类型',
    category        VARCHAR(50) NOT NULL COMMENT '分类',
    game_server     VARCHAR(50) NOT NULL COMMENT '游戏服务器',
    price           DECIMAL(10, 2) NOT NULL COMMENT '价格',
    content         TEXT NOT NULL COMMENT '详情内容',
    images          JSON COMMENT '图片列表',
    tags            JSON COMMENT '标签列表',
    status          ENUM('draft', 'pending', 'published', 'rejected', 'sold', 'closed', 'deleted') DEFAULT 'draft',
    reject_reason   VARCHAR(500) COMMENT '拒绝原因',
    view_count      INT DEFAULT 0 COMMENT '浏览次数',
    like_count      INT DEFAULT 0 COMMENT '点赞数',
    follow_count    INT DEFAULT 0 COMMENT '关注数',
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    published_at    DATETIME COMMENT '发布时间',
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_type (type),
    INDEX idx_category (category),
    INDEX idx_game_server (game_server),
    INDEX idx_created_at (created_at),
    FULLTEXT INDEX idx_fulltext (title, content)
);
```

### 4.3 帖子回复表 (post_replies)

```sql
CREATE TABLE post_replies (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    post_id         BIGINT NOT NULL COMMENT '帖子ID',
    user_id         BIGINT NOT NULL COMMENT '回复者ID（与帖子作者相同）',
    content         VARCHAR(1000) NOT NULL COMMENT '回复内容',
    images          JSON COMMENT '图片列表',
    status          ENUM('pending', 'published', 'rejected', 'deleted') DEFAULT 'pending',
    reject_reason   VARCHAR(500) COMMENT '拒绝原因',
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_post_id (post_id),
    INDEX idx_status (status)
);
```

### 4.4 点赞表 (post_likes)

```sql
CREATE TABLE post_likes (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    post_id         BIGINT NOT NULL COMMENT '帖子ID',
    user_id         BIGINT NOT NULL COMMENT '用户ID',
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY uk_post_user (post_id, user_id),
    INDEX idx_user_id (user_id)
);
```

### 4.5 关注表 (post_follows)

```sql
CREATE TABLE post_follows (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    post_id         BIGINT NOT NULL COMMENT '帖子ID',
    user_id         BIGINT NOT NULL COMMENT '用户ID',
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY uk_post_user (post_id, user_id),
    INDEX idx_user_id (user_id)
);
```

### 4.6 联系方式申请表 (contact_requests)

```sql
CREATE TABLE contact_requests (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    post_id         BIGINT NOT NULL COMMENT '帖子ID',
    requester_id    BIGINT NOT NULL COMMENT '申请者ID',
    owner_id        BIGINT NOT NULL COMMENT '帖子作者ID',
    message         VARCHAR(400) NOT NULL COMMENT '申请留言',
    audit_status    ENUM('pending', 'approved', 'rejected') DEFAULT 'pending' COMMENT '审核状态',
    audit_reason    VARCHAR(500) COMMENT '审核说明',
    audited_at      DATETIME COMMENT '审核时间',
    audited_by      BIGINT COMMENT '审核人ID',
    owner_status    ENUM('pending', 'approved', 'rejected') COMMENT '作者处理状态',
    owner_reason    VARCHAR(500) COMMENT '作者处理说明',
    owner_handled_at DATETIME COMMENT '作者处理时间',
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (requester_id) REFERENCES users(id),
    FOREIGN KEY (owner_id) REFERENCES users(id),
    INDEX idx_requester_id (requester_id),
    INDEX idx_owner_id (owner_id),
    INDEX idx_audit_status (audit_status),
    INDEX idx_owner_status (owner_status)
);
```

### 4.7 通知表 (notifications)

```sql
CREATE TABLE notifications (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id         BIGINT NOT NULL COMMENT '接收者ID',
    type            VARCHAR(50) NOT NULL COMMENT '通知类型',
    title           VARCHAR(100) NOT NULL COMMENT '通知标题',
    content         TEXT COMMENT '通知内容',
    related_id      BIGINT COMMENT '关联ID（帖子ID/申请ID等）',
    related_type    VARCHAR(50) COMMENT '关联类型',
    is_read         BOOLEAN DEFAULT FALSE COMMENT '是否已读',
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read),
    INDEX idx_type (type),
    INDEX idx_created_at (created_at)
);
```

### 4.8 积分记录表 (point_records)

```sql
CREATE TABLE point_records (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id         BIGINT NOT NULL COMMENT '用户ID',
    type            VARCHAR(50) NOT NULL COMMENT '积分类型',
    amount          INT NOT NULL COMMENT '积分变动（正为增加，负为消耗）',
    balance         INT NOT NULL COMMENT '变动后余额',
    description     VARCHAR(200) COMMENT '描述',
    related_id      BIGINT COMMENT '关联ID',
    related_type    VARCHAR(50) COMMENT '关联类型',
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user_id (user_id),
    INDEX idx_type (type),
    INDEX idx_created_at (created_at)
);
```

### 4.9 管理员表 (admins)

```sql
CREATE TABLE admins (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    username        VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
    password_hash   VARCHAR(255) NOT NULL COMMENT '密码哈希',
    nickname        VARCHAR(50) COMMENT '昵称',
    role            ENUM('admin', 'super_admin') DEFAULT 'admin' COMMENT '角色',
    status          ENUM('active', 'disabled') DEFAULT 'active',
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login_at   DATETIME,
    INDEX idx_username (username),
    INDEX idx_role (role)
);
```

### 4.10 审核日志表 (audit_logs)

```sql
CREATE TABLE audit_logs (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    admin_id        BIGINT NOT NULL COMMENT '审核人ID',
    target_type     VARCHAR(50) NOT NULL COMMENT '审核对象类型',
    target_id       BIGINT NOT NULL COMMENT '审核对象ID',
    action          ENUM('approve', 'reject') NOT NULL COMMENT '审核动作',
    reason          VARCHAR(500) COMMENT '审核说明',
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admins(id),
    INDEX idx_admin_id (admin_id),
    INDEX idx_target (target_type, target_id),
    INDEX idx_created_at (created_at)
);
```

### 4.11 分类配置表 (categories)

```sql
CREATE TABLE categories (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    name            VARCHAR(50) NOT NULL COMMENT '分类名称',
    parent_id       BIGINT COMMENT '父分类ID',
    sort_order      INT DEFAULT 0 COMMENT '排序',
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_parent_id (parent_id),
    INDEX idx_sort_order (sort_order)
);
```

### 4.12 标签表 (tags)

```sql
CREATE TABLE tags (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    name            VARCHAR(50) NOT NULL UNIQUE COMMENT '标签名称',
    use_count       INT DEFAULT 0 COMMENT '使用次数',
    is_hot          BOOLEAN DEFAULT FALSE COMMENT '是否热门',
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_use_count (use_count)
);
```

---

## 5. API 接口设计

### 5.1 接口规范

#### 基础信息
- 基础路径：`/api/v1`
- 数据格式：JSON
- 字符编码：UTF-8
- 认证方式：Bearer Token (JWT)

#### 响应格式

```typescript
// 成功响应
interface SuccessResponse<T> {
    code: 0;
    data: T;
    message: string;
}

// 错误响应
interface ErrorResponse {
    code: number;  // 非0错误码
    message: string;
    details?: any;
}

// 分页响应
interface PaginatedResponse<T> {
    code: 0;
    data: {
        list: T[];
        pagination: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    };
    message: string;
}
```

#### 错误码定义

| 错误码 | 说明 |
|--------|------|
| 0 | 成功 |
| 1001 | 参数错误 |
| 1002 | 数据不存在 |
| 1003 | 数据已存在 |
| 2001 | 未登录 |
| 2002 | Token 过期 |
| 2003 | 无权限 |
| 2004 | 账号被禁用 |
| 3001 | 验证码错误 |
| 3002 | 验证码过期 |
| 3003 | 发送过于频繁 |
| 4001 | 积分不足 |
| 5001 | 服务器内部错误 |

### 5.2 用户接口

#### 5.2.1 发送验证码

```
POST /auth/sms/send

Request:
{
    "phone": "13800138000",
    "type": "register" | "login" | "reset_password"
}

Response:
{
    "code": 0,
    "data": {
        "expireIn": 300  // 验证码有效期（秒）
    },
    "message": "验证码已发送"
}
```

#### 5.2.2 用户注册

```
POST /auth/register

Request:
{
    "phone": "13800138000",
    "code": "123456",
    "password": "password123"
}

Response:
{
    "code": 0,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIs...",
        "user": {
            "id": 1,
            "phone": "138****8000",
            "nickname": null,
            "avatar": null,
            "points": 100
        }
    },
    "message": "注册成功"
}
```

#### 5.2.3 密码登录

```
POST /auth/login/password

Request:
{
    "phone": "13800138000",
    "password": "password123",
    "rememberMe": true
}

Response:
{
    "code": 0,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIs...",
        "expiresIn": 2592000,  // Token有效期（秒）
        "user": {
            "id": 1,
            "phone": "138****8000",
            "nickname": "玩家001",
            "avatar": "https://...",
            "points": 1500
        }
    },
    "message": "登录成功"
}
```

#### 5.2.4 验证码登录

```
POST /auth/login/sms

Request:
{
    "phone": "13800138000",
    "code": "123456"
}

Response: 同密码登录
```

#### 5.2.5 获取当前用户信息

```
GET /user/profile

Headers:
Authorization: Bearer <token>

Response:
{
    "code": 0,
    "data": {
        "id": 1,
        "phone": "138****8000",
        "nickname": "玩家001",
        "avatar": "https://...",
        "bio": "个人简介",
        "gameServer": "长安城",
        "contactInfo": "微信：xxx",  // 仅本人可见
        "points": 1500,
        "createdAt": "2024-01-01T00:00:00Z"
    },
    "message": "success"
}
```

#### 5.2.6 更新用户信息

```
PUT /user/profile

Headers:
Authorization: Bearer <token>

Request:
{
    "nickname": "新昵称",
    "avatar": "https://...",
    "bio": "新的个人简介",
    "gameServer": "长安城",
    "contactInfo": "微信：newxxx"
}

Response:
{
    "code": 0,
    "data": { /* 更新后的用户信息 */ },
    "message": "更新成功"
}
```

#### 5.2.7 修改密码

```
PUT /user/password

Headers:
Authorization: Bearer <token>

Request:
{
    "oldPassword": "oldpass123",
    "newPassword": "newpass123"
}
// 或使用验证码方式
{
    "code": "123456",
    "newPassword": "newpass123"
}

Response:
{
    "code": 0,
    "data": null,
    "message": "密码修改成功"
}
```

### 5.3 帖子接口

#### 5.3.1 获取帖子列表

```
GET /posts

Query Parameters:
- page: number (default: 1)
- pageSize: number (default: 20, max: 50)
- type: string (可选，帖子类型)
- category: string (可选，分类)
- gameServer: string (可选，服务器)
- tags: string (可选，逗号分隔的标签)
- priceMin: number (可选，最低价格)
- priceMax: number (可选，最高价格)
- keyword: string (可选，搜索关键词)
- sort: string (可选，排序方式：latest/likes/follows/price_asc/price_desc)

Response:
{
    "code": 0,
    "data": {
        "list": [
            {
                "id": 1,
                "title": "出售150级武器",
                "type": "sell_equipment",
                "category": "武器",
                "gameServer": "长安城",
                "price": 5000,
                "thumbnail": "https://...",
                "tags": ["高伤害", "满宝石"],
                "author": {
                    "id": 1,
                    "nickname": "玩家001",
                    "avatar": "https://..."
                },
                "likeCount": 100,
                "followCount": 50,
                "viewCount": 1000,
                "createdAt": "2024-01-01T00:00:00Z"
            }
        ],
        "pagination": {
            "page": 1,
            "pageSize": 20,
            "total": 100,
            "totalPages": 5
        }
    },
    "message": "success"
}
```

#### 5.3.2 获取帖子详情

```
GET /posts/:id

Response:
{
    "code": 0,
    "data": {
        "id": 1,
        "title": "出售150级武器",
        "type": "sell_equipment",
        "category": "武器",
        "gameServer": "长安城",
        "price": 5000,
        "content": "<p>详细描述...</p>",
        "images": ["https://...", "https://..."],
        "tags": ["高伤害", "满宝石"],
        "status": "published",
        "author": {
            "id": 1,
            "nickname": "玩家001",
            "avatar": "https://...",
            "postCount": 10
        },
        "likeCount": 100,
        "followCount": 50,
        "viewCount": 1001,
        "isLiked": false,  // 当前用户是否点赞
        "isFollowed": false,  // 当前用户是否关注
        "replies": [
            {
                "id": 1,
                "content": "补充信息...",
                "images": [],
                "createdAt": "2024-01-02T00:00:00Z"
            }
        ],
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z"
    },
    "message": "success"
}
```

#### 5.3.3 创建帖子

```
POST /posts

Headers:
Authorization: Bearer <token>

Request:
{
    "title": "出售150级武器",
    "type": "sell_equipment",
    "category": "武器",
    "gameServer": "长安城",
    "price": 5000,
    "content": "<p>详细描述...</p>",
    "images": ["https://...", "https://..."],
    "tags": ["高伤害", "满宝石"],
    "isDraft": false  // true为保存草稿，false为提交审核
}

Response:
{
    "code": 0,
    "data": {
        "id": 1,
        "status": "pending"
    },
    "message": "帖子已提交，等待审核"
}
```

#### 5.3.4 更新帖子

```
PUT /posts/:id

Headers:
Authorization: Bearer <token>

Request: 同创建帖子

Response:
{
    "code": 0,
    "data": {
        "id": 1,
        "status": "pending"
    },
    "message": "帖子已更新，等待审核"
}
```

#### 5.3.5 删除帖子

```
DELETE /posts/:id

Headers:
Authorization: Bearer <token>

Response:
{
    "code": 0,
    "data": null,
    "message": "删除成功"
}
```

#### 5.3.6 更新帖子状态

```
PUT /posts/:id/status

Headers:
Authorization: Bearer <token>

Request:
{
    "status": "sold" | "closed"
}

Response:
{
    "code": 0,
    "data": null,
    "message": "状态更新成功"
}
```

#### 5.3.7 添加回复

```
POST /posts/:id/replies

Headers:
Authorization: Bearer <token>

Request:
{
    "content": "补充信息...",
    "images": ["https://..."]
}

Response:
{
    "code": 0,
    "data": {
        "id": 1,
        "status": "pending"
    },
    "message": "回复已提交，等待审核"
}
```

#### 5.3.8 点赞/取消点赞

```
POST /posts/:id/like

Headers:
Authorization: Bearer <token>

Response:
{
    "code": 0,
    "data": {
        "isLiked": true,
        "likeCount": 101
    },
    "message": "点赞成功"
}
```

#### 5.3.9 关注/取消关注

```
POST /posts/:id/follow

Headers:
Authorization: Bearer <token>

Response:
{
    "code": 0,
    "data": {
        "isFollowed": true,
        "followCount": 51
    },
    "message": "关注成功"
}
```

### 5.4 联系方式申请接口

#### 5.4.1 提交申请

```
POST /contact-requests

Headers:
Authorization: Bearer <token>

Request:
{
    "postId": 1,
    "message": "您好，我对这件装备很感兴趣..."
}

Response:
{
    "code": 0,
    "data": {
        "id": 1,
        "status": "pending"
    },
    "message": "申请已提交，等待审核"
}
```

#### 5.4.2 获取我的申请列表

```
GET /contact-requests/sent

Headers:
Authorization: Bearer <token>

Query Parameters:
- page: number
- pageSize: number
- status: string (可选)

Response:
{
    "code": 0,
    "data": {
        "list": [
            {
                "id": 1,
                "post": {
                    "id": 1,
                    "title": "出售150级武器",
                    "thumbnail": "https://..."
                },
                "message": "您好，我对这件装备很感兴趣...",
                "auditStatus": "approved",
                "ownerStatus": "approved",
                "contactInfo": "微信：xxx",  // 仅当ownerStatus为approved时返回
                "createdAt": "2024-01-01T00:00:00Z"
            }
        ],
        "pagination": { ... }
    },
    "message": "success"
}
```

#### 5.4.3 获取收到的申请列表

```
GET /contact-requests/received

Headers:
Authorization: Bearer <token>

Query Parameters:
- page: number
- pageSize: number
- status: string (可选)

Response:
{
    "code": 0,
    "data": {
        "list": [
            {
                "id": 1,
                "post": {
                    "id": 1,
                    "title": "出售150级武器"
                },
                "requester": {
                    "id": 2,
                    "nickname": "买家001",
                    "avatar": "https://..."
                },
                "message": "您好，我对这件装备很感兴趣...",
                "auditStatus": "approved",
                "ownerStatus": "pending",
                "createdAt": "2024-01-01T00:00:00Z"
            }
        ],
        "pagination": { ... }
    },
    "message": "success"
}
```

#### 5.4.4 处理申请

```
PUT /contact-requests/:id/handle

Headers:
Authorization: Bearer <token>

Request:
{
    "action": "approve" | "reject",
    "reason": "拒绝原因"  // 仅拒绝时需要
}

Response:
{
    "code": 0,
    "data": null,
    "message": "处理成功"
}
```

### 5.5 通知接口

#### 5.5.1 获取通知列表

```
GET /notifications

Headers:
Authorization: Bearer <token>

Query Parameters:
- page: number
- pageSize: number
- type: string (可选)
- isRead: boolean (可选)

Response:
{
    "code": 0,
    "data": {
        "list": [
            {
                "id": 1,
                "type": "like",
                "title": "收到新点赞",
                "content": "用户 xxx 点赞了你的帖子",
                "relatedId": 1,
                "relatedType": "post",
                "isRead": false,
                "createdAt": "2024-01-01T00:00:00Z"
            }
        ],
        "pagination": { ... },
        "unreadCount": 5
    },
    "message": "success"
}
```

#### 5.5.2 标记已读

```
PUT /notifications/read

Headers:
Authorization: Bearer <token>

Request:
{
    "ids": [1, 2, 3]  // 空数组表示全部标记已读
}

Response:
{
    "code": 0,
    "data": null,
    "message": "标记成功"
}
```

#### 5.5.3 获取未读数量

```
GET /notifications/unread-count

Headers:
Authorization: Bearer <token>

Response:
{
    "code": 0,
    "data": {
        "total": 10,
        "byType": {
            "system": 2,
            "audit": 1,
            "like": 5,
            "follow": 2
        }
    },
    "message": "success"
}
```

### 5.6 积分接口

#### 5.6.1 获取积分记录

```
GET /points/records

Headers:
Authorization: Bearer <token>

Query Parameters:
- page: number
- pageSize: number
- type: string (可选)

Response:
{
    "code": 0,
    "data": {
        "list": [
            {
                "id": 1,
                "type": "post_publish",
                "amount": -10,
                "balance": 90,
                "description": "发布帖子",
                "createdAt": "2024-01-01T00:00:00Z"
            }
        ],
        "pagination": { ... },
        "currentBalance": 90
    },
    "message": "success"
}
```

### 5.7 通用接口

#### 5.7.1 上传图片

```
POST /upload/image

Headers:
Authorization: Bearer <token>
Content-Type: multipart/form-data

Body:
- file: 图片文件

Response:
{
    "code": 0,
    "data": {
        "url": "https://...",
        "thumbnail": "https://..."
    },
    "message": "上传成功"
}
```

#### 5.7.2 获取分类列表

```
GET /categories

Response:
{
    "code": 0,
    "data": [
        {
            "id": 1,
            "name": "武器",
            "children": [
                { "id": 11, "name": "法杖" },
                { "id": 12, "name": "剑" }
            ]
        }
    ],
    "message": "success"
}
```

#### 5.7.3 获取热门标签

```
GET /tags/hot

Query Parameters:
- limit: number (default: 20)

Response:
{
    "code": 0,
    "data": [
        { "id": 1, "name": "满宝石", "count": 100 },
        { "id": 2, "name": "高伤害", "count": 80 }
    ],
    "message": "success"
}
```

#### 5.7.4 获取服务器列表

```
GET /game-servers

Response:
{
    "code": 0,
    "data": [
        { "id": "changancheng", "name": "长安城" },
        { "id": "jiangnan", "name": "江南" }
    ],
    "message": "success"
}
```

### 5.8 后台管理接口

#### 5.8.1 管理员登录

```
POST /admin/auth/login

Request:
{
    "username": "admin",
    "password": "password123"
}

Response:
{
    "code": 0,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIs...",
        "admin": {
            "id": 1,
            "username": "admin",
            "nickname": "管理员",
            "role": "super_admin"
        }
    },
    "message": "登录成功"
}
```

#### 5.8.2 获取待审核列表

```
GET /admin/audit/pending

Headers:
Authorization: Bearer <admin_token>

Query Parameters:
- type: "post" | "reply" | "contact_request"
- page: number
- pageSize: number

Response:
{
    "code": 0,
    "data": {
        "list": [
            {
                "id": 1,
                "type": "post",
                "content": { /* 帖子/回复/申请详情 */ },
                "submitter": {
                    "id": 1,
                    "nickname": "用户001"
                },
                "createdAt": "2024-01-01T00:00:00Z"
            }
        ],
        "pagination": { ... },
        "pendingCount": {
            "post": 10,
            "reply": 5,
            "contactRequest": 3
        }
    },
    "message": "success"
}
```

#### 5.8.3 审核操作

```
POST /admin/audit/:type/:id

Headers:
Authorization: Bearer <admin_token>

Request:
{
    "action": "approve" | "reject",
    "reason": "拒绝原因"
}

Response:
{
    "code": 0,
    "data": null,
    "message": "审核完成"
}
```

#### 5.8.4 用户管理

```
GET /admin/users
PUT /admin/users/:id/status
GET /admin/users/:id/detail
```

#### 5.8.5 帖子管理

```
GET /admin/posts
PUT /admin/posts/:id/status
DELETE /admin/posts/:id
```

#### 5.8.6 数据统计

```
GET /admin/statistics/overview

Response:
{
    "code": 0,
    "data": {
        "users": {
            "total": 10000,
            "today": 50,
            "activeToday": 500
        },
        "posts": {
            "total": 5000,
            "today": 100,
            "pending": 20
        },
        "audit": {
            "pendingPosts": 20,
            "pendingReplies": 10,
            "pendingRequests": 5
        }
    },
    "message": "success"
}
```

---

## 6. 页面设计

### 6.1 移动端 (H5) 页面结构

```
├── 首页 (/)
│   ├── 顶部搜索栏
│   ├── 分类快捷入口
│   ├── 帖子列表（瀑布流/卡片式）
│   └── 底部导航栏
│
├── 搜索页 (/search)
│   ├── 搜索框
│   ├── 筛选条件
│   ├── 搜索历史
│   └── 搜索结果
│
├── 帖子详情页 (/post/:id)
│   ├── 帖子信息
│   ├── 作者信息
│   ├── 图片轮播
│   ├── 回复列表
│   └── 底部操作栏（点赞/关注/获取联系方式）
│
├── 发布帖子页 (/post/create)
│   ├── 表单字段
│   ├── 图片上传
│   └── 提交/保存草稿
│
├── 编辑帖子页 (/post/:id/edit)
│   └── 同发布帖子页
│
├── 我的页面 (/mine)
│   ├── 个人信息
│   ├── 我的帖子
│   ├── 我的关注
│   ├── 联系方式申请
│   ├── 通知消息
│   └── 设置
│
├── 个人信息编辑页 (/mine/profile)
│
├── 我的帖子页 (/mine/posts)
│
├── 我的关注页 (/mine/follows)
│
├── 联系方式申请页 (/mine/contact-requests)
│   ├── 我发出的
│   └── 我收到的
│
├── 通知页面 (/notifications)
│
├── 登录页 (/login)
│
├── 注册页 (/register)
│
└── 设置页 (/settings)
    ├── 通知设置
    ├── 账号安全
    └── 关于我们
```

### 6.2 PC 端页面结构

```
├── 首页 (/)
│   ├── 顶部导航栏（Logo、搜索、用户信息）
│   ├── 侧边分类栏
│   ├── 帖子列表（列表式/卡片式切换）
│   └── 右侧推荐/热门
│
├── 帖子详情页 (/post/:id)
│   ├── 左侧帖子内容
│   └── 右侧作者信息/相关推荐
│
├── 发布帖子页 (/post/create)
│
├── 个人中心 (/user)
│   ├── 个人信息
│   ├── 我的帖子
│   ├── 我的关注
│   ├── 联系方式申请
│   ├── 积分记录
│   └── 账号设置
│
├── 通知中心 (/notifications)
│
├── 登录/注册弹窗
│
└── 用户主页 (/user/:id)
```

### 6.3 后台管理系统页面结构

```
├── 登录页 (/login)
│
├── 仪表盘 (/dashboard)
│   ├── 数据概览
│   ├── 待办事项
│   └── 统计图表
│
├── 审核管理 (/audit)
│   ├── 帖子审核 (/audit/posts)
│   ├── 回复审核 (/audit/replies)
│   └── 联系申请审核 (/audit/contacts)
│
├── 帖子管理 (/posts)
│   ├── 帖子列表
│   └── 帖子详情
│
├── 用户管理 (/users)
│   ├── 用户列表
│   └── 用户详情
│
├── 内容管理 (/content)
│   ├── 分类管理 (/content/categories)
│   ├── 标签管理 (/content/tags)
│   └── 服务器配置 (/content/servers)
│
├── 系统管理 (/system)
│   ├── 管理员管理 (/system/admins)
│   ├── 积分配置 (/system/points)
│   └── 系统设置 (/system/settings)
│
└── 操作日志 (/logs)
```

### 6.4 核心页面原型说明

#### 6.4.1 帖子卡片组件

```
┌─────────────────────────────────────┐
│ [图片缩略图]                        │
├─────────────────────────────────────┤
│ 出售150级高伤害剑                   │
│ ┌────┐ ┌────┐ ┌────────┐           │
│ │出售│ │武器│ │满宝石  │           │
│ └────┘ └────┘ └────────┘           │
│ ¥5,000                  长安城     │
├─────────────────────────────────────┤
│ [头像] 玩家001    ❤ 100  ★ 50      │
└─────────────────────────────────────┘
```

#### 6.4.2 帖子详情页布局

**移动端**：
```
┌─────────────────────────────────────┐
│ ← 帖子详情                    ⋮    │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │         图片轮播区域            │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 出售150级高伤害剑                   │
│ ¥5,000                              │
│ ┌────┐ ┌────┐ ┌────────┐           │
│ │出售│ │武器│ │满宝石  │           │
│ └────┘ └────┘ └────────┘           │
│                                     │
│ 服务器：长安城                      │
│ 发布时间：2024-01-01                │
│                                     │
│ ─────────────────────────────────── │
│ 详细描述                            │
│ 这是一把高伤害的剑，属性如下...     │
│                                     │
│ ─────────────────────────────────── │
│ 作者补充 (2)                        │
│ ┌─────────────────────────────────┐ │
│ │ 价格可小刀...                   │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│ ❤ 点赞   ★ 关注   📱 获取联系方式  │
└─────────────────────────────────────┘
```

---

## 7. 积分系统设计

### 7.1 积分获取规则

| 行为 | 积分 | 说明 | 每日上限 |
|------|------|------|----------|
| 新用户注册 | +100 | 注册奖励 | - |
| 每日登录 | +10 | 每日首次登录 | 10 |
| 连续登录7天 | +50 | 额外奖励 | - |
| 帖子被点赞 | +1 | 每被点赞一次 | 50 |
| 帖子被关注 | +2 | 每被关注一次 | 100 |
| 联系申请被同意 | +10 | 每次 | 无限制 |
| 完善个人资料 | +50 | 首次完善 | - |

### 7.2 积分消耗规则

| 行为 | 积分 | 说明 |
|------|------|------|
| 发布帖子 | -10 | 每次发布 |
| 回复帖子 | -5 | 每次回复 |
| 申请联系方式 | -20 | 每次申请 |
| 置顶帖子 | -100 | 置顶1天（预留功能） |

### 7.3 积分等级（预留）

| 等级 | 名称 | 所需积分 | 特权 |
|------|------|----------|------|
| Lv.1 | 新手玩家 | 0 | 基础功能 |
| Lv.2 | 初级玩家 | 500 | 发帖积分减半 |
| Lv.3 | 中级玩家 | 2000 | 申请联系方式积分减半 |
| Lv.4 | 高级玩家 | 5000 | 专属标识 |
| Lv.5 | 资深玩家 | 10000 | 优先审核 |

### 7.4 防作弊机制

- 同一用户对同一帖子的点赞/关注只计算一次
- 每日积分获取有上限
- 异常行为检测（频繁注销重注册、批量点赞等）
- 积分变动日志完整记录

---

## 8. 审核流程设计

### 8.1 审核对象

| 类型 | 审核内容 | 审核要点 |
|------|----------|----------|
| 帖子 | 标题、内容、图片 | 合规性、真实性、敏感词 |
| 回复 | 回复内容、图片 | 合规性、敏感词 |
| 联系申请 | 申请留言 | 合规性、恶意行为 |
| 用户信息 | 昵称、头像、简介 | 合规性、敏感词 |

### 8.2 审核状态流转

```
            ┌───────────┐
            │  pending  │
            └─────┬─────┘
                  │
         ┌────────┴────────┐
         ▼                 ▼
   ┌───────────┐     ┌───────────┐
   │ approved  │     │ rejected  │
   └───────────┘     └─────┬─────┘
                           │
                           ▼ (用户修改后重新提交)
                     ┌───────────┐
                     │  pending  │
                     └───────────┘
```

### 8.3 审核规则

#### 自动审核（预审）
- 敏感词过滤
- 图片违规检测（接入第三方服务）
- 用户行为风控评分

#### 人工审核
- 查看完整内容
- 查看用户历史记录
- 做出审核决定
- 记录审核原因

### 8.4 审核效率优化

- 按优先级排序（新用户、高风险用户优先）
- 批量审核功能
- 快捷键操作
- 审核模板

---

## 9. 通知系统设计

### 9.1 通知渠道

| 渠道 | 说明 | 默认状态 |
|------|------|----------|
| 站内信 | 应用内通知 | 开启（不可关闭） |
| 短信 | 重要通知 | 可选 |
| 推送 | App 推送（预留） | 可选 |

### 9.2 通知触发时机

| 事件 | 通知对象 | 通知内容 |
|------|----------|----------|
| 帖子审核通过 | 帖子作者 | 您的帖子已发布 |
| 帖子审核拒绝 | 帖子作者 | 审核未通过及原因 |
| 收到点赞 | 帖子作者 | xxx 点赞了您的帖子 |
| 收到关注 | 帖子作者 | xxx 关注了您的帖子 |
| 收到联系申请 | 帖子作者 | 有人申请您的联系方式 |
| 申请被同意 | 申请者 | 您的申请已通过 |
| 申请被拒绝 | 申请者 | 您的申请未通过 |
| 积分变动 | 用户 | 积分变动通知 |

### 9.3 通知合并策略

- 短时间内多次相同类型通知合并
  - 例：5分钟内收到10个点赞 → "xxx 等10人点赞了您的帖子"
- 按类型分组显示

---

## 10. 安全设计

### 10.1 认证安全

- 密码加密存储（bcrypt）
- JWT Token 认证
- 刷新 Token 机制
- 登录设备管理

### 10.2 接口安全

- HTTPS 强制
- 接口签名验证
- 请求频率限制
- SQL 注入防护
- XSS 防护

### 10.3 数据安全

- 敏感数据加密存储（联系方式）
- 数据备份策略
- 操作日志记录
- 隐私数据脱敏展示

### 10.4 防刷策略

| 操作 | 限制 |
|------|------|
| 获取验证码 | 60秒/次，10次/天 |
| 登录尝试 | 5次失败锁定30分钟 |
| 发帖 | 10篇/天 |
| 回复 | 20条/天 |
| 申请联系方式 | 20次/天 |
| 点赞 | 100次/天 |

---

## 11. 性能优化

### 11.1 前端优化

- 路由懒加载
- 图片懒加载
- 虚拟列表（长列表场景）
- 资源压缩与 CDN
- Service Worker 缓存

### 11.2 接口优化

- 数据分页
- 合理使用缓存
- 接口数据精简
- 并行请求优化

### 11.3 数据库优化

- 索引优化
- 读写分离
- 热点数据缓存（Redis）
- 分表策略（帖子量大时）

### 11.4 搜索优化

- Elasticsearch 全文搜索
- 搜索结果缓存
- 热门搜索预加载

---

## 附录

### A. 游戏服务器列表（示例）

```json
[
    { "id": "changancheng", "name": "长安城" },
    { "id": "jiangnan", "name": "江南" },
    { "id": "donghai", "name": "东海渔村" },
    { "id": "kunlun", "name": "昆仑山" },
    { "id": "penglai", "name": "蓬莱仙境" }
]
```

### B. 装备分类列表（示例）

```json
[
    {
        "id": "weapon",
        "name": "武器",
        "children": [
            { "id": "sword", "name": "剑" },
            { "id": "staff", "name": "法杖" },
            { "id": "fan", "name": "扇" },
            { "id": "blade", "name": "刀" }
        ]
    },
    {
        "id": "armor",
        "name": "防具",
        "children": [
            { "id": "head", "name": "头盔" },
            { "id": "body", "name": "铠甲" },
            { "id": "belt", "name": "腰带" },
            { "id": "shoes", "name": "鞋子" }
        ]
    },
    {
        "id": "accessory",
        "name": "饰品",
        "children": [
            { "id": "necklace", "name": "项链" },
            { "id": "ring", "name": "戒指" }
        ]
    },
    {
        "id": "mount",
        "name": "坐骑"
    },
    {
        "id": "pet",
        "name": "宠物"
    }
]
```

### C. 敏感词库（示例分类）

- 政治敏感词
- 色情低俗词
- 暴力恐怖词
- 诈骗相关词
- 竞品平台名称
- 游戏封禁相关词

---

*文档结束*
