"use client";
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SubmitIdeaForm from '@/components/SubmitIdeaForm';
import MyIdeas from '@/components/MyIdeas';
import MyApplications from '@/components/MyApplications';
import Applicants from '@/components/Applicants';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p>Cargando...</p>
      </div>
    );
  }
  
  if (!user) {
    return null;
  }

  const letters = ['D', 'A', 'S', 'H', 'B', 'O', 'A', 'R', 'D'];

  return (
    <div className="border border-black bg-white min-h-screen">
      {/* Mobile Layout */}
      <div className="block md:hidden">
        {/* Simple Dashboard Title for Mobile */}
        <div className="border-b border-black bg-white">
          <div className="h-[60px] flex items-center justify-center">
            <h1 className="font-black text-2xl tracking-wider">DASHBOARD</h1>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="w-full">
          <Tabs defaultValue="my-ideas" className="w-full">
            <TabsList className="w-full border-b border-black rounded-none bg-white grid grid-cols-4 h-auto">
              <TabsTrigger 
                value="submit" 
                className="data-[state=active]:bg-black data-[state=active]:text-white rounded-none border-r border-black text-xs px-1 py-3 h-auto"
              >
                Enviar
              </TabsTrigger>
              <TabsTrigger 
                value="my-ideas" 
                className="data-[state=active]:bg-black data-[state=active]:text-white rounded-none border-r border-black text-xs px-1 py-3 h-auto"
              >
                Ideas
              </TabsTrigger>
              <TabsTrigger 
                value="applications" 
                className="data-[state=active]:bg-black data-[state=active]:text-white rounded-none border-r border-black text-xs px-1 py-3 h-auto"
              >
                Mis Post.
              </TabsTrigger>
              <TabsTrigger 
                value="applicants" 
                className="data-[state=active]:bg-black data-[state=active]:text-white rounded-none text-xs px-1 py-3 h-auto"
              >
                Postulantes
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="submit" className="p-4 mt-0">
              <div className="w-full">
                <h2 className="text-xl font-bold mb-4">Envía una nueva idea</h2>
                <SubmitIdeaForm />
              </div>
            </TabsContent>
            
            <TabsContent value="my-ideas" className="p-4 mt-0">
              <div className="w-full">
                <h2 className="text-xl font-bold mb-4">Mis Ideas</h2>
                <MyIdeas userId={user.id} />
              </div>
            </TabsContent>
            
            <TabsContent value="applications" className="p-4 mt-0">
              <div className="w-full">
                <h2 className="text-xl font-bold mb-4">Mis Postulaciones</h2>
                <MyApplications userId={user.id} />
              </div>
            </TabsContent>

            <TabsContent value="applicants" className="p-4 mt-0">
              <div className="w-full">
                <h2 className="text-xl font-bold mb-4">Postulantes</h2>
                <Applicants userId={user.id} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex">
        {/* Vertical Dashboard Title */}
        <div className="border-r border-black">
          {letters.map((letter, index) => (
            <div 
              key={index}
              className="h-[100px] w-[100px] flex items-center justify-center overflow-hidden border-b border-black last:border-b-0"
            >
              <span className="font-black leading-none text-[90px] lg:text-[140px] xl:text-[180px] 2xl:text-[240px] flex items-center justify-center w-full h-full">
                {letter}
              </span>
            </div>
          ))}
        </div>

        {/* Desktop Content */}
        <div className="flex-1">
          <Tabs defaultValue="my-ideas" className="w-full h-full">
            <TabsList className="w-full border-b border-black rounded-none bg-white grid grid-cols-4 h-auto">
              <TabsTrigger 
                value="submit" 
                className="data-[state=active]:bg-black data-[state=active]:text-white rounded-none border-r border-black py-4 h-auto"
              >
                Enviar Idea
              </TabsTrigger>
              <TabsTrigger 
                value="my-ideas" 
                className="data-[state=active]:bg-black data-[state=active]:text-white rounded-none border-r border-black py-4 h-auto"
              >
                Mis Ideas
              </TabsTrigger>
              <TabsTrigger 
                value="applications" 
                className="data-[state=active]:bg-black data-[state=active]:text-white rounded-none border-r border-black py-4 h-auto"
              >
                Mis Postulaciones
              </TabsTrigger>
              <TabsTrigger 
                value="applicants" 
                className="data-[state=active]:bg-black data-[state=active]:text-white rounded-none py-4 h-auto"
              >
                Postulantes
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="submit" className="p-8 mt-0">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Envía una nueva idea</h2>
                <SubmitIdeaForm />
              </div>
            </TabsContent>
            
            <TabsContent value="my-ideas" className="p-8 mt-0">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Mis Ideas</h2>
                <MyIdeas userId={user.id} />
              </div>
            </TabsContent>
            
            <TabsContent value="applications" className="p-8 mt-0">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Mis Postulaciones</h2>
                <MyApplications userId={user.id} />
              </div>
            </TabsContent>

            <TabsContent value="applicants" className="p-8 mt-0">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Postulantes</h2>
                <Applicants userId={user.id} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}