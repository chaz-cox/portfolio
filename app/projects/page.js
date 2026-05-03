// app/projects/page.jsx
// Server component — no "use client" needed

import ProjectCard from '@/components/ProjectCard'

export const projects = [
  {
    title:       'KippyCam',
    subtitle:    'IoT Capstone Project',
    description: 'Full-stack IoT application to monitor pet activity and ' +
                 'automate home access. Integrated ultrasonic distance ' +
                 'sensors to trigger automated photography — bridging ' +
                 'hardware and mobile software to solve a real-world problem.',
    learned: [
      'End-to-end ownership of a hardware + software system',
      'Sensor wiring and embedded C++ on Arduino',
      'React Native mobile app communicating with physical hardware',
      'Debugging across hardware and software simultaneously',
    ],
    tags:    ['React Native', 'Arduino', 'C++', 'IoT', 'Hardware'],
    github:  'https://github.com/chaz-cox', // update to exact repo URL
    live:    null,
    image:   null,         // swap in '/images/kippycam.png' when ready
    featured: true,
  },
  {
    title:       'PDF Medical Data Extractor',
    subtitle:    'Automation Tool',
    description: 'Custom Python tool to parse complex medical documents, ' +
                 'identifying CPT/ICD codes and prescription counts from ' +
                 'disparate PDF formats. Exported extracted data into ' +
                 'standardized CSV reports, significantly reducing manual ' +
                 'data entry.',
    learned: [
      'PDF parsing edge cases across inconsistent document formats',
      'Regex pattern matching for medical billing codes',
      'Automating error-prone manual workflows with Python',
      'Structuring clean CSV output from unstructured data',
    ],
    tags:    ['Python', 'PDF Parsing', 'Regex', 'CSV Automation'],
    github:  'https://github.com/chaz-cox', // update to exact repo URL
    live:    null,
    image:   null,         // swap in '/images/pdf-extractor.png' when ready
    featured: true,
  },
  {
    title:       'Code School Web App',
    subtitle:    'Team Project — Bootcamp',
    description: 'Production-level web application built collaboratively ' +
                 'during an intensive web development bootcamp at Utah Tech. ' +
                 'Worked as a team from planning through deployment with ' +
                 'guidance from local industry professionals.',
    learned: [
      'Agile team collaboration and version control workflows',
      'Shipping features on a deadline in a group setting',
      'Real-world feedback from local tech industry speakers',
    ],
    tags:    ['Team Project', 'Web Development', 'Git'],
    github:  null,
    live:    null,
    image:   null,
    featured: false,
  },
]

export default function Projects() {
  const featured   = projects.filter(p => p.featured)
  const rest       = projects.filter(p => !p.featured)

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-2">Projects</h1>
        <p className="text-gray-400">
          Things I've built — from IoT hardware to automation tools.
          Each one taught me something new.
        </p>
      </div>

      {/* Featured projects */}
      {featured.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xs font-medium text-gray-500
                       uppercase tracking-wider mb-4">
            Featured
          </h2>
          <div className="flex flex-col gap-6">
            {featured.map(project => (
              <ProjectCard
                key={project.title}
                {...project}
                featured
              />
            ))}
          </div>
        </section>
      )}

      {/* Other projects */}
      {rest.length > 0 && (
        <section>
          <h2 className="text-xs font-medium text-gray-500
                       uppercase tracking-wider mb-4">
            Other Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rest.map(project => (
              <ProjectCard
                key={project.title}
                {...project}
              />
            ))}
          </div>
        </section>
      )}

    </main>
  )
}
