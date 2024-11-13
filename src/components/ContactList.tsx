import { Button } from "@/components/ui/button";
import { downloadVCF } from "@/lib/vcf";
import { Download } from "lucide-react";

interface Contact {
  name: string;
  phone: string;
  approved?: boolean;
}

interface ContactListProps {
  contacts: Contact[];
  downloadEnabled?: boolean;
}

const ContactList = ({ contacts, downloadEnabled }: ContactListProps) => {
  return (
    <div className="w-full max-w-md space-y-4 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Approved Contacts ({contacts.length})</h2>
        {contacts.length > 0 && downloadEnabled && (
          <Button
            onClick={() => downloadVCF(contacts)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download VCF
          </Button>
        )}
      </div>
      <div className="space-y-2">
        {contacts.map((contact, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div className="font-medium">{contact.name}</div>
            <div className="text-sm text-muted-foreground">{contact.phone}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;