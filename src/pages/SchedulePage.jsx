import React, { useState } from 'react';
    import { Button } from '@/components/ui/button';
    import { Calendar } from '@/components/ui/calendar';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Textarea } from '@/components/ui/textarea';
    import { useToast } from '@/components/ui/use-toast';
    import { motion } from 'framer-motion';
    import { useNavigate } from 'react-router-dom';
    import { Car, CalendarDays, Clock, MapPin, User, MessageSquare } from 'lucide-react';

    
    const timeSlots = [
      "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
      "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
    ];

    const SchedulePage = () => {
      const navigate = useNavigate()
      const [selectedDate, setSelectedDate] = useState(new Date());
      const [selectedTime, setSelectedTime] = useState('');
      const [name, setName] = useState('');
      const [phone, setPhone] = useState('');
      const [address, setAddress] = useState('');
      const [vehicleDetails, setVehicleDetails] = useState('');
      const [specialRequests, setSpecialRequests] = useState('');
      const { toast } = useToast();

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedDate || !selectedTime || !name || !phone || !address || !vehicleDetails) {
          toast({
            title: "Hold Up, Chief!",
            description: "Gotta fill out all the main fields to book your shine.",
            variant: "destructive",
            className: "bg-destructive text-destructive-foreground border-greaser-red font-sans",

          });
          return;
        }
        
        const bookingDetails = {
          date: selectedDate.toLocaleDateString(),
          time: selectedTime,
          name,
          phone,
          address,
          vehicleDetails,
          specialRequests,
        };
        
        console.log("Booking Submitted:", bookingDetails);
        localStorage.setItem('lastBooking', JSON.stringify(bookingDetails));

        // Placeholder for SMS notification
        const smsMessage = `${name} just booked a wash for a ${vehicleDetails} on ${bookingDetails.date} at ${bookingDetails.time}. Address: ${address}. Phone: ${phone}. Requests: ${specialRequests || 'None'}. Price: (example $XX.XX)`;
        console.log("SMS to owner (simulated):", smsMessage);
        // In a real app, an API call to Twilio/etc. would go here.

        toast({
          title: "Booked In, Boss!",
          description: `We got your request for ${selectedDate.toLocaleDateString()} at ${selectedTime}. We'll buzz ya to confirm.`,
          className: "bg-greaser-teal text-greaser-charcoal border-greaser-teal font-sans",
        });
        
        setSelectedDate(new Date());
        setSelectedTime('');
        setName('');
        setPhone('');
        setAddress('');
        setVehicleDetails('');
        setSpecialRequests('');
        navigate('/checkout', {state: { bookingDetails } });
      };

      return (
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bangers text-greaser-cream mb-4 text-shadow-hard">Lock In Your Shine Time</h1>
            <p className="text-lg text-greaser-silver font-sans">
              Pick a slot, tell us where to roll. We'll handle the rest.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "circOut" }}
          >
            <Card className="shadow-2xl bg-card-texture border-2 border-primary/50">
              <CardHeader className="bg-greaser-charcoal/30 p-8">
                <CardTitle className="text-4xl font-bangers text-center text-primary">Booking Deets</CardTitle>
                <CardDescription className="text-center text-greaser-silver font-sans">
                  Lay it on us. The more info, the better the shine.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid md:grid-cols-2 gap-10 items-start">
                    <div className="space-y-4">
                      <Label htmlFor="date" className="flex items-center text-xl font-bangers text-greaser-teal">
                        <CalendarDays className="mr-3 h-7 w-7 text-greaser-gold" /> Pick A Day
                      </Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border-2 border-greaser-teal/50 bg-greaser-charcoal text-greaser-cream shadow-lg"
                        disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1)) } 
                        classNames={{
                            caption_label: "font-bangers text-xl text-greaser-gold",
                            head_cell: "text-greaser-silver font-sans",
                            day: "hover:bg-greaser-teal/50 focus:bg-greaser-teal/50 rounded-md font-sans",
                            day_selected: "bg-greaser-teal text-greaser-charcoal hover:bg-greaser-teal font-bold rounded-md",
                            day_today: "text-greaser-gold font-bold border border-greaser-gold rounded-md",
                            day_disabled: "text-greaser-silver/50",
                        }}
                      />
                    </div>
                    <div className="space-y-4">
                      <Label htmlFor="time" className="flex items-center text-xl font-bangers text-greaser-teal">
                        <Clock className="mr-3 h-7 w-7 text-greaser-gold" /> Snag A Slot
                      </Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {timeSlots.map(time => (
                          <Button
                            key={time}
                            type="button"
                            variant={selectedTime === time ? "default" : "outline"}
                            onClick={() => setSelectedTime(time)}
                            className={`w-full py-3 text-base font-sans ${selectedTime === time ? 'bg-greaser-teal text-greaser-charcoal hover:bg-greaser-teal/90 border-greaser-teal ring-2 ring-greaser-gold' : 'bg-greaser-charcoal/50 text-greaser-silver hover:bg-greaser-charcoal hover:text-greaser-cream border-greaser-silver/50'}`}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center font-sans text-greaser-silver">
                        <User className="mr-2 h-5 w-5 text-greaser-gold" /> Your Handle (Name)
                      </Label>
                      <Input id="name" placeholder="e.g. Johnny Rocket" value={name} onChange={(e) => setName(e.target.value)} required className="bg-input text-foreground placeholder:text-muted-foreground border-greaser-silver/50 focus:border-greaser-teal focus:ring-greaser-teal font-sans" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center font-sans text-greaser-silver">
                        <User className="mr-2 h-5 w-5 text-greaser-gold" /> Digits (Phone)
                      </Label>
                      <Input id="phone" type="tel" placeholder="e.g. (555) GET-SHINE" value={phone} onChange={(e) => setPhone(e.target.value)} required className="bg-input text-foreground placeholder:text-muted-foreground border-greaser-silver/50 focus:border-greaser-teal focus:ring-greaser-teal font-sans" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="flex items-center font-sans text-greaser-silver">
                      <MapPin className="mr-2 h-5 w-5 text-greaser-gold" /> Where's The Party At? (Address)
                    </Label>
                    <Input id="address" placeholder="e.g. 123 Greaser Alley, Los Angeles, CA" value={address} onChange={(e) => setAddress(e.target.value)} required className="bg-input text-foreground placeholder:text-muted-foreground border-greaser-silver/50 focus:border-greaser-teal focus:ring-greaser-teal font-sans" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vehicle" className="flex items-center font-sans text-greaser-silver">
                      <Car className="mr-2 h-5 w-5 text-greaser-gold" /> What's Your Ride? (Make & Model)
                    </Label>
                    <Input id="vehicle" placeholder="e.g. '57 Chevy Bel Air" value={vehicleDetails} onChange={(e) => setVehicleDetails(e.target.value)} required className="bg-input text-foreground placeholder:text-muted-foreground border-greaser-silver/50 focus:border-greaser-teal focus:ring-greaser-teal font-sans" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="specialRequests" className="flex items-center font-sans text-greaser-silver">
                      <MessageSquare className="mr-2 h-5 w-5 text-greaser-gold" /> Any Special Demands? (Optional)
                    </Label>
                    <Textarea id="specialRequests" placeholder="e.g. Extra shine on the chrome, go easy on the fuzzy dice..." value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} className="bg-input text-foreground placeholder:text-muted-foreground border-greaser-silver/50 focus:border-greaser-teal focus:ring-greaser-teal font-sans min-h-[100px]" />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-greaser-gold hover:from-greaser-gold hover:to-primary text-greaser-charcoal font-bold text-xl py-7 shadow-lg hover:shadow-primary/50 transform hover:scale-105 transition-all duration-300">
                    Book That Wash!
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      );
    };
    
    export default SchedulePage;