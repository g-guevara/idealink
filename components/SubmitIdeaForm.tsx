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
  const [teamSize, setTeamSize] = useState('');
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
    
    if (!category) {
      toast({
        title: "Missing information",
        description: "Please select a category",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedProfessions.length === 0) {
      toast({
        title: "Missing information",
        description: "Please select at least one required profession",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate submitting the idea
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Idea submitted",
      description: "Your idea has been submitted successfully!",
    });
    
    // Reset form
    setTitle('');
    setShortDescription('');
    setLongDescription('');
    setCategory('');
    setTimeRequired('');
    setIsPaid(false);
    setTeamSize('');
    setSelectedProfessions([]);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Give your idea a catchy title"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="shortDescription">Short Description</Label>
        <Textarea
          id="shortDescription"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          required
          placeholder="Briefly describe your idea (max 150 characters)"
          maxLength={150}
        />
        <p className="text-xs text-gray-500">{shortDescription.length}/150 characters</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="longDescription">Full Description</Label>
        <Textarea
          id="longDescription"
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
          required
          placeholder="Provide a detailed description of your idea"
          rows={6}
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={(value) => setCategory(value as Category)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="timeRequired">Time Required</Label>
          <Select value={timeRequired} onValueChange={setTimeRequired}>
            <SelectTrigger>
              <SelectValue placeholder="Estimated time needed" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Less than 1 month">Less than 1 month</SelectItem>
              <SelectItem value="1-3 months">1-3 months</SelectItem>
              <SelectItem value="3-6 months">3-6 months</SelectItem>
              <SelectItem value="6-12 months">6-12 months</SelectItem>
              <SelectItem value="More than 1 year">More than 1 year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="teamSize">Team Size</Label>
          <Select value={teamSize} onValueChange={setTeamSize}>
            <SelectTrigger>
              <SelectValue placeholder="Number of team members" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 person</SelectItem>
              <SelectItem value="2">2 people</SelectItem>
              <SelectItem value="3">3 people</SelectItem>
              <SelectItem value="4">4 people</SelectItem>
              <SelectItem value="5">5 people</SelectItem>
              <SelectItem value="6+">6+ people</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2 h-full pt-8">
          <Checkbox 
            id="isPaid" 
            checked={isPaid}
            onCheckedChange={(checked) => setIsPaid(checked as boolean)}
          />
          <Label htmlFor="isPaid">This is a paid opportunity</Label>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Required Professions</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {professions.map((profession) => (
            <div key={profession} className="flex items-center space-x-2">
              <Checkbox
                id={`profession-${profession}`}
                checked={selectedProfessions.includes(profession)}
                onCheckedChange={() => toggleProfession(profession)}
              />
              <Label htmlFor={`profession-${profession}`}>{profession}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting idea...' : 'Submit Idea'}
      </Button>
    </form>
  );
}