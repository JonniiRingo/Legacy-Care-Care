import React, { useState } from 'react';
    import { Outlet } from 'react-router-dom';
    import Navbar from '@/components/layout/Navbar';
    import Footer from '@/components/layout/Footer';
    import { Toaster } from '@/components/ui/toaster';
    import { Button } from '@/components/ui/button';
    import { motion, AnimatePresence } from 'framer-motion';
    import { useLocation } from 'react-router-dom';
    import { MessageSquare, X } from 'lucide-react';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { Input } from '@/components/ui/input';

    const ChatbotWidget = () => {
      const [isOpen, setIsOpen] = useState(false);
      const [messages, setMessages] = useState([{ id: 'initial', text: "Hey there! How can I help you get your ride sparkling today?", sender: 'bot' }]);
      const [inputValue, setInputValue] = useState('');
    
      const toggleChat = () => setIsOpen(!isOpen);
    
      const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
    
        const newUserMessage = { id: Date.now().toString(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
    
        // Placeholder for RAG chatbot response
        setTimeout(() => {
          const botResponse = { id: (Date.now() + 1).toString(), text: `Thanks for asking about "${inputValue}"! Our RAG chatbot is learning fast. For now, check our FAQ or services!`, sender: 'bot' };
          setMessages(prev => [...prev, botResponse]);
        }, 1000);
      };
    
      return (
        <>
          <motion.div
            className="fixed bottom-6 right-6 z-[999]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
          >
            <Button
              onClick={toggleChat}
              size="icon"
              className="rounded-full w-16 h-16 bg-primary hover:bg-primary/80 shadow-xl animate-bubble-pop"
              aria-label="Toggle Chatbot"
            >
              {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
            </Button>
          </motion.div>
    
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed bottom-24 right-6 z-[998] w-full max-w-sm"
              >
                <Card className="shadow-2xl bg-card border-primary/50">
                  <CardHeader className="bg-primary/10 p-4">
                    <CardTitle className="text-lg font-script text-primary">AngelinoWash Assistant</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-80 overflow-y-auto p-4 space-y-3 bg-background/50">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
                        >
                          <div
                            className={`max-w-[75%] p-3 rounded-lg text-sm ${
                              msg.sender === 'bot'
                                ? 'bg-secondary text-secondary-foreground rounded-br-none'
                                : 'bg-primary text-primary-foreground rounded-bl-none'
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-border flex gap-2 bg-card">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask about our services..."
                        className="flex-grow bg-input text-foreground placeholder:text-muted-foreground"
                      />
                      <Button type="submit" size="icon" className="bg-primary hover:bg-primary/80">
                        <MessageSquare className="h-5 w-5" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      );
    };


    const Layout = () => {
      const location = useLocation();
      return (
        <div className="flex flex-col min-h-screen bg-background bg-hero-pattern">
          <Navbar />
          <AnimatePresence mode="wait">
            <motion.main
              key={location.pathname}
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8"
            >
              <Outlet />
            </motion.main>
          </AnimatePresence>
          <Footer />
          <ChatbotWidget />
          <Toaster />
        </div>
      );
    };

    export default Layout;