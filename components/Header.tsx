"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Header() {
  const { user, logout } = useAuth();
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  return (
    <header className="border-b border-black py-4 bg-white">
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
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium">
                  Ideas
                </Link>
                {user ? (
                  <>
                    <Link href="/dashboard" className="text-lg font-medium">
                      Dashboard
                    </Link>
                    <Button variant="outline" onClick={logout} className="mt-2 border-black">
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setAuthType('login');
                        setIsAuthDialogOpen(true);
                      }}
                      className="justify-start border-black"
                    >
                      Log in
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setAuthType('signup');
                        setIsAuthDialogOpen(true);
                      }}
                      className="justify-start border-black"
                    >
                      Sign up
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
              <Link href="/dashboard\" className="text-sm font-medium hover:underline">
                Dashboard
              </Link>
              <span className="text-sm font-medium">{user.name}</span>
              <Button variant="outline" onClick={logout} className="border-black">
                Log out
              </Button>
            </>
          ) : (
            <>
              <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    onClick={() => setAuthType('login')}
                    className="border-black"
                  >
                    Log in
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      {authType === 'login' ? 'Log in' : 'Create an account'}
                    </DialogTitle>
                  </DialogHeader>
                  {authType === 'login' ? (
                    <LoginForm onSuccess={() => setIsAuthDialogOpen(false)} 
                      onSwitchToSignup={() => setAuthType('signup')}
                    />
                  ) : (
                    <SignupForm onSuccess={() => setIsAuthDialogOpen(false)} 
                      onSwitchToLogin={() => setAuthType('login')}
                    />
                  )}
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="default"
                    onClick={() => {
                      setAuthType('signup');
                      setIsAuthDialogOpen(true);
                    }}
                    className="bg-black hover:bg-gray-900"
                  >
                    Sign up
                  </Button>
                </DialogTrigger>
              </Dialog>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}