"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CheckCircle, XCircle, Clock, Mail, User, ExternalLink } from 'lucide-react';
import { Application } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface ApplicantsProps {
  userId: string;
}

export default function Applicants({ userId }: ApplicantsProps) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(`/api/applications?ideaAuthorId=${userId}`);
        const data = await response.json();
        
        if (data.success) {
          setApplications(data.applications);
        } else {
          console.error('Error fetching applications:', data.error);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
        toast({
          title: "Error",
          description: "Error al cargar los postulantes",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchApplications();
    }
  }, [userId, toast]);

  const updateApplicationStatus = async (applicationId: string, status: 'accepted' | 'rejected') => {
    setUpdatingId(applicationId);
    try {
      const response = await fetch(`/api/applications/${applicationId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setApplications(prevApplications =>
          prevApplications.map(app =>
            app.id === applicationId ? { ...app, status } : app
          )
        );

        toast({
          title: "Estado actualizado",
          description: `Aplicación ${status === 'accepted' ? 'aceptada' : 'rechazada'} correctamente`,
        });
      } else {
        throw new Error(data.error || 'Error al actualizar el estado');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al actualizar el estado",
        variant: "destructive",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'Aceptado';
      case 'rejected':
        return 'Rechazado';
      case 'pending':
        return 'Pendiente';
      default:
        return 'Pendiente';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Cargando postulantes...</p>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p className="text-lg font-medium">No hay postulantes aún</p>
        <p>Cuando alguien se postule a tus ideas, aparecerán aquí.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <Card key={application.id} className="border border-black">
          <CardHeader className="border-b border-black">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback>
                    {application.name?.charAt(0) || application.email.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">
                    {application.name || 'Usuario Anónimo'}
                  </CardTitle>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-1" />
                    {application.email}
                  </div>
                </div>
              </div>
              <Badge className={`${getStatusColor(application.status)} border`}>
                {getStatusIcon(application.status)}
                <span className="ml-1">{getStatusText(application.status)}</span>
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Aplicación para:</h4>
                <p className="text-sm text-gray-700 font-medium">{application.ideaTitle}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2">Carta de Presentación:</h4>
                <div className="bg-gray-50 p-3 border-l-2 border-black text-sm">
                  {application.coverLetter}
                </div>
              </div>
              
              {application.cvLink && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">CV / Portfolio:</h4>
                  <a 
                    href={application.cvLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-blue-600 hover:underline"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Ver CV/Portfolio
                  </a>
                </div>
              )}

              <div className="text-xs text-gray-500">
                Aplicación enviada el {new Date(application.createdAt).toLocaleDateString('es-ES')}
              </div>
              
              {application.status === 'pending' && (
                <div className="flex space-x-2 pt-4 border-t border-gray-200">
                  <Button
                    size="sm"
                    onClick={() => updateApplicationStatus(application.id, 'accepted')}
                    disabled={updatingId === application.id}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {updatingId === application.id ? 'Actualizando...' : 'Aceptar'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateApplicationStatus(application.id, 'rejected')}
                    disabled={updatingId === application.id}
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    {updatingId === application.id ? 'Actualizando...' : 'Rechazar'}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}