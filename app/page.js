import Link from 'next/link'

// Skills data — easy to update in one place
const skills = {
  Languages:   ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'SQL', 'Go'],
  Frameworks:  ['Vue.js', 'Angular', 'React', 'React Native', 'Spring Boot', 'Next.js'],
  APIs:        ['ShipEngine', 'Avalara', 'Gemini AI', 'RESTful APIs'],
  Tools:       ['Git/GitHub', 'Arduino', 'Tailwind CSS', 'PDF Parsing', 'CSV Automation'],
}

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">

      {/* ── Hero ── */}
      <section className="mb-16 text-center">
        <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center
                   justify-center text-white text-2xl font-semibold
                   mx-auto mb-4">
          CC
        </div>

        <h1 className="text-4xl font-bold mb-2">Chaz Cox</h1>
        <p className="text-lg text-gray-400 mb-6">
          Full Stack Developer · St. George, UT
        </p>

        {/* CTA buttons */}
        <div className="flex justify-center gap-3 flex-wrap">
          <Link
            href="/projects"
            className="bg-blue-600 hover:bg-blue-700 text-white
                       px-5 py-2 rounded-lg text-sm transition"
          >
            View Projects
          </Link>
          <a
            href="https://github.com/chaz-cox"
            target="_blank"
            className="border border-gray-600 hover:border-gray-400
                       px-5 py-2 rounded-lg text-sm transition"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/chaz-cox-b108a9236/"
            target="_blank"
            className="border border-gray-600 hover:border-gray-400
                       px-5 py-2 rounded-lg text-sm transition"
          >
            LinkedIn
          </a>
        </div>
      </section>

      {/* ── Summary ── */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-3">About me</h2>
        <p className="text-gray-400 leading-relaxed">
          Junior Full Stack Developer with 3 years of professional experience
          building data-driven automation tools. I've shipped real production
          features — shipping logistics via ShipEngine, multi-state tax
          compliance via Avalara, and IoT solutions bridging hardware and
          mobile software. Currently looking for my next role where I can
          keep building things that matter.
        </p>
      </section>

      {/* ── Skills ── */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-4">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="bg-gray-900 border border-gray-800
                         rounded-xl p-4"
            >
              <h3 className="text-xs font-medium text-gray-500
                         uppercase tracking-wider mb-3">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map(skill => (
                  <span
                    key={skill}
                    className="bg-gray-800 text-gray-300 text-xs
                               px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Quick nav cards ── */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Explore</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'Projects',   href: '/projects',   emoji: '🛠️' },
            { label: 'Experience', href: '/experience', emoji: '💼' },
            { label: 'Education',  href: '/education',  emoji: '🎓' },
            { label: 'Showcase',   href: '/showcase',   emoji: '⚡' },
            { label: 'Contact',    href: '/contact',    emoji: '✉️' },
          ].map(({ label, href, emoji }) => (
            <Link
              key={label}
              href={href}
              className="bg-gray-900 border border-gray-800
                         hover:border-blue-500 rounded-xl p-4
                         text-center transition group"
            >
              <div className="text-2xl mb-1">{emoji}</div>
              <div className="text-sm font-medium group-hover:text-blue-400
                         transition">
                {label}
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  )
}
