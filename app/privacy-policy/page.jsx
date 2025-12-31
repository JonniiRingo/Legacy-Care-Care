'use client';

import React from 'react';

const PlaceholderPage = ({ title }) => (
  <div className="text-center py-20">
    <h1 className="text-3xl font-bold mb-4">{title}</h1>
    <p className="text-muted-foreground">This page is under construction. Check back soon!</p>
    <img alt={`${title} page under construction graphic`} className="mx-auto mt-8 w-1/2 max-w-md" src="https://images.unsplash.com/photo-1614332287897-cdc485fa562d" />
  </div>
);

export default function PrivacyPolicyPage() {
  return <PlaceholderPage title="Privacy Policy" />;
}

