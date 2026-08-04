'use client'

import { useState } from 'react'
import { urlFor } from '@/sanity/lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'

interface MediaTabsProps {
  music?: any[]
  videos?: any[]
  documents?: any[]
}

export function MediaTabs({ music = [], videos = [], documents = [] }: MediaTabsProps) {
  const [activeTab, setActiveTab] = useState<'nyimbo' | 'video' | 'nyaraka'>('nyimbo')

  const tabs = [
    { id: 'nyimbo', label: 'Nyimbo', count: music.length },
    { id: 'video', label: 'Video', count: videos.length },
    { id: 'nyaraka', label: 'Nyaraka', count: documents.length },
  ]

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-gray-200 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-all duration-200 flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span className="text-lg">
              {tab.id === 'nyimbo' }
              {tab.id === 'video' }
              {tab.id === 'nyaraka' }
            </span>
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
        {activeTab === 'nyimbo' && (
          <div>
            {music.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Hakuna nyimbo zilizowekwa bado.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {music.map((song: any) => (
                  <div key={song._id} className="border rounded-xl p-5 hover:shadow-medium transition-shadow">
                    <h3 className="font-bold text-primary-700">{song.title}</h3>
                    {song.composedBy && <p className="text-sm text-gray-500 mt-1">{song.composedBy.name}</p>}
                    {song.audioUrl ? (
                      <div className="mt-4">
                        <audio controls className="w-full">
                          <source src={song.audioUrl} />
                        </audio>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400 mt-2">Hakuna faili la sauti.</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'video' && (
          <div>
            {videos.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Hakuna video zilizowekwa bado.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map((video: any, index: number) => (
                  <div key={video._key || index} className="border rounded-xl overflow-hidden hover:shadow-medium transition-shadow">
                    {video.thumbnail && (
                      <div className="relative aspect-video bg-gray-100">
                        <Image
                          src={urlFor(video.thumbnail).width(400).height(225).url()}
                          alt={video.title}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-bold text-primary-700">{video.title}</h3>
                      {video.description && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{video.description}</p>
                      )}
                      <div className="mt-4">
                        {video.fileUrl ? (
                          <video controls className="w-full rounded-lg">
                            <source src={video.fileUrl} />
                          </video>
                        ) : video.url ? (
                          <a href={video.url} target="_blank" rel="noopener noreferrer" className="inline-block text-primary-600 hover:text-gold-500 text-sm font-medium">
                            Tazama Video (nje) →
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'nyaraka' && (
          <div>
            {documents.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Hakuna nyaraka zilizowekwa bado.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc: any, index: number) => (
                  <div key={doc._key || index} className="border rounded-xl p-5 hover:shadow-medium transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">📄</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-primary-700">{doc.title}</h3>
                        {doc.description && <p className="text-sm text-gray-600 mt-1">{doc.description}</p>}
                        {doc.fileUrl && (
                          <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-primary-600 hover:text-gold-500 text-sm font-medium">
                            Pakua Faili ↓
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}