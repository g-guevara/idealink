"use client";

import { useSearchParams } from 'next/navigation';
import { mockIdeas } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import ApplicationForm from '@/components/ApplicationForm';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';
import { useState } from 'react';
import { Clock, Users, DollarSign, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function IdeaDetailPage() {
  const searchParams = useSearchParams();
  const ideaId = searchParams.get('id');
  const { user } = useAuth();
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  
  const idea = mockIdeas.find(idea => idea.id === ideaId);

  if (!idea) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-xl">Idea not found</p>
      </div>
    );
  }

  return (
    <div className="border border-black bg-white">
      {/* Header */}
      <div className="border-b border-black p-8">
        <Link href="/" className="inline-flex items-center text-sm hover:opacity-70 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Ideas
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-4xl font-black mb-4 leading-tight">{idea.title}</h1>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="border-black">{idea.category}</Badge>
              {idea.isPaid ? (
                <Badge className="bg-black text-white">Paid</Badge>
              ) : (
                <Badge variant="outline" className="border-black">Volunteer</Badge>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-5 w-5" />
              <span>{idea.timeRequired}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Users className="h-5 w-5" />
              <span>{idea.teamSize} team members</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <DollarSign className="h-5 w-5" />
              <span>{idea.isPaid ? 'Paid opportunity' : 'Volunteer opportunity'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black">
        {/* Main Content */}
        <div className="md:col-span-2 p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-6">About this idea</h2>
            <p className="whitespace-pre-line text-base leading-relaxed">
              {idea.longDescription}
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="p-8 space-y-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Required Skills</h3>
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
        {user ? (
          <div>
            <h2 className="text-2xl font-bold mb-6">Apply to this idea</h2>
            <ApplicationForm ideaId={idea.id} />
          </div>
        ) : (
          <div className="text-center max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Ready to collaborate?</h2>
            <p className="mb-6 text-gray-600">Join our community to apply for this idea and connect with other creators.</p>
            
            <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full bg-black hover:bg-gray-900 text-white">
                  Log in to apply
                </Button>
              </DialogTrigger>
              <DialogContent className="border-black">
                {authType === 'login' ? (
                  <>
                    <h2 className="text-xl font-bold mb-4">Log in</h2>
                    <LoginForm 
                      onSuccess={() => setIsAuthDialogOpen(false)}
                      onSwitchToSignup={() => setAuthType('signup')}
                    />
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-bold mb-4">Create an account</h2>
                    <SignupForm 
                      onSuccess={() => setIsAuthDialogOpen(false)}
                      onSwitchToLogin={() => setAuthType('login')}
                    />
                  </>
                )}
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}