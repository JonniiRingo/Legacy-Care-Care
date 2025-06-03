import React from 'react';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Check, Star } from 'lucide-react';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';

    const pricingPackages = [
      {
        name: "The Greaser",
        price: "$79",
        frequency: "Essential Shine",
        features: [
          "Badass Exterior Wash",
          "Wheel & Tire Clean",
          "Tire Shine",
          "Quick Interior Vac",
          "Windows In & Out",
        ],
        popular: false,
        cta: "Get Greasy",
        imageName: "Classic American muscle car"
      },
      {
        name: "The Pinstriper",
        price: "$149",
        frequency: "Showroom Ready",
        features: [
          "All Greaser Features",
          "Dash & Console Detail",
          "Door Jamb Degrease",
          "Spray Wax Sizzle",
          "Choice of Scent Bomb",
        ],
        popular: true,
        cta: "Get Pinstriped",
        imageName: "Custom pinstriped hot rod"
      },
      {
        name: "The Kustom King",
        price: "$279",
        frequency: "Concours Contender",
        features: [
          "All Pinstriper Features",
          "Carpet & Upholstery Deep Clean",
          "Leather Love Treatment",
          "Clay Bar Smoothness",
          "3-Month Paint Armor",
        ],
        popular: false,
        cta: "Rule The Kustoms",
        imageName: "Flawless custom lowrider"
      },
    ];

    const PricingPage = () => {
      return (
        <div className="space-y-16">
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-5xl font-bangers text-greaser-cream mb-4 text-shadow-hard">Our Price Tags</h1>
            <p className="text-lg text-greaser-silver max-w-2xl mx-auto font-sans">
              No funny business. Pick your package, get your shine. Simple as that, boss.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-10 items-stretch">
            {pricingPackages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 60, rotateY: -20 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "circOut" }}
                className={`flex ${pkg.popular ? 'transform lg:scale-105 z-10' : ''}`}
              >
                <Card className={`w-full flex flex-col bg-card-texture border-2 ${pkg.popular ? 'border-primary shadow-2xl shadow-primary/30' : 'border-greaser-teal/30 hover:border-greaser-teal shadow-xl hover:shadow-greaser-teal/20'} transition-all duration-300`}>
                  <CardHeader className="text-center p-8 relative overflow-hidden">
                    {pkg.popular && (
                      <div className="absolute top-4 right-4 bg-primary p-2 rounded-full shadow-lg">
                        <Star className="h-6 w-6 text-greaser-gold fill-current" />
                      </div>
                    )}
                    <CardTitle className={`text-4xl font-bangers mt-2 ${pkg.popular ? 'text-primary' : 'text-greaser-teal'}`}>{pkg.name}</CardTitle>
                    <CardDescription className="text-greaser-silver font-sans">{pkg.frequency}</CardDescription>
                    <p className={`text-5xl font-bangers mt-4 ${pkg.popular ? 'text-greaser-gold' : 'text-greaser-cream'} text-shadow-soft`}>{pkg.price}</p>
                  </CardHeader>
                  <CardContent className="flex-grow p-8 space-y-4">
                    <img 
                      className="w-full h-48 object-cover rounded-md mb-6 shadow-lg border-2 border-greaser-silver/20"
                      alt={`${pkg.name} package example car`}
                     src="https://images.unsplash.com/photo-1541443131839-7938d0273930" />
                    <ul className="space-y-3 font-sans">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <Check className={`h-6 w-6 mr-3 flex-shrink-0 ${pkg.popular ? 'text-primary' : 'text-greaser-teal'}`} />
                          <span className="text-greaser-silver">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="p-8 border-t border-primary/20">
                    <Button asChild size="lg" className={`w-full font-bold text-lg py-7 ${pkg.popular ? 'bg-gradient-to-r from-primary to-greaser-gold hover:from-greaser-gold hover:to-primary text-greaser-charcoal shadow-lg hover:shadow-primary/50' : 'bg-greaser-teal hover:bg-greaser-teal/80 text-greaser-charcoal shadow-md hover:shadow-lg'}`}>
                      <Link to={`/schedule?package=${pkg.name.toLowerCase().replace(/\s+/g, '-')}`}>{pkg.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-20 p-10 bg-greaser-charcoal/70 rounded-xl border border-primary/20 shadow-inner-xl"
          >
            <h2 className="text-4xl font-bangers text-greaser-cream mb-4 text-shadow-hard">Got A Special Project?</h2>
            <p className="text-greaser-silver mb-8 max-w-lg mx-auto font-sans">
              Fleet of lowriders? Garage full of classics? Hit us up. We'll talk turkey.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-greaser-gold hover:from-greaser-gold hover:to-primary text-greaser-charcoal font-bold shadow-lg hover:shadow-primary/50">
              <Link to="/contact">Talk To The Boss</Link>
            </Button>
          </motion.div>
        </div>
      );
    };

    export default PricingPage;