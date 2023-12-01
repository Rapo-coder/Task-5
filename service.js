class ContactService {
    constructor() 
    {
        this.contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    }

    updLocalStorage() 
    {
        localStorage.setItem('contacts', JSON.stringify(this.contacts));
    }

    saveContact(contact) 
    {
        contact.id = generateUniqueId();
        this.contacts.push(contact);
        this.updLocalStorage();
        alert('Contact added successfully');
    }
    
    updateContact(updatedContact) 
    {
        this.contacts= this.contacts.map(contact => (contact.id === updatedContact.id ? updatedContact : contact));
        this.updLocalStorage();
        alert('Contact updated successfully');
        return true;
    }

    deleteContact(contact) 
    {
        this.contacts = this.contacts.filter(elem => elem.id !== contact.id);
        this.updLocalStorage();
        alert('Contact deleted successfully');
        return true;
    }

    getContacts() 
    {
        return this.contacts;
    }

    getContactById(id) 
    {
        return this.contacts.find(contact => contact.id === id);
    }

}


