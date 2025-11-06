import React, { useState, useEffect } from 'react';

interface AdminAuthProps {
  children: React.ReactNode;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Contraseña hardcodeada - puede cambiarse aquí
  const ADMIN_PASSWORD = 'admin123';

  useEffect(() => {
    // Verificar si ya está autenticado en localStorage
    const authStatus = localStorage.getItem('adminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      setError('');
    } else {
      setError('Contraseña incorrecta');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
    setPassword('');
  };

  if (isAuthenticated) {
    return (
      <div>
        <div className="bg-[#112240] border-b border-indigo-500/30">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-white font-semibold">Panel de Administración</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300 text-sm"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a192f] flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="bg-[#112240] rounded-2xl shadow-2xl border border-indigo-500/30 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Acceso <span className="text-indigo-400">Administrativo</span>
            </h2>
            <p className="text-gray-400 text-sm">
              Ingresa la contraseña para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#0a192f] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/50"
            >
              Ingresar
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-xs">
              Contraseña por defecto: admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;

