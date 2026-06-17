"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProjectCard from "./components/ProjectCard";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="min-h-screen">

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-300 ${
          scrolled
            ? "bg-white/70 backdrop-blur-lg border-white/20 shadow-sm"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          
          <div className="text-2xl font-bold text-blue-600">
            Gregorio J. Mesa
          </div>

          {/* Menú desktop */}
          <div className="hidden lg:flex gap-8 text-gray-700 font-medium">
            <Link href="#sobre-mi" className="hover:text-blue-600 transition-colors">Sobre mí</Link>
            <Link href="#habilidades" className="hover:text-blue-600 transition-colors">Habilidades</Link>
            <Link href="#proyectos" className="hover:text-blue-600 transition-colors">Proyectos</Link>
            <Link href="#contacto" className="hover:text-blue-600 transition-colors">Contacto</Link>
          </div>

          {/* Botón CV desktop */}
          <a 
            href="/Gregorio-Mesa-CV.pdf"
            download
            className="hidden lg:inline-block bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Descargar CV
          </a>

          {/* Botón hamburguesa móvil */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-3xl text-gray-800"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Menú móvil */}
        {menuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-md">
            <div className="px-6 py-6 flex flex-col gap-5 text-gray-700 font-medium">
              <Link href="#sobre-mi" onClick={() => setMenuOpen(false)}>Sobre mí</Link>
              <Link href="#habilidades" onClick={() => setMenuOpen(false)}>Habilidades</Link>
              <Link href="#proyectos" onClick={() => setMenuOpen(false)}>Proyectos</Link>
              <Link href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</Link>

              <a
                href="/Gregorio-Mesa-CV.pdf"
                download
                className="bg-blue-600 text-white text-center px-5 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Descargar CV
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white pt-32 pb-28">
        
      {/* Luces decorativas */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl"></div>

        {/* Contenido */}
        <div className="relative max-w-5xl mx-auto px-6 text-center">

          <span className="inline-block mb-6 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-blue-100">
            Disponible para nuevos proyectos
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Desarrollador Web  <span className="text-yellow-300">Full Stack</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-blue-100 mb-10 leading-relaxed">
            Apasionado por el desarrollo de software, el aprendizaje continuo
            y la creación de soluciones digitales.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#proyectos"
              className="bg-white text-blue-700 font-semibold px-8 py-4 rounded-2xl hover:bg-yellow-300 hover:text-blue-900 transition-all text-lg shadow-lg"
            >
              Ver proyectos
            </Link>

            <Link 
              href="https://github.com/gregoriomesafernandez-star"
              target="_blank"
              className="border-2 border-yellow-300 text-yellow-300 font-semibold px-8 py-4 rounded-2xl hover:bg-yellow-300 hover:text-blue-900 transition-all text-lg"
            >
              GitHub
            </Link>

            <Link 
              href="#contacto"
              className="border-2 border-white font-semibold px-8 py-4 rounded-2xl hover:bg-white hover:text-blue-700 transition-all text-lg"
            >
              Hablemos
            </Link>
          </div>
        </div>
      </section>

      {/* Sobre mí */}
      <section id="sobre-mi" className="py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center text-bold">
          <h2 className="text-4xl font-bold mb-12 text-gray-800">Sobre mí</h2>
          <div className="max-w-3xl mx-auto text-lg text-gray-700 font-medium leading-relaxed">

            <p>
              Soy desarrollador web apasionado por crear aplicaciones funcionales y atractivas. Me gusta aprender nuevas 
              tecnologías y aplicarlas en proyectos reales, desarrollando soluciones completas tanto en frontend como en backend.
            </p>
            
            <p className="mt-10">
              Cuento con formación en Desarrollo de Aplicaciones Web (DAW) y Administración de Sistemas Informáticos en Red (ASIR). 
              En los últimos años he retomado el desarrollo de software de forma activa, ampliando mis conocimientos mediante proyectos 
              personales y aprendizaje continuo.
            </p>

            <p className="mt-10"> 
              A través de mis proyectos he adquirido experiencia práctica en 
              <span className="font-semibold text-blue-600"> Laravel</span>, 
              <span className="font-semibold text-blue-600"> Symfony</span>, 
              <span className="font-semibold text-blue-600"> Angular</span>, 
              <span className="font-semibold text-blue-600"> PHP </span> 
              y <span className="font-semibold text-blue-600">MySQL</span>, desarrollando 
              aplicaciones web, APIs REST, sistemas de autenticación y bases de datos.
              Actualmente continúo ampliando mis conocimientos y manteniéndome al día con las tecnologías modernas de desarrollo web.
            </p>

          </div>
        </div>
      </section>

      {/* Habilidades */}
      <section id="habilidades" className="py-20 bg-blue-100/40">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Habilidades
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Frontend */}
            <div className="bg-white p-8 rounded-3xl shadow-md hover:-translate-y-2 transition-all">
              <h3 className="text-2xl font-bold mb-6 text-blue-600">Frontend</h3>

              <div className="flex flex-wrap gap-3">
                {["HTML", "CSS", "JavaScript", "TypeScript", "Angular", "React", "Vue.js", "Next.js", "Tailwind CSS", "Bootstrap"].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="bg-white p-8 rounded-3xl shadow-md hover:-translate-y-2 transition-all">
              <h3 className="text-2xl font-bold mb-6 text-emerald-600">Backend</h3>

              <div className="flex flex-wrap gap-3">
                {["PHP", "Laravel", "Symfony", "Node.js", "REST API", "JWT", "MySQL", "MongoDB"].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Herramientas */}
            <div className="bg-white p-8 rounded-3xl shadow-md hover:-translate-y-2 transition-all">
              <h3 className="text-2xl font-bold mb-6 text-amber-600">Herramientas</h3>

              <div className="flex flex-wrap gap-3">
                {["Git", "GitHub", "VS Code", "Postman"].map((tool) => (
                  <span key={tool} className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full font-medium">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section id="proyectos" className="py-24 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Mis Proyectos
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard 
              title="Red Social con Symfony"
              description="Plataforma de red social desarrollada con Symfony que incluye autenticación de usuarios, publicaciones, likes, seguidores, mensajes privados y sistema de notificaciones."
              image="/projects/social-network.png"
              technologies={["Symfony 7", "PHP", "MySQL", "Twig", "Bootstrap","jQuery / AJAX", "CSS"]}
              github="https://github.com/gregoriomesafernandez-star/social-network-symfony.git"
              demo="https://darkgray-woodpecker-887417.hostingersite.com/"
            />

            <ProjectCard 
              title="Plataforma de Vídeos con Laravel"
              description="Plataforma de vídeos desarrollada con Laravel que incluye subida de vídeos, miniaturas, comentarios, búsqueda, canales de usuario y reproducción multimedia."
              image="/projects/laravel-videos.PNG"
              technologies={["Laravel", "PHP", "MySQL", "Blade", "Breeze", "Tailwind CSS", "Alpine.js"]}
              github="https://github.com/gregoriomesafernandez-star/videos-laravel.git"
              
            />

            <ProjectCard
              title="Sistema de Gestión de Vehículos"
              description="Aplicación frontend desarrollada con Angular que incluye autenticación JWT, gestión de vehículos, formularios reactivos y comunicación con una API REST desarrollada en Laravel."
              image="/projects/cars-angular.PNG"
              technologies={[
                "Angular 21",
                "TypeScript",
                "RxJS",
                "Tailwind CSS",
                "JWT",
                "REST API"
              ]}
              github="https://github.com/gregoriomesafernandez-star/cars-angular"
            />

            <ProjectCard
              title="Cars API Laravel"
              description="API REST desarrollada con Laravel que incluye autenticación JWT, validación de datos y un sistema CRUD completo para la gestión de vehículos."
              image="/projects/image.png"
              technologies={[
                "Laravel 12",
                "PHP",
                "MySQL",
                "JWT",
                "REST API",
                "Eloquent ORM"
              ]}
              github="https://github.com/gregoriomesafernandez-star/cars-api-laravel"
            />
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-24 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Contacto
            </h2>

            <p className="text-xl text-slate-300">
              ¿Tienes una oportunidad laboral o un proyecto?
              Estaré encantado de hablar contigo.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">

            {/* Formulario */}
            <div className="bg-slate-800 p-8 rounded-3xl shadow-lg">

              <div className="grid md:grid-cols-2 gap-4 mb-4">

                <input
                  type="text"
                  placeholder="Nombre"
                  className="w-full px-4 py-4 rounded-xl bg-slate-900 border border-slate-700 focus:outline-none focus:border-blue-500 transition duration-500"
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-4 rounded-xl bg-slate-900 border border-slate-700 focus:outline-none focus:border-blue-500 transition duration-500"
                />

              </div>

              <textarea
                rows={8}
                placeholder="Escribe tu mensaje..."
                className="w-full px-4 py-4 rounded-xl bg-slate-900 border border-slate-700 focus:outline-none focus:border-blue-500 resize-none transition duration-500"
              ></textarea>

              <button
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-semibold text-lg transition-all"
              >
                Enviar mensaje
              </button>

            </div>

            {/* Información */}
            <div className="bg-slate-800 p-8 rounded-3xl shadow-lg">

              <h3 className="text-2xl font-bold mb-8">
                Información de contacto
              </h3>

              <div className="space-y-8">

                <div>
                  <p className="text-blue-400 font-semibold mb-1">
                    📧 Email
                  </p>

                  <a
                    href="mailto:gregoriojmesa@gmail.com"
                    className="text-slate-300 hover:text-white"
                  >
                    gregoriojmesa@gmail.com
                  </a>
                </div>

                <div>
                  <p className="text-blue-400 font-semibold mb-1">
                    💻 GitHub
                  </p>

                  <a
                    href="https://github.com/gregoriomesafernandez-star"
                    target="_blank"
                    className="text-slate-300 hover:text-white"
                  >
                    github.com/gregoriomesafernandez-star
                  </a>
                </div>

                <div>
                  <p className="text-blue-400 font-semibold mb-1">
                    🔗 LinkedIn
                  </p>

                  <a
                    href="https://linkedin.com/in/TU-PERFIL"
                    target="_blank"
                    className="text-slate-300 hover:text-white"
                  >
                    linkedin.com/in/TU-PERFIL
                  </a>
                </div>

                <div>
                  <p className="text-blue-400 font-semibold mb-1">
                    📍 Ubicación
                  </p>

                  <p className="text-slate-300">
                    Tenerife, Islas Canarias, España
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-8">

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">

            {/* Logo / Nombre */}
            <div>
              <h3 className="text-3xl font-bold text-white">
                Gregorio<span className="text-blue-500">Dev</span>
              </h3>
            </div>

            {/* Copyright */}
            <p className="text-center">
              © {new Date().getFullYear()} Gregorio José Mesa Fernández.
              Todos los derechos reservados.
            </p>

            {/* Redes */}
            <div className="flex gap-4">

              <a
                href="https://github.com/TU-USUARIO"
                target="_blank"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-800 hover:bg-blue-600 transition-all"
              >
                💻
              </a>

              <a
                href="https://github.com/gregoriomesafernandez-star"
                target="_blank"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-800 hover:bg-blue-600 transition-all"
              >
                🔗
              </a>

              <a
                href="mailto:gregoriojmesa@gmail.com"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-800 hover:bg-blue-600 transition-all"
              >
                📧
              </a>

            </div>

          </div>

        </div>
      </footer>

    </main>
  );
}