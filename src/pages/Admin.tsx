import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLogin from "@/components/AdminLogin";
import AdminPanel from "@/components/AdminPanel";
import { useAdmin } from "@/contexts/AdminContext";

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
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 px-4 mx-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
            <p className="text-muted-foreground">
              Manage contacts and enable downloads
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-8">
            {!isAdmin ? (
              <AdminLogin />
            ) : (
              <AdminPanel
                contacts={contacts}
                onApprove={onApprove}
                onReject={onReject}
                onEnableDownload={onEnableDownload}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;