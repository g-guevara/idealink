"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { Application } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface MyApplicationsProps {
  userId: string;
}

export default function MyApplications({ userId }: MyApplicationsProps) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(`/api/applications?userId=${userId}`);
        const data = await response.json();
        
        if (data.success) {
          setApplications(data.applications);
        } else {
          toast({
            title: "Error",
            description: "No se pudieron cargar las aplicaciones",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
        toast({
          title: "Error",
          description: "Error al cargar las aplicaciones",
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return <Badge className="bg-green-600 text-white">Aceptada</Badge>;
      case 'rejected':
        return <Badge className="bg-red-600 text-white">Rechazada</Badge>;
      case 'pending':
      default:
        return <Badge variant="outline" className="border-yellow-500 text-yellow-700">Pendiente</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <p>Cargando tus aplicaciones...</p>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <Card className="border-black">
        <CardContent className="py-10 flex flex-col items-center justify-center text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">No has aplicado a ninguna idea aún</h3>
          <p className="text-gray-500 mb-6">Explora las ideas disponibles y aplica a las que te interesen.</p>
          <Link href="/">
            <Button className="bg-black hover:bg-gray-900 text-white">Explorar Ideas</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {applications.map(application => (
        <Card key={application.id} className="overflow-hidden border-black">
          <CardHeader className="bg-gray-50 border-b border-black">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{application.ideaTitle}</CardTitle>
              {getStatusBadge(application.status)}
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Tu aplicación</h4>
              <p className="text-sm text-gray-500 mb-2">
                Enviada el {new Date(application.createdAt).toLocaleDateString('es-ES')}
              </p>
              <p className="text-sm line-clamp-3 bg-gray-50 p-3 border-l-2 border-black">
                {application.coverLetter}
              </p>
            </div>
            
            {application.cvLink && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">CV / Portfolio</h4>
                <a 
                  href={application.cvLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Ver CV/Portfolio →
                </a>
              </div>
            )}
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                Estado: {
                  application.status === 'pending' ? 'Esperando respuesta' :
                  application.status === 'accepted' ? 'Aceptada' : 'Rechazada'
                }
              </div>
              
              <Link href={`/idea-details?id=${application.ideaId}`}>
                <Button variant="outline" size="sm" className="border-black">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Idea
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}