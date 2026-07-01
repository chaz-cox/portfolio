// app/experience/page.jsx
// Server component — no "use client" needed

const experiences = [

  {
      role: "Integration Specialist",
      company: "Eviroguard Pest Control",
      location: "St. George, UT",
      period: "Jun 2026 - Current",
      current: true,
      summary: "Building report and task automation within CRMs. Project to Project basis",
      bullets: [
          "Project: FieldRoutes & BambooHR Automation System | Python: " +
          "Built an automated daily reporting pipeline integrating two REST APIs "+
          "(FieldRoutes and BambooHR) to identify employee activity gaps, implementing "+ 
          "a multi-strategy waterfall merge algorithm to reconcile identity discrepancies "+
          "across disparate HR systems.",
          "Solved large-scale API limitations by implementing dynamic time-chunked pagination "+
          "with rate limiting to reliably fetch 100,000+ daily records, and engineered a roaming "+
          "employee account mapping system to accurately attribute activity across multiple office locations"
      ],
      tags: [
          "Python", "BambooHR API", "FieldRoutes API", "GitHub Actions"
      ],
  },
  {
    role:     'Junior Full Stack Web Developer',
    company:  'HelloPOS',
    location: 'St. George, UT',
    period:   'Jan 2023 – Jan 2026',
    current:  false,
    summary:  'Built and shipped production features for a point-of-sale ' +
              'platform — from shipping logistics and tax compliance systems ' +
              'to financial reporting tools used by real businesses.',
    bullets: [
      
'Architected a shipping logistics module via ShipEngine API, ' +
      'enabling automated label creation and real-time rate comparisons ' +
      'across FedEx and UPS — factoring in package weight, dimensions, ' +
      'and carrier-specific packaging rules to return accurate rates.',


      
'Developed core logic for a multi-jurisdictional Sales Tax & Nexus ' +
      'system using Avalara, calculating combined rates across state, city, ' +
      'county, and special district levels — including penny-level rounding ' +
      'adjustments to ensure totals matched jurisdiction-specific rules ' +
      'across all supported states.',


      'Collaborated on SQL data migrations, building and testing tax ' +
      'rate table logic across local and QA environments before ' +
      'production deployment alongside senior developers.',

      'Engineered responsive data reporting tools — Sales per Hour, ' +
      'Sales Method, Tax Nexus — with dynamic CSV export to ' +
      'streamline financial auditing workflows.',
    ],
    tags: [
      'Vue.js', 'Angular', 'ShipEngine API',
      'Avalara', 'SQL', 'CSV Automation',
    ],
  },
  {
    role:     'Computer Lab Assistant',
    company:  'Utah Tech University',
    location: 'St. George, UT',
    period:   'Aug 2022 – Dec 2022',
    current:  false,
    summary:  'Supported CS students and faculty in a university lab ' +
              'environment — mentoring, grading automation, and ' +
              'hardware management.',
    bullets: [
      'Mentored Computer Science students in debugging and logic ' +
      'across diverse programming assignments, improving ' +
      'comprehension of core technical concepts.',

      'Evaluated student project submissions and managed completion ' +
      'data through automated CSV exports to streamline the ' +
      'instructor grading workflow.',

      'Managed high-value hardware inventory, overseeing MacOS ' +
      'workstation checkout with 100% asset accountability.',
    ],
    tags: [
      'Mentorship', 'Python',
      'CSV Automation', 'Hardware Management',
    ],
  },
]

export default function Experience() {
  const featured = experiences.filter(p => p.current)
  const rest     = experiences.filter(p => !p.current)

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-2">Experience</h1>
        <p className="text-gray-400">
          My professional background and work history.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">

        {/* Vertical line */}
        <div className="absolute left-3 top-2 bottom-2
                     w-px bg-gray-800 hidden sm:block">
        </div>

        <div className="flex flex-col gap-10">
          {experiences.map((exp) => (
            <div
              key={exp.role + exp.company}
              className="sm:pl-10 relative"
            >

              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 w-6 h-6
                           rounded-full border-2 border-blue-500
                           bg-[#0a0a0a] hidden sm:flex
                           items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-blue-500">
                </div>
              </div>

              {/* Card */}
              <div className="bg-gray-900 border border-gray-800
                           rounded-2xl p-6">

                {/* Role header */}
                <div className="flex items-start justify-between
                             flex-wrap gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-lg font-semibold">
                        {exp.role}
                      </h2>
                      {exp.current && (
                        <span className="text-xs bg-blue-500/20
                                   text-blue-400 px-2 py-0.5
                                   rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">
                      {exp.company} · {exp.location}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500
                               bg-gray-800 px-3 py-1 rounded-full
                               whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>

                {/* Summary */}
                <p className="text-gray-400 text-sm mb-4
                           leading-relaxed">
                  {exp.summary}
                </p>

                {/* Bullet points */}
                <ul className="space-y-2 mb-5">
                  {exp.bullets.map((point, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm text-gray-400"
                    >
                      <span className="text-blue-500 mt-0.5
                                 flex-shrink-0">
                        →
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-800 text-gray-400
                                 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
