import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="text-lg">&copy; {currentYear} Trees. Todos los derechos reservados.</p>
          <a href="https://storyset.com/business">Business illustrations by Storyset</a>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;