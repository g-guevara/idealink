"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { mockIdeas } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ApplicationForm from '@/components/ApplicationForm';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Clock, Users, DollarSign } from 'lucide-react';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';

export default function IdeaDetailPage() {
  const params = useParams();
  const ideaId = params.id as string;
  const { user } = useAuth();
  
  const idea = mockIdeas.find(idea => idea.id === ideaId);
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  if (!idea) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-xl">Idea not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{idea.title}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline">{idea.category}</Badge>
          {idea.isPaid ? (
            <Badge variant="secondary">Paid</Badge>
          ) : (
            <Badge variant="outline">Volunteer</Badge>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{idea.longDescription}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{idea.timeRequired}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{idea.membersNeeded} team members</span>
              </div>
              
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{idea.isPaid ? 'Paid opportunity' : 'Volunteer opportunity'}</span>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm font-medium mb-2">Looking for:</p>
                <div className="flex flex-wrap gap-2">
                  {idea.professions.map((profession, index) => (
                    <Badge key={index} variant="outline">{profession}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {user ? (
        <Card>
          <CardHeader>
            <CardTitle>Apply to this idea</CardTitle>
          </CardHeader>
          <CardContent>
            <ApplicationForm ideaId={idea.id} />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-8 flex flex-col items-center justify-center">
            <p className="mb-4 text-center">You need to be logged in to apply for this idea</p>
            
            <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
              <DialogTrigger asChild>
                <Button>Log in to apply</Button>
              </DialogTrigger>
              <DialogContent>
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
          </CardContent>
        </Card>
      )}
    </div>
  );
}