interface Contact {
  name: string;
  phone: string;
}

export const generateVCF = (contacts: Contact[]): string => {
  return contacts
    .map((contact) => {
      return `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
TEL;TYPE=CELL:${contact.phone}
END:VCARD`;
    })
    .join("\n");
};

export const downloadVCF = (contacts: Contact[]) => {
  const vcfContent = generateVCF(contacts);
  const blob = new Blob([vcfContent], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "contacts.vcf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};