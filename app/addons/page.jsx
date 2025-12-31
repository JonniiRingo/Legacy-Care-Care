'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';

const addOns = [
  { id: 1, name: "Clay", price: 95 },
  { id: 2, name: "Paint Correction (starting)", price: 299 },
  { id: 3, name: "Wax", price: 25 },
  { id: 4, name: "Sealant", price: 50 },
  { id: 5, name: "Ceramic", price: 75 },
  { id: 6, name: "Seats & Carpet Shampoo", price: 100 },
];

const AddOnsPage = () => {
  const [selected, setSelected] = useState([]);

  const toggleAddOn = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const total = 65 + selected.reduce((sum, id) => {
    const item = addOns.find((a) => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bangers text-greaser-cream text-center">Add-Ons</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {addOns.map((addon) => (
          <Card
            key={addon.id}
            className={`cursor-pointer border-2 ${selected.includes(addon.id) ? 'border-primary shadow-lg' : 'border-greaser-silver/30'} transition-all`}
            onClick={() => toggleAddOn(addon.id)}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {addon.name}
                <span className="text-greaser-gold font-bold">+${addon.price}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selected.includes(addon.id) && (
                <Check className="h-6 w-6 text-primary" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="max-w-lg mx-auto p-6 border-primary border-2 text-center">
        <CardTitle className="text-2xl font-bangers text-greaser-gold mb-4">Total: ${total}</CardTitle>
        <CardFooter className="flex justify-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/80 text-greaser-charcoal font-bold">
            <Link href={`/checkout?total=${total}`}>Proceed to Checkout</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddOnsPage;
