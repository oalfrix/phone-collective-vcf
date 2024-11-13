import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  const { toast } = useToast();

  const handleEnableDownload = () => {
    onEnableDownload();
    toast({
      title: "Success",
      description: "VCF download has been enabled",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Contact Approval</h2>
        <Button onClick={handleEnableDownload}>Enable VCF Download</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact, index) => (
            <TableRow key={index}>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell>{contact.approved ? "Approved" : "Pending"}</TableCell>
              <TableCell>
                {!contact.approved && (
                  <div className="space-x-2">
                    <Button
                      size="sm"
                      onClick={() => onApprove(index)}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onReject(index)}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminPanel;