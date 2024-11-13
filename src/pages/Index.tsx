import { useState } from "react";
import ContactForm from "@/components/ContactForm";
import ContactList from "@/components/ContactList";

interface Contact {
  name: string;
  phone: string;
}

const Index = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const handleAddContact = (name: string, phone: string) => {
    setContacts([...contacts, { name, phone }]);
  };

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
            </div>
            <div className="w-full md:w-1/2">
              <ContactList contacts={contacts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;