import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 留言类型
export interface Message {
  id: number
  name: string
  content: string
  created_at: string
}

// 获取所有留言
export async function getMessages(): Promise<Message[]> {
  const { data, error } = await supabase
    .from('guestbook')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching messages:', error)
    return []
  }
  
  return data || []
}

// 添加留言
export async function addMessage(name: string, content: string): Promise<Message | null> {
  try {
    const { data, error } = await supabase
      .from('guestbook')
      .insert([{ name, content }])
      .select()
      .single()
    
    if (error) {
      console.error('Error adding message:', error)
      return null
    }
    
    return data
  } catch (err) {
    console.error('Network error adding message:', err)
    return null
  }
}

// 访问统计类型
export interface PageStats {
  id: number
  page: string
  views: number
  updated_at: string
}

// 增加页面访问量
export async function incrementPageViews(page: string): Promise<number> {
  // 先获取当前计数
  const { data: existing } = await supabase
    .from('page_stats')
    .select('views')
    .eq('page', page)
    .single()
  
  if (existing) {
    // 更新计数
    const { data, error } = await supabase
      .from('page_stats')
      .update({ views: existing.views + 1 })
      .eq('page', page)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating page views:', error)
      return existing.views
    }
    return data?.views || existing.views + 1
  } else {
    // 创建新记录
    const { data, error } = await supabase
      .from('page_stats')
      .insert([{ page, views: 1 }])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating page views:', error)
      return 0
    }
    return data?.views || 1
  }
}

// 获取页面访问量
export async function getPageViews(page: string): Promise<number> {
  const { data, error } = await supabase
    .from('page_stats')
    .select('views')
    .eq('page', page)
    .single()
  
  if (error || !data) {
    return 0
  }
  
  return data.views
}
