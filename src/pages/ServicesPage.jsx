import React from 'react';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Droplet, Zap, ShieldCheck, Wind, Sparkles } from 'lucide-react';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';

    const services = [
      {
        id: 1,
        icon: <Droplet className="h-12 w-12 text-greaser-teal" />,
        title: "The Quick Slick",
        description: "Mean exterior hand wash, wheel grime bustin', tire shine, and glass so clear it's criminal.",
        price: "$59",
        features: ["Hand Wash & Dry", "Wheel De-grease", "Tire Blackout", "Crystal Clear Glass"],
        imageName: '/images/the_quick_slick.png'
      },
      {
        id: 2,
        icon: <Wind className="h-12 w-12 text-greaser-teal" />,
        title: "The Inner Sanctum",
        description: "Full gut vacuum, dash & console wipe down, spotless glass, and door jambs so clean you can eat off 'em.",
        price: "$89",
        features: ["Deep Vacuum", "Dashboard Detail", "Interior Glass Polish", "Door Jamb Degrease"],
        imageName: '/images/the_inner_sanctum.png'
      },
      {
        id: 3,
        icon: <Sparkles className="h-12 w-12 text-greaser-gold" />,
        title: "The Full Monte",
        description: "The whole shebang: Quick Slick + Inner Sanctum, plus a slick coat of wax that'll make water fear your ride.",
        price: "$169",
        features: ["Quick Slick Exterior", "Inner Sanctum Interior", "Hand Wax & Buff", "Road Rebel Air Freshener"],
        imageName: '/images/the_full_monte.png'
      },
      {
        id: 4,
        icon: <ShieldCheck className="h-12 w-12 text-greaser-red" />,
        title: "The Iron Fortress",
        description: "Ceramic armor for your paint. Serious long-term shine & protection. Includes full decon.",
        price: "$549",
        features: ["Full Paint Decontamination", "Clay Bar Smoothness", "Pro Ceramic Coating", "Insane Gloss & Hydrophobics"],
        imageName: '/images/the_iron_fortress.png'
      },
    ];

    const ServicesPage = () => {
      return (
        <div className="space-y-16">
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-5xl font-bangers text-greaser-cream mb-4 text-shadow-hard">Our Detailing Arsenal</h1>
            <p className="text-lg text-greaser-silver max-w-2xl mx-auto font-sans">
              Pick your poison. From a quick shine-up to a full-blown restoration, we got the goods.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: "circOut" }}
              >
                <Card className="h-full flex flex-col overflow-hidden bg-card-texture border-2 border-primary/30 hover:border-primary shadow-xl hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader className="items-center text-center p-8 bg-greaser-charcoal/30">
                    <div className="p-4 bg-greaser-charcoal rounded-full mb-4 border-2 border-primary">
                       {service.icon}
                    </div>
                    <CardTitle className="text-3xl font-bangers text-primary">{service.title}</CardTitle>
                    <CardDescription className="text-greaser-silver pt-2 font-sans">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow p-8">
                    <img 
                      className="w-full h-56 object-cover rounded-md mb-6 shadow-lg border-2 border-greaser-silver/20"
                      alt={service.title}
                     src={service.imageName}
                     />
                    <ul className="space-y-2 mb-4 font-sans">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-greaser-silver">
                          <Zap className="h-5 w-5 text-greaser-gold mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="p-8 bg-greaser-charcoal/30 border-t border-primary/20 flex flex-col items-center sm:flex-row sm:justify-between">
                    <p className="text-3xl font-bangers text-greaser-gold mb-4 sm:mb-0 text-shadow-soft">{service.price}</p>
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/80 text-greaser-charcoal font-bold shadow-md hover:shadow-lg w-full sm:w-auto">
                      <Link to={`/schedule?service=${service.id}`}>Book This Bad Boy</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      );
    };

    export default ServicesPage;