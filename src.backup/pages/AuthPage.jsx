import React, { useState } from 'react';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
    import { useAuth } from '@/contexts/AuthContext';
    import { useNavigate } from 'react-router-dom';
    import { useToast } from '@/components/ui/use-toast';
    import { motion } from 'framer-motion';
    import { Sparkles } from 'lucide-react';

    const AuthPage = () => {
      const [loginEmail, setLoginEmail] = useState('');
      const [loginPassword, setLoginPassword] = useState('');
      const [signupName, setSignupName] = useState('');
      const [signupEmail, setSignupEmail] = useState('');
      const [signupPassword, setSignupPassword] = useState('');
      const { login } = useAuth();
      const navigate = useNavigate();
      const { toast } = useToast();

      const handleLogin = (e) => {
        e.preventDefault();
        if (!loginEmail || !loginPassword) {
          toast({ title: "Login Fail", description: "Need your email & password, slick.", variant: "destructive", className: "bg-destructive text-destructive-foreground border-greaser-red font-sans" });
          return;
        }
        const mockUser = { email: loginEmail, name: loginEmail.split('@')[0] };
        login(mockUser);
        toast({ title: "You're In!", description: `Welcome back, ${mockUser.name}! Let's get rollin'.`, className: "bg-greaser-teal text-greaser-charcoal border-greaser-teal font-sans" });
        navigate('/');
      };

      const handleSignup = (e) => {
        e.preventDefault();
        if (!signupName || !signupEmail || !signupPassword) {
          toast({ title: "Signup Fail", description: "Gotta fill all fields to join the crew.", variant: "destructive", className: "bg-destructive text-destructive-foreground border-greaser-red font-sans" });
          return;
        }
        const newUser = { email: signupEmail, name: signupName };
        login(newUser);
        toast({ title: "Welcome Aboard!", description: `Alright, ${newUser.name}, you're one of us now!`, className: "bg-greaser-teal text-greaser-charcoal border-greaser-teal font-sans" });
        navigate('/');
      };

      return (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-12"
        >
          <div className="flex items-center space-x-3 text-primary mb-10">
            <Sparkles className="h-16 w-16 text-greaser-gold animate-pulse" />
            <span className="text-6xl font-bangers text-greaser-cream text-shadow-hard">Legacy Car Care</span>
          </div>
          <Tabs defaultValue="login" className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-2 bg-greaser-charcoal/50 border border-primary/30 p-1 rounded-lg">
              <TabsTrigger value="login" className="font-bangers text-xl tracking-wider data-[state=active]:bg-primary data-[state=active]:text-greaser-charcoal data-[state=active]:shadow-lg text-greaser-silver rounded-md py-2.5">Login</TabsTrigger>
              <TabsTrigger value="signup" className="font-bangers text-xl tracking-wider data-[state=active]:bg-greaser-teal data-[state=active]:text-greaser-charcoal data-[state=active]:shadow-lg text-greaser-silver rounded-md py-2.5">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card className="border-2 border-primary/70 shadow-xl bg-card-texture mt-2">
                <CardHeader>
                  <CardTitle className="text-3xl font-bangers text-primary text-center">Cruise On In!</CardTitle>
                  <CardDescription className="text-center text-greaser-silver font-sans">Got an account? Punch in your deets.</CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-6 p-6">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="font-sans text-greaser-silver">Email</Label>
                      <Input id="login-email" type="email" placeholder="your_cool_email@example.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required className="bg-input text-foreground placeholder:text-muted-foreground border-greaser-silver/50 focus:border-primary focus:ring-primary font-sans" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="font-sans text-greaser-silver">Password</Label>
                      <Input id="login-password" type="password" placeholder="Top Secret S#!t" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required className="bg-input text-foreground placeholder:text-muted-foreground border-greaser-silver/50 focus:border-primary focus:ring-primary font-sans" />
                    </div>
                  </CardContent>
                  <CardFooter className="p-6">
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/80 text-greaser-charcoal font-bold text-lg py-3 shadow-md hover:shadow-lg">Login</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card className="border-2 border-greaser-teal/70 shadow-xl bg-card-texture mt-2">
                <CardHeader>
                  <CardTitle className="text-3xl font-bangers text-greaser-teal text-center">Join The Crew!</CardTitle>
                  <CardDescription className="text-center text-greaser-silver font-sans">New around here? Let's get you set up.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSignup}>
                  <CardContent className="space-y-6 p-6">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="font-sans text-greaser-silver">Full Name</Label>
                      <Input id="signup-name" placeholder="e.g. Ace Ventura" value={signupName} onChange={(e) => setSignupName(e.target.value)} required className="bg-input text-foreground placeholder:text-muted-foreground border-greaser-silver/50 focus:border-greaser-teal focus:ring-greaser-teal font-sans" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="font-sans text-greaser-silver">Email</Label>
                      <Input id="signup-email" type="email" placeholder="your_new_email@example.com" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required className="bg-input text-foreground placeholder:text-muted-foreground border-greaser-silver/50 focus:border-greaser-teal focus:ring-greaser-teal font-sans" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="font-sans text-greaser-silver">Password</Label>
                      <Input id="signup-password" type="password" placeholder="Make it a good one, capiche?" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required className="bg-input text-foreground placeholder:text-muted-foreground border-greaser-silver/50 focus:border-greaser-teal focus:ring-greaser-teal font-sans" />
                    </div>
                  </CardContent>
                  <CardFooter className="p-6">
                    <Button type="submit" className="w-full bg-greaser-teal hover:bg-greaser-teal/80 text-greaser-charcoal font-bold text-lg py-3 shadow-md hover:shadow-lg">Sign Up</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      );
    };

    export default AuthPage;