// app/education/page.jsx
// Server component — no "use client" needed

const coursework = [
  {
    category: 'AI & Systems',
    courses: [
      'Artificial Intelligence',
      'Machine Learning',
      'Distributed Systems',
      'Operating Systems',
      'Compilers',
      'Computer Organization & Architecture',
    ],
  },
  {
    category: 'Software Engineering',
    courses: [
      'Algorithms & Data Structures',
      'Advanced Algorithms',
      'Software Engineering',
      'Computational Theory',
      'Database Systems',
      'Graphics Programming',
    ],
  },
  {
    category: 'Web & Networking',
    courses: [
      'Web Application Development I',
      'Web Application Development II',
      'Intro to Networking',
      'Unix/Linux',
      'A+ Computer Hardware & Windows OS',
    ],
  },
  {
    category: 'Math & Theory',
    courses: [
      'Discrete Mathematics',
      'Linear Algebra',
      'Calculus I & II',
    ],
  },
]

const activities = [
  {
    name:   'ACM Club — Competitive Programming',
    detail: 'Weekly problem solving sessions on Kattis. Enrolled in ' +
            'Competitive Programming course four semesters. ' +
            'Participated in regional programming competition.',
    icon:   '⚡',
  },
  {
    name:    'Cyber Security Club',
    detail:  'Student-led deep dives into security topics, ' +
             'presentations, and hands-on learning.',
    icon:    '🔐',
  },
]

export default function Education() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">

      {/* Page header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-2">Education</h1>
        <p className="text-gray-400">
          My academic background, coursework, and extracurriculars.
        </p>
      </div>

      {/* ── Degree 1 — BS Computer Science ── */}
      <section className="mb-10">
        <div className="bg-gray-900 border border-gray-800
                     rounded-2xl p-6 mb-4">
          <div className="flex items-start justify-between
                       flex-wrap gap-3 mb-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">
                B.S. Computer Science
              </h2>
              <p className="text-gray-400 text-sm">
                Utah Tech University · St. George, UT
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">May 2024</div>
              <div className="text-sm font-medium text-blue-400 mt-1">
                GPA: 3.39
              </div>
            </div>
          </div>

          {/* Coursework grid */}
          <div>
            <h3 className="text-xs font-medium text-gray-500
                         uppercase tracking-wider mb-3">
              Relevant Coursework
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {coursework.map(({ category, courses }) => (
                <div
                  key={category}
                  className="bg-gray-800/50 rounded-xl p-4"
                >
                  <h4 className="text-xs font-medium text-blue-400
                             mb-2">
                    {category}
                  </h4>
                  <ul className="space-y-1">
                    {courses.map(course => (
                      <li
                        key={course}
                        className="text-xs text-gray-400
                                   flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full
                                   bg-gray-600 flex-shrink-0">
                        </span>
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activities */}
        <div>
          <h3 className="text-xs font-medium text-gray-500
                       uppercase tracking-wider mb-3">
            Activities & Clubs
          </h3>
          <div className="flex flex-col gap-3">
            {activities.map(({ name, detail, icon }) => (
              <div
                key={name}
                className="bg-gray-900 border border-gray-800
                           rounded-xl p-4 flex gap-3"
              >
                <span className="text-xl">{icon}</span>
                <div>
                  <div className="text-sm font-medium mb-0.5">
                    {name}
                  </div>
                  <div className="text-xs text-gray-400">
                    {detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Degree 2 — AS CIT ── */}
      <section className="mb-10">
        <div className="bg-gray-900 border border-gray-800
                     rounded-2xl p-6">
          <div className="flex items-start justify-between
                       flex-wrap gap-3">
            <div>
              <h2 className="text-xl font-semibold mb-1">
                A.S. Computer Information Technology
              </h2>
              <p className="text-gray-400 text-sm">
                Utah Tech University · St. George, UT
              </p>
              <p className="text-gray-500 text-xs mt-2 max-w-md">
                Foundational coursework in networking, hardware,
                Unix/Linux, and web design — completed while
                pursuing the B.S.
              </p>
            </div>
            <div className="text-sm text-gray-400">May 2019</div>
          </div>
        </div>
      </section>

      {/* ── Code School ── */}
      <section>
        <div className="bg-gray-900 border border-gray-800
                     rounded-2xl p-6">
          <div className="flex items-start justify-between
                       flex-wrap gap-3 mb-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">
                Code School — Web Development
              </h2>
              <p className="text-gray-400 text-sm">
                Utah Tech University · St. George, UT
              </p>
            </div>
            <div className="text-sm text-gray-400">
              Summer 2022
            </div>
          </div>
          <ul className="space-y-2">
            {[
              'Intensive web development bootcamp held at Utah Tech University.',
              'Collaborated with a team to design and ship a full production web app.',
              'Industry speakers from local St. George tech companies ' +
              'shared real-world engineering experience.',
              'Capstone: team-built web application from planning through deployment.',
            ].map((point, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm text-gray-400"
              >
                <span className="text-blue-500 mt-0.5 flex-shrink-0">
                  →
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

    </main>
  )
}
