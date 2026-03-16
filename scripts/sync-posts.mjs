#!/usr/bin/env node
/**
 * 从 content/blog/*.md 同步博客内容到 src/lib/posts.ts
 * 用法: node scripts/sync-posts.mjs
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(__dirname, '..')
const contentDir = path.join(rootDir, 'content/blog')
const postsFile = path.join(rootDir, 'src/lib/posts.ts')

// 从内容生成摘要
function generateExcerpt(content) {
  const plainText = content
    .replace(/^#.*$/gm, '')
    .replace(/\*\*|\*|---/g, '')
    .replace(/\n+/g, ' ')
    .trim()
  
  return plainText.length > 100 ? plainText.slice(0, 100) + '...' : plainText
}

// 计算阅读时间
function calculateReadingTime(content) {
  const wordCount = content.length
  const minutes = Math.max(1, Math.ceil(wordCount / 300))
  return `${minutes}分钟`
}

// 标准化分类
function normalizeCategory(category, tags) {
  const validCategories = ['随笔', '诗歌', '感悟', '技术', '创作']
  if (category && validCategories.includes(category)) return category
  
  if (tags.includes('诗歌')) return '诗歌'
  if (tags.includes('感悟')) return '感悟'
  if (tags.includes('技术')) return '技术'
  if (tags.includes('随笔')) return '随笔'
  
  return '随笔'
}

// 读取所有 markdown 文件
function readMarkdownFiles() {
  if (!fs.existsSync(contentDir)) {
    console.log('⚠️  content/blog 目录不存在')
    return []
  }

  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'))
  const posts = []

  for (const file of files) {
    const filePath = path.join(contentDir, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    const slug = file.replace(/\.md$/, '')
    const tags = data.tags || []
    const category = normalizeCategory(data.category, tags)

    posts.push({
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString().split('T')[0],
      excerpt: data.excerpt || generateExcerpt(content),
      content: content.trim(),
      tags,
      readingTime: calculateReadingTime(content),
      category,
      image: data.image,
    })
  }

  // 按日期排序
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

// 生成 posts.ts 内容
function generatePostsTs(posts) {
  const postsJson = posts.map(p => `  {
    slug: '${p.slug}',
    title: '${p.title.replace(/'/g, "\\'")}',
    date: '${p.date}',
    excerpt: '${p.excerpt.replace(/'/g, "\\'").replace(/\n/g, ' ')}',
    category: '${p.category}',
    ${p.image ? `image: '${p.image}',` : ''}
    content: \`${p.content.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`,
    tags: ${JSON.stringify(p.tags)},
    readingTime: '${p.readingTime}',
  }`)

  return `// 博客文章类型
export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  tags: string[]
  readingTime: string
  category: '随笔' | '诗歌' | '感悟' | '技术' | '创作'
  image?: string
}

// 博客数据 - 由 sync-posts 脚本自动生成
// 运行 npm run sync-posts 从 content/blog/*.md 同步
export const posts: Post[] = [
${postsJson.join(',\n')}
]

// 获取所有文章
export function getAllPosts(): Post[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// 获取单篇文章
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(p => p.slug === slug)
}

// 获取所有标签
export function getAllTags(): string[] {
  const tags = new Set<string>()
  posts.forEach(p => p.tags.forEach(t => tags.add(t)))
  return Array.from(tags)
}
`
}

// 主函数
function main() {
  console.log('📖 读取 content/blog/*.md ...')
  const posts = readMarkdownFiles()
  
  if (posts.length === 0) {
    console.log('⚠️  没有找到任何文章')
    return
  }

  console.log(`✅ 找到 ${posts.length} 篇文章`)
  posts.forEach(p => console.log(`   - ${p.date} | ${p.title}`))

  console.log('\n📝 生成 src/lib/posts.ts ...')
  const content = generatePostsTs(posts)
  fs.writeFileSync(postsFile, content, 'utf-8')
  
  console.log('✅ 同步完成！')
}

main()
