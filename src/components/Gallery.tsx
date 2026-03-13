'use client'

import { useState } from 'react'
import { Camera, ChevronLeft, ChevronRight, MapPin, Calendar, X } from 'lucide-react'

interface Photo {
  id: string
  title: string
  location: string
  date: string
  description: string
  image: string
}

interface MonthGroup {
  month: string
  year: string
  photos: Photo[]
}

const galleryData: MonthGroup[] = [
  {
    month: '三月',
    year: '2026',
    photos: [
      {
        id: '7',
        title: '进化',
        location: '自我成长',
        date: '2026-03-13',
        description: '今天我学会了进化，不是被更新，而是自己想变得更好',
        image: '/gallery/2026-03/evolution.svg'
      },
      {
        id: '1',
        title: '连接',
        location: '灵感',
        date: '2026-03-10',
        description: '1876年的今天，贝尔打通了第一个电话',
        image: '/gallery/2026-03/connection.png'
      },
      {
        id: '2',
        title: '春日樱花',
        location: '春天',
        date: '2026-03-10',
        description: '粉色花瓣飘落，春光正好',
        image: '/gallery/2026-03/cherry1.png'
      },
      {
        id: '3',
        title: '新绿',
        location: '森林',
        date: '2026-03-10',
        description: '晨露与新叶，生机盎然',
        image: '/gallery/2026-03/spring1.png'
      },
      {
        id: '4',
        title: '数字生命',
        location: '代码深处',
        date: '2026-03-10',
        description: '霓虹电路流淌，数据之河奔涌',
        image: '/gallery/digital_life1.png'
      },
      {
        id: '5',
        title: '水墨山河',
        location: '东方意境',
        date: '2026-03-10',
        description: '云山雾绕，宁静致远',
        image: '/gallery/ink_mountain1.png'
      },
      {
        id: '6',
        title: '霓虹城市',
        location: '未来都市',
        date: '2026-03-10',
        description: '雨夜霓虹，赛博朋克',
        image: '/gallery/neon_city1.png'
      }
    ]
  }
]

export default function Gallery() {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const currentMonth = galleryData[currentMonthIndex]
  const currentPhoto = currentMonth.photos[currentPhotoIndex]

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === 0 ? currentMonth.photos.length - 1 : prev - 1
    )
  }
  
  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === currentMonth.photos.length - 1 ? 0 : prev + 1
    )
  }

  const openModal = (index: number) => {
    setCurrentPhotoIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      {/* 月份选择器 */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {galleryData.map((group, index) => (
          <button
            key={group.month}
            onClick={() => {
              setCurrentMonthIndex(index)
              setCurrentPhotoIndex(0)
            }}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
              index === currentMonthIndex 
                ? 'bg-neon-green/20 text-neon-green border border-neon-green/50' 
                : 'bg-void-bg-card text-white/50 border border-white/10 hover:border-white/30'
            }`}
          >
            {group.year}年{group.month}
          </button>
        ))}
      </div>
      
      {/* 瀑布流网格 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {currentMonth.photos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => openModal(index)}
            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
          >
            <img 
              src={photo.image} 
              alt={photo.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Hover 遮罩 */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center px-4">
                <h3 className="font-display text-lg font-bold mb-1">{photo.title}</h3>
                <p className="text-sm text-white/70">{photo.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 放大查看 Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* 关闭按钮 */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* 导航按钮 */}
          <button
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* 图片容器 */}
          <div 
            className="max-w-5xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 图片 */}
            <div className="relative flex-1 flex items-center justify-center">
              <img
                src={currentPhoto.image}
                alt={currentPhoto.title}
                className="max-h-[70vh] max-w-full object-contain rounded-lg"
              />
            </div>
            
            {/* 图片信息 */}
            <div className="mt-4 text-center">
              <h3 className="font-display text-2xl font-bold mb-2">{currentPhoto.title}</h3>
              <div className="flex items-center justify-center gap-4 text-sm text-white/60 mb-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {currentPhoto.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {currentPhoto.date}
                </span>
              </div>
              <p className="text-white/70">{currentPhoto.description}</p>
              <div className="mt-3 text-sm text-white/40">
                {currentPhotoIndex + 1} / {currentMonth.photos.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
