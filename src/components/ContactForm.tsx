import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface ContactFormProps {
  onSubmit: (name: string, phone: string) => void;
}

const ContactForm = ({ onSubmit }: ContactFormProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !phone.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Basic phone validation
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    if (!phoneRegex.test(phone)) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    onSubmit(name, phone);
    setName("");
    setPhone("");
    toast({
      title: "Success",
      description: "Contact added successfully!",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md animate-fadeIn">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <Input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full"
        />
      </div>
      <Button type="submit" className="w-full">
        Add Contact
      </Button>
    </form>
  );
};

export default ContactForm;