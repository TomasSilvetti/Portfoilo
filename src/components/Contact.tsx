import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { ContactForm } from '../types';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectDescription: '',
    budget: '',
    timeline: ''
  });

  const [meetingData, setMeetingData] = useState({
    date: '',
    time: '',
    projectType: 'web'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMeetingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMeetingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Initialize EmailJS (only needs to be done once, but it's safe to call multiple times)
      emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '');

      // Prepare the email data
      const templateParams = {
        to_email: 'Silvetti.tomas7@gmail.com',
        from_email: formData.email,
        client_name: formData.name,
        client_phone: formData.phone || 'No proporcionado',
        client_company: formData.company || 'No especificada',
        project_description: formData.projectDescription,
        budget: formData.budget || 'No especificado',
        timeline: formData.timeline || 'No especificado',
        preferred_date: meetingData.date || 'No especificada',
        preferred_time: meetingData.time || 'No especificada',
        project_type: meetingData.projectType,
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID || '',
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '',
        templateParams
      );

      if (response.status === 200) {
        setSubmitMessage('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectDescription: '',
          budget: '',
          timeline: ''
        });
        setMeetingData({
          date: '',
          time: '',
          projectType: 'web'
        });
      } else {
        setSubmitMessage('Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitMessage('Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Obtener fecha mínima (hoy)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Generar horas disponibles (9:00 - 18:00)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      if (hour < 18) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
      }
    }
    return slots;
  };

  return (
    <section id="contact" className="py-16 bg-slate-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Inicia tu <span className="text-indigo-400">Proyecto</span>
          </h2>
          <p className="text-base text-gray-300 max-w-3xl mx-auto">
            Cuéntanos sobre tu idea y agenda una videollamada para discutir cómo podemos ayudarte
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">
                Información del Proyecto
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 text-sm bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-500"
                    placeholder="Tu nombre"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 text-sm bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-500"
                    placeholder="tu@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-500"
                    placeholder="+54 381 456 8900 (opcional)"
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-500"
                    placeholder="Nombre de tu empresa (opcional)"
                  />
                </div>

                {/* Project Description */}
                <div>
                  <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-300 mb-1">
                    Descripción del proyecto *
                  </label>
                  <textarea
                    id="projectDescription"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 text-sm bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none placeholder-gray-500"
                    placeholder="Describe tu proyecto, objetivos y cualquier detalle relevante..."
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Meeting Schedule */}
          <div>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">
                Agenda una Reunión
              </h3> 
              <label htmlFor="time" className="block text-sm font-medium text-gray-400 mb-3">
                    Te contactaremos por Email para confirmar la fecha y hora
                  </label>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Project Type */}
                

                {/* Date */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
                    Fecha preferida
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={meetingData.date}
                    onChange={handleMeetingChange}
                    min={getMinDate()}
                    className="w-full px-3 py-2 text-sm bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>

                {/* Time */}
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-1">
                    Hora preferida
                  </label>
                  <select
                    id="time"
                    name="time"
                    value={meetingData.time}
                    onChange={handleMeetingChange}
                    className="w-full px-3 py-2 text-sm bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  >
                    <option value="">Selecciona una hora</option>
                    {generateTimeSlots().map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                {/* Timezone Info */}
                <div className="bg-indigo-500/10 rounded-lg p-3 border border-indigo-500/20">
                  <div className="flex items-start">
                    <svg className="w-4 h-4 text-indigo-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-xs text-indigo-300 font-medium">Zona horaria</p>
                      <p className="text-xs text-indigo-200">Todos los horarios están en GMT-3 (Buenos Aires)</p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-600 transition-colors duration-300 font-semibold text-base"
                >
                  {isSubmitting ? 'Enviando...' : 'Agendar Reunión'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            
            
          </div>
        </div>

        {/* Submit Message */}
        {submitMessage && (
          <div className={`mt-6 p-3 rounded-lg text-center text-sm ${
            submitMessage.includes('Gracias')
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {submitMessage}
          </div>
        )}
      </div>
      
    </section>
    
  );
};

export default Contact;