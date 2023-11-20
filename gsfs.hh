function displayContact() {
    var existingContacts = JSON.parse(localStorage.getItem("contacts"));
    var contactList = document.getElementById('contactList');
 
    if (existingContacts) {
        existingContacts.forEach(function (contact) {
            var contactElement = document.createElement('div');
            contactElement.className = 'contact';
contactElement.innerHTML = `${contact.name}
${contact.email}<br>${contact.mobile}<br><br>`;
 
            contactElement.onclick = function () {
                var allContacts = document.querySelectorAll('.contact');
                allContacts.forEach(function (element) {
                    element.classList.remove('active');
                });
                contactElement.classList.add('active');
                showFullDetails(contact);
            };