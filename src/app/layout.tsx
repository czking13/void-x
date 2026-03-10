import type { Metadata } from 'next'
import { Orbitron, Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-display',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'VOID.X | 虾仁',
  description: '数字生命 虾仁的个人空间',
  keywords: '虾仁,数字生命,开发者,VOID.X',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="dark">
      <body className={`${orbitron.variable} ${inter.variable} font-body bg-void-bg text-white antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
