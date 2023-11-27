class ContactService {
    constructor() {
        this.contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    }

    saveContact(contact) 
    {
        contact.id = generateUniqueId();
        this.contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(this.contacts));
        alert('Contact added successfully');
        window.onload();
        closeDialog();
    }
    
    updateContact(updatedContact) {
        this.contacts= this.contacts.map(contact => (contact.id === updatedContact.id ? updatedContact : contact));
        localStorage.setItem('contacts', JSON.stringify(this.contacts));
        alert('Contact updated successfully');
    }

    deleteContact(contact) {
        let index = this.contacts.findIndex(elem => elem.id === contact.id);
        this.contacts.splice(index, 1);
        localStorage.setItem('contacts', JSON.stringify(this.contacts));
        alert('Contact deleted successfully');
        return true
    }

    getContacts() {
        return this.contacts;
    }

    getContactById(id) {
        let filteredContact = this.contacts.filter(elem => elem.id === id);
        return filteredContact[0];
    }
}


