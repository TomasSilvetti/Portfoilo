import React from 'react';

const Hero: React.FC = () => {
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#1a365d] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Animated Background Circles */}
      <div className="absolute top-20 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="block">Soluciones</span>
              <span className="block">Digitales</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">
                Creativas
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
              Nos especializamos en ofrecer soluciones creativas a problemas empresariales tradicionales o específicos para hacer tus procesos más eficientes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleScrollToSection('services')}
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 text-base font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
              >
                Comenzar
              </button>
              <a
                href="#contact"
                className="px-8 py-4 bg-white/10 text-white border-2 border-white/30 rounded-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300 text-base font-semibold backdrop-blur-sm text-center"
              >
                Contacto
              </a>
            </div>
          </div>

          {/* Right Column - Illustration */}
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-md h-96 flex items-center justify-center">
              {/* Floating Background Circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
              
              {/* SVG Illustration */}
              <img 
  src="/images/business-plan-animate.svg" 
  alt="Ilustración de plan de negocios"
  className="w-full h-full relative z-10 drop-shadow-2xl object-contain"
/>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <a
          href="#services"
          className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
          aria-label="Scroll down"
        >
          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;