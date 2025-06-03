"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Eye, Edit, Trash2 } from 'lucide-react';
import { Idea } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface MyIdeasProps {
  userId: string;
}

export default function MyIdeas({ userId }: MyIdeasProps) {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch user's ideas
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await fetch('/api/ideas');
        const data = await response.json();
        
        if (data.success) {
          // Filter ideas by user
          const userIdeas = data.ideas.filter((idea: Idea) => idea.author.id === userId);
          setIdeas(userIdeas);
        } else {
          toast({
            title: "Error",
            description: "No se pudieron cargar las ideas",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error fetching ideas:', error);
        toast({
          title: "Error",
          description: "Error al cargar las ideas",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchIdeas();
    }
  }, [userId, toast]);

  const handleDeleteIdea = async (ideaId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta idea?')) {
      return;
    }

    setDeletingId(ideaId);
    try {
      const response = await fetch(`/api/ideas/${ideaId}?userId=${userId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        setIdeas(prevIdeas => prevIdeas.filter(idea => idea.id !== ideaId));
        toast({
          title: "Idea eliminada",
          description: "La idea ha sido eliminada correctamente",
        });
      } else {
        throw new Error(data.error || 'Error al eliminar la idea');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al eliminar la idea",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <p>Cargando tus ideas...</p>
      </div>
    );
  }

  if (ideas.length === 0) {
    return (
      <Card className="border-black">
        <CardContent className="py-10 flex flex-col items-center justify-center text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">No tienes ideas aún</h3>
          <p className="text-gray-500 mb-6">¡Crea tu primera idea para comenzar!</p>
          <p className="text-sm text-gray-400">Usa la pestaña "Enviar Idea" para crear una nueva idea.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {ideas.map(idea => (
        <Card key={idea.id} className="overflow-hidden border-black">
          <CardHeader className="bg-gray-50 border-b border-black">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{idea.title}</CardTitle>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-black">
                  {idea.category}
                </Badge>
                {idea.isPaid ? (
                  <Badge className="bg-black text-white">Remunerado</Badge>
                ) : (
                  <Badge variant="outline" className="border-black">Voluntario</Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4 text-gray-700">{idea.shortDescription}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="border-gray-300">{idea.timeRequired}</Badge>
              <Badge variant="outline" className="border-gray-300">{idea.membersNeeded} miembros</Badge>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-600 mb-2">Profesiones requeridas:</p>
              <div className="flex flex-wrap gap-1">
                {idea.professions.map((profession, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-gray-100 px-2 py-1 border border-gray-200"
                  >
                    {profession}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-xs text-gray-500 mb-4">
              Creada el {new Date(idea.createdAt).toLocaleDateString('es-ES')}
            </div>
            
            <div className="flex justify-between items-center">
              <Link href={`/idea-details?id=${idea.id}`}>
                <Button variant="outline" size="sm" className="border-black">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Idea
                </Button>
              </Link>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                  onClick={() => handleDeleteIdea(idea.id)}
                  disabled={deletingId === idea.id}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {deletingId === idea.id ? 'Eliminando...' : 'Eliminar'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}