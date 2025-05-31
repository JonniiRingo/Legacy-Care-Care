import React from 'react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { CheckCircle, Sparkles, Zap } from 'lucide-react';
    import { motion } from 'framer-motion';

    const HomePage = () => {
      const features = [
        {
          icon: <Sparkles className="h-12 w-12 text-greaser-gold" />,
          title: "Killer Shine",
          description: "Top-shelf potions for a gleam that'll make heads turn.",
        },
        {
          icon: <Zap className="h-12 w-12 text-greaser-teal" />,
          title: "We Roll To You",
          description: "Book it, forget it. We show up, you chill. Easy peasy.",
        },
        {
          icon: <CheckCircle className="h-12 w-12 text-greaser-red" />,
          title: "Earth Friendly",
          description: "Clean rides, clean conscience. We dig Mother Earth.",
        },
      ];

      return (
        <div className="space-y-20">
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative text-center py-24 md:py-40 rounded-xl overflow-hidden bg-gradient-to-br from-greaser-charcoal via-background to-greaser-charcoal border-2 border-primary/40 shadow-2xl"
          >
            <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
            <div className="relative z-10 container mx-auto px-4">
              <motion.h1 
                className="text-5xl md:text-7xl font-bangers text-greaser-cream mb-6 text-shadow-hard"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
              >
                Your Ride, <span className="text-primary">Boss</span> Clean.
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-greaser-silver mb-12 max-w-2xl mx-auto font-sans"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                AngelinoWash: Mobile detailing with that classic LA grit &amp; shine. We make your machine look mean.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-greaser-gold hover:from-greaser-gold hover:to-primary text-greaser-charcoal font-bold px-12 py-8 text-xl rounded-lg shadow-lg hover:shadow-primary/50 transform hover:scale-105 transition-all duration-300">
                  <Link to="/schedule">Book Your Detail</Link>
                </Button>
              </motion.div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div>
          </motion.section>

          <motion.section 
            className="py-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.25 }}
          >
            <h2 className="text-5xl font-bangers text-center mb-16 text-greaser-cream text-shadow-hard">Why We're The Joint</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 60, rotateX: -30 },
                    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: "circOut" } }
                  }}
                >
                  <Card className="text-center h-full bg-card-texture border-2 border-greaser-teal/30 hover:border-greaser-teal shadow-xl hover:shadow-greaser-teal/30 transition-all duration-300 transform hover:-translate-y-2">
                    <CardHeader className="p-8">
                      <div className="mx-auto bg-greaser-charcoal p-4 rounded-full w-fit mb-5 border-2 border-greaser-teal">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-3xl font-bangers text-greaser-teal">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                      <CardDescription className="text-greaser-silver font-sans text-base">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section 
            className="py-20 bg-greaser-charcoal/70 rounded-xl border border-primary/20 shadow-inner-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img 
                  className="rounded-lg shadow-2xl aspect-video object-cover border-4 border-greaser-gold/50 transform transition-all duration-500 hover:scale-105 hover:shadow-greaser-gold/40"
                  alt="Classic car getting detailed with graffiti background"
                 src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d" />
                 <div className="absolute -bottom-4 -right-4 -z-10 w-full h-full bg-primary/50 rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              </div>
              <div>
                <h2 className="text-5xl font-bangers text-greaser-cream mb-8 text-shadow-hard">How It Rolls</h2>
                <ol className="space-y-8 font-sans">
                  {[
                    { title: "Hit Us Up Online", description: "Pick your poison (service, date, time). Quick & dirty." },
                    { title: "We Cruise To You", description: "Our crew lands at your spot, locked & loaded." },
                    { title: "Ride Like New", description: "You kick back, we make your wheels look badass." },
                  ].map((step, index) => (
                    <li key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 h-12 w-12 bg-primary text-greaser-charcoal rounded-full flex items-center justify-center font-bangers text-2xl shadow-md border-2 border-greaser-gold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bangers text-greaser-teal">{step.title}</h3>
                        <p className="text-greaser-silver">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <Button asChild size="lg" className="mt-10 bg-greaser-teal hover:bg-greaser-teal/80 text-greaser-charcoal font-bold shadow-md hover:shadow-lg">
                  <Link to="/services">See The Damage (Services)</Link>
                </Button>
              </div>
            </div>
          </motion.section>

          <motion.section 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bangers text-greaser-cream mb-6 text-shadow-hard">Ready To Ride Clean?</h2>
            <p className="text-lg text-greaser-silver mb-10 max-w-xl mx-auto font-sans">
              LA's finest grease monkeys are ready to make your car shine. Don't be a square, book it!
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-greaser-gold hover:from-greaser-gold hover:to-primary text-greaser-charcoal font-bold px-12 py-8 text-xl rounded-lg shadow-lg hover:shadow-primary/50 transform hover:scale-105 transition-all duration-300">
              <Link to="/schedule">Get Your Shine On</Link>
            </Button>
          </motion.section>
        </div>
      );
    };

    export default HomePage;