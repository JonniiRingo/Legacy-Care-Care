'use client';

import React from 'react';
import Link from 'next/link';
    import { Sparkles, Facebook, Instagram, Twitter } from 'lucide-react';

    const Footer = () => {
      const currentYear = new Date().getFullYear();

      return (
        <footer className="bg-greaser-charcoal text-greaser-silver py-12 border-t-2 border-primary/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <Link href="/" className="flex items-center space-x-2 text-primary mb-4 group">
                  <Sparkles className="h-10 w-10 text-greaser-gold group-hover:animate-pulse" />
                  <span className="text-3xl font-bangers tracking-wider text-greaser-cream text-shadow-soft">Legacy Car Car</span>
                </Link>
                <p className="text-sm font-sans">
                  Old school cool, new school clean. Your ride, our pride.
                </p>
                <div className="flex space-x-4 mt-6">
                  <a href="https://www.facebook.com/profile.php?id=100067733799526&mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-greaser-silver hover:text-primary transition-colors">
                    <Facebook className="h-7 w-7" />
                  </a>
                  <a href="https://www.instagram.com/legacy_car_care/" target="_blank" rel="noopener noreferrer" className="text-greaser-silver hover:text-primary transition-colors">
                    <Instagram className="h-7 w-7" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="text-greaser-silver hover:text-primary transition-colors">
                    <Twitter className="h-7 w-7" />
                  </a>
                </div>
              </div>

              <div>
                <p className="font-bangers text-2xl text-greaser-cream mb-4 text-shadow-soft">Quick Links</p>
                <ul className="space-y-2 font-sans">
                  <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
                  <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                  <li><Link href="/schedule" className="hover:text-primary transition-colors">Book Now</Link></li>
                  <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                </ul>
              </div>

              <div>
                <p className="font-bangers text-2xl text-greaser-cream mb-4 text-shadow-soft">Holler At Us</p>
                <ul className="space-y-2 font-sans">
                  <li><span className="text-sm">Email: noebenyisrael@gmail.com</span></li>
                  <li><span className="text-sm">Call/Text: (526) 243-9350</span></li>
                  <li><span className="text-sm">Cruisin' All Over LA</span></li>
                </ul>
              </div>
            </div>

            <div className="mt-12 border-t border-primary/30 pt-8 text-center text-sm font-sans">
              <p>&copy; {currentYear} Legacy Car Care. Keepin' it clean since '95.</p>
              <p className="mt-1">
                <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy</Link> | 
                <Link href="/terms-of-service" className="hover:text-primary transition-colors ml-1">Terms</Link>
              </p>
            </div>
          </div>
        </footer>
      );
    };

    export default Footer;