  class ContactService {
    contacts: Contact[] = [];
  
    constructor() {
      const storedContacts = localStorage.getItem('contacts');
      this.contacts = storedContacts ? JSON.parse(storedContacts) : [];
    }
  
    updLocalStorage() {
      localStorage.setItem('contacts', JSON.stringify(this.contacts));
    }
  
    saveContact(contact: Contact): Contact {
      contact.id = this.generateUniqueId();
      this.contacts.push(contact);
      this.updLocalStorage();
      alert('Contact added successfully');
      return contact;
    }
  
    updateContact(updatedContact: Contact): boolean {
      this.contacts = this.contacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      );
      this.updLocalStorage();
      alert('Contact updated successfully');
      return true;
    }
  
    deleteContact(contact: Contact):boolean {
      this.contacts = this.contacts.filter((elem) => elem.id !== contact.id);
      this.updLocalStorage();
      alert('Contact deleted successfully');
      return true;
    }
  
    getContacts(): Contact[] {
      return this.contacts;
    }
  
    getContactById(id: string): Contact | undefined {
      return this.contacts.find((contact) => contact.id === id);
    }
  
    generateUniqueId(): string {
      let idCounter: number | null = Number(localStorage.getItem('idCounter'));
      idCounter = idCounter ? idCounter : 0;
      idCounter++;
      localStorage.setItem('idCounter', idCounter.toString());
      return 'contact_' + idCounter.toString();
    }
  }
  