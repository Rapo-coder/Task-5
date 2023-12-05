class ContactService {
    contacts: any = [];

    constructor() {
        const storedContacts = localStorage.getItem('contacts');
        this.contacts = storedContacts ? JSON.parse(storedContacts) : [];
    }

    updLocalStorage() {
        localStorage.setItem('contacts', JSON.stringify(this.contacts));
    }

    saveContact(contact: any) {
        contact.id = this.generateUniqueId();
        this.contacts.push(contact);
        this.updLocalStorage();
        alert('Contact added successfully');
    }

    updateContact(updatedContact: any) {
        this.contacts = this.contacts.map((contact: any) => (contact.id === updatedContact.id ? updatedContact : contact));
        this.updLocalStorage();
        alert('Contact updated successfully');
        return true;
    }

    deleteContact(contact: any) {
        this.contacts = this.contacts.filter((elem: any) => elem.id !== contact.id);
        this.updLocalStorage();
        alert('Contact deleted successfully');
        return true;
    }

    getContacts() {
        return this.contacts;
    }

    getContactById(id: string | undefined) {
        return this.contacts.find((contact: any) => contact.id === id);
    }

    generateUniqueId() {
        let idCounter: any = localStorage.getItem('idCounter');
        idCounter = idCounter ? Number(idCounter) : 0;
        idCounter++;
        localStorage.setItem('idCounter', idCounter.toString());
        return 'contact_' + idCounter.toString();
    }
}
