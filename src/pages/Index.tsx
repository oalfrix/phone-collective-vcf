import { Link } from "react-router-dom";
import ContactForm from "@/components/ContactForm";
import ContactList from "@/components/ContactList";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/contexts/AdminContext";

interface Contact {
  name: string;
  phone: string;
  approved?: boolean;
}

interface IndexProps {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  downloadEnabled: boolean;
}

const Index = ({ contacts, setContacts, downloadEnabled }: IndexProps) => {
  const { isAdmin } = useAdmin();

  const handleAddContact = (contact: Contact) => {
    setContacts([...contacts, contact]);
  };

  const approvedContacts = contacts.filter((contact) => contact.approved);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 px-4 mx-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Contact Manager</h1>
            <p className="text-muted-foreground">
              Add and manage your contacts
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <ContactForm onSubmit={handleAddContact} />
              {!isAdmin && (
                <div className="mt-8">
                  <Link to="/admin">
                    <Button variant="outline" className="w-full">
                      Admin Login
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            <div className="w-full md:w-1/2">
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

export default Index;