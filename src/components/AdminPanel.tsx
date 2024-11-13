import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface Contact {
  name: string;
  phone: string;
  approved?: boolean;
}

interface AdminPanelProps {
  contacts: Contact[];
  onApprove: (index: number) => void;
  onReject: (index: number) => void;
  onEnableDownload: () => void;
}

const AdminPanel = ({ contacts, onApprove, onReject, onEnableDownload }: AdminPanelProps) => {
  const { isAdmin, logout } = useAdmin();
  const pendingContacts = contacts.filter((contact) => !contact.approved);
  const approvedContacts = contacts.filter((contact) => contact.approved);

  if (!isAdmin) return null;

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Admin Panel</h2>
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-medium">Pending Contacts ({pendingContacts.length})</h3>
        {pendingContacts.map((contact, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm flex justify-between items-center"
          >
            <div>
              <div className="font-medium">{contact.name}</div>
              <div className="text-sm text-muted-foreground">{contact.phone}</div>
            </div>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => onApprove(index)}
                className="text-green-500 hover:text-green-600"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => onReject(index)}
                className="text-red-500 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {approvedContacts.length >= 5 && (
        <Button onClick={onEnableDownload} className="w-full">
          Enable Download ({approvedContacts.length} contacts)
        </Button>
      )}
    </div>
  );
};

export default AdminPanel;