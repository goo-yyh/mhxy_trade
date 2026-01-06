# 梦幻西游交易贴吧 - API 接口文档

> 文档版本：v1.0
> 创建日期：2026-01-06
> 基于：0001-spec-claude.md

---

## 目录

1. [接口规范](#1-接口规范)
2. [认证接口](#2-认证接口)
3. [用户接口](#3-用户接口)
4. [帖子接口](#4-帖子接口)
5. [联系方式申请接口](#5-联系方式申请接口)
6. [通知接口](#6-通知接口)
7. [积分接口](#7-积分接口)
8. [通用接口](#8-通用接口)
9. [后台管理接口](#9-后台管理接口)

---

## 1. 接口规范

### 1.1 基础信息

| 项目 | 说明 |
|------|------|
| 基础路径 | `/api/v1` |
| 数据格式 | JSON |
| 字符编码 | UTF-8 |
| 认证方式 | Bearer Token (JWT) |

### 1.2 请求头

```
Content-Type: application/json
Authorization: Bearer <token>  // 需要认证的接口
```

### 1.3 响应格式

#### 成功响应
```json
{
  "code": 0,
  "data": { ... },
  "message": "success"
}
```

#### 分页响应
```json
{
  "code": 0,
  "data": {
    "list": [ ... ],
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

#### 错误响应
```json
{
  "code": 1001,
  "message": "参数错误",
  "details": { ... }
}
```

### 1.4 错误码定义

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

---

## 2. 认证接口

### 2.1 发送短信验证码

发送手机短信验证码，用于注册、登录或重置密码。

**请求**
```
POST /auth/sms/send
```

**请求体**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| phone | string | 是 | 11位手机号 |
| type | string | 是 | 验证码类型：`register` / `login` / `reset_password` |

**请求示例**
```json
{
  "phone": "13800138000",
  "type": "register"
}
```

**响应示例**
```json
{
  "code": 0,
  "data": {
    "expireIn": 300
  },
  "message": "验证码已发送"
}
```

**响应字段**
| 字段 | 类型 | 说明 |
|------|------|------|
| expireIn | number | 验证码有效期（秒） |

---

### 2.2 用户注册

使用手机号和验证码注册新用户。

**请求**
```
POST /auth/register
```

**请求体**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| phone | string | 是 | 11位手机号 |
| code | string | 是 | 6位短信验证码 |
| password | string | 是 | 密码（8-20位，包含字母和数字） |

**请求示例**
```json
{
  "phone": "13800138000",
  "code": "123456",
  "password": "password123"
}
```

**响应示例**
```json
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

---

### 2.3 密码登录

使用手机号和密码登录。

**请求**
```
POST /auth/login/password
```

**请求体**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| phone | string | 是 | 11位手机号 |
| password | string | 是 | 密码 |
| rememberMe | boolean | 否 | 记住我（延长Token有效期），默认 false |

**请求示例**
```json
{
  "phone": "13800138000",
  "password": "password123",
  "rememberMe": true
}
```

**响应示例**
```json
{
  "code": 0,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 2592000,
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

**响应字段**
| 字段 | 类型 | 说明 |
|------|------|------|
| token | string | JWT Token |
| expiresIn | number | Token 有效期（秒） |
| user | object | 用户基本信息 |

---

### 2.4 验证码登录

使用手机号和验证码登录。

**请求**
```
POST /auth/login/sms
```

**请求体**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| phone | string | 是 | 11位手机号 |
| code | string | 是 | 6位短信验证码 |

**请求示例**
```json
{
  "phone": "13800138000",
  "code": "123456"
}
```

**响应**

同密码登录响应格式。

---

### 2.5 退出登录

退出当前登录状态，使 Token 失效。

**请求**
```
POST /auth/logout
```

**请求头**
```
Authorization: Bearer <token>
```

**响应示例**
```json
{
  "code": 0,
  "data": null,
  "message": "退出成功"
}
```

---

## 3. 用户接口

### 3.1 获取当前用户信息

获取当前登录用户的详细信息。

**请求**
```
GET /user/profile
```

**请求头**
```
Authorization: Bearer <token>
```

**响应示例**
```json
{
  "code": 0,
  "data": {
    "id": 1,
    "phone": "138****8000",
    "nickname": "玩家001",
    "avatar": "https://...",
    "bio": "个人简介",
    "gameServer": "长安城",
    "contactInfo": "微信：xxx",
    "points": 1500,
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "message": "success"
}
```

**响应字段**
| 字段 | 类型 | 说明 |
|------|------|------|
| id | number | 用户ID |
| phone | string | 脱敏手机号 |
| nickname | string | 昵称 |
| avatar | string | 头像URL |
| bio | string | 个人简介 |
| gameServer | string | 游戏服务器 |
| contactInfo | string | 联系方式（仅本人可见） |
| points | number | 积分余额 |
| createdAt | string | 注册时间 |

---

### 3.2 更新用户信息

更新当前用户的个人信息。

**请求**
```
PUT /user/profile
```

**请求头**
```
Authorization: Bearer <token>
```

**请求体**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| nickname | string | 否 | 昵称（2-12个字符） |
| avatar | string | 否 | 头像URL |
| bio | string | 否 | 个人简介（最多200字） |
| gameServer | string | 否 | 游戏服务器 |
| contactInfo | string | 否 | 联系方式 |

**请求示例**
```json
{
  "nickname": "新昵称",
  "avatar": "https://...",
  "bio": "新的个人简介",
  "gameServer": "长安城",
  "contactInfo": "微信：newxxx"
}
```

**响应示例**
```json
{
  "code": 0,
  "data": {
    "id": 1,
    "phone": "138****8000",
    "nickname": "新昵称",
    "avatar": "https://...",
    "bio": "新的个人简介",
    "gameServer": "长安城",
    "contactInfo": "微信：newxxx",
    "points": 1500,
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "message": "更新成功"
}
```

---

### 3.3 修改密码

修改当前用户的登录密码。

**请求**
```
PUT /user/password
```

**请求头**
```
Authorization: Bearer <token>
```

**请求体（方式一：使用旧密码）**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| oldPassword | string | 是 | 原密码 |
| newPassword | string | 是 | 新密码（8-20位，包含字母和数字） |

**请求体（方式二：使用验证码）**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| code | string | 是 | 6位短信验证码 |
| newPassword | string | 是 | 新密码（8-20位，包含字母和数字） |

**请求示例**
```json
{
  "oldPassword": "oldpass123",
  "newPassword": "newpass123"
}
```

**响应示例**
```json
{
  "code": 0,
  "data": null,
  "message": "密码修改成功"
}
```

---

### 3.4 获取用户公开信息

获取指定用户的公开信息（用于用户主页）。

**请求**
```
GET /users/:id
```

**路径参数**
| 参数 | 类型 | 说明 |
|------|------|------|
| id | number | 用户ID |

**响应示例**
```json
{
  "code": 0,
  "data": {
    "id": 1,
    "nickname": "玩家001",
    "avatar": "https://...",
    "bio": "个人简介",
    "gameServer": "长安城",
    "postCount": 10,
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "message": "success"
}
```

---

## 4. 帖子接口

### 4.1 获取帖子列表

获取帖子列表，支持多种筛选和排序条件。

**请求**
```
GET /posts
```

**查询参数**
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码，默认 1 |
| pageSize | number | 否 | 每页数量，默认 20，最大 50 |
| type | string | 否 | 帖子类型 |
| category | string | 否 | 分类 |
| gameServer | string | 否 | 游戏服务器 |
| tags | string | 否 | 标签（逗号分隔） |
| priceMin | number | 否 | 最低价格 |
| priceMax | number | 否 | 最高价格 |
| keyword | string | 否 | 搜索关键词 |
| sort | string | 否 | 排序方式：`latest` / `likes` / `follows` / `price_asc` / `price_desc` |

**帖子类型（type）可选值**
| 值 | 说明 |
|----|------|
| sell_equipment | 出售装备 |
| sell_account | 出售账号 |
| sell_pet | 出售召唤兽 |
| buy_equipment | 收购装备 |
| buy_account | 收购账号 |
| buy_pet | 收购召唤兽 |

**响应示例**
```json
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

---

### 4.2 获取帖子详情

获取单个帖子的详细信息。

**请求**
```
GET /posts/:id
```

**路径参数**
| 参数 | 类型 | 说明 |
|------|------|------|
| id | number | 帖子ID |

**响应示例**
```json
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
    "isLiked": false,
    "isFollowed": false,
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

**响应字段说明**
| 字段 | 类型 | 说明 |
|------|------|------|
| isLiked | boolean | 当前用户是否已点赞（未登录为 false） |
| isFollowed | boolean | 当前用户是否已关注（未登录为 false） |
| replies | array | 作者回复列表（仅显示已通过审核的） |

---

### 4.3 创建帖子

创建新帖子。

**请求**
```
POST /posts
```

**请求头**
```
Authorization: Bearer <token>
```

**请求体**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 是 | 标题（5-50个字符） |
| type | string | 是 | 帖子类型 |
| category | string | 是 | 分类 |
| gameServer | string | 是 | 游戏服务器 |
| price | number | 是 | 价格（元） |
| content | string | 是 | 详情内容（富文本，最多5000字） |
| images | array | 否 | 图片URL列表（最多9张） |
| tags | array | 否 | 标签列表（最多5个） |
| isDraft | boolean | 否 | 是否保存为草稿，默认 false |

**请求示例**
```json
{
  "title": "出售150级武器",
  "type": "sell_equipment",
  "category": "武器",
  "gameServer": "长安城",
  "price": 5000,
  "content": "<p>详细描述...</p>",
  "images": ["https://...", "https://..."],
  "tags": ["高伤害", "满宝石"],
  "isDraft": false
}
```

**响应示例**
```json
{
  "code": 0,
  "data": {
    "id": 1,
    "status": "pending"
  },
  "message": "帖子已提交，等待审核"
}
```

---

### 4.4 更新帖子

更新已有帖子。

**请求**
```
PUT /posts/:id
```

**请求头**
```
Authorization: Bearer <token>
```

**路径参数**
| 参数 | 类型 | 说明 |
|------|------|------|
| id | number | 帖子ID |

**请求体**

同创建帖子。

**响应示例**
```json
{
  "code": 0,
  "data": {
    "id": 1,
    "status": "pending"
  },
  "message": "帖子已更新，等待审核"
}
```

---

### 4.5 删除帖子

删除指定帖子（软删除）。

**请求**
```
DELETE /posts/:id
```

**请求头**
```
Authorization: Bearer <token>
```

**路径参数**
| 参数 | 类型 | 说明 |
|------|------|------|
| id | number | 帖子ID |

**响应示例**
```json
{
  "code": 0,
  "data": null,
  "message": "删除成功"
}
```

---

### 4.6 更新帖子状态

更新帖子状态（标记已售出或关闭）。

**请求**
```
PUT /posts/:id/status
```

**请求头**
```
Authorization: Bearer <token>
```

**路径参数**
| 参数 | 类型 | 说明 |
|------|------|------|
| id | number | 帖子ID |

**请求体**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| status | string | 是 | 状态：`sold` / `closed` |

**请求示例**
```json
{
  "status": "sold"
}
```

**响应示例**
```json
{
  "code": 0,
  "data": null,
  "message": "状态更新成功"
}
```

---

### 4.7 添加帖子回复

为自己的帖子添加回复（补充信息）。

**请求**
```
POST /posts/:id/replies
```

**请求头**
```
Authorization: Bearer <token>
```

**路径参数**
| 参数 | 类型 | 说明 |
|------|------|------|
| id | number | 帖子ID |

**请求体**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| content | string | 是 | 回复内容（最多500字） |
| images | array | 否 | 图片URL列表（最多3张） |

**请求示例**
```json
{
  "content": "补充信息...",
  "images": ["https://..."]
}
```

**响应示例**
```json
{
  "code": 0,
  "data": {
    "id": 1,
    "status": "pending"
  },
  "message": "回复已提交，等待审核"
}
```

---

### 4.8 点赞/取消点赞

对帖子进行点赞或取消点赞（Toggle）。

**请求**
```
POST /posts/:id/like
```

**请求头**
```
Authorization: Bearer <token>
```

**路径参数**
| 参数 | 类型 | 说明 |
|------|------|------|
| id | number | 帖子ID |

**响应示例**
```json
{
  "code": 0,
  "data": {
    "isLiked": true,
    "likeCount": 101
  },
  "message": "点赞成功"
}
```

---

### 4.9 关注/取消关注

对帖子进行关注或取消关注（Toggle）。

**请求**
```
POST /posts/:id/follow
```

**请求头**
```
Authorization: Bearer <token>
```

**路径参数**
| 参数 | 类型 | 说明 |
|------|------|------|
| id | number | 帖子ID |

**响应示例**
```json
{
  "code": 0,
  "data": {
    "isFollowed": true,
    "followCount": 51
  },
  "message": "关注成功"
}
```

---

### 4.10 获取我的帖子

获取当前用户发布的帖子列表。

**请求**
```
GET /user/posts
```

**请求头**
```
Authorization: Bearer <token>
```

**查询参数**
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码，默认 1 |
| pageSize | number | 否 | 每页数量，默认 20 |
| status | string | 否 | 状态筛选 |

**帖子状态（status）可选值**
| 值 | 说明 |
|----|------|
| draft | 草稿 |
| pending | 待审核 |
| published | 已发布 |
| rejected | 已拒绝 |
| sold | 已售出 |
| closed | 已关闭 |

**响应格式**

同获取帖子列表。

---

### 4.11 获取我关注的帖子

获取当前用户关注的帖子列表。

**请求**
```
GET /user/follows
```

**请求头**
```
Authorization: Bearer <token>
```

**查询参数**
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码，默认 1 |
| pageSize | number | 否 | 每页数量，默认 20 |

**响应格式**

同获取帖子列表。

---

### 4.12 获取用户发布的帖子

获取指定用户发布的帖子列表（仅已发布状态）。

**请求**
```
GET /users/:id/posts
```

**路径参数**
| 参数 | 类型 | 说明 |
|------|------|------|
| id | number | 用户ID |

**查询参数**
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码，默认 1 |
| pageSize | number | 否 | 每页数量，默认 20 |

**响应格式**

同获取帖子列表。

---

## 5. 联系方式申请接口

### 5.1 提交联系方式申请

申请获取帖子作者的联系方式。

**请求**
```
POST /contact-requests
```

**请求头**
```
Authorization: Bearer <token>
```

**请求体**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| postId | number | 是 | 帖子ID |
| message | string | 是 | 申请留言（10-200字） |

**请求示例**
```json
{
  "postId": 1,
  "message": "您好，我对这件装备很感兴趣，希望能获取您的联系方式进一步沟通。"
}
```

**响应示例**
```json
{
  "code": 0,
  "data": {
    "id": 1,
    "status": "pending"
  },
  "message": "申请已提交，等待审核"
}
```

---

### 5.2 获取我发出的申请列表

获取当前用户发出的联系方式申请列表。

**请求**
```
GET /contact-requests/sent
```

**请求头**
```
Authorization: Bearer <token>
```

**查询参数**
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码，默认 1 |
| pageSize | number | 否 | 每页数量，默认 20 |
| status | string | 否 | 状态筛选：`pending` / `approved` / `rejected` |

**响应示例**
```json
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
        "contactInfo": "微信：xxx",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "total": 10,
      "totalPages": 1
    }
  },
  "message": "success"
}
```

**响应字段说明**
| 字段 | 类型 | 说明 |
|------|------|------|
| auditStatus | string | 管理员审核状态 |
| ownerStatus | string | 帖子作者处理状态 |
| contactInfo | string | 联系方式（仅当 ownerStatus 为 approved 时返回） |

---

### 5.3 获取我收到的申请列表

获取当前用户收到的联系方式申请列表。

**请求**
```
GET /contact-requests/received
```

**请求头**
```
Authorization: Bearer <token>
```

**查询参数**
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码，默认 1 |
| pageSize | number | 否 | 每页数量，默认 20 |
| status | string | 否 | 状态筛选 |

**响应示例**
```json
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
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "total": 5,
      "totalPages": 1
    }
  },
  "message": "success"
}
```

---

### 5.4 处理联系方式申请

帖子作者处理收到的联系方式申请。

**请求**
```
PUT /contact-requests/:id/handle
```

**请求头**
```
Authorization: Bearer <token>
```

**路径参数**
| 参数 | 类型 | 说明 |
|------|------|------|
| id | number | 申请ID |

**请求体**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| action | string | 是 | 处理动作：`approve` / `reject` |
| reason | string | 否 | 拒绝原因（拒绝时可选） |

**请求示例**
```json
{
  "action": "approve"
}
```

**响应示例**
```json
{
  "code": 0,
  "data": null,
  "message": "处理成功"
}
```

---

## 6. 通知接口

### 6.1 获取通知列表

获取当前用户的通知列表。

**请求**
```
GET /notifications
```

**请求头**
```
Authorization: Bearer <token>
```

**查询参数**
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码，默认 1 |
| pageSize | number | 否 | 每页数量，默认 20 |
| type | string | 否 | 通知类型筛选 |
| isRead | boolean | 否 | 已读状态筛选 |

**通知类型（type）可选值**
| 值 | 说明 |
|----|------|
| system | 系统通知 |
| audit | 审核通知 |
| like | 点赞通知 |
| follow | 关注通知 |
| contact_request | 联系申请通知 |
| contact_reply | 申请回复通知 |
| points | 积分变动通知 |

**响应示例**
```json
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
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "total": 50,
      "totalPages": 3
    },
    "unreadCount": 5
  },
  "message": "success"
}
```

---

### 6.2 标记通知已读

将通知标记为已读。

**请求**
```
PUT /notifications/read
```

**请求头**
```
Authorization: Bearer <token>
```

**请求体**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| ids | array | 是 | 通知ID数组（空数组表示全部标记已读） |

**请求示例**
```json
{
  "ids": [1, 2, 3]
}
```

**响应示例**
```json
{
  "code": 0,
  "data": null,
  "message": "标记成功"
}
```

---

### 6.3 获取未读通知数量

获取各类型通知的未读数量。

**请求**
```
GET /notifications/unread-count
```

**请求头**
```
Authorization: Bearer <token>
```

**响应示例**
```json
{
  "code": 0,
  "data": {
    "total": 10,
    "byType": {
      "system": 2,
      "audit": 1,
      "like": 5,
      "follow": 2,
      "contact_request": 0,
      "contact_reply": 0,
      "points": 0
    }
  },
  "message": "success"
}
```

---

## 7. 积分接口

### 7.1 获取积分记录

获取当前用户的积分变动记录。

**请求**
```
GET /points/records
```

**请求头**
```
Authorization: Bearer <token>
```

**查询参数**
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码，默认 1 |
| pageSize | number | 否 | 每页数量，默认 20 |
| type | string | 否 | 积分类型筛选 |

**积分类型（type）可选值**
| 值 | 说明 |
|----|------|
| register | 注册奖励 |
| daily_login | 每日登录 |
| login_streak | 连续登录奖励 |
| be_liked | 被点赞 |
| be_followed | 被关注 |
| contact_approved | 联系申请被同意 |
| complete_profile | 完善资料 |
| publish_post | 发布帖子（消耗） |
| reply_post | 回复帖子（消耗） |
| request_contact | 申请联系方式（消耗） |

**响应示例**
```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "id": 1,
        "type": "publish_post",
        "amount": -10,
        "balance": 90,
        "description": "发布帖子",
        "relatedId": 1,
        "relatedType": "post",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "total": 100,
      "totalPages": 5
    },
    "currentBalance": 90
  },
  "message": "success"
}
```

---

## 8. 通用接口

### 8.1 上传图片

上传图片文件。

**请求**
```
POST /upload/image
```

**请求头**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**请求体**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| file | File | 是 | 图片文件（jpg/png，最大2MB） |

**响应示例**
```json
{
  "code": 0,
  "data": {
    "url": "https://cdn.example.com/images/xxx.jpg",
    "thumbnail": "https://cdn.example.com/images/xxx_thumb.jpg"
  },
  "message": "上传成功"
}
```

---

### 8.2 获取分类列表

获取帖子分类列表（树形结构）。

**请求**
```
GET /categories
```

**响应示例**
```json
{
  "code": 0,
  "data": [
    {
      "id": 1,
      "name": "武器",
      "children": [
        { "id": 11, "name": "法杖" },
        { "id": 12, "name": "剑" },
        { "id": 13, "name": "扇" },
        { "id": 14, "name": "刀" }
      ]
    },
    {
      "id": 2,
      "name": "防具",
      "children": [
        { "id": 21, "name": "头盔" },
        { "id": 22, "name": "铠甲" },
        { "id": 23, "name": "腰带" },
        { "id": 24, "name": "鞋子" }
      ]
    },
    {
      "id": 3,
      "name": "饰品",
      "children": [
        { "id": 31, "name": "项链" },
        { "id": 32, "name": "戒指" }
      ]
    },
    {
      "id": 4,
      "name": "坐骑",
      "children": []
    },
    {
      "id": 5,
      "name": "召唤兽",
      "children": []
    }
  ],
  "message": "success"
}
```

---

### 8.3 获取热门标签

获取热门标签列表。

**请求**
```
GET /tags/hot
```

**查询参数**
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| limit | number | 否 | 返回数量，默认 20 |

**响应示例**
```json
{
  "code": 0,
  "data": [
    { "id": 1, "name": "满宝石", "count": 100 },
    { "id": 2, "name": "高伤害", "count": 80 },
    { "id": 3, "name": "高灵力", "count": 60 },
    { "id": 4, "name": "满技能", "count": 50 }
  ],
  "message": "success"
}
```

---

### 8.4 获取服务器列表

获取游戏服务器列表。

**请求**
```
GET /game-servers
```

**响应示例**
```json
{
  "code": 0,
  "data": [
    { "id": "changancheng", "name": "长安城" },
    { "id": "jiangnan", "name": "江南" },
    { "id": "donghai", "name": "东海渔村" },
    { "id": "kunlun", "name": "昆仑山" },
    { "id": "penglai", "name": "蓬莱仙境" }
  ],
  "message": "success"
}
```

---

### 8.5 搜索标签

根据关键词搜索标签（用于标签输入时的自动完成）。

**请求**
```
GET /tags/search
```

**查询参数**
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| keyword | string | 是 | 搜索关键词 |
| limit | number | 否 | 返回数量，默认 10 |

**响应示例**
```json
{
  "code": 0,
  "data": [
    { "id": 1, "name": "满宝石", "count": 100 },
    { "id": 5, "name": "满修炼", "count": 30 }
  ],
  "message": "success"
}
```

---

## 9. 后台管理接口

> 注意：以下接口仅供管理员使用，需要管理员 Token 认证。

### 9.1 管理员登录

管理员登录获取 Token。

**请求**
```
POST /admin/auth/login
```

**请求体**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| username | string | 是 | 管理员用户名 |
| password | string | 是 | 密码 |

**请求示例**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**响应示例**
```json
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

---

### 9.2 获取管理员信息

获取当前管理员信息。

**请求**
```
GET /admin/profile
```

**请求头**
```
Authorization: Bearer <admin_token>
```

**响应示例**
```json
{
  "code": 0,
  "data": {
    "id": 1,
    "username": "admin",
    "nickname": "管理员",
    "role": "super_admin",
    "lastLoginAt": "2024-01-01T00:00:00Z"
  },
  "message": "success"
}
```

---

### 9.3 获取待审核列表

获取待审核内容列表。

**请求**
```
GET /admin/audit/pending
```

**请求头**
```
Authorization: Bearer <admin_token>
```

**查询参数**
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| type | string | 是 | 审核类型：`post` / `reply` / `contact_request` |
| page | number | 否 | 页码，默认 1 |
| pageSize | number | 否 | 每页数量，默认 20 |

**响应示例**
```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "id": 1,
        "type": "post",
        "content": {
          "id": 1,
          "title": "出售150级武器",
          "type": "sell_equipment",
          "content": "详细描述...",
          "images": ["https://..."]
        },
        "submitter": {
          "id": 1,
          "nickname": "用户001",
          "phone": "138****8000"
        },
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "total": 30,
      "totalPages": 2
    },
    "pendingCount": {
      "post": 20,
      "reply": 5,
      "contactRequest": 5
    }
  },
  "message": "success"
}
```

---

### 9.4 审核操作

对内容进行审核操作。

**请求**
```
POST /admin/audit/:type/:id
```

**请求头**
```
Authorization: Bearer <admin_token>
```

**路径参数**
| 参数 | 类型 | 说明 |
|------|------|------|
| type | string | 审核类型：`post` / `reply` / `contact_request` |
| id | number | 审核对象ID |

**请求体**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| action | string | 是 | 审核动作：`approve` / `reject` |
| reason | string | 否 | 拒绝原因（拒绝时必填） |

**请求示例**
```json
{
  "action": "reject",
  "reason": "内容包含敏感词汇"
}
```

**响应示例**
```json
{
  "code": 0,
  "data": null,
  "message": "审核完成"
}
```

---

### 9.5 获取用户列表

获取用户列表。

**请求**
```
GET /admin/users
```

**请求头**
```
Authorization: Bearer <admin_token>
```

**查询参数**
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码，默认 1 |
| pageSize | number | 否 | 每页数量，默认 20 |
| keyword | string | 否 | 搜索关键词（手机号/昵称） |
| status | string | 否 | 状态筛选：`active` / `banned` |

**响应示例**
```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "id": 1,
        "phone": "13800138000",
        "nickname": "用户001",
        "avatar": "https://...",
        "status": "active",
        "points": 1500,
        "postCount": 10,
        "createdAt": "2024-01-01T00:00:00Z",
        "lastLoginAt": "2024-01-10T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "total": 1000,
      "totalPages": 50
    }
  },
  "message": "success"
}
```

---

### 9.6 获取用户详情

获取用户详细信息。

**请求**
```
GET /admin/users/:id
```

**请求头**
```
Authorization: Bearer <admin_token>
```

**路径参数**
| 参数 | 类型 | 说明 |
|------|------|------|
| id | number | 用户ID |

**响应示例**
```json
{
  "code": 0,
  "data": {
    "id": 1,
    "phone": "13800138000",
    "nickname": "用户001",
    "avatar": "https://...",
    "bio": "个人简介",
    "gameServer": "长安城",
    "contactInfo": "微信：xxx",
    "status": "active",
    "points": 1500,
    "postCount": 10,
    "createdAt": "2024-01-01T00:00:00Z",
    "lastLoginAt": "2024-01-10T00:00:00Z"
  },
  "message": "success"
}
```

---

### 9.7 更新用户状态

更新用户账号状态（禁用/启用）。

**请求**
```
PUT /admin/users/:id/status
```

**请求头**
```
Authorization: Bearer <admin_token>
```

**路径参数**
| 参数 | 类型 | 说明 |
|------|------|------|
| id | number | 用户ID |

**请求体**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| status | string | 是 | 状态：`active` / `banned` |
| reason | string | 否 | 禁用原因（禁用时可选） |

**请求示例**
```json
{
  "status": "banned",
  "reason": "违规发布信息"
}
```

**响应示例**
```json
{
  "code": 0,
  "data": null,
  "message": "状态更新成功"
}
```

---

### 9.8 获取帖子列表（管理端）

获取所有帖子列表。

**请求**
```
GET /admin/posts
```

**请求头**
```
Authorization: Bearer <admin_token>
```

**查询参数**
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码，默认 1 |
| pageSize | number | 否 | 每页数量，默认 20 |
| keyword | string | 否 | 搜索关键词 |
| status | string | 否 | 状态筛选 |
| type | string | 否 | 类型筛选 |
| userId | number | 否 | 用户ID筛选 |

**响应格式**

同用户端帖子列表，但包含更多管理字段。

---

### 9.9 更新帖子状态（管理端）

管理员更新帖子状态。

**请求**
```
PUT /admin/posts/:id/status
```

**请求头**
```
Authorization: Bearer <admin_token>
```

**路径参数**
| 参数 | 类型 | 说明 |
|------|------|------|
| id | number | 帖子ID |

**请求体**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| status | string | 是 | 状态 |
| reason | string | 否 | 原因说明 |

**响应示例**
```json
{
  "code": 0,
  "data": null,
  "message": "状态更新成功"
}
```

---

### 9.10 删除帖子（管理端）

管理员删除帖子。

**请求**
```
DELETE /admin/posts/:id
```

**请求头**
```
Authorization: Bearer <admin_token>
```

**路径参数**
| 参数 | 类型 | 说明 |
|------|------|------|
| id | number | 帖子ID |

**响应示例**
```json
{
  "code": 0,
  "data": null,
  "message": "删除成功"
}
```

---

### 9.11 获取数据统计概览

获取系统数据统计概览。

**请求**
```
GET /admin/statistics/overview
```

**请求头**
```
Authorization: Bearer <admin_token>
```

**响应示例**
```json
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

### 9.12 获取数据趋势

获取数据趋势统计（用于图表展示）。

**请求**
```
GET /admin/statistics/trends
```

**请求头**
```
Authorization: Bearer <admin_token>
```

**查询参数**
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| type | string | 是 | 统计类型：`users` / `posts` / `requests` |
| days | number | 否 | 统计天数，默认 7，最大 30 |

**响应示例**
```json
{
  "code": 0,
  "data": {
    "type": "users",
    "days": 7,
    "data": [
      { "date": "2024-01-01", "count": 50 },
      { "date": "2024-01-02", "count": 60 },
      { "date": "2024-01-03", "count": 45 },
      { "date": "2024-01-04", "count": 70 },
      { "date": "2024-01-05", "count": 55 },
      { "date": "2024-01-06", "count": 80 },
      { "date": "2024-01-07", "count": 65 }
    ]
  },
  "message": "success"
}
```

---

### 9.13 分类管理

#### 获取分类列表
```
GET /admin/categories
```

#### 创建分类
```
POST /admin/categories
```

**请求体**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 分类名称 |
| parentId | number | 否 | 父分类ID |
| sortOrder | number | 否 | 排序值 |

#### 更新分类
```
PUT /admin/categories/:id
```

#### 删除分类
```
DELETE /admin/categories/:id
```

---

### 9.14 标签管理

#### 获取标签列表
```
GET /admin/tags
```

**查询参数**
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码 |
| pageSize | number | 否 | 每页数量 |
| keyword | string | 否 | 搜索关键词 |
| isHot | boolean | 否 | 是否热门 |

#### 创建标签
```
POST /admin/tags
```

**请求体**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 标签名称 |
| isHot | boolean | 否 | 是否热门 |

#### 更新标签
```
PUT /admin/tags/:id
```

#### 删除标签
```
DELETE /admin/tags/:id
```

#### 合并标签
```
POST /admin/tags/merge
```

**请求体**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| sourceIds | array | 是 | 源标签ID数组 |
| targetId | number | 是 | 目标标签ID |

---

### 9.15 服务器配置管理

#### 获取服务器列表
```
GET /admin/game-servers
```

#### 创建服务器
```
POST /admin/game-servers
```

**请求体**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 服务器ID |
| name | string | 是 | 服务器名称 |
| isActive | boolean | 否 | 是否启用 |

#### 更新服务器
```
PUT /admin/game-servers/:id
```

#### 删除服务器
```
DELETE /admin/game-servers/:id
```

---

### 9.16 管理员管理

#### 获取管理员列表
```
GET /admin/admins
```

**请求头**
```
Authorization: Bearer <admin_token>
```

> 注意：仅超级管理员可访问

#### 创建管理员
```
POST /admin/admins
```

**请求体**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| username | string | 是 | 用户名 |
| password | string | 是 | 密码 |
| nickname | string | 否 | 昵称 |
| role | string | 是 | 角色：`admin` / `super_admin` |

#### 更新管理员
```
PUT /admin/admins/:id
```

#### 重置管理员密码
```
PUT /admin/admins/:id/password
```

**请求体**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| password | string | 是 | 新密码 |

#### 禁用/启用管理员
```
PUT /admin/admins/:id/status
```

**请求体**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| status | string | 是 | 状态：`active` / `disabled` |

---

### 9.17 积分配置管理

#### 获取积分配置
```
GET /admin/point-rules
```

**响应示例**
```json
{
  "code": 0,
  "data": [
    {
      "id": 1,
      "type": "register",
      "amount": 100,
      "description": "新用户注册",
      "dailyLimit": null
    },
    {
      "id": 2,
      "type": "daily_login",
      "amount": 10,
      "description": "每日登录",
      "dailyLimit": 10
    },
    {
      "id": 3,
      "type": "publish_post",
      "amount": -10,
      "description": "发布帖子",
      "dailyLimit": null
    }
  ],
  "message": "success"
}
```

#### 更新积分配置
```
PUT /admin/point-rules/:id
```

**请求体**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| amount | number | 是 | 积分数值 |
| dailyLimit | number | 否 | 每日上限 |

---

### 9.18 操作日志

#### 获取操作日志列表
```
GET /admin/logs
```

**请求头**
```
Authorization: Bearer <admin_token>
```

**查询参数**
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码 |
| pageSize | number | 否 | 每页数量 |
| adminId | number | 否 | 管理员ID筛选 |
| targetType | string | 否 | 操作对象类型 |
| action | string | 否 | 操作类型 |
| startDate | string | 否 | 开始日期 |
| endDate | string | 否 | 结束日期 |

**响应示例**
```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "id": 1,
        "admin": {
          "id": 1,
          "username": "admin",
          "nickname": "管理员"
        },
        "targetType": "post",
        "targetId": 1,
        "action": "approve",
        "reason": null,
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "total": 500,
      "totalPages": 25
    }
  },
  "message": "success"
}
```

---

## 附录

### A. 接口汇总表

| 模块 | 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|------|
| **认证** | POST | /auth/sms/send | 发送验证码 | 否 |
| | POST | /auth/register | 用户注册 | 否 |
| | POST | /auth/login/password | 密码登录 | 否 |
| | POST | /auth/login/sms | 验证码登录 | 否 |
| | POST | /auth/logout | 退出登录 | 是 |
| **用户** | GET | /user/profile | 获取当前用户信息 | 是 |
| | PUT | /user/profile | 更新用户信息 | 是 |
| | PUT | /user/password | 修改密码 | 是 |
| | GET | /users/:id | 获取用户公开信息 | 否 |
| **帖子** | GET | /posts | 获取帖子列表 | 否 |
| | GET | /posts/:id | 获取帖子详情 | 否 |
| | POST | /posts | 创建帖子 | 是 |
| | PUT | /posts/:id | 更新帖子 | 是 |
| | DELETE | /posts/:id | 删除帖子 | 是 |
| | PUT | /posts/:id/status | 更新帖子状态 | 是 |
| | POST | /posts/:id/replies | 添加回复 | 是 |
| | POST | /posts/:id/like | 点赞/取消点赞 | 是 |
| | POST | /posts/:id/follow | 关注/取消关注 | 是 |
| | GET | /user/posts | 获取我的帖子 | 是 |
| | GET | /user/follows | 获取我关注的帖子 | 是 |
| | GET | /users/:id/posts | 获取用户发布的帖子 | 否 |
| **联系申请** | POST | /contact-requests | 提交申请 | 是 |
| | GET | /contact-requests/sent | 获取我发出的申请 | 是 |
| | GET | /contact-requests/received | 获取我收到的申请 | 是 |
| | PUT | /contact-requests/:id/handle | 处理申请 | 是 |
| **通知** | GET | /notifications | 获取通知列表 | 是 |
| | PUT | /notifications/read | 标记已读 | 是 |
| | GET | /notifications/unread-count | 获取未读数量 | 是 |
| **积分** | GET | /points/records | 获取积分记录 | 是 |
| **通用** | POST | /upload/image | 上传图片 | 是 |
| | GET | /categories | 获取分类列表 | 否 |
| | GET | /tags/hot | 获取热门标签 | 否 |
| | GET | /tags/search | 搜索标签 | 否 |
| | GET | /game-servers | 获取服务器列表 | 否 |
| **管理-认证** | POST | /admin/auth/login | 管理员登录 | 否 |
| | GET | /admin/profile | 获取管理员信息 | 管理员 |
| **管理-审核** | GET | /admin/audit/pending | 获取待审核列表 | 管理员 |
| | POST | /admin/audit/:type/:id | 审核操作 | 管理员 |
| **管理-用户** | GET | /admin/users | 获取用户列表 | 管理员 |
| | GET | /admin/users/:id | 获取用户详情 | 管理员 |
| | PUT | /admin/users/:id/status | 更新用户状态 | 管理员 |
| **管理-帖子** | GET | /admin/posts | 获取帖子列表 | 管理员 |
| | PUT | /admin/posts/:id/status | 更新帖子状态 | 管理员 |
| | DELETE | /admin/posts/:id | 删除帖子 | 管理员 |
| **管理-统计** | GET | /admin/statistics/overview | 数据概览 | 管理员 |
| | GET | /admin/statistics/trends | 数据趋势 | 管理员 |
| **管理-分类** | GET | /admin/categories | 获取分类列表 | 管理员 |
| | POST | /admin/categories | 创建分类 | 管理员 |
| | PUT | /admin/categories/:id | 更新分类 | 管理员 |
| | DELETE | /admin/categories/:id | 删除分类 | 管理员 |
| **管理-标签** | GET | /admin/tags | 获取标签列表 | 管理员 |
| | POST | /admin/tags | 创建标签 | 管理员 |
| | PUT | /admin/tags/:id | 更新标签 | 管理员 |
| | DELETE | /admin/tags/:id | 删除标签 | 管理员 |
| | POST | /admin/tags/merge | 合并标签 | 管理员 |
| **管理-服务器** | GET | /admin/game-servers | 获取服务器列表 | 管理员 |
| | POST | /admin/game-servers | 创建服务器 | 管理员 |
| | PUT | /admin/game-servers/:id | 更新服务器 | 管理员 |
| | DELETE | /admin/game-servers/:id | 删除服务器 | 管理员 |
| **管理-管理员** | GET | /admin/admins | 获取管理员列表 | 超管 |
| | POST | /admin/admins | 创建管理员 | 超管 |
| | PUT | /admin/admins/:id | 更新管理员 | 超管 |
| | PUT | /admin/admins/:id/password | 重置密码 | 超管 |
| | PUT | /admin/admins/:id/status | 更新状态 | 超管 |
| **管理-积分** | GET | /admin/point-rules | 获取积分配置 | 管理员 |
| | PUT | /admin/point-rules/:id | 更新积分配置 | 管理员 |
| **管理-日志** | GET | /admin/logs | 获取操作日志 | 管理员 |

### B. 接口统计

| 模块 | 接口数量 |
|------|----------|
| 认证 | 5 |
| 用户 | 4 |
| 帖子 | 12 |
| 联系申请 | 4 |
| 通知 | 3 |
| 积分 | 1 |
| 通用 | 5 |
| 管理端 | 28 |
| **总计** | **62** |

---

*文档结束*
