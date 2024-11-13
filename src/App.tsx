import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "@/contexts/AdminContext";
import Index from "./pages/Index";
import Admin from "./pages/Admin";

interface Contact {
  name: string;
  phone: string;
  approved?: boolean;
}

const queryClient = new QueryClient();

const App = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [downloadEnabled, setDownloadEnabled] = useState(false);

  const handleApprove = (index: number) => {
    setContacts(contacts.map((contact, i) => 
      i === index ? { ...contact, approved: true } : contact
    ));
  };

  const handleReject = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const handleEnableDownload = () => {
    setDownloadEnabled(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route 
                path="/" 
                element={
                  <Index 
                    contacts={contacts}
                    setContacts={setContacts}
                    downloadEnabled={downloadEnabled}
                  />
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <Admin
                    contacts={contacts}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onEnableDownload={handleEnableDownload}
                  />
                } 
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AdminProvider>
    </QueryClientProvider>
  );
};

export default App;