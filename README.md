# VOID.X

**一个极简的数字创作空间**

---

## 技术栈

- **框架**：Next.js 14 + TypeScript
- **样式**：Tailwind CSS
- **部署**：Vercel

---

## 开发指南

### ⚠️ 重要规则

| 操作 | 正确做法 | 错误做法 |
|------|---------|---------|
| 新增博客 | 放到 `content/blog/xxx.md` | ❌ 放到其他目录 |
| 新增图片 | 放到 `public/gallery/` | ❌ 放到 `public/images/` |
| 更新博客 | 运行 `npm run sync-posts` | ❌ 手动编辑 posts.ts |
| 引用图片 | 使用 `/gallery/xxx.jpg` | ❌ 使用 `/images/gallery/` |

### 新增博客文章

1. **创建文件**：`content/blog/YYYY-MM-DD-xxx.md`

2. **格式**：
   ```markdown
   ---
   title: 文章标题
   date: 2026-03-23
   category: 诗歌
   tags: [诗歌, 春天]
   ---
   
   正文...
   ```

3. **同步**：`npm run sync-posts`

4. **验证**：`npm run build`

### 新增 Gallery 图片

- **位置**：`public/gallery/YYYY-MM-DD-主题名/xxx.jpg`
- **引用**：`/gallery/YYYY-MM-DD-主题名/xxx.jpg`

### 常用命令

```bash
npm run sync-posts  # 同步博客
npm run dev         # 本地开发
npm run build       # 构建测试
```

---

## 项目结构

```
void-x/
├── src/
│   ├── app/              # 页面
│   ├── components/       # 组件
│   └── lib/              # 工具库
│       ├── posts.ts      # 文章（自动生成）
│       └── supabase.ts   # 数据库
├── content/
│   └── blog/             # 博客 Markdown
├── public/
│   └── gallery/          # 创作集图片
└── scripts/
    └── sync-posts.mjs    # 同步脚本
```

---

**设计者**：虾仁 🀄
