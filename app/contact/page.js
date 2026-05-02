'use client'

import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

//emailJs info
const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY


export default function Contact() {
    const formRef = useRef(null)
    const[ status, setStatus] = useState('idle') // (idle | sending | success | error)

    async function handleSubmit(e){
        e.preventDefault()
        setStatus('sending')

        try {
            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formRef.current,
                EMAILJS_PUBLIC_KEY
            )
            setStatus('success')
            formRef.current.reset()
        } catch (err) {
            console.error(err)
            setStatus('error')
        }
    }

      return (
    <main className="max-w-3xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Contact</h1>
        <p className="text-gray-400">
          Have a role in mind or just want to connect?
          I'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">

        {/* Left — contact links */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Reach me directly</h2>

          {[
            {
              label: 'Email',
              value: 'cox.s.chaz@gmail.com',
              href:  'mailto:cox.s.chaz@gmail.com',
              icon:  '✉️',
            },
            {
              label: 'GitHub',
              value: 'github.com/chaz-cox',
              href:  'https://github.com/chaz-cox',
              icon:  '🐙',
            },
            {
              label: 'LinkedIn',
              value: 'Chaz Cox',
              href:  'https://www.linkedin.com/in/chaz-cox-b108a9236/',
              icon:  '💼',
            },
            {
              label: 'Phone',
              value: '435-680-8344',
              href:  'tel:4356808344',
              icon:  '📱',
            },
          ].map(({ label, value, href, icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              className="flex items-center gap-3 bg-gray-900
                         border border-gray-800 hover:border-blue-500
                         rounded-xl p-4 transition group"
            >
              <span className="text-xl">{icon}</span>
              <div>
                <div className="text-xs text-gray-500 mb-0.5">{label}</div>
                <div className="text-sm text-gray-300
                           group-hover:text-blue-400 transition">
                  {value}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Right — contact form */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Send a message</h2>

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Name
              </label>
              <input
                type="text"
                name="from_name"
                required
                placeholder="Jane Smith"
                className="w-full bg-gray-900 border border-gray-800
                           focus:border-blue-500 rounded-lg px-4 py-2.5
                           text-sm text-gray-100 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Email
              </label>
              <input
                type="email"
                name="from_email"
                required
                placeholder="jane@company.com"
                className="w-full bg-gray-900 border border-gray-800
                           focus:border-blue-500 rounded-lg px-4 py-2.5
                           text-sm text-gray-100 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Hi Chaz, I came across your portfolio..."
                className="w-full bg-gray-900 border border-gray-800
                           focus:border-blue-500 rounded-lg px-4 py-2.5
                           text-sm text-gray-100 outline-none transition
                           resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50
                         text-white rounded-lg px-5 py-2.5 text-sm
                         font-medium transition"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {/* Status messages */}
            {status === 'success' && (
              <p className="text-green-400 text-sm">
                ✅ Message sent! I'll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm">
                ❌ Something went wrong. Try emailing me directly.
              </p>
            )}

          </form>
        </div>
      </div>
    </main>
  )
}

