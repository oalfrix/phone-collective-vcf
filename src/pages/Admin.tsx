import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import AdminPanel from "@/components/AdminPanel";
import { Button } from "@/components/ui/button";

interface Contact {
  name: string;
  phone: string;
  approved?: boolean;
}

interface AdminProps {
  contacts: Contact[];
  onApprove: (index: number) => void;
  onReject: (index: number) => void;
  onEnableDownload: () => void;
}

const Admin = ({ contacts, onApprove, onReject, onEnableDownload }: AdminProps) => {
  const { isAdmin, logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 px-4 mx-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
          <AdminPanel
            contacts={contacts}
            onApprove={onApprove}
            onReject={onReject}
            onEnableDownload={onEnableDownload}
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;