import React, { useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
    import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuTrigger,
    } from '@/components/ui/dropdown-menu';
    import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
    import { Menu, Car, UserCircle, LogOut, Sun, Moon, Sparkles } from 'lucide-react';
    import { useAuth } from '@/contexts/AuthContext';
    import { useToast } from '@/components/ui/use-toast';

    const Navbar = () => {
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
      const { user, logout } = useAuth();
      const navigate = useNavigate();
      const { toast } = useToast();
      const [darkMode, setDarkMode] = useState(true); 

      const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/services', label: 'Services' },
        { href: '/pricing', label: 'Pricing' },
        { href: '/schedule', label: 'Schedule' },
      ];

      const handleLogout = () => {
        logout();
        toast({ title: "Logged Out", description: "You have been successfully logged out." });
        navigate('/');
      };
      
      const toggleDarkMode = () => {
        const newDarkModeState = !darkMode;
        if (newDarkModeState) {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
        }
        setDarkMode(newDarkModeState);
        localStorage.setItem('theme', newDarkModeState ? 'dark' : 'light');
      };

      React.useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'light') {
          document.documentElement.classList.add('light');
          document.documentElement.classList.remove('dark');
          setDarkMode(false);
        } else {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
          setDarkMode(true);
        }
      }, []);


      return (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="sticky top-0 z-50 bg-greaser-charcoal/80 backdrop-blur-lg shadow-lg border-b border-primary/30"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <Link to="/" className="flex items-center space-x-2 text-primary hover:text-greaser-red/80 transition-colors group">
                <Sparkles className="h-10 w-10 text-greaser-gold group-hover:animate-pulse" />
                <span className="text-3xl font-bangers tracking-wider text-greaser-cream text-shadow-soft">Legacy Car Care</span>
              </Link>

              <div className="hidden md:flex items-center space-x-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-greaser-cream hover:text-primary transition-colors font-medium text-lg font-sans relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon" onClick={toggleDarkMode} aria-label="Toggle theme" className="text-greaser-cream hover:bg-primary/20">
                  {darkMode ? <Sun className="h-6 w-6 text-greaser-gold" /> : <Moon className="h-6 w-6 text-greaser-teal" />}
                </Button>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-primary/50 hover:ring-primary transition-all">
                        <Avatar className="h-10 w-10 border-2 border-greaser-gold">
                          <AvatarImage src={user.avatarUrl || `https://avatar.vercel.sh/${user.email}.png?bg=333&text=🤘`} alt={user.name || user.email} />
                          <AvatarFallback className="bg-greaser-teal text-greaser-charcoal font-bold">{(user.name || user.email)?.[0]?.toUpperCase() || 'A'}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-greaser-charcoal border-primary/50 text-greaser-cream" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user.name || 'User'}</p>
                          <p className="text-xs leading-none text-greaser-silver">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-primary/30" />
                      <DropdownMenuItem onClick={() => navigate('/profile')} className="hover:bg-primary/20 focus:bg-primary/30">
                        <UserCircle className="mr-2 h-4 w-4 text-greaser-teal" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout} className="hover:bg-primary/20 focus:bg-primary/30">
                        <LogOut className="mr-2 h-4 w-4 text-greaser-teal" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button onClick={() => navigate('/auth')} className="hidden md:inline-flex bg-gradient-to-r from-primary to-greaser-gold hover:from-greaser-gold hover:to-primary text-greaser-charcoal font-bold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                    Login / Sign Up
                  </Button>
                )}
                <div className="md:hidden">
                  <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-greaser-cream hover:bg-primary/20">
                        <Menu className="h-7 w-7" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[280px] bg-greaser-charcoal p-6 border-r border-primary/30">
                      <div className="flex flex-col space-y-6 mt-8">
                        {navLinks.map((link) => (
                          <Link
                            key={link.href}
                            to={link.href}
                            className="text-xl font-medium text-greaser-cream hover:text-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {link.label}
                          </Link>
                        ))}
                        <div className="pt-4 border-t border-primary/30">
                          {!user && (
                             <Button onClick={() => { navigate('/auth'); setIsMobileMenuOpen(false); }} className="w-full bg-gradient-to-r from-primary to-greaser-gold hover:from-greaser-gold hover:to-primary text-greaser-charcoal font-bold shadow-md">
                              Login / Sign Up
                            </Button>
                          )}
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </div>
          </div>
        </motion.nav>
      );
    };

    export default Navbar;