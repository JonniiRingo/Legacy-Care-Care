
    import React from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import Layout from '@/components/layout/Layout';
    import HomePage from '@/pages/HomePage';
    import ServicesPage from '@/pages/ServicesPage';
    import PricingPage from '@/pages/PricingPage';
    import SchedulePage from '@/pages/SchedulePage';
    import AuthPage from '@/pages/AuthPage';
    import CheckoutPage from '@/pages/CheckoutPage';
    import NotFoundPage from '@/pages/NotFoundPage';
    import { AuthProvider } from '@/contexts/AuthContext';
    import { Toaster } from '@/components/ui/toaster';

    function App() {
      return (
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="pricing" element={<PricingPage />} />
                <Route path="schedule" element={<SchedulePage />} />
                <Route path="auth" element={<AuthPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
                {/* Add more specific pages like FAQ, Contact, Profile etc. here */}
                <Route path="faq" element={<PlaceholderPage title="FAQ" />} />
                <Route path="contact" element={<PlaceholderPage title="Contact Us" />} />
                <Route path="privacy-policy" element={<PlaceholderPage title="Privacy Policy" />} />
                <Route path="terms-of-service" element={<PlaceholderPage title="Terms of Service" />} />
                <Route path="profile" element={<PlaceholderPage title="User Profile" />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Router>
          <Toaster />
        </AuthProvider>
      );
    }
    
    // Placeholder for pages not fully built yet
    const PlaceholderPage = ({ title }) => (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-muted-foreground">This page is under construction. Check back soon!</p>
        <img  alt={`${title} page under construction graphic`} className="mx-auto mt-8 w-1/2 max-w-md" src="https://images.unsplash.com/photo-1614332287897-cdc485fa562d" />
      </div>
    );

    export default App;
  