"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import ProjectCard from "./components/ProjectCard";
import ProjectsShowcase from "./components/ProjectsShowcase";
import {Download, Mail, MapPin, Send, User, MessageSquare, Moon, Sun} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Home() {
  // Variables
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sobreMiRef = useRef(null);
  const [darkMode, setDarkMode] = useState(true);
  const [themeLoaded, setThemeLoaded] = useState(false);

  // Funciones

  //Recuperamos tema
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme !== null) {
      setDarkMode(savedTheme === "dark");
    }

    setThemeLoaded(true);
  }, []);

  //Modo claro/oscuro
  useEffect(() => {
    if (!themeLoaded) return;

    document.documentElement.classList.toggle("dark", darkMode);

    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode, themeLoaded]);

  useEffect(() => {

    // Detectar scroll del navbar
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    // Detectar cuando "Sobre mí" entra en pantalla
    const observer = new IntersectionObserver(
      ([entry]) => {
          setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3,
      }
    );

    // Observamos la Referencia
    if (sobreMiRef.current) {
      observer.observe(sobreMiRef.current);
    }

    // Raton y particulas
    const particles = document.querySelectorAll<HTMLElement>(
      ".particle, .particle2, .particle3"
    );

    let mouseX = 0;
    let mouseY = 0;
    let animationFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateParticles = () => {

      particles.forEach((particle) => {

        // Dimensiones y posición actuales de esta partícula
        const rect = particle.getBoundingClientRect();

        // Calculamos el centro exacto de cada particula
        const particleX = rect.left + rect.width / 2;
        const particleY = rect.top + rect.height / 2;

        // Obtenemos a cuanto está cada particula del ratón
        const dx = mouseX - particleX;
        const dy = mouseY - particleY;

        // Hacemos Pitagoras
        const distance = Math.sqrt(dx * dx + dy * dy);

        const attractionRadius = 120;

        if (distance < attractionRadius) {
          const strength = 1 - distance / attractionRadius;

          // Movimiento hacia el ratón
          const moveX = dx * strength * 0.15;
          const moveY = dy * strength * 0.15;

          particle.style.translate = `${moveX}px ${moveY}px`;
          
          // Tamaño
          const scale = 1 + strength * 0.5;

          particle.style.scale = `${scale}`;
          
          // Glow
          const glow1 = 4 + strength * 4;
          const glow2 = 10 + strength * 10;
          const glow3 = strength * 40;
          const glow4 = strength * 60;

          particle.style.boxShadow = `
            0 0 ${glow1}px #22D3EE,
            0 0 ${glow2}px #22D3EE,
            0 0 ${glow3}px #22D3EE,
            0 0 ${glow4}px #22D3EE
          `;

        } else {

          // Volver al estado normal
          particle.style.translate = "0 0";
          particle.style.scale = "1";

          particle.style.boxShadow = `
            0 0 5px #06B6D4,
            0 0 10px #06B6D4,
            0 0 18px rgba(8, 145, 178, 0.6)
          `;
        }
      });

      animationFrame = requestAnimationFrame(animateParticles);
    };

    window.addEventListener("mousemove", handleMouseMove);

    animationFrame = requestAnimationFrame(animateParticles);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };

  }, []);

  return (
    <main className="w-full min-h-screen bg-[#E8E4D9] text-slate-900 dark:bg-slate-900 dark:text-white transition-colors duration-500">

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50  ${
          scrolled
            ? "border-b bg-[#F8F4EA]/70 border-gray-200 dark:border-gray-700 dark:bg-slate-800/70 backdrop-blur-2xl shadow-xl"
            
            : "bg-gradient-to-b from-[#F8F4EA] via-[#F8F4EA]/80 to-[#F8F4EA] dark:bg-gradient-to-b dark:from-slate-700 dark:via-slate-800/80 dark:to-slate-900 backdrop-blur-md"
        }`}
      >

        
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center gap-4">
          
          <div className="text-2xl font-bold dark:text-white">
            G<span className="text-cyan-600 dark:text-blue-500">
                M
              </span>
          </div>

          {/* Menú desktop */}
          <div className="hidden lg:flex gap-8 dark:text-gray-200 text-sm">
            <Link href="#sobre-mi" className="hover:text-cyan-700
                                            dark:hover:text-cyan-500
                                              font-nav
                                              tracking-[0.18em]
                                              transition-colors 
                                              duration-300
                                              relative
                                              after:absolute
                                              after:left-1/2
                                              after:-bottom-1
                                              after:h-[1px]
                                              after:w-0
                                              after:bg-cyan-600
                                              dark:after:bg-cyan-400
                                              after:transition-all
                                              after:duration-300
                                              after:-translate-x-1/2
                                              hover:after:w-full">SOBRE MÍ</Link>
            <Link href="#habilidades" className="hover:text-cyan-700
                                            dark:hover:text-cyan-500 
                                              font-nav
                                              tracking-[0.18em]
                                              transition-colors
                                              duration-300
                                              relative
                                              after:absolute
                                              after:left-1/2
                                              after:-bottom-1
                                              after:h-[1px]
                                              after:w-0
                                              after:bg-cyan-600
                                              dark:after:bg-cyan-400
                                              after:transition-all
                                              after:duration-300
                                              after:-translate-x-1/2
                                              hover:after:w-full">HABILIDADES</Link>
            <Link href="#proyectos" className="hover:text-cyan-700
                                            dark:hover:text-cyan-500 font-nav
                                              tracking-[0.18em]
                                              transition-colors
                                              duration-300
                                              relative
                                              after:absolute
                                              after:left-1/2
                                              after:-bottom-1
                                              after:h-[1px]
                                              after:w-0
                                              after:bg-cyan-600
                                              dark:after:bg-cyan-400
                                              after:transition-all
                                              after:duration-300
                                              after:-translate-x-1/2
                                              hover:after:w-full">PROYECTOS</Link>
            <Link href="#contacto" className="hover:text-cyan-700
                                            dark:hover:text-cyan-500 font-nav
                                              tracking-[0.18em]
                                              transition-colors 
                                              duration-300
                                              relative
                                              after:absolute
                                              after:left-1/2
                                              after:-bottom-1
                                              after:h-[1px]
                                              after:w-0
                                              after:bg-cyan-600
                                              dark:after:bg-cyan-400
                                              after:transition-all
                                              after:duration-300
                                              after:-translate-x-1/2
                                              hover:after:w-full">CONTACTO</Link>
          </div>
          
          <div className="hidden lg:flex gap-4">

            {/* Botón Claro - Oscuro */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center justify-center w-10 h-10 rounded-full border 
                       border-cyan-700
                       dark:border-blue-700
                       bg-blue-800/10
                       dark:bg-blue-500/10 
                       text-gray-600
                       dark:text-gray-200/70
                       hover:bg-blue-800/20
                       dark:hover:bg-blue-500/20 
                         transition-all 
                         duration-300"
              aria-label="Cambiar tema"
            >
              {darkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Botón CV desktop */}
            <a 
              href="/CV-Gregorio-Mesa-Fernandez2026.pdf"
              download
              className="flex items-center gap-2 border font-nav border-cyan-700 dark:border-blue-500 
                         font-bold bg-blue-500/15 px-5 py-2 rounded-full text-xs 
                         tracking-[0.15em] text-cyan-600 dark:text-blue-500 hover:bg-cyan-600 dark:hover:bg-blue-400 
                         hover:text-white dark:hover:text-black transition-colors duration-300"
            >
              <Download className="w-4 h-4 " />
              <span>DESCARGAR CV</span>
            </a>
          </div>
          
          <div className="flex items-center gap-4 lg:hidden">
            {/* Botón Claro - Oscuro Móvil*/}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center justify-center w-10 h-10 rounded-full border 
                        border-cyan-700
                        dark:border-blue-700
                        bg-blue-800/10
                        dark:bg-blue-500/10 
                        text-gray-600
                        dark:text-gray-200/70
                        hover:bg-blue-800/20
                        dark:hover:bg-blue-500/20 
                          transition-all 
                          duration-300"
              aria-label="Cambiar tema"
            >
              {darkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Botón hamburguesa móvil */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-3xl text-gray-800 dark:text-gray-200"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {menuOpen && (
          <div className="lg:hidden bg-transparent animate-menu-appear">
            <div className="px-6 py-6 flex flex-col gap-5 font-medium">
              <Link href="#sobre-mi" className="hover:text-cyan-700
                                            dark:hover:text-cyan-500
                                              font-nav
                                              tracking-[0.18em]
                                              transition-colors 
                                              duration-300
                                              relative
                                              after:absolute
                                              after:left-1/2
                                              after:-bottom-1
                                              after:h-[1px]
                                              after:w-0
                                              after:bg-cyan-600
                                              dark:after:bg-cyan-400
                                              after:transition-all
                                              after:duration-300
                                              after:-translate-x-1/2
                                              hover:after:w-full w-fit mx-auto" onClick={() => setMenuOpen(false)}>SOBRE MI</Link>
              <Link href="#habilidades" className="hover:text-cyan-700
                                            dark:hover:text-cyan-500
                                              font-nav
                                              tracking-[0.18em]
                                              transition-colors 
                                              duration-300
                                              relative
                                              after:absolute
                                              after:left-1/2
                                              after:-bottom-1
                                              after:h-[1px]
                                              after:w-0
                                              after:bg-cyan-600
                                              dark:after:bg-cyan-400
                                              after:transition-all
                                              after:duration-300
                                              after:-translate-x-1/2
                                              hover:after:w-full w-fit mx-auto" onClick={() => setMenuOpen(false)}>HABILIDADES</Link>
              <Link href="#proyectos" className="hover:text-cyan-700
                                            dark:hover:text-cyan-500
                                              font-nav
                                              tracking-[0.18em]
                                              transition-colors 
                                              duration-300
                                              relative
                                              after:absolute
                                              after:left-1/2
                                              after:-bottom-1
                                              after:h-[1px]
                                              after:w-0
                                              after:bg-cyan-600
                                              dark:after:bg-cyan-400
                                              after:transition-all
                                              after:duration-300
                                              after:-translate-x-1/2
                                              hover:after:w-full w-fit mx-auto" onClick={() => setMenuOpen(false)}>PROYECTOS</Link>
              <Link href="#contacto" className="hover:text-cyan-700
                                            dark:hover:text-cyan-500
                                              font-nav
                                              tracking-[0.18em]
                                              transition-colors 
                                              duration-300
                                              relative
                                              after:absolute
                                              after:left-1/2
                                              after:-bottom-1
                                              after:h-[1px]
                                              after:w-0
                                              after:bg-cyan-600
                                              dark:after:bg-cyan-400
                                              after:transition-all
                                              after:duration-300
                                              after:-translate-x-1/2
                                              hover:after:w-full w-fit mx-auto" onClick={() => setMenuOpen(false)}>CONTACTO</Link>

              <a
                href="/Gregorio-Mesa-CV.pdf"
                download
                className="w-[40%] bg-cyan-600 dark:bg-blue-600 text-center px-5 py-3 mx-auto rounded-lg font-medium hover:bg-cyan-500 dark:hover:bg-blue-400 transition-colors"
              >
                Descargar CV
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Banner Section */}
      <section className="flex flex-col relative min-h-[800px] text-white pt-40 pb-28">
        
        {/* Partículas */}
        <div className="absolute inset-0 pointer-events-none">
          <span className={`${darkMode ? "particle3" : "particle3Light"} particle-1`}></span>
          <span className={`${darkMode ? "particle2" : "particle2Light"} particle-2`}></span>
          <span className={`${darkMode ? "particle" : "particleLight"} particle-3`}></span>
          <span className={`${darkMode ? "particle2" : "particle2Light"} particle-4`}></span>
          <span className={`${darkMode ? "particle" : "particleLight"} particle-5`}></span>
          <span className={`${darkMode ? "particle3" : "particle3Light"} particle-6`}></span>
          <span className={`${darkMode ? "particle" : "particleLight"} particle-7`}></span>
          <span className={`${darkMode ? "particle2" : "particle2Light"} particle-8`}></span>
          <span className={`${darkMode ? "particle2" : "particle2Light"} particle-9`}></span>
          <span className={`${darkMode ? "particle" : "particleLight"} particle-10`}></span>
          <span className={`${darkMode ? "particle2" : "particle2Light"} particle-11`}></span>
          <span className={`${darkMode ? "particle" : "particleLight"} particle-12`}></span>
          <span className={`${darkMode ? "particle" : "particleLight"} particle-13`}></span>
          <span className={`${darkMode ? "particle" : "particleLight"} particle-14`}></span>
          <span className={`${darkMode ? "particle2" : "particle2Light"} particle-15`}></span>
          <span className={`${darkMode ? "particle" : "particleLight"} particle-16`}></span>
        </div>

        {/* Contenido */}
        <div className="lg:absolute lg:left-[5%] lg:top-1/2 lg:-translate-y-1/2
                        w-full lg:w-[55%] max-w-5xl mx-auto px-6 text-center">
          
          <span className="
            slide-in-left
            inline-flex
            items-center
            gap-3
            mb-6
            px-5
            py-2
            rounded-full
            bg-white/50
            dark:bg-white/10
            border
            border-cyan-600
            dark:border-white/20
            text-sm
            font-medium
            text-gray-600
            dark:text-gray-200
          ">
            
          <span className="
            w-2
            h-2
            rounded-full
            bg-cyan-600
            dark:bg-[#22D3EE]
            animate-[glow_2s_ease-in-out_infinite]
            shrink-0
          "></span>
            Disponible para nuevos proyectos
          </span>
          
          <h1 className="font-hero slide-in-left delay-1 font-semibold text-4xl lg:text-5xl mb-6 text-gray-700 dark:text-white">
            Gregorio José <span className="font-bold bg-gradient-to-r italic from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 bg-clip-text text-transparent">
                            Mesa Fernández
                          </span>
          </h1>
          <h3 className="slide-in-left delay-1 text-2xl lg:text-3xl font-bold mb-6 text-gray-700 dark:text-white">
            Desarrollador Web <span className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 bg-clip-text text-transparent">
                                Full Stack
                              </span>
          </h3>
        
          <p className="slide-in-left font-texto delay-2 max-w-2xl mx-auto text-lg md:text-2xl text-slate-600 dark:text-blue-100 mb-10 leading-relaxed">
            Enfocado en el desarrollo de software, el aprendizaje continuo y la creación de soluciones digitales.
          </p>

          <div className="slide-in-left delay-3 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#proyectos"
              className="bg-violet-600 text-white font-semibold px-8 py-4 rounded-2xl hover:bg-violet-500 hover:text-white transition-all text-lg shadow-lg"
            >
              Ver proyectos
            </Link>

            <Link 
              href="https://github.com/gregoriomesafernandez-star"
              target="_blank"
              className="border-2 border-cyan-600 text-cyan-600 dark:border-cyan-500 
                       dark:text-cyan-600 font-semibold px-8 py-4 rounded-2xl hover:bg-cyan-500  dark:hover:bg-cyan-500 
                       hover:text-gray-700 dark:hover:text-gray-700 transition-all text-lg"
            >
              GitHub
            </Link>

            <Link 
              href="#contacto"
              className="border-2 border-slate-700 text-slate-700 dark:border-white dark:text-white font-semibold 
                         px-8 py-4 rounded-2xl hover:bg-slate-700 dark:hover:bg-white hover:text-gray-200 dark:hover:text-gray-600 transition-all text-lg"
            >
              Hablemos
            </Link>
            
          </div>

        </div>

        {/* Foto */}
        <div className="z-10 mx-auto
                        mt-20
                        mb-12
                        lg:mt-10
                        lg:absolute
                        lg:right-[10%]
                        lg:top-1/2
                        lg:-translate-y-1/2
                        w-fit">
          <div className="
            w-56 h-56   
            sm:w-72 sm:h-72
            lg:w-80 lg:h-80
            xl:w-[368px] xl:h-[368px]
            rounded-full
            p-1
            bg-gradient-to-br 
            from-blue-300 to-cyan-600
            dark:from-blue-500 dark:via-violet-500 dark:to-cyan-400
            animate-[imgHero2_2s_ease-in-out_infinite]
            dark:animate-[imgHero_2s_ease-in-out_infinite]
          ">
            <img
              src="/customers/gregorio.png"
              alt="Gregorio José Mesa Fernández"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>

      </section>

      {/* Sobre mí */}
      <section ref={sobreMiRef} id="sobre-mi" className="grid grid-cols-1 lg:grid-cols-2 items-center mb-12">
        
        {/* Texto sobre mi */}
        <div className={`${
                          isVisible
                            ? "animate-[SobreMiTop_3s_ease-in-out_forwards]"
                            : "opacity-0"
                        } font-texto min-w-0 max-w-4xl mx-auto px-4 py-6 sm:p-10`}>

          <h2 className="text-md font-semibold mb-8 ml-10 bg-gradient-to-r from-cyan-600 to-cyan-700 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent tracking-widest">SOBRE MÍ</h2>
          
          <div className="max-w-3xl text-lg text-center text-slate-700 dark:text-blue-100 leading-relaxed">

            <p className={`${isVisible
                              ? "animate-[SobreMiTop_0.6s_ease-in-out_0.2s_both]"
                              : "opacity-0"
                          }`}>
              Soy desarrollador web apasionado por crear aplicaciones funcionales y atractivas. Me gusta aprender nuevas 
              tecnologías y aplicarlas en proyectos reales, desarrollando soluciones completas tanto en frontend como en backend.
            </p>
            
            <p className={`${isVisible
                              ? "animate-[SobreMiTop_0.6s_ease-in-out_0.4s_both]"
                              : "opacity-0"
                          } mt-10`} >
              Cuento con formación en Desarrollo de Aplicaciones Web (DAW) y Administración de Sistemas Informáticos en Red (ASIR). 
              Tras varios años de experiencia en otros sectores, he decidido enfocar mi carrera en el desarrollo de software, una disciplina que he estudiado y practicado de forma constante mediante proyectos propios.
            </p>

            <p className={`${isVisible
                              ? "animate-[SobreMiTop_0.6s_ease-in-out_0.6s_both]"
                              : "opacity-0"
                          } mt-10`} > 
              A través de mis proyectos he adquirido experiencia práctica en 
              <span className="font-semibold text-blue-600"> Laravel</span>, 
              <span className="font-semibold text-blue-600"> Symfony</span>, 
              <span className="font-semibold text-blue-600"> Angular</span>, 
              <span className="font-semibold text-blue-600"> PHP</span>,
              <span className="font-semibold text-blue-600"> Node.js</span>,
              <span className="font-semibold text-blue-600"> MySQL </span>
              y <span className="font-semibold text-blue-600">MongoDB</span>, desarrollando 
              aplicaciones web, APIs REST, sistemas de autenticación y bases de datos.
              Actualmente continúo ampliando mis conocimientos y manteniéndome al día con las tecnologías modernas de desarrollo web.
            </p>

          </div>
        </div>

        {/* Codigo developer */}
        <div className={`${isVisible
                          ? "animate-[SobreMiRight_0.8s_ease-out_1.3s_both]"
                          : "opacity-0"
                        } mx-auto lg:w-full min-w-0 max-w-2xl lg:ml-auto lg:mr-6 overflow-hidden rounded-2xl border border-cyan-400 dark:border-cyan-400/20 bg-cyan-950/80 dark:bg-slate-950/60 p-4 sm:p-6 shadow-lg`}>

          <div className="flex gap-2 mb-5">
            <span className="w-3 h-3 rounded-full bg-red-400"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span className="w-3 h-3 rounded-full bg-green-400"></span>
          </div>

          <pre className="max-w-full whitespace-pre-wrap break-words text-xs sm:text-sm md:text-base font-mono">
            <code>
              <span className="text-purple-400">const</span>{" "}
              <span className="text-cyan-300">developer</span>{" "}
              = {"{"}
              {"\n"}
              {"  "}name: <span className="text-green-400">"Gregorio José"</span>,
              {"\n"}
              {"  "}surname: <span className="text-green-400">"Mesa Fernández"</span>,
              {"\n"}
              {"  "}role: <span className="text-green-400">"Full Stack"</span>,
              {"\n"}
              {"  "}focus: [
              <span className="text-green-400">"Frontend"</span>,{" "}
              <span className="text-green-400">"Backend"</span>,{" "}
              <span className="text-green-400">"APIs"</span>,{" "}
              <span className="text-green-400">"Databases"</span>
              ],
              {"\n"}
              {"  "}learning: <span className="text-orange-400">true</span>
              {"\n"}
              {"}"};
            </code>
          </pre>

        </div>
      </section>

      {/* Habilidades */}
      <section id="habilidades" className="py-2 mb-48">
        <div className="max-w-6xl mx-auto px-4">

          <h2 className="text-md font-semibold mb-12 mt-16 bg-gradient-to-r from-cyan-600 to-cyan-700 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent tracking-widest">
            HABILIDADES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch gap-6">

            {/* Frontend */}
            <div
              className="skill-card"
              style={{
                "--skill-background": darkMode  
                  ? "rgba(15, 23, 42, 0.35)" 
                  : "#F4F2EC",
                "--skill-color": "#22d3ee",
                "--skill-glow": darkMode
                  ? "rgba(34, 211, 238, 0.35)"
                  : "rgba(34, 211, 238, 0.10)",
              } as React.CSSProperties}
            >
              <h3 className="skill-title text-2xl font-bold mb-6 text-cyan-600 dark:text-cyan-300">
                Frontend
              </h3>

              <div className="flex flex-wrap gap-2">
                {[
                  "JavaScript",
                  "TypeScript",
                  "Angular",
                  "Next.js",
                  "React",
                  "Vue.js",
                  "Tailwind CSS",
                  "Bootstrap",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="skill-chip text-cyan-800 dark:text-cyan-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div
              className="skill-card"
              style={{
                "--skill-background": darkMode  
                  ? "rgba(15, 23, 42, 0.35)" 
                  : "#F4F2EC",
                "--skill-color": "#a78bfa",
                "--skill-glow": darkMode
                  ? "rgba(167, 139, 250, 0.35)"
                  : "rgba(167, 139, 250, 0.10)",
              } as React.CSSProperties}
            >
              <h3 className="skill-title text-2xl font-bold mb-6 text-violet-600 dark:text-violet-300">
                Backend
              </h3>

              <div className="flex flex-wrap gap-2">
                {[
                  "PHP",
                  "Laravel",
                  "Symfony",
                  "Node.js",
                  "Express.js",
                  "Python",
                  "Django",
                  "Flask",
                  "REST API",
                  "JWT",
                  "MySQL",
                  "MongoDB",
                  "Mongoose",
                  "SQLite",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="skill-chip text-violet-800 dark:text-violet-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Herramientas */}
            <div
              className="skill-card"
              style={{
                "--skill-background": darkMode  
                  ? "rgba(15, 23, 42, 0.35)" 
                  : "#F4F2EC",
                "--skill-color": "#f97316",
                "--skill-glow": darkMode
                  ? "rgba(249, 115, 22, 0.30)"
                  : "rgba(249, 115, 22, 0.08)",
              } as React.CSSProperties}
            >
              <h3 className="skill-title text-2xl font-bold mb-6 text-orange-500 dark:text-orange-300">
                Herramientas
              </h3>

              <div className="flex flex-wrap gap-2">
                {["Git", "GitHub", "VS Code", "Postman"].map((skill) => (
                  <span
                    key={skill}
                    className="skill-chip text-orange-800 dark:text-orange-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section id="proyectos" className="mb-20 scroll-mt-12">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-md font-semibold mb-12 mt-16 bg-gradient-to-r from-cyan-600 to-cyan-700 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent tracking-widest">
            PROYECTOS
          </h2>

          <ProjectsShowcase
            projects={[
              {
                title: "Red Social con Symfony",
                description:
                  "Plataforma de red social desarrollada con Symfony que incluye autenticación de usuarios, publicaciones, likes, seguidores, mensajes privados y sistema de notificaciones.",
                image: "/projects/social-network-mockup.png",
                technologies: [
                  "Symfony 7",
                  "PHP",
                  "MySQL",
                  "Twig",
                  "Bootstrap",
                  "jQuery / AJAX",
                  "CSS",
                ],
                github: "https://github.com/gregoriomesafernandez-star/social-network-symfony.git",
                demo: "https://darkgray-woodpecker-887417.hostingersite.com/",
                reverse: false,
              },
              {
                title: "Plataforma de Vídeos con Laravel",
                description: "Plataforma de vídeos desarrollada con Laravel que incluye subida de vídeos, miniaturas, comentarios, búsqueda, canales de usuario y reproducción multimedia.",
                image: "/projects/videos-laravel-mockup.png",
                technologies: [
                  "Laravel",
                  "PHP",
                  "MySQL",
                  "Blade",
                  "Breeze",
                  "Tailwind CSS",
                  "Alpine.js",
                ],
                github: "https://github.com/gregoriomesafernandez-star/videos-laravel.git",
                reverse: true,
              },
              {
                title: "Plataforma de Música (Angular + Node.js)",
                description:
                  "Aplicación web de gestión y reproducción musical con Angular y Node.js. Permite administrar artistas, álbumes y canciones, con autenticación JWT, control de acceso por roles y subida de imágenes y audio. Utiliza una arquitectura frontend/backend separada, una API REST y MongoDB.",
                image: "/projects/mockup-playmusic.png",
                technologies: [
                  "Angular 21",
                  "TypeScript",
                  "Tailwind CSS 4",
                  "Node.js",
                  "Express",
                  "MongoDB",
                  "Mongoose",
                  "JWT",
                  "REST API",
                  "Multer",
                ],
                githubFrontend: "https://github.com/gregoriomesafernandez-star/musicfy-frontend",
                githubBackend: "https://github.com/gregoriomesafernandez-star/musicfy-backend",
                reverse: false,
              },
              { 
                title: "PsicoCMS – Sistema de Gestión para Psicólogos", 
                description: "Sistema de gestión para profesionales de la psicología que incluye un panel de administración para gestionar pacientes, citas, calendario y contenidos, junto con una web pública personalizable para presentar servicios profesionales y facilitar el contacto con pacientes.", 
                image: "/projects/mockup-psicocms.png", 
                technologies: ["PHP","Laravel","MySQL","Blade","HTML5","CSS3","JavaScript"],
                github: "https://github.com/gregoriomesafernandez-star/PsicoCMS.git",
                reverse: false, 
              },
              {
                title: "Sistema de Gestión de Vehículos",
                description:
                  "Aplicación web desarrollada con Angular y Laravel que permite gestionar vehículos mediante una arquitectura frontend/backend separada. Incluye autenticación JWT, operaciones CRUD, formularios reactivos y comunicación con una API REST para la gestión de vehículos.",
                image: "/projects/cars-angular-laravel-mockup.png",
                technologies: [
                  "Angular 21",
                  "TypeScript",
                  "RxJS",
                  "Tailwind CSS",
                  "Laravel 12",
                  "PHP",
                  "MySQL",
                  "JWT",
                  "REST API",
                  "Eloquent ORM",
                ],
                githubFrontend: "https://github.com/gregoriomesafernandez-star/cars-angular",
                githubBackend: "https://github.com/gregoriomesafernandez-star/cars-api-laravel",
                reverse: true,
              },
              {
                title: "API de Gestión de Proyectos",
                description:
                  "API REST desarrollada con Node.js, Express y MongoDB que incluye operaciones CRUD, gestión de imágenes con Multer y almacenamiento de datos con Mongoose.",
                image: "/projects/node-mongo-mockup.png",
                technologies: [
                  "Node.js",
                  "Express",
                  "MongoDB",
                  "Mongoose",
                  "Multer",
                  "REST API",
                ],
                github: "https://github.com/gregoriomesafernandez-star/projects-api-node-mongodb",
                reverse: false,
              },
            ]}
          />
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="w-full min-w-0 overflow-x-clip pb-24 bg-[#f2f2f0] dark:bg-[#13203e] text-white mt-24">
        <div className="w-full min-w-0 max-w-6xl mx-auto px-3 sm:px-6 pt-12">

          {/* Título */}
          <div className="mb-16">

            <h2 className="text-md font-semibold tracking-widest mb-4 bg-gradient-to-r from-cyan-600 to-cyan-700 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              CONTACTO
            </h2>

            <p className="text-xl text-center text-slate-700 dark:text-slate-300">
              ¿Tienes una oportunidad laboral o un proyecto?
              Estaré encantado de hablar contigo.
            </p>

            <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-5 rounded-full" />

          </div>

          <div className="grid min-w-0 grid-cols-1 lg:grid-cols-2 items-stretch gap-6 lg:gap-10">
 
            {/* FORMULARIO */}
            <form
              action="https://formspree.io/f/xnjyybkz"
              method="POST"
              className="min-w-0 max-w-full box-border bg-[#d5d4d3] dark:bg-[#0B1629] p-4 sm:p-8 rounded-xl border border-blue-500/30 shadow-lg shadow-blue-500/5"
            >

              {/* Cabecera */}
              <div className="flex items-center gap-4 mb-6">

                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-400/20 dark:bg-blue-600/20">
                  <Mail
                    size={24}
                    className="text-cyan-600 dark:text-cyan-500"
                  />
                </div>

                <div className="text-slate-700 dark:text-white">
                  <h3 className="text-xl font-bold">
                    Envíame un mensaje
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Cuéntame sobre tu proyecto, una oportunidad o cualquier consulta.
                  </p>
                </div>

              </div>

              {/* Nombre + Email */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-800 dark:text-blue-400"
                  />

                  <input
                    type="text"
                    required
                    placeholder="Tu nombre"
                    name="name"
                    className="w-full pl-11 pr-4 py-4 rounded-xs bg-[#dedad1] dark:bg-[#081224] 
                               border border-gray-400 dark:border-blue-500/20 focus:outline-none 
                               focus:border-cyan-600 dark:focus:border-cyan-400 transition duration-500 text-white placeholder:text-slate-500"
                  />

                </div>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-800 dark:text-blue-400"
                  />

                  <input
                    type="email"
                    required
                    placeholder="tucorreo@gmail.com"
                    name="email"
                    className="w-full pl-11 pr-4 py-4 rounded-xs bg-[#dedad1] 
                             dark:bg-[#081224] border border-gray-400 dark:border-blue-500/20 
                             focus:outline-none focus:border-cyan-600 dark:focus:border-cyan-400 transition duration-500 text-white placeholder:text-slate-500"
                  />

                </div>

              </div>

              {/* Mensaje */}
              <div className="relative">

                <MessageSquare
                  size={18}
                  className="absolute left-4 top-5 text-blue-800 dark:text-blue-400"
                />

                <textarea
                  rows={6}
                  required
                  placeholder="Cuéntame sobre tu proyecto..."
                  name="message"
                  className="w-full pl-11 pr-4 py-4 rounded-xs bg-[#dedad1] 
                           dark:bg-[#081224] border border-gray-400 dark:border-blue-500/20 
                           focus:outline-none focus:border-cyan-600 dark:focus:border-cyan-400 resize-none transition duration-500 text-white placeholder:text-slate-500"
                />

              </div>

              {/* Botón */}
              <button
                type="submit"
                className="w-full mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-600 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-lg hover:shadow-blue-500/25"
              >
                <Send size={19} />
                Enviar mensaje
              </button>

            </form>

            {/* INFORMACIÓN */}
            <div className="bg-[#d5d4d3] dark:bg-[#0B1629] p-8 rounded-xl border border-blue-500/30 shadow-lg shadow-blue-500/5">

              <h3 className="text-2xl text-slate-700 dark:text-white font-bold mb-3">
                Información de contacto
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 mb-8">
                También puedes contactarme por estos medios:
              </p>

              <div className="space-y-8">

                {/* EMAIL */}
                <div className="flex items-center gap-4">

                  <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-500/20">
                    <Mail
                      size={20}
                      className="text-cyan-600 dark:text-cyan-500"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-cyan-600 dark:text-blue-400 font-semibold text-sm">
                      Email
                    </p>

                    <a
                      href="mailto:gregorio.mesafernandez@gmail.com"
                      className="break-all text-slate-700 dark:text-slate-300 hover:text-slate-500 dark:hover:text-slate-500 transition"
                    >
                      gregorio.mesafernandez@gmail.com
                    </a>
                  </div>

                </div>

                {/* GITHUB */}
                <div className="flex items-center gap-4">

                  <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-500/20">
                    <FaGithub size={20}
                              className="text-cyan-600 dark:text-cyan-500"
                    />
                    
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-cyan-600 dark:text-blue-400 font-semibold text-sm">
                      GitHub
                    </p>

                    <a
                      href="https://github.com/gregoriomesafernandez-star"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all text-slate-700 dark:text-slate-300 hover:text-slate-500 dark:hover:text-slate-500 transition"
                    >
                      github.com/gregoriomesafernandez-star
                    </a>
                  </div>

                </div>

                {/* LINKEDIN */}
                <div className="flex items-center gap-4">

                  <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-500/20">
                    <FaLinkedin 
                      size={20} 
                      className="text-cyan-600 dark:text-cyan-500" 
                    />
                  </div>
                    
                  <div className="min-w-0 flex-1">
                    <p className="text-cyan-600 dark:text-blue-400 font-semibold text-sm">
                      LinkedIn
                    </p>

                    <a
                      href="https://www.linkedin.com/in/gregorio-mesa-fernandez/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all text-slate-700 dark:text-slate-300 hover:text-slate-500 dark:hover:text-slate-500 transition"
                    >
                      linkedin.com/in/gregorio-mesa-fernandez/
                    </a>
                  </div>

                </div>

                {/* UBICACIÓN */}
                <div className="flex items-center gap-4">

                  <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-500/20">
                    <MapPin
                      size={20}
                      className="text-cyan-600 dark:text-cyan-500"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-cyan-600 dark:text-blue-400 font-semibold text-sm">
                      Ubicación
                    </p>

                    <p className="break-all text-slate-700 dark:text-slate-300 hover:text-slate-500 dark:hover:text-slate-500">
                      Tenerife, Islas Canarias, España
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="dark:bg-slate-950 dark:text-slate-400 border-t border-slate-300 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-5">

          <div className="flex flex-col md:flex-row md:justify-between items-center gap-6">

            {/* Logo / Nombre */}
            <div>
              <h3 className="text-3xl font-bold dark:text-white">
                Gregorio<span className="text-cyan-600 dark:text-blue-500">Dev</span>
              </h3>
            </div>

            {/* Copyright */}
            <p className="text-center text-sm">
              © {new Date().getFullYear()} Gregorio José Mesa Fernández.
              Todos los derechos reservados.
            </p>


          </div>

        </div>
      </footer>

    </main>
  );
}