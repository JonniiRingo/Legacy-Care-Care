'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { CreditCard, ShieldCheck, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

    const CheckoutPage = () => {
      const { toast } = useToast();
      const [bookingDetailsFromState, setBookingDetailsFromState] = useState(null);

      useEffect(() => {
        const stored = localStorage.getItem('bookingDetails');
        if (stored) {
          try {
            setBookingDetailsFromState(JSON.parse(stored));
          } catch (e) {
            console.error('Error parsing booking details:', e);
          }
        }
      }, []);

      const bookingSummary = bookingDetailsFromState || {
        service: "The Full Monte",
        date: "Select Date",
        time: "Select Time",
        price: "$169.00", // Default if no state passed
        vehicleDetails: "Your Awesome Ride"
      };
      
      const handleProceedToPayment = () => {
        toast({
          title: "Stripe Checkout Time!",
          description: "This is where we'd launch Stripe. For now, it's a placeholder. Make sure your Stripe keys are set up!",
          duration: 7000,
          className: "bg-greaser-teal text-greaser-charcoal border-greaser-teal font-sans",
        });
        // Stripe integration logic will go here
      };

      return (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl mx-auto"
        >
          <Card className="shadow-2xl bg-card-texture border-2 border-greaser-gold/70">
            <CardHeader className="text-center p-8 bg-greaser-charcoal/30">
              <CreditCard className="h-20 w-20 mx-auto mb-4 text-greaser-gold" />
              <CardTitle className="text-5xl font-bangers text-greaser-gold text-shadow-hard">Settle Up, Boss</CardTitle>
              <CardDescription className="text-greaser-silver font-sans text-lg">
                Time to make it official. Secure payment for your killer wash.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 p-8">
              {!bookingDetailsFromState && (
                <div className="bg-destructive/20 border border-destructive text-destructive-foreground p-4 rounded-md flex items-start space-x-3">
                  <AlertTriangle className="h-6 w-6 mt-1 text-destructive" />
                  <div>
                    <h4 className="font-bold">Missing Booking Info!</h4>
                    <p className="text-sm">Looks like you landed here directly. For a real checkout, please book a service first.</p>
                  </div>
                </div>
              )}
              <div className="bg-greaser-charcoal/50 p-6 rounded-lg space-y-4 border border-primary/30 shadow-inner">
                <h3 className="text-3xl font-bangers text-primary">Your Damage:</h3>
                <div className="flex justify-between font-sans">
                  <span className="text-greaser-silver">Service:</span>
                  <span className="font-bold text-greaser-cream">{bookingSummary.service}</span>
                </div>
                <div className="flex justify-between font-sans">
                  <span className="text-greaser-silver">Vehicle:</span>
                  <span className="font-bold text-greaser-cream">{bookingSummary.vehicleDetails}</span>
                </div>
                <div className="flex justify-between font-sans">
                  <span className="text-greaser-silver">Date & Time:</span>
                  <span className="font-bold text-greaser-cream">{bookingSummary.date} at {bookingSummary.time}</span>
                </div>
                <hr className="border-primary/20 my-3" />
                <div className="flex justify-between text-2xl items-baseline">
                  <span className="font-bangers text-greaser-silver">Total:</span>
                  <span className="font-bangers text-4xl text-greaser-gold text-shadow-soft">{bookingSummary.price}</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-greaser-silver/80 flex items-center justify-center font-sans">
                  <ShieldCheck className="h-5 w-5 mr-2 text-greaser-teal" />
                  Your transaction is locked down tighter than Fort Knox.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-6 p-8 border-t border-primary/20 bg-greaser-charcoal/30">
              <Button 
                onClick={handleProceedToPayment} 
                size="lg" 
                className="w-full bg-gradient-to-r from-greaser-gold to-primary hover:from-primary hover:to-greaser-gold text-greaser-charcoal font-bold text-xl py-7 shadow-lg hover:shadow-primary/50 transform hover:scale-105 transition-all duration-300"
                disabled={!bookingDetailsFromState}
              >
                Pay With Stripe (Placeholder)
              </Button>
              <Button variant="outline" asChild className="w-full border-greaser-teal text-greaser-teal hover:bg-greaser-teal/20 hover:text-greaser-cream font-bold text-lg py-3">
                <Link href="/schedule">Change My Mind (Back to Schedule)</Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      );
    };

    export default CheckoutPage;