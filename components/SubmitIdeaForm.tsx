"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Category, Profession } from '@/types';

export default function SubmitIdeaForm() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [category, setCategory] = useState<Category | ''>('');
  const [timeRequired, setTimeRequired] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [membersNeeded, setMembersNeeded] = useState('');
  const [selectedProfessions, setSelectedProfessions] = useState<Profession[]>([]);

  const categories: Category[] = [
    "Technology", "Design", "Business", "Marketing", 
    "Education", "Health", "Entertainment", "Other"
  ];
  
  const professions: Profession[] = [
    "Developer", "Designer", "Project Manager", "Marketing Specialist", 
    "Content Creator", "Data Scientist", "Business Analyst", 
    "Financial Advisor", "Legal Consultant", "Other"
  ];

  const toggleProfession = (profession: Profession) => {
    if (selectedProfessions.includes(profession)) {
      setSelectedProfessions(selectedProfessions.filter(p => p !== profession));
    } else {
      setSelectedProfessions([...selectedProfessions, profession]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "Debes estar logueado para crear una idea",
        variant: "destructive",
      });
      return;
    }

    if (!category) {
      toast({
        title: "Información faltante",
        description: "Por favor selecciona una categoría",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedProfessions.length === 0) {
      toast({
        title: "Información faltante",
        description: "Por favor selecciona al menos una profesión requerida",
        variant: "destructive",
      });
      return;
    }

    if (!membersNeeded || parseInt(membersNeeded) < 1) {
      toast({
        title: "Información faltante",
        description: "Por favor especifica el número de miembros necesarios",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/ideas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          shortDescription,
          longDescription,
          category,
          timeRequired,
          isPaid,
          membersNeeded: parseInt(membersNeeded),
          professions: selectedProfessions,
          authorId: user.id,
          authorName: user.name,
          authorEmail: user.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear la idea');
      }

      toast({
        title: "¡Idea creada!",
        description: "Tu idea ha sido publicada exitosamente",
      });
      
      // Reset form
      setTitle('');
      setShortDescription('');
      setLongDescription('');
      setCategory('');
      setTimeRequired('');
      setIsPaid(false);
      setMembersNeeded('');
      setSelectedProfessions([]);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al crear la idea",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Dale a tu idea un título atractivo"
          disabled={isSubmitting}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="shortDescription">Descripción Corta</Label>
        <Textarea
          id="shortDescription"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          required
          placeholder="Describe brevemente tu idea (máx 150 caracteres)"
          maxLength={150}
          disabled={isSubmitting}
        />
        <p className="text-xs text-gray-500">{shortDescription.length}/150 caracteres</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="longDescription">Descripción Completa</Label>
        <Textarea
          id="longDescription"
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
          required
          placeholder="Proporciona una descripción detallada de tu idea"
          rows={6}
          disabled={isSubmitting}
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="category">Categoría</Label>
          <Select value={category} onValueChange={(value) => setCategory(value as Category)} disabled={isSubmitting}>
            <SelectTrigger className="border-black">
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent className="border-black">
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="timeRequired">Tiempo Requerido</Label>
          <Select value={timeRequired} onValueChange={setTimeRequired} disabled={isSubmitting}>
            <SelectTrigger className="border-black">
              <SelectValue placeholder="Tiempo estimado necesario" />
            </SelectTrigger>
            <SelectContent className="border-black">
              <SelectItem value="Menos de 1 mes">Menos de 1 mes</SelectItem>
              <SelectItem value="1-3 meses">1-3 meses</SelectItem>
              <SelectItem value="3-6 meses">3-6 meses</SelectItem>
              <SelectItem value="6-12 meses">6-12 meses</SelectItem>
              <SelectItem value="Más de 1 año">Más de 1 año</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="membersNeeded">Miembros del Equipo</Label>
          <Select value={membersNeeded} onValueChange={setMembersNeeded} disabled={isSubmitting}>
            <SelectTrigger className="border-black">
              <SelectValue placeholder="Número de miembros del equipo" />
            </SelectTrigger>
            <SelectContent className="border-black">
              <SelectItem value="1">1 persona</SelectItem>
              <SelectItem value="2">2 personas</SelectItem>
              <SelectItem value="3">3 personas</SelectItem>
              <SelectItem value="4">4 personas</SelectItem>
              <SelectItem value="5">5 personas</SelectItem>
              <SelectItem value="6">6+ personas</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2 h-full pt-8">
          <Checkbox 
            id="isPaid" 
            checked={isPaid}
            onCheckedChange={(checked) => setIsPaid(checked as boolean)}
            disabled={isSubmitting}
          />
          <Label htmlFor="isPaid">Esta es una oportunidad remunerada</Label>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Profesiones Requeridas</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {professions.map((profession) => (
            <div key={profession} className="flex items-center space-x-2">
              <Checkbox
                id={`profession-${profession}`}
                checked={selectedProfessions.includes(profession)}
                onCheckedChange={() => toggleProfession(profession)}
                disabled={isSubmitting}
              />
              <Label htmlFor={`profession-${profession}`} className="text-sm">
                {profession}
              </Label>
            </div>
          ))}
        </div>
        {selectedProfessions.length > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            Seleccionadas: {selectedProfessions.join(', ')}
          </p>
        )}
      </div>
      
      <Button type="submit" className="w-full bg-black hover:bg-gray-900" disabled={isSubmitting}>
        {isSubmitting ? 'Creando idea...' : 'Crear Idea'}
      </Button>
    </form>
  );
}