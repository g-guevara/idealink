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
  const [cv, setCv] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submitting the application
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Application submitted",
      description: "Your application has been sent to the idea creator",
    });
    
    setCoverLetter('');
    setCv('');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
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
        <Label htmlFor="coverLetter">Cover Letter</Label>
        <Textarea
          id="coverLetter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          placeholder="Explain why you're interested in this idea and what you can contribute"
          required
          rows={6}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="cv">CV / Resume</Label>
        <Input
          id="cv"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setCv(e.target.files[0].name);
            }
          }}
          required
        />
        <p className="text-xs text-gray-500">Upload your CV (PDF, DOC or DOCX)</p>
      </div>
      
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting application...' : 'Apply'}
      </Button>
    </form>
  );
}