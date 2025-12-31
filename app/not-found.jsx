'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-200px)] py-12"
    >
      <AlertTriangle className="h-24 w-24 text-destructive mb-8 animate-pulse" />
      <h1 className="text-6xl font-poppins font-extrabold text-foreground mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-foreground mb-6">Oops! Page Not Found.</h2>
      <p className="text-lg text-muted-foreground mb-10 max-w-md">
        It seems like the page you're looking for took a wrong turn. Don't worry, it happens to the best of us!
      </p>
      <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
        <Link href="/">Go Back to Homepage</Link>
      </Button>
    </motion.div>
  );
};

export default NotFoundPage;
