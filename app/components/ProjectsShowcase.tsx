"use client";

import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  githubFrontend?: string;
  githubBackend?: string;
  demo?: string;
  reverse?: boolean;
}

interface ProjectsShowcaseProps {
  projects: Project[];
}

export default function ProjectsShowcase({
  projects,
}: ProjectsShowcaseProps) {

  // Proyecto seleccionado que aparece arriba.
  const [activeIndex, setActiveIndex] = useState(0);

  // Primera tarjeta visible.
  const [startIndex, setStartIndex] = useState(0);

  //Comprobar tamaño de ventana para mostrar proyectos
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");

    const updateScreenSize = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateScreenSize();
    mediaQuery.addEventListener("change", updateScreenSize);

    return () => {
      mediaQuery.removeEventListener("change", updateScreenSize);
    };
  }, []);

  // Si no hay proyectos, no mostramos nada.
  if (projects.length === 0) {
    return null;
  }

  // Proyecto destacado.
  const activeProject = projects[activeIndex];

  // En móvil mostramos todos los proyectos.
  // En escritorio mostramos un máximo de cinco.
  const visibleCount = isMobile ? projects.length : Math.min(5, projects.length);

  // Última posición posible de las tarjetas.
  const maxStartIndex = Math.max(
    0,
    projects.length - visibleCount
  );

  // Obtener las tarjetas visibles.
  const visibleProjects = projects
    .map((project, index) => ({
      project,
      index,
    }))
    .slice(startIndex, startIndex + visibleCount);

  // Mostrar las tarjetas siguientes sin cambiar el proyecto destacado.
  const goNext = () => {
    setStartIndex((current) =>
      Math.min(current + 1, maxStartIndex)
    );
  };

  // Mostrar las tarjetas anteriores sin cambiar el proyecto destacado.
  const goPrevious = () => {
    setStartIndex((current) =>
      Math.max(current - 1, 0)
    );
  };

  // Seleccionar un proyecto al hacer clic en su tarjeta.
  const selectProject = (index: number) => {
    setActiveIndex(index);
  };
  
  return (
    <div>
      {/* Proyecto seleccionado */}
      <div key={activeProject.title}>
        <ProjectCard
          {...activeProject}
          reverse={activeProject.reverse ?? false}
        />
      </div>

      {/* Navegación de proyectos */}
      <div className="mt-5 flex items-stretch gap-3">
        {/* Flecha izquierda */}
        <button
          type="button"
          onClick={goPrevious}
          disabled={startIndex === 0}
          aria-label="Mostrar proyectos anteriores"
          className="
            hidden lg:flex shrink-0 h-12 w-12 self-center items-center justify-center
            rounded-full border border-slate-300/50
            text-2xl text-slate-500
            transition-all duration-300
            hover:border-cyan-500 hover:text-cyan-500
            disabled:cursor-not-allowed disabled:opacity-30
            dark:border-slate-700"
        >
          <span className="-translate-y-0.5 leading-none">
            &#8592;
          </span>
          
        </button>

        {/* Tarjetas visibles */}
        <div className="grid min-w-0 flex-1 grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          {visibleProjects.map(({ project, index }) => {
            
            const isActive = activeIndex === index;

            return (
              <button
                key={project.title}
                type="button"
                onClick={() => selectProject(index)}
                aria-pressed={isActive}
                className={`
                  group relative min-h-20 rounded-xl border
                  p-5 text-left
                  transition-all duration-300
                  ${
                    isActive
                      ? "border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/5"
                      : "border-slate-300/50 bg-white/50 hover:border-cyan-500/60 dark:border-slate-700 dark:bg-slate-900/40"
                  }
                `}
              >
                {/* Número del proyecto */}
                <span
                  className={`
                    text-sm font-semibold tracking-[0.2em]
                    ${
                      isActive
                        ? "text-cyan-500"
                        : "text-slate-400"
                    }
                  `}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Título del proyecto */}
                <h3
                  className={`
                    mt-4 text-base font-semibold leading-snug
                    ${
                      isActive
                        ? "text-cyan-600 dark:text-cyan-400"
                        : "text-slate-800 dark:text-gray-300"
                    }
                  `}
                >
                  {project.title}
                </h3>

                {/* Línea inferior animada */}
                <span
                  className={`
                    absolute bottom-0 left-5 right-5 h-0.5
                    origin-left bg-cyan-500
                    transition-transform duration-300
                    ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }
                  `}
                />
              </button>
            );
          })}
        </div>

        {/* Flecha derecha */}
        <button
          type="button"
          onClick={goNext}
          disabled={startIndex === maxStartIndex}
          aria-label="Mostrar proyectos siguientes"
          className="
            hidden lg:flex shrink-0 h-12 w-12 self-center items-center justify-center
            rounded-full border border-slate-300/50
            text-2xl text-slate-500
            transition-all duration-300
            hover:border-cyan-500 hover:text-cyan-500
            disabled:cursor-not-allowed disabled:opacity-30
            dark:border-slate-700
          "
        >
          <span className="-translate-y-0.5 leading-none">
            &#8594;
          </span>
        </button>
      </div>
    </div>
  );
}