"use client";

import { useState } from 'react';
import Link from 'next/link';
import { mockIdeas, mockApplications } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { AlertCircle } from 'lucide-react';

interface MyIdeasProps {
  userId: string;
}

export default function MyIdeas({ userId }: MyIdeasProps) {
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null);
  
  const userIdeas = mockIdeas.filter(idea => idea.createdBy === userId);
  
  if (userIdeas.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 flex flex-col items-center justify-center text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">No ideas yet</h3>
          <p className="text-gray-500 mb-6">You haven't submitted any ideas yet.</p>
          <Tabs defaultValue="submit">
            <TabsTrigger value="submit">Submit Idea</TabsTrigger>
          </Tabs>
        </CardContent>
      </Card>
    );
  }

  const applicationsForIdea = (ideaId: string) => {
    return mockApplications.filter(app => app.ideaId === ideaId);
  };

  return (
    <div className="space-y-6">
      {userIdeas.map(idea => {
        const applications = applicationsForIdea(idea.id);
        
        return (
          <Card key={idea.id} className="overflow-hidden">
            <CardHeader className="bg-gray-50">
              <div className="flex justify-between items-start">
                <CardTitle>{idea.title}</CardTitle>
                <Badge variant={applications.length > 0 ? "default" : "outline"}>
                  {applications.length} {applications.length === 1 ? 'Application' : 'Applications'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-4 text-gray-700">{idea.shortDescription}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">{idea.category}</Badge>
                <Badge variant="outline">{idea.isPaid ? 'Paid' : 'Volunteer'}</Badge>
                <Badge variant="outline">{idea.timeRequired}</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <Link href={`/ideas/${idea.id}`}>
                  <Button variant="outline" size="sm">
                    View Idea
                  </Button>
                </Link>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      variant={applications.length > 0 ? "default" : "outline"}
                      onClick={() => setSelectedIdeaId(idea.id)}
                      disabled={applications.length === 0}
                    >
                      View Applications
                    </Button>
                  </DialogTrigger>
                  
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Applications for {idea.title}</DialogTitle>
                    </DialogHeader>
                    
                    {applications.length > 0 ? (
                      <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                        {applications.map(app => (
                          <Card key={app.id}>
                            <CardContent className="pt-6">
                              <div className="flex items-center gap-4 mb-4">
                                <Avatar>
                                  <AvatarFallback>{app.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-medium">{app.name}</h3>
                                  <p className="text-sm text-gray-500">{app.email}</p>
                                </div>
                              </div>
                              
                              <Separator className="my-4" />
                              
                              <div className="space-y-4">
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Cover Letter</h4>
                                  <p className="text-sm whitespace-pre-line">{app.coverLetter}</p>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-medium mb-2">CV / Resume</h4>
                                  <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm">
                                      View CV
                                    </Button>
                                    <p className="text-xs text-gray-500">{app.cv}</p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex justify-end gap-2 mt-6">
                                <Button variant="outline" size="sm">
                                  Contact Applicant
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center">
                        <p>No applications received yet</p>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}