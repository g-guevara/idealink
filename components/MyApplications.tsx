"use client";

import { mockIdeas, mockApplications } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Clock } from 'lucide-react';
import Link from 'next/link';

interface MyApplicationsProps {
  userId: string;
}

export default function MyApplications({ userId }: MyApplicationsProps) {
  const userApplications = mockApplications.filter(app => app.userId === userId);
  
  if (userApplications.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 flex flex-col items-center justify-center text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">No applications yet</h3>
          <p className="text-gray-500 mb-6">You haven't applied to any ideas yet.</p>
          <Link href="/">
            <Button>Browse Ideas</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {userApplications.map(application => {
        const idea = mockIdeas.find(idea => idea.id === application.ideaId);
        if (!idea) return null;
        
        return (
          <Card key={application.id} className="overflow-hidden">
            <CardHeader className="bg-gray-50">
              <div className="flex justify-between items-start">
                <CardTitle>{idea.title}</CardTitle>
                <Badge>
                  {idea.isPaid ? 'Paid' : 'Volunteer'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Project details</h3>
                <p className="text-sm mb-2">{idea.shortDescription}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{idea.category}</Badge>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {idea.timeRequired}
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Your application</h3>
                <p className="text-xs text-gray-500 mb-2">Submitted on {new Date(application.createdAt).toLocaleDateString()}</p>
                <p className="text-sm line-clamp-3">{application.coverLetter}</p>
              </div>
              
              <div className="flex justify-end">
                <Link href={`/ideas/${idea.id}`}>
                  <Button variant="outline" size="sm">
                    View Idea
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}