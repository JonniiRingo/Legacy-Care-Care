'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Droplet, Check } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const baseService = {
  id: 1,
  icon: <Droplet className="h-12 w-12 text-greaser-teal" />,
  title: "Legacy Signature Wash & Shine",
  description: "Full service wash & shine that covers all the essentials.",
  price: "$65",
  features: [
    "Wheel Decontamination",
    "Wheel Well Scrub & Shine & Protect",
    "Exterior Wash w/ Top Quality Soap",
    "Spray Wax",
    "Interior Vacuum, Wipe Down Dash",
    "Seats & Door Panels + Dressing",
    "Air Freshener",
  ],
  imageName: '/images/legacy_signature.png',
};

const BaseServicePage = () => {
  return (
    <div className="flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="max-w-lg w-full"
      >
        <Card className="h-full flex flex-col overflow-hidden bg-card-texture border-2 border-primary/30 shadow-xl hover:shadow-primary/40 transition-all duration-300">
          <CardHeader className="items-center text-center p-8 bg-greaser-charcoal/30">
            <div className="p-4 bg-greaser-charcoal rounded-full mb-4 border-2 border-primary">
              {baseService.icon}
            </div>
            <CardTitle className="text-3xl font-bangers text-primary">{baseService.title}</CardTitle>
            <CardDescription className="text-greaser-silver pt-2 font-sans">{baseService.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow p-8">
            <img 
              className="w-full h-56 object-cover rounded-md mb-6 shadow-lg border-2 border-greaser-silver/20"
              alt={baseService.title}
              src={baseService.imageName}
            />
            <ul className="space-y-2 mb-4 font-sans">
              {baseService.features.map((feature, i) => (
                <li key={i} className="flex items-center text-greaser-silver">
                  <Check className="h-5 w-5 text-greaser-gold mr-3 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="p-8 bg-greaser-charcoal/30 border-t border-primary/20 flex flex-col items-center sm:flex-row sm:justify-between">
            <p className="text-3xl font-bangers text-greaser-gold mb-4 sm:mb-0 text-shadow-soft">{baseService.price}</p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/80 text-greaser-charcoal font-bold shadow-md hover:shadow-lg w-full sm:w-auto">
              <Link href="/addons">Choose Add-Ons</Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default BaseServicePage;
