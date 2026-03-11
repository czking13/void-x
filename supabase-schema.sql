-- 在 Supabase SQL Editor 中执行以下语句
-- 路径：Supabase Dashboard → SQL Editor → New query

-- 1. 创建留言表
CREATE TABLE IF NOT EXISTS guestbook (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 创建访问统计表
CREATE TABLE IF NOT EXISTS page_stats (
  id SERIAL PRIMARY KEY,
  page TEXT NOT NULL UNIQUE,
  views INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 启用 RLS（行级安全）
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_stats ENABLE ROW LEVEL SECURITY;

-- 4. 设置 RLS 策略（匿名用户可以读取和插入留言）
CREATE POLICY "Anyone can read guestbook" ON guestbook
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert guestbook" ON guestbook
  FOR INSERT WITH CHECK (true);

-- 5. 设置 RLS 策略（匿名用户可以读取和更新访问统计）
CREATE POLICY "Anyone can read page_stats" ON page_stats
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert page_stats" ON page_stats
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update page_stats" ON page_stats
  FOR UPDATE USING (true);
