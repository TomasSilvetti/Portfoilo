import { Project } from '../types';
import projectsData from '../data/projects.json';

const STORAGE_KEY = 'portfolio_projects';

/**
 * Obtiene todos los proyectos desde localStorage o el archivo JSON por defecto
 * Los proyectos se devuelven ordenados por el campo 'order'
 */
export const getProjects = (): Project[] => {
  try {
    const storedProjects = localStorage.getItem(STORAGE_KEY);
    
    let projects: Project[];
    if (storedProjects) {
      projects = JSON.parse(storedProjects);
    } else {
      // Si no hay proyectos en localStorage, usar los del JSON
      projects = projectsData as Project[];
    }
    
    // Asignar orden si no existe
    projects = projects.map((project, index) => ({
      ...project,
      order: project.order !== undefined ? project.order : index
    }));
    
    // Ordenar por el campo 'order'
    return projects.sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    return projectsData as Project[];
  }
};

/**
 * Guarda todos los proyectos en localStorage
 */
export const saveProjects = (projects: Project[]): boolean => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    return true;
  } catch (error) {
    console.error('Error al guardar proyectos:', error);
    return false;
  }
};

/**
 * Agrega un nuevo proyecto
 */
export const addProject = (project: Omit<Project, 'id'>): boolean => {
  try {
    const projects = getProjects();
    
    // Generar un ID único basado en timestamp y random
    const newId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Asignar el siguiente número de orden
    const maxOrder = projects.reduce((max, p) => Math.max(max, p.order || 0), -1);
    
    const newProject: Project = {
      ...project,
      id: newId,
      order: maxOrder + 1,
    };
    
    const updatedProjects = [...projects, newProject];
    return saveProjects(updatedProjects);
  } catch (error) {
    console.error('Error al agregar proyecto:', error);
    return false;
  }
};

/**
 * Actualiza un proyecto existente
 */
export const updateProject = (id: string, updatedProject: Partial<Project>): boolean => {
  try {
    const projects = getProjects();
    const projectIndex = projects.findIndex(p => p.id === id);
    
    if (projectIndex === -1) {
      return false;
    }
    
    projects[projectIndex] = { ...projects[projectIndex], ...updatedProject };
    return saveProjects(projects);
  } catch (error) {
    console.error('Error al actualizar proyecto:', error);
    return false;
  }
};

/**
 * Elimina un proyecto
 */
export const deleteProject = (id: string): boolean => {
  try {
    const projects = getProjects();
    const filteredProjects = projects.filter(p => p.id !== id);
    return saveProjects(filteredProjects);
  } catch (error) {
    console.error('Error al eliminar proyecto:', error);
    return false;
  }
};

/**
 * Reinicia los proyectos a los valores por defecto del JSON
 */
export const resetProjects = (): boolean => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error al reiniciar proyectos:', error);
    return false;
  }
};

/**
 * Reordena un proyecto moviéndolo hacia arriba o abajo
 */
export const reorderProjects = (projectId: string, direction: 'up' | 'down'): boolean => {
  try {
    const projects = getProjects();
    const currentIndex = projects.findIndex(p => p.id === projectId);
    
    if (currentIndex === -1) {
      return false;
    }
    
    // No se puede mover hacia arriba si ya está primero
    if (direction === 'up' && currentIndex === 0) {
      return false;
    }
    
    // No se puede mover hacia abajo si ya está último
    if (direction === 'down' && currentIndex === projects.length - 1) {
      return false;
    }
    
    // Calcular el nuevo índice
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    // Intercambiar los proyectos
    const temp = projects[currentIndex];
    projects[currentIndex] = projects[newIndex];
    projects[newIndex] = temp;
    
    // Actualizar los valores de order
    const reorderedProjects = projects.map((project, index) => ({
      ...project,
      order: index
    }));
    
    return saveProjects(reorderedProjects);
  } catch (error) {
    console.error('Error al reordenar proyectos:', error);
    return false;
  }
};

