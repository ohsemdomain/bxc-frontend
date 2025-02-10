//src\components\blocks\Navbar.tsx
import { Link, useLocation } from 'react-router-dom';
import { LogOut, Menu, Twitch } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const linkClass = (path: string) =>
    cn(
      'px-3 py-1 text-sm rounded-sm transition-colors font-semibold',
      'hover:bg-primary-500/50',
      isActive(path)
        ? 'bg-primary/10 text-primary'
        : 'text-gray-600 hover:text-gray-900'
    );

  const handleNavigation = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b border-line-1 h-16'
      )}
    >
      <div className="container mx-auto h-full px-4">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo First */}
            <div className="flex items-center">
              <Twitch className="h-6 w-6 text-primary" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <Link to="/dashboard" className={linkClass('/dashboard')}>
                Dashboard
              </Link>
              <Link to="/pricing" className={linkClass('/pricing')}>
                Pricing
              </Link>
              <Link to="/test" className={linkClass('/test')}>
                Test
              </Link>
            </div>

            {/* Mobile Navigation Toggle Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <button className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-md">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-3">
                  <Link
                    to="/dashboard"
                    className={cn(
                      'block px-3 py-2 rounded-md text-sm font-semibold',
                      isActive('/dashboard')
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-600'
                    )}
                    onClick={handleNavigation}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/pricing"
                    className={cn(
                      'block px-3 py-2 rounded-md text-sm font-semibold',
                      isActive('/pricing')
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-600'
                    )}
                    onClick={handleNavigation}
                  >
                    Pricing
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Right side: Logout Button */}
          <button
            className={cn(
              'inline-flex items-center gap-1.5',
              'px-2.5 py-1 text-sm rounded-md',
              'text-gray-600 hover:text-gray-900 font-semibold',
              'hover:bg-gray-100/50 transition-colors'
            )}
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}