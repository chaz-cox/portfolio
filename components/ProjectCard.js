// components/ProjectCard.jsx
import Image from 'next/image'
import Link  from 'next/link'

export default function ProjectCard({
  title,
  subtitle,
  description,
  learned,
  tags,
  github,
  live,
  image,
  featured = false,
}) {
  return (
    <div className="bg-gray-900 border border-gray-800
                 rounded-2xl overflow-hidden
                 hover:border-gray-700 transition group">

      {/* Project image — only renders if image prop is set */}
      {image && (
        <div className="relative w-full h-48 bg-gray-800">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Card body */}
      <div className="p-6">

        {/* Title row */}
        <div className="flex items-start justify-between gap-3 mb-1">
          <div>
            <h3 className="text-lg font-semibold
                         group-hover:text-blue-400 transition">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-2 flex-shrink-0">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-white
                           border border-gray-700 hover:border-gray-500
                           px-3 py-1 rounded-full transition"
              >
                GitHub
              </a>
            )}
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300
                           border border-blue-800 hover:border-blue-600
                           px-3 py-1 rounded-full transition"
              >
                Live ↗
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed mt-3 mb-4">
          {description}
        </p>

        {/* What I learned — only on featured cards */}
        {featured && learned?.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-medium text-gray-500
                         uppercase tracking-wider mb-2">
              What I learned
            </h4>
            <ul className="space-y-1">
              {learned.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-xs text-gray-400"
                >
                  <span className="text-blue-500 flex-shrink-0">
                    →
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
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
  )
}
