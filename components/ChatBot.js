'use client'

import { useState, useRef, useEffect } from 'react'

const SUGGESTIONS = [
  'What did you build at HelloPOS?',
  'Tell me about KippyCam',
  'What frameworks do you know?',
  'Are you open to new roles?',
]

export default function ChatBot() {
  const [open,     setOpen]     = useState(false)
  const [input,    setInput]    = useState('')
  const [messages, setMessages] = useState([])
  const [loading,  setLoading]  = useState(false)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Focus input when chat opens
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  async function sendMessage(text) {
    const userMsg = text || input.trim()
    if (!userMsg || loading) return

    const newMessages = [
      ...messages,
      { role: 'user', content: userMsg },
    ]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res  = await fetch('/api/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ messages: newMessages }),
      })
      const data = await res.json()
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.reply },
      ])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role:    'assistant',
          content: 'Sorry, something went wrong. Try emailing ' +
                   'Chaz directly at cox.s.chaz@gmail.com',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* ── Floating button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Chat with AI"
        className="fixed bottom-6 right-6 z-50
                   w-14 h-14 rounded-full bg-blue-600
                   hover:bg-blue-500 text-white shadow-lg
                   flex items-center justify-center
                   transition-all duration-200
                   hover:scale-105 active:scale-95"
      >
        {open ? '✕' : '💬'}
      </button>

      {/* ── Chat window ── */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50
                     w-[340px] sm:w-[380px]
                     bg-gray-950 border border-gray-800
                     rounded-2xl shadow-2xl
                     flex flex-col overflow-hidden"
             style={{ height: '480px' }}>

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3
                       border-b border-gray-800 bg-gray-900">
            <div className="w-8 h-8 rounded-full bg-blue-600
                         flex items-center justify-center
                         text-xs font-semibold text-white">
              CC
            </div>
            <div>
              <div className="text-sm font-medium text-white">
                Ask about Chaz
              </div>
              <div className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400
                             inline-block"></span>
                AI powered
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3
                       flex flex-col gap-3">

            {/* Welcome message */}
            {messages.length === 0 && (
              <div className="flex flex-col gap-3">
                <div className="bg-gray-800 rounded-2xl rounded-tl-sm
                             px-4 py-3 text-sm text-gray-200
                             leading-relaxed">
                  Hi! I'm an AI assistant who knows all about Chaz.
                  Ask me anything — his experience, skills, projects,
                  or whether he'd be a good fit for your team! 👋
                </div>
                {/* Suggestion chips */}
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map(s => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-xs border border-gray-700
                                 text-gray-400 hover:text-white
                                 hover:border-gray-500 rounded-full
                                 px-3 py-1.5 transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Conversation messages */}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === 'user'
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl
                    text-sm leading-relaxed
                    ${msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-sm'
                      : 'bg-gray-800 text-gray-200 rounded-tl-sm'
                    }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 rounded-2xl rounded-tl-sm
                             px-4 py-3 flex gap-1 items-center">
                  {[0, 1, 2].map(i => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-gray-500
                                 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div className="px-3 py-3 border-t border-gray-800
                       flex gap-2 items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask something about Chaz..."
              disabled={loading}
              className="flex-1 bg-gray-900 border border-gray-700
                         focus:border-blue-500 rounded-xl px-3 py-2
                         text-sm text-gray-100 outline-none transition
                         placeholder:text-gray-600 disabled:opacity-50"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="bg-blue-600 hover:bg-blue-500
                         disabled:opacity-40 disabled:cursor-not-allowed
                         text-white rounded-xl px-4 py-2 text-sm
                         font-medium transition"
            >
              Send
            </button>
          </div>

        </div>
      )}
    </>
  )
}
