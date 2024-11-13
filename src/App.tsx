import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "@/contexts/AdminContext";
import { useState } from "react";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import AdminLogin from "./components/AdminLogin";

interface Contact {
  name: string;
  phone: string;
  approved?: boolean;
}

const queryClient = new QueryClient();

const App = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [downloadEnabled, setDownloadEnabled] = useState(false);

  const handleAddContact = (name: string, phone: string) => {
    setContacts([...contacts, { name, phone, approved: false }]);
  };

  const handleApprove = (index: number) => {
    const newContacts = [...contacts];
    newContacts[index].approved = true;
    setContacts(newContacts);
  };

  const handleReject = (index: number) => {
    const newContacts = contacts.filter((_, i) => i !== index);
    setContacts(newContacts);
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
                    onAddContact={handleAddContact}
                    downloadEnabled={downloadEnabled}
                  />
                } 
              />
              <Route path="/admin" element={<AdminLogin />} />
              <Route 
                path="/admin/panel" 
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