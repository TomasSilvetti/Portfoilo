import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminAuth from '../components/AdminAuth';
import { addProject, getProjects, updateProject, deleteProject, reorderProjects } from '../utils/projectManager';
import { Project } from '../types';

const NewProject: React.FC = () => {
  const navigate = useNavigate();
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    type: 'web' as Project['type'],
    status: 'in-progress' as Project['status'],
    client: '',
    duration: '',
    imageUrl: '',
    projectUrl: '',
    imagePreviewUrl: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Cargar proyectos al montar el componente
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const loadedProjects = getProjects();
    setProjects(loadedProjects);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convertir technologies de string a array
    const technologiesArray = formData.technologies
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech.length > 0);

    const projectData: Omit<Project, 'id'> = {
      title: formData.title,
      description: formData.description,
      technologies: technologiesArray,
      type: formData.type,
      status: formData.status,
      client: formData.client || undefined,
      duration: formData.duration || undefined,
      imageUrl: formData.imageUrl,
      projectUrl: formData.projectUrl,
      imagePreviewUrl: formData.imagePreviewUrl || formData.imageUrl,
    };

    const success = addProject(projectData);
    
    if (success) {
      setSuccessMessage('Proyecto agregado exitosamente');
      setShowSuccess(true);
      setShowError(false);
      
      // Limpiar formulario
      setFormData({
        title: '',
        description: '',
        technologies: '',
        type: 'web',
        status: 'in-progress',
        client: '',
        duration: '',
        imageUrl: '',
        projectUrl: '',
        imagePreviewUrl: '',
      });

      // Recargar proyectos
      loadProjects();

      // Ocultar mensaje después de 3 segundos
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } else {
      setShowError(true);
      setShowSuccess(false);
      
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  const handleReorder = (projectId: string, direction: 'up' | 'down') => {
    const success = reorderProjects(projectId, direction);
    if (success) {
      loadProjects();
    }
  };

  const handleEditClick = (project: Project) => {
    setEditingProject(project);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    const success = updateProject(editingProject.id, editingProject);
    
    if (success) {
      setSuccessMessage('Proyecto actualizado exitosamente');
      setShowSuccess(true);
      setShowError(false);
      setIsEditModalOpen(false);
      setEditingProject(null);
      loadProjects();

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } else {
      setShowError(true);
      setShowSuccess(false);
      
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!editingProject) return;
    
    const { name, value } = e.target;
    setEditingProject(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleDeleteClick = (projectId: string) => {
    setDeleteConfirmId(projectId);
  };

  const handleDeleteConfirm = (projectId: string) => {
    const success = deleteProject(projectId);
    
    if (success) {
      setSuccessMessage('Proyecto eliminado exitosamente');
      setShowSuccess(true);
      setShowError(false);
      setDeleteConfirmId(null);
      loadProjects();

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } else {
      setShowError(true);
      setShowSuccess(false);
      
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmId(null);
  };

  return (
    <AdminAuth>
      <div className="min-h-screen bg-[#0a192f] py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors mb-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al Portfolio
            </button>
            
            <h1 className="text-4xl font-bold text-white mb-3">
              Gestión de <span className="text-indigo-400">Proyectos</span>
            </h1>
            <p className="text-gray-400">
              Administra, ordena y edita los proyectos de tu portfolio
            </p>
          </div>

          {/* Mensajes de éxito/error */}
          {showSuccess && (
            <div className="mb-6 bg-green-500/10 border border-green-500/50 rounded-lg p-4">
              <p className="text-green-400 text-center font-semibold">
                ✓ {successMessage}
              </p>
            </div>
          )}

          {showError && (
            <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-4">
              <p className="text-red-400 text-center font-semibold">
                ✗ Error al procesar la operación. Intenta nuevamente.
              </p>
            </div>
          )}

          {/* Lista de Proyectos Existentes */}
          {projects.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">
                Proyectos Existentes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="bg-[#112240] rounded-xl shadow-xl border border-indigo-500/30 overflow-hidden"
                  >
                    {/* Imagen del proyecto */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23112240" width="400" height="300"/%3E%3Ctext fill="%23666" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImagen no disponible%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </div>

                    {/* Contenido */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tecnologías */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-indigo-600/50 text-white rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-gray-600/50 text-white rounded text-xs">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Controles */}
                      <div className="flex gap-2">
                        {/* Botones de ordenamiento */}
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleReorder(project.id, 'up')}
                            disabled={index === 0}
                            className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            title="Mover arriba"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleReorder(project.id, 'down')}
                            disabled={index === projects.length - 1}
                            className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            title="Mover abajo"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>

                        {/* Botón Editar */}
                        <button
                          onClick={() => handleEditClick(project)}
                          className="flex-1 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors font-medium text-sm"
                        >
                          Editar
                        </button>

                        {/* Botón Eliminar */}
                        {deleteConfirmId === project.id ? (
                          <div className="flex gap-1 flex-1">
                            <button
                              onClick={() => handleDeleteConfirm(project.id)}
                              className="flex-1 p-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors text-xs font-medium"
                            >
                              Confirmar
                            </button>
                            <button
                              onClick={handleDeleteCancel}
                              className="flex-1 p-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors text-xs font-medium"
                            >
                              Cancelar
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleDeleteClick(project.id)}
                            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                            title="Eliminar"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Formulario para Agregar Nuevo Proyecto */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              Agregar Nuevo Proyecto
            </h2>
            <form onSubmit={handleSubmit} className="bg-[#112240] rounded-2xl shadow-2xl border border-indigo-500/30 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Título */}
                <div className="md:col-span-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                    Título del Proyecto <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0a192f] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    placeholder="Ej: Sistema de Gestión de Documentos"
                    required
                  />
                </div>

                {/* Descripción */}
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                    Descripción <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-[#0a192f] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
                    placeholder="Describe el proyecto..."
                    required
                  />
                </div>

                {/* Tecnologías */}
                <div className="md:col-span-2">
                  <label htmlFor="technologies" className="block text-sm font-medium text-gray-300 mb-2">
                    Tecnologías <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="technologies"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0a192f] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    placeholder="React, Node.js, PostgreSQL (separadas por comas)"
                    required
                  />
                  <p className="text-gray-500 text-xs mt-1">Separa las tecnologías con comas</p>
                </div>

                {/* Tipo */}
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">
                    Tipo de Proyecto <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0a192f] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    required
                  >
                    <option value="web">Web</option>
                    <option value="system">Sistema</option>
                    <option value="ai-tool">Herramienta IA</option>
                  </select>
                </div>

                {/* Estado */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
                    Estado <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0a192f] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    required
                  >
                    <option value="completed">Completado</option>
                    <option value="in-progress">En Progreso</option>
                    <option value="demo">Demo</option>
                  </select>
                </div>

                {/* Cliente */}
                <div>
                  <label htmlFor="client" className="block text-sm font-medium text-gray-300 mb-2">
                    Cliente
                  </label>
                  <input
                    type="text"
                    id="client"
                    name="client"
                    value={formData.client}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0a192f] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    placeholder="Nombre del cliente"
                  />
                </div>

                {/* Duración */}
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-2">
                    Duración
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0a192f] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    placeholder="Ej: 3 meses"
                  />
                </div>

                {/* URL de la imagen */}
                <div className="md:col-span-2">
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-2">
                    URL de la Imagen <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0a192f] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    placeholder="/images/proyecto.png o https://..."
                    required
                  />
                </div>

                {/* URL del proyecto */}
                <div className="md:col-span-2">
                  <label htmlFor="projectUrl" className="block text-sm font-medium text-gray-300 mb-2">
                    URL del Proyecto <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="projectUrl"
                    name="projectUrl"
                    value={formData.projectUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0a192f] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    placeholder="https://proyecto.com"
                    required
                  />
                </div>

                {/* Vista previa de imagen */}
                {formData.imageUrl && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Vista Previa de la Imagen
                    </label>
                    <div className="bg-[#0a192f] border border-gray-600 rounded-lg p-4">
                      <img
                        src={formData.imageUrl}
                        alt="Vista previa"
                        className="w-full h-64 object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23112240" width="400" height="300"/%3E%3Ctext fill="%23666" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImagen no disponible%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Botones */}
              <div className="flex gap-4 mt-8">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/50"
                >
                  Guardar Proyecto
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors duration-300"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal de Edición */}
      {isEditModalOpen && editingProject && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6 overflow-y-auto">
          <div className="bg-[#112240] rounded-2xl shadow-2xl border border-indigo-500/30 p-8 max-w-4xl w-full my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                Editar Proyecto
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleEditSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Título */}
                <div className="md:col-span-2">
                  <label htmlFor="edit-title" className="block text-sm font-medium text-gray-300 mb-2">
                    Título del Proyecto <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="edit-title"
                    name="title"
                    value={editingProject.title}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 bg-[#0a192f] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    required
                  />
                </div>

                {/* Descripción */}
                <div className="md:col-span-2">
                  <label htmlFor="edit-description" className="block text-sm font-medium text-gray-300 mb-2">
                    Descripción <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="edit-description"
                    name="description"
                    value={editingProject.description}
                    onChange={handleEditChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-[#0a192f] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
                    required
                  />
                </div>

                {/* Tecnologías */}
                <div className="md:col-span-2">
                  <label htmlFor="edit-technologies" className="block text-sm font-medium text-gray-300 mb-2">
                    Tecnologías <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="edit-technologies"
                    name="technologies"
                    value={Array.isArray(editingProject.technologies) ? editingProject.technologies.join(', ') : editingProject.technologies}
                    onChange={(e) => {
                      const technologiesArray = e.target.value
                        .split(',')
                        .map(tech => tech.trim())
                        .filter(tech => tech.length > 0);
                      setEditingProject(prev => prev ? { ...prev, technologies: technologiesArray } : null);
                    }}
                    className="w-full px-4 py-3 bg-[#0a192f] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    placeholder="React, Node.js, PostgreSQL (separadas por comas)"
                    required
                  />
                  <p className="text-gray-500 text-xs mt-1">Separa las tecnologías con comas</p>
                </div>

                {/* Tipo */}
                <div>
                  <label htmlFor="edit-type" className="block text-sm font-medium text-gray-300 mb-2">
                    Tipo de Proyecto <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="edit-type"
                    name="type"
                    value={editingProject.type}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 bg-[#0a192f] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    required
                  >
                    <option value="web">Web</option>
                    <option value="system">Sistema</option>
                    <option value="ai-tool">Herramienta IA</option>
                  </select>
                </div>

                {/* Estado */}
                <div>
                  <label htmlFor="edit-status" className="block text-sm font-medium text-gray-300 mb-2">
                    Estado <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="edit-status"
                    name="status"
                    value={editingProject.status}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 bg-[#0a192f] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    required
                  >
                    <option value="completed">Completado</option>
                    <option value="in-progress">En Progreso</option>
                    <option value="demo">Demo</option>
                  </select>
                </div>

                {/* Cliente */}
                <div>
                  <label htmlFor="edit-client" className="block text-sm font-medium text-gray-300 mb-2">
                    Cliente
                  </label>
                  <input
                    type="text"
                    id="edit-client"
                    name="client"
                    value={editingProject.client || ''}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 bg-[#0a192f] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    placeholder="Nombre del cliente"
                  />
                </div>

                {/* Duración */}
                <div>
                  <label htmlFor="edit-duration" className="block text-sm font-medium text-gray-300 mb-2">
                    Duración
                  </label>
                  <input
                    type="text"
                    id="edit-duration"
                    name="duration"
                    value={editingProject.duration || ''}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 bg-[#0a192f] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    placeholder="Ej: 3 meses"
                  />
                </div>

                {/* URL de la imagen */}
                <div className="md:col-span-2">
                  <label htmlFor="edit-imageUrl" className="block text-sm font-medium text-gray-300 mb-2">
                    URL de la Imagen <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="edit-imageUrl"
                    name="imageUrl"
                    value={editingProject.imageUrl}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 bg-[#0a192f] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    placeholder="/images/proyecto.png o https://..."
                    required
                  />
                </div>

                {/* URL del proyecto */}
                <div className="md:col-span-2">
                  <label htmlFor="edit-projectUrl" className="block text-sm font-medium text-gray-300 mb-2">
                    URL del Proyecto <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="edit-projectUrl"
                    name="projectUrl"
                    value={editingProject.projectUrl}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 bg-[#0a192f] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    placeholder="https://proyecto.com"
                    required
                  />
                </div>

                {/* Vista previa de imagen */}
                {editingProject.imageUrl && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Vista Previa de la Imagen
                    </label>
                    <div className="bg-[#0a192f] border border-gray-600 rounded-lg p-4">
                      <img
                        src={editingProject.imageUrl}
                        alt="Vista previa"
                        className="w-full h-64 object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23112240" width="400" height="300"/%3E%3Ctext fill="%23666" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImagen no disponible%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Botones del Modal */}
              <div className="flex gap-4 mt-8">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/50"
                >
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors duration-300"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminAuth>
  );
};

export default NewProject;
