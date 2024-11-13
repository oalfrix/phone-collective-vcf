import { useState } from "react";
import ContactForm from "@/components/ContactForm";
import ContactList from "@/components/ContactList";
import AdminLogin from "@/components/AdminLogin";
import AdminPanel from "@/components/AdminPanel";
import { AdminProvider, useAdmin } from "@/contexts/AdminContext";

interface Contact {
  name: string;
  phone: string;
  approved?: boolean;
}

const IndexContent = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [downloadEnabled, setDownloadEnabled] = useState(false);
  const { isAdmin } = useAdmin();

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

  const approvedContacts = contacts.filter((contact) => contact.approved);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 px-4 mx-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Contact Collector</h1>
            <p className="text-muted-foreground">
              Add contacts and download them as a VCF file
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-center">
            <div className="w-full md:w-1/2">
              <ContactForm onSubmit={handleAddContact} />
              {!isAdmin && (
                <div className="mt-8">
                  <AdminLogin />
                </div>
              )}
            </div>
            <div className="w-full md:w-1/2 space-y-8">
              {isAdmin && (
                <AdminPanel
                  contacts={contacts}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onEnableDownload={handleEnableDownload}
                />
              )}
              <ContactList
                contacts={approvedContacts}
                downloadEnabled={downloadEnabled}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Index = () => (
  <AdminProvider>
    <IndexContent />
  </AdminProvider>
);

export default Index;