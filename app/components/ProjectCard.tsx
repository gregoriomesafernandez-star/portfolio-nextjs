// app/components/ProjectCard.tsx

import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  challenge?: string;
  solution?: string;
  image: string;
  technologies: string[];
  github?: string;
  githubFrontend?: string;
  githubBackend?: string;
  demo?: string;
  reverse?: boolean;
}

export default function ProjectCard({
  title,
  description,
  challenge,
  solution,
  image,
  technologies,
  github,
  githubFrontend,
  githubBackend,
  demo,
  reverse = false,
}: ProjectCardProps) {
  return (
    <article
      className={`grid gap-10 items-center mb-52 max-
                  ${reverse ? 'lg:grid-cols-[0.8fr_1.2fr]' : 'lg:grid-cols-[1.2fr_0.8fr]'}
      `}>

      {/* Imagen */}
      <div className={`relative w-full aspect-video overflow-hidden rounded-2xl lg:row-start-1
                       ${reverse ? 'lg:col-start-2' : 'lg:col-start-1'}
      `}>
        <Image
          src={image}
          alt={title}

          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>


      {/* Información */}
      <div className={`lg:row-start-1
                    ${reverse ? 'lg:col-start-1' : 'lg:col-start-2'}
      `}>

        {/* Título */}
        <h3 className="font-nav tracking-wider text-4xl font-bold text-slate-800 dark:text-gray-300 mb-8 leading-tight">
          {title}
        </h3>


        {/* Desafío */}
        {challenge && (
          <div className="border-l-2 border-cyan-500/20 pl-5 mb-6">

            <h4 className="text-xs font-bold tracking-widest uppercase text-cyan-600 mb-2">
              El desafío
            </h4>

            <p className="text-gray-600 text-lg leading-relaxed">
              {challenge}
            </p>

          </div>
        )}


        {/* Solución */}
        {solution && (
          <div className="border-l-2 border-cyan-500/20 pl-5 mb-7">

            <h4 className="text-xs font-bold tracking-widest uppercase text-cyan-600 mb-2">
              La solución
            </h4>

            <p className="text-gray-600 text-lg leading-relaxed">
              {solution}
            </p>

          </div>
        )}


        {/* Descripción */}
        {!challenge && !solution && (
          <p className="text-slate-700 dark:text-gray-400 text-lg leading-relaxed mb-7">
            {description}
          </p>
        )}


        {/* Tecnologías */}
        <div className="flex flex-wrap gap-2 mb-8">

          {technologies.map((tech, index) => (
            <span
              key={index}
              className="
                px-3
                py-1.5
                rounded-md
                bg-cyan-500/5
                border
                border-cyan-500/15
                text-cyan-700
                text-xs
                font-medium
              "
            >
              {tech}
            </span>
          ))}

        </div>


        {/* Botones */}
        <div className="flex flex-wrap gap-4">

          {/* Proyecto con frontend + backend */}
          {githubFrontend && githubBackend ? (
            <>
              <Link
                href={githubFrontend}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  px-7
                  py-3
                  rounded-full
                  bg-cyan-600
                  text-white
                  text-sm
                  font-semibold
                  tracking-widest
                  transition-all
                  duration-300
                  hover:bg-cyan-700
                  hover:shadow-md
                  hover:shadow-cyan-500/20
                "
              >
                CÓDIGO FRONTEND
              </Link>

              <Link
                href={githubBackend}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  px-7
                  py-3
                  rounded-full
                  bg-cyan-600
                  text-white
                  text-sm
                  font-semibold
                  tracking-widest
                  transition-all
                  duration-300
                  hover:bg-cyan-700
                  hover:shadow-md
                  hover:shadow-cyan-500/20
                "
              >
                CÓDIGO BACKEND
              </Link>
            </>
          ) : (
            /* Proyecto con un solo repositorio */
            github && (
              <Link
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  px-7
                  py-3
                  rounded-full
                  bg-cyan-600
                  text-white
                  text-sm
                  font-semibold
                  tracking-widest
                  transition-all
                  duration-300
                  hover:bg-cyan-700
                  hover:shadow-md
                  hover:shadow-cyan-500/20
                "
              >
                CÓDIGO
              </Link>
            )
          )}

          {/* Demo */}
          {demo && (
            <Link
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="
                px-7
                py-3
                rounded-full
                bg-gray-100
                text-gray-800
                text-sm
                font-semibold
                tracking-widest
                transition-all
                duration-300
                hover:bg-white
                hover:shadow-md
              "
            >
              VER PROYECTO
            </Link>
          )}

        </div>

      </div>

    </article>
  );
}