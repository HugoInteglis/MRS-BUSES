import React, { useState } from 'react';
import { Lock, User, KeyRound, X, LogIn, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'Admin2026' && password.trim() === 'Admin2026') {
      setError('');
      setUsername('');
      setPassword('');
      onLoginSuccess();
    } else {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white bg-neutral-800/60 rounded-full transition-colors cursor-pointer"
          title="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 bg-amber-400/10 border border-amber-400/20 text-amber-400 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-white">Acceso Administrativo</h3>
          <p className="text-xs text-neutral-400">
            Ingresa tus credenciales de propietario para acceder al Generador Oficial de Cotizaciones MRS BUSES.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2.5 text-xs text-red-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
              Usuario
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
              Contraseña
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-amber-400 hover:bg-yellow-400 text-slate-950 font-black py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <LogIn className="w-4 h-4" />
            <span>Iniciar Sesión</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-neutral-800 text-center text-[11px] text-neutral-500">
          MRS BUSES BY BERAKAH • Módulo Privado de Gestión
        </div>
      </div>
    </div>
  );
};
