// app/components/ProjectCard.tsx
import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  demo?: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  technologies,
  github,
  demo
}: ProjectCardProps) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm card-hover group">
      {/* Imagen del proyecto */}
      <div className="relative h-44 bg-gray-200">
        <Image 
          src={image} 
          alt={title}
          fill 
          className="object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Contenido */}
      <div className="p-8">
        <h3 className="text-2xl font-semibold mb-3 text-gray-800 line-clamp-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-6 line-clamp-5">
          {description}
        </p>

        {/* Tecnologías */}
        <div className="flex flex-wrap gap-2 mb-8">
          {technologies.map((tech, index) => (
            <span 
              key={index}
              className="text-xs font-medium bg-gray-100 text-gray-700 px-4 py-1.5 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          {github && (
            <Link 
              href={github}
              target="_blank"
              className="flex-1 text-center border border-gray-300 hover:border-gray-400 py-3 rounded-2xl text-sm font-medium transition-all"
            >
              Ver código
            </Link>
          )}
          
          {demo && (
            <Link 
              href={demo}
              target="_blank"
              className="flex-1 text-center bg-blue-600 text-white py-3 rounded-2xl text-sm font-medium hover:bg-blue-700 transition-all"
            >
              Ver demo
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}