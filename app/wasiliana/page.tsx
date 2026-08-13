'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header – Clean & Minimal */}
      <section className="relative bg-gradient-to-b from-primary-50 to-white py-16 border-b border-primary-100/50">
        <div className="container text-center">
          <span className="inline-block px-4 py-1 bg-primary-100/80 text-primary-700 text-sm font-semibold rounded-full uppercase tracking-wider mb-3">
            Wasiliana Nasi
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-4">
            Tuwasiliane
          </h1>
          <p className="text-lg text-primary-600/80 max-w-2xl mx-auto">
            Tuma ujumbe kwetu, tutajibu haraka iwezekanavyo.
          </p>
          <div className="w-24 h-1 bg-gold-400 mx-auto mt-4 rounded-full" />
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-16 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-soft p-8 md:p-10">
              <h2 className="text-2xl font-bold text-primary-700 mb-6">Tuma Ujumbe</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Jina Lako
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                    placeholder="Jina kamili"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Barua Pepe
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                    placeholder="email@mfano.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Mada
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                    placeholder="Mada ya ujumbe wako"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Ujumbe
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow resize-none"
                    placeholder="Andika ujumbe wako hapa..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 bg-primary-600 hover:bg-primary-700 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Inatuma...' : 'Tuma Ujumbe'}
                </button>

                {status === 'success' && (
                  <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
                    ✅ Ujumbe wako umetumwa! Tutawasiliana nawe hivi karibuni.
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                    ❌ Samahani, kuna hitilafu. Tafadhali jaribu tena baadaye.
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Info Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-soft p-6 border-l-4 border-gold-400">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Simu</p>
                  <p className="text-lg font-bold text-primary-700">+255 123 456 789</p>
                  <p className="text-sm text-gray-500 mt-1">Piga simu kwa maswali yako</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-soft p-6 border-l-4 border-primary-400">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Ratiba ya Ibada</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm">
                      <span className="font-semibold text-primary-700">Jumapili:</span>
                      <span className="text-gray-600 ml-2">9:00 AM - 12:00 PM</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold text-primary-700">Jumatano:</span>
                      <span className="text-gray-600 ml-2">6:00 PM - 8:00 PM</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold text-primary-700">Ijumaa:</span>
                      <span className="text-gray-600 ml-2">6:00 PM - 7:30 PM</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-soft p-6 border-l-4 border-gold-400">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 font-medium">Mahali Tulipo</p>
                  <p className="text-gray-700 font-medium">Dar es Salaam, Tanzania</p>
                  <a
                    href="https://www.google.com/maps/place/Dar+es+Salaam,+Tanzania/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-primary-600 hover:text-gold-500 font-medium text-sm transition-colors"
                  >
                    Tazama kwenye Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}