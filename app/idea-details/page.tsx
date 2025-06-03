"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import ApplicationForm from '@/components/ApplicationForm';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';
import { Clock, Users, DollarSign, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Idea } from '@/types';

export default function IdeaDetailPage() {
  const searchParams = useSearchParams();
  const ideaId = searchParams.get('id');
  const { user } = useAuth();
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [idea, setIdea] = useState<Idea | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIdea = async () => {
      if (!ideaId) {
        setError('ID de idea no válido');
        setIsLoading(false);
        return;
      }

      try {
        // Primero obtenemos todas las ideas y buscamos la que coincida
        const response = await fetch('/api/ideas');
        const data = await response.json();
        
        if (data.success) {
          const foundIdea = data.ideas.find((idea: Idea) => idea.id === ideaId);
          if (foundIdea) {
            setIdea(foundIdea);
          } else {
            setError('Idea no encontrada');
          }
        } else {
          setError('Error al cargar la idea');
        }
      } catch (error) {
        console.error('Error fetching idea:', error);
        setError('Error al cargar la idea');
      } finally {
        setIsLoading(false);
      }
    };

    fetchIdea();
  }, [ideaId]);

  const handleAuthSuccess = () => {
    setIsAuthDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="border border-black bg-white">
        <div className="p-8 text-center">
          <p>Cargando idea...</p>
        </div>
      </div>
    );
  }

  if (error || !idea) {
    return (
      <div className="border border-black bg-white">
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Idea no encontrada</h1>
          <p className="text-gray-600 mb-6">{error || 'La idea que buscas no existe.'}</p>
          <Link href="/">
            <Button variant="outline" className="border-black">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Ideas
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isOwnIdea = user?.id === idea.author.id;

  return (
    <div className="border border-black bg-white">
      {/* Header */}
      <div className="border-b border-black p-8">
        <Link href="/" className="inline-flex items-center text-sm hover:opacity-70 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a Ideas
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-4xl font-black mb-4 leading-tight">{idea.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="border-black">{idea.category}</Badge>
              {idea.isPaid ? (
                <Badge className="bg-black text-white">Remunerado</Badge>
              ) : (
                <Badge variant="outline" className="border-black">Voluntario</Badge>
              )}
            </div>
            <div className="text-sm text-gray-600">
              <p>Creado por: <span className="font-medium">{idea.author.name}</span></p>
              <p>Fecha: {new Date(idea.createdAt).toLocaleDateString('es-ES')}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-5 w-5" />
              <span>{idea.timeRequired}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Users className="h-5 w-5" />
              <span>{idea.membersNeeded} miembros del equipo</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <DollarSign className="h-5 w-5" />
              <span>{idea.isPaid ? 'Oportunidad remunerada' : 'Oportunidad voluntaria'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black">
        {/* Main Content */}
        <div className="md:col-span-2 p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-6">Acerca de esta idea</h2>
            <p className="whitespace-pre-line text-base leading-relaxed">
              {idea.longDescription}
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="p-8 space-y-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Habilidades Requeridas</h3>
            <div className="space-y-2">
              {idea.professions.map((profession, index) => (
                <div 
                  key={index}
                  className="py-2 px-3 bg-gray-50 text-sm border-l-2 border-black"
                >
                  {profession}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Application Section */}
      <div className="border-t border-black p-8">
        {isOwnIdea ? (
          <div className="text-center max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Esta es tu idea</h2>
            <p className="mb-6 text-gray-600">
              Puedes ver las aplicaciones que has recibido desde tu dashboard.
            </p>
            <Link href="/dashboard">
              <Button className="w-full bg-black hover:bg-gray-900 text-white">
                Ver Dashboard
              </Button>
            </Link>
          </div>
        ) : user ? (
          <div>
            <h2 className="text-2xl font-bold mb-6">Aplicar a esta idea</h2>
            <ApplicationForm ideaId={idea.id} />
          </div>
        ) : (
          <div className="text-center max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">¿Listo para colaborar?</h2>
            <p className="mb-6 text-gray-600">
              Únete a nuestra comunidad para aplicar a esta idea y conectar con otros creadores.
            </p>
            
            <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="w-full bg-black hover:bg-gray-900 text-white mb-4"
                  onClick={() => setAuthType('login')}
                >
                  Iniciar Sesión para Aplicar
                </Button>
              </DialogTrigger>
              <DialogContent className="border-black">
                <DialogHeader>
                  <DialogTitle>
                    {authType === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
                  </DialogTitle>
                </DialogHeader>
                {authType === 'login' ? (
                  <LoginForm 
                    onSuccess={handleAuthSuccess}
                    onSwitchToSignup={() => setAuthType('signup')}
                  />
                ) : (
                  <SignupForm 
                    onSuccess={handleAuthSuccess}
                    onSwitchToLogin={() => setAuthType('login')}
                  />
                )}
              </DialogContent>
            </Dialog>

            <p className="text-sm text-gray-500">
              ¿No tienes cuenta?{' '}
              <button
                onClick={() => {
                  setAuthType('signup');
                  setIsAuthDialogOpen(true);
                }}
                className="text-black underline hover:no-underline"
              >
                Regístrate aquí
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}