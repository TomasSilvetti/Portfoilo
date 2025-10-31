import React from 'react';
import { Service } from '../types';

const Services: React.FC = () => {
  const services: Service[] = [
    {
      id: '1',
      title: 'Desarrollo Web',
      description: 'Sitios web personalizados y aplicaciones web construidas con tecnologías modernas.',
      features: [
        'Paginas web modernas',
        'Diseño adaptable a celulares y tablets',
        'Posicionamiento en Buscadores',
        'Optimizado para visibilidad en google',
        'Servicio al cliente con IA'
      ],
      technologies: ['React', 'fastAPI', 'Tailwind CSS', 'Vite', 'postgreSQL', 'Typescript']
    },
    {
      id: '2',
      title: 'Desarrollo de Bots',
      description: 'Bots de automatización inteligentes para servicio al cliente, automatizado con inteligencia artifical',
      features: [
        'Bots de WhatsApp para negocios',
        'Servicio al cliente automatico con inteligencia artifical',
        'Conexion con sistemas existentes'
      ],
      technologies: ['Manejo simple por uno o ningun empleado', 'Servicio al cliente', 'whatsapp Business API', 'Inteligencia artificial']
    },
    {
      id: '3',
      title: 'Automatización de Procesos',
      description: 'Soluciones de automatización personalizadas para eliminar tareas repetitivas.',
      features: [
        'Automatización de Flujos de Trabajo',
        'Procesamiento de Datos',
        'Automatizacion con inteligencia artifical',
        'Programación de Tareas',
        'Conexion con sistemas existentes'
      ],
      technologies: ['Diagnostico de procesos', 'Propuesta de mejora', 'Automatizazion parcial y compelta']
    },
    {
      id: '4',
      title: 'Consultoría Técnica',
      description: 'Orientación experta en decisiones tecnológicas,  arquitectura de software e integracion de inteligencia artifical.',
      features: [
        'Evaluación Tecnológica',
        'Diseño de Arquitectura',
        'Optimización de Rendimiento',
        'Herramientas con Inteligencia Artificial'
      ],
      technologies: ['Análisis', 'Diseño', 'Arquitectura', 'Consultoría']
    },
    {
      id: '5',
      title: 'Software Personalizado',
      description: 'Soluciones de software diseñadas específicamente para los requisitos de tu negocio.',
      features: [
        'Lógica Personalizada',
        'Arquitectura Escalable',
        'Listo para Integración',
        'Soporte de Mantenimiento'
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker','fastAPI']
    },
    {
      id: '6',
      title: 'Soluciones de E-commerce',
      description: 'Tiendas en línea completas con procesamiento de pagos y gestión de inventario.',
      features: [
        'Integración de Pagos',
        'Gestión de Inventario',
        'Análisis de Clientes',
        'Reportes personalizados',
        'Optimizado para Móviles'
      ],
      technologies: ['Pagos con tarjetas', 'Analisis de ventas', 'Manejo de inventario', 'Optimizacion con inteligencia artificial']
    }
  ];

  return (
    <section id="services" className="py-20 bg-[#0a192f] relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-4 flex items-center justify-center flex-col gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10">
            <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span className="text-sm font-semibold text-indigo-400">Nuestra Experiencia</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Soluciones Digitales <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Integrales</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Si lo podes explicar, lo podemos hacer. No te gusto como quedo? Lo arreglamos.
          </p>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Nuestra prioridad es que te sientas satisfecho con el resultado.
          </p>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Estas son las herramientas que podemos ofrecerte.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-[#112240]/50 backdrop-blur-sm border border-[#1e3a5f] rounded-xl p-6 hover:border-indigo-400 hover:ring-2 hover:ring-indigo-400 transition-all duration-300 hover:-translate-y-2 hover:bg-[#112240]"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Service Icon */}
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:from-indigo-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                <svg className="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {service.id === '1' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  )}
                  {service.id === '2' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  )}
                  {service.id === '3' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  )}
                  {service.id === '4' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  )}
                  {service.id === '5' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  )}
                  {service.id === '6' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  )}
                </svg>
              </div>

              {/* Service Content */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-4">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg className="w-4 h-4 text-indigo-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2.5 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-xs font-medium border border-indigo-500/20 group-hover:border-indigo-400 group-hover:bg-indigo-500/20 transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-300 mb-4">
            ¿Necesitas una solución personalizada?
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 font-semibold text-base shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Consultar Proyecto
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;