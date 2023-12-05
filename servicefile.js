var ContactService = /** @class */ (function () {
    function ContactService() {
        this.contacts = [];
        var storedContacts = localStorage.getItem('contacts');
        this.contacts = storedContacts ? JSON.parse(storedContacts) : [];
    }
    ContactService.prototype.updLocalStorage = function () {
        localStorage.setItem('contacts', JSON.stringify(this.contacts));
    };
    ContactService.prototype.saveContact = function (contact) {
        contact.id = this.generateUniqueId();
        this.contacts.push(contact);
        this.updLocalStorage();
        alert('Contact added successfully');
    };
    ContactService.prototype.updateContact = function (updatedContact) {
        this.contacts = this.contacts.map(function (contact) { return (contact.id === updatedContact.id ? updatedContact : contact); });
        this.updLocalStorage();
        alert('Contact updated successfully');
        return true;
    };
    ContactService.prototype.deleteContact = function (contact) {
        this.contacts = this.contacts.filter(function (elem) { return elem.id !== contact.id; });
        this.updLocalStorage();
        alert('Contact deleted successfully');
        return true;
    };
    ContactService.prototype.getContacts = function () {
        return this.contacts;
    };
    ContactService.prototype.getContactById = function (id) {
        return this.contacts.find(function (contact) { return contact.id === id; });
    };
    ContactService.prototype.generateUniqueId = function () {
        var idCounter = localStorage.getItem('idCounter');
        idCounter = idCounter ? Number(idCounter) : 0;
        idCounter++;
        localStorage.setItem('idCounter', idCounter.toString());
        return 'contact_' + idCounter.toString();
    };
    return ContactService;
}());
