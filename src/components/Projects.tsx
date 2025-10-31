import React, { useState } from 'react';
import { Project } from '../types';

const Projects: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);

  // Proyectos de ejemplo - estos vendrán de un CMS en el futuro
  const baseProjects: Project[] = [
    {
      id: '1',
      title: 'HCD Sistema de gestion de documentos',
      description: 'Plataforma de gestion de documentacion para el honorable concejo deliberante de Lules',
      technologies: ['React', 'Node.js', 'PostgreSQL'],
      type: 'web',
      status: 'completed',
      client: 'Honorable Concejo Deliberante de Lules',
      duration: '3 meses',
      imageUrl: '/images/HCDsys.png',
      projectUrl: 'https://hcdsys.netlify.app',
      imagePreviewUrl: '/images/HCDsys.png'
    },
    {
      id: '2',
      title: 'Sys Personal - Version de prueba',
      description: 'Sistema de gestion de personal: Control asistencia, desempeño, reportes',
      technologies: ['Next.js', 'Supabase'],
      type: 'web',
      status: 'completed',
      client: 'El puesto Supermercados',
      duration: '1 mes',
      imageUrl: '/images/SysPersonal.png',
      projectUrl: 'https://syspersonal.vercel.app',
      imagePreviewUrl: '/images/SysPersonal.png'
    },
    {
      id: '3',
      title: 'Supermercado El puesto - Version de prueba',
      description: 'E-commerce para supermercado El puesto',
      technologies: ['React + Vite', 'FastAPI', 'PostgreSQL'],
      type: 'web',
      status: 'in-progress',
      client: 'El puesto Supermercados',
      duration: '1 mes',
      imageUrl: '/images/supermercado.png',
      projectUrl: '',
      imagePreviewUrl: '/images/supermercado.png'
    },
    {
      id: '4',
      title: 'VibeTeacher',
      description: 'App para aprender a programar con Inteligencia artificial',
      technologies: ['Typescript', 'Inteligencia artificial'],
      type: 'web',
      status: 'in-progress',
      client: 'Proyecto Propio',
      duration: '1 mes - En curso',
      imageUrl: '/images/VibeTeacher.png',
      projectUrl: '',
      imagePreviewUrl: '/images/VibeTeacher.png'
    },
    {
      id: '5',
      title: 'Curso IA',
      description: 'Plataforma generadora de cursos educativos con inteligencia artificial',
      technologies: [ ' React + FastAPI', 'Docker',  'Inteligencia artificial'],
      type: 'web',
      status: 'completed',
      client: 'Reservado',
      duration: '2 meses',
      imageUrl: '/images/CursoIA.png',
      projectUrl: 'https://cursoai.netlify.app',
      imagePreviewUrl: '/images/CursoIA.png'
    },
  ];

  const projectsPerPage = 3;
  const totalProjects = baseProjects.length;
  const currentProjects = baseProjects.slice(
    startIndex,
    startIndex + projectsPerPage
  );

  const handleNextPage = () => {
    setStartIndex((prev) => (prev + 1) % totalProjects);
  };

  const handlePrevPage = () => {
    setStartIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  };

  return (
    <section id="projects" className="py-16 bg-[#112240]">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Nuestros <span className="text-indigo-400">Proyectos</span>
          </h2>
          <p className="text-base text-gray-300 max-w-3xl mx-auto">
            Aca puedes ver algunos proyectos de personas que confiaron en nostros. Algunos de ellos son muestras de prueba y algunas funcionalidades no estan disponibles para seguridad de nuestros clientes.
          </p>
        </div>

        {/* Projects Grid with Navigation */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute top-7 right-6 z-20 flex gap-3">
            <button
              onClick={handlePrevPage}
              className="p-3 rounded-full border-2 border-indigo-400 text-indigo-400 hover:border-white hover:text-white transition-all duration-300 hover:bg-white/10 backdrop-blur"
              aria-label="Página anterior"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNextPage}
              className="p-3 rounded-full border-2 border-indigo-400 text-indigo-400 hover:border-white hover:text-white transition-all duration-300 hover:bg-white/10 backdrop-blur"
              aria-label="Siguiente página"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Projects Grid - Horizontal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentProjects.map((project, index) => (
              <div
                key={project.id}
                className="project-card-horizontal group rounded-2xl overflow-hidden shadow-2xl border border-[#1e3a5f] hover:border-indigo-400 transition-all duration-300 hover:shadow-indigo-500/30 hover:shadow-2xl relative h-[450px] md:h-[400px]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background Image */}
                <div className="project-card-bg absolute inset-0 w-full h-full">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Dark Overlay Gradient */}
                <div className="project-overlay absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />

                {/* Content Container */}
                <div className="relative z-10 h-full flex flex-col justify-end p-5 md:p-6">
                  {/* URL del Proyecto */}
                  <p className="text-indigo-400 text-xs font-semibold mb-2 truncate">
                    {project.projectUrl}
                  </p>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 line-clamp-2">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-200 text-sm mb-3 md:mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4 md:mb-5">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-indigo-600/90 text-white rounded-full text-xs font-medium backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/50 w-full group-hover:bg-indigo-600"
                  >
                    Ver Proyecto
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Page Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalProjects }).map((_, index) => (
            <button
              key={index}
              onClick={() => setStartIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === startIndex
                  ? 'bg-indigo-500 w-8'
                  : 'bg-slate-600 w-2 hover:bg-slate-500'
              }`}
              aria-label={`Ir a página ${index + 1}`}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-base text-gray-300 mb-4">
            ¿Tienes un proyecto en mente? Podemos hacerlo realidad.
          </p>
          <a
            href="#contact"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 font-semibold text-base"
          >
            Iniciar Conversación
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;