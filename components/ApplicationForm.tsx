"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface ApplicationFormProps {
  ideaId: string;
}

export default function ApplicationForm({ ideaId }: ApplicationFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [coverLetter, setCoverLetter] = useState('');
  const [cvLink, setCvLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "Debes estar logueado para aplicar",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ideaId,
          userId: user.id,
          name,
          email,
          coverLetter,
          cvLink,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar la aplicación');
      }

      toast({
        title: "¡Aplicación enviada!",
        description: "Tu aplicación ha sido enviada al creador de la idea",
      });
      
      setCoverLetter('');
      setCvLink('');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al enviar la aplicación",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="coverLetter">Carta de Presentación</Label>
        <Textarea
          id="coverLetter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          placeholder="Explica por qué estás interesado en esta idea y qué puedes aportar"
          required
          rows={6}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="cvLink">Enlace a CV / Portfolio</Label>
        <Input
          id="cvLink"
          type="url"
          value={cvLink}
          onChange={(e) => setCvLink(e.target.value)}
          placeholder="https://tu-cv-o-portfolio.com"
          required
        />
        <p className="text-xs text-gray-500">Proporciona un enlace a tu CV o portfolio online</p>
      </div>
      
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando aplicación...' : 'Aplicar'}
      </Button>
    </form>
  );
}