"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';
import { useState } from 'react';
import { Menu, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const { user, logout } = useAuth();
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthDialogOpen(false);
  };

  const handleSwitchAuth = (type: 'login' | 'signup') => {
    setAuthType(type);
  };

  return (
    <header className="border-b border-black py-4 bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="text-4xl font-black tracking-tighter leading-none hover:opacity-80 transition-opacity">
          IDEALINK
        </Link>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-black">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-black">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium hover:underline">
                  Ideas
                </Link>
                {user ? (
                  <>
                    <Link href="/dashboard" className="text-lg font-medium hover:underline">
                      Dashboard
                    </Link>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-2">Conectado como:</p>
                      <p className="font-medium mb-4">{user.name}</p>
                      <Button 
                        variant="outline" 
                        onClick={logout} 
                        className="w-full border-black"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Cerrar Sesión
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setAuthType('login');
                            setIsAuthDialogOpen(true);
                          }}
                          className="justify-start border-black"
                        >
                          Iniciar Sesión
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setAuthType('signup');
                        setIsAuthDialogOpen(true);
                      }}
                      className="justify-start border-black"
                    >
                      Registrarse
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium hover:underline flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-black flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="border-black">
                  <DropdownMenuItem disabled>
                    <span className="text-sm text-gray-600">{user.email}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setAuthType('login');
                      setIsAuthDialogOpen(true);
                    }}
                    className="border-black"
                  >
                    Iniciar Sesión
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] border-black">
                  <DialogHeader>
                    <DialogTitle>
                      {authType === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
                    </DialogTitle>
                  </DialogHeader>
                  {authType === 'login' ? (
                    <LoginForm 
                      onSuccess={handleAuthSuccess} 
                      onSwitchToSignup={() => handleSwitchAuth('signup')}
                    />
                  ) : (
                    <SignupForm 
                      onSuccess={handleAuthSuccess} 
                      onSwitchToLogin={() => handleSwitchAuth('login')}
                    />
                  )}
                </DialogContent>
              </Dialog>

              <Button 
                variant="default"
                onClick={() => {
                  setAuthType('signup');
                  setIsAuthDialogOpen(true);
                }}
                className="bg-black hover:bg-gray-900 text-white"
              >
                Registrarse
              </Button>
            </>
          )}
        </nav>

        {/* Auth Dialog for both mobile and desktop */}
        <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
          <DialogContent className="sm:max-w-[425px] border-black">
            <DialogHeader>
              <DialogTitle>
                {authType === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
              </DialogTitle>
            </DialogHeader>
            {authType === 'login' ? (
              <LoginForm 
                onSuccess={handleAuthSuccess} 
                onSwitchToSignup={() => handleSwitchAuth('signup')}
              />
            ) : (
              <SignupForm 
                onSuccess={handleAuthSuccess} 
                onSwitchToLogin={() => handleSwitchAuth('login')}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}