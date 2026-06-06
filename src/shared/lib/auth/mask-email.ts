export function maskEmail(email: string) {
    const [name, domain] = email.split("@");
  
    if (!name || !domain) {
      return email;
    }
  
    const visiblePart = name.slice(0, 2);
    const maskedPart = "*".repeat(Math.max(name.length - 2, 3));
  
    return `${visiblePart}${maskedPart}@${domain}`;
  }