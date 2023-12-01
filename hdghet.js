var contactService = new ContactService();

// Initialize contact list on page load
window.onload = function () {
  displayContact();
};

function openDialog() {
  var addDialog = document.getElementById('addDialog');
  addDialog.classList.add('dialog-open');
  addDialog.classList.remove('dialog-closed');
}

function closeDialog() {
  var addDialog = document.getElementById('addDialog');
  addDialog.classList.remove('dialog-open');
  addDialog.classList.add('dialog-closed');
  document.getElementById('addUpdateButton').textContent = 'Add';
}

function cancelDialog() {
  dialog.classList.add("hidden");
  document.getElementById("error_message").innerText = "";
  clearFormFields();
}

function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidMobile(mobile) {
  var mobileRegex = /^\d{10}$/;
  return mobileRegex.test(mobile);
}

function generateUniqueId() {
  var idCounter = parseInt(localStorage.getItem('idCounter')) || 0;
  idCounter++;
  localStorage.setItem('idCounter', idCounter);
  return 'contact_' + idCounter.toString();
}

function addNewContact() {
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var mobile = document.getElementById('mobile').value;
  var landline = document.getElementById('landline').value;
  var website = document.getElementById('website').value;
  var address = document.getElementById('address').value;

  if (!isValidMobile(mobile)) {
    alert("Please enter a valid mobile number.");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  var contact = new Contact(name, email, mobile, landline, website, address);
  contactService.saveContact(contact);

  // Clear input fields directly
  clearInputFields();

  // Create and insert the new contact card directly
  var contactElement = createContactElement(contact);
  var contactList = document.getElementById('contactList');
  contactList.appendChild(contactElement);

  markAsActiveAndDisplayDetails(contact.id); // Optional: Mark as active and display details
}

function updateContact() {
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var mobile = document.getElementById('mobile').value;
  var landline = document.getElementById('landline').value;
  var website = document.getElementById('website').value;
  var address = document.getElementById('address').value;
  var addButton = document.getElementById('addUpdateButton');

  var updatedContact = new Contact(name, email, mobile, landline, website, address, addButton.dataset.contactId);
  contactService.updateContact(updatedContact);

  // Close dialog and clear input fields directly
  closeDialog();
  clearInputFields();
  showFullDetails(addButton.dataset.contact)

  // Update the existing contact element directly
  var updatedContactElement = updateContactElement(updatedContact);
  var contactList = document.getElementById('contactList');
  var existingContactElement = document.querySelector(`.contact[data-id="${updatedContact.id}"]`);

  if (existingContactElement) {
    contactList.replaceChild(updatedContactElement, existingContactElement);
  }

  markAsActiveAndDisplayDetails(updatedContact.id);
}

function createContactElement(contact) {
  var contactElement = document.createElement('div');
  contactElement.className = 'contact';
  contactElement.dataset.id = contact.id;

  var nameElement = document.createElement('div');
  nameElement.className = 'contact-name';
  nameElement.textContent = contact.name;
  contactElement.appendChild(nameElement);

  var emailElement = document.createElement('div');
  emailElement.textContent = contact.email;
  contactElement.appendChild(emailElement);

  var mobileElement = document.createElement('div');
  mobileElement.textContent = contact.mobile;
  contactElement.appendChild(mobileElement);

  contactElement.onclick = function () {
    var allContacts = document.querySelectorAll('.contact');
    allContacts.forEach(function (element) {
      element.classList.remove('active');
    });
    contactElement.classList.add('active');
    showFullDetails(contact.id);
  };

  return contactElement;
}

function updateContactElement(contact) {
  var updatedContactElement = createContactElement(contact);
  updatedContactElement.classList.add('active'); // Preserve the active state

  return updatedContactElement;
}

function addOrUpdateContact() {
  var addButton = document.getElementById('addUpdateButton');
  if (addButton.textContent === 'Update') {
    updateContact();
  } else {
    addNewContact();
  }
}

function openEditDialog(contact) {
  document.getElementById('name').value = contact.name;
  document.getElementById('email').value = contact.email;
  document.getElementById('mobile').value = contact.mobile;
  document.getElementById('landline').value = contact.landline;
  document.getElementById('website').value = contact.website;
  document.getElementById('address').value = contact.address;

  document.getElementById('addUpdateButton').textContent = 'Update';
  document.getElementById('addUpdateButton').dataset.contactId = contact.id;
  openDialog();
}

function closeDetailsBox() {
  var fullDetailsBox = document.getElementById('fullDetailsBox');
  fullDetailsBox.innerHTML = '';
}

function displayContact() {
  var existingContacts = contactService.getContacts();
  console.log('Existing Contacts:', existingContacts);
  var contactList = document.getElementById('contactList');
  contactList.textContent = "";

  if (existingContacts) {
    existingContacts.forEach(function (contact) {
      var contactElement = createContactElement(contact);
      contactList.appendChild(contactElement);
    });
  }
}

function showFullDetails(id) {
  let contact = contactService.getContactById(id);
  let editButton = document.getElementById('editButton');
  var deleteButton = document.getElementById('deleteButton');
  let fullDetailsBox = document.getElementById("fullDetailsBox");
  fullDetailsBox.style.display = "block";

  let nameElement = document.getElementById("cname");
  nameElement.textContent = contact.name;

  let emailElement = document.getElementById("cemail");
  emailElement.textContent = "Email:" + contact.email;

  let mobileElement = document.getElementById("cmobile");
  mobileElement.textContent = "Mobile:" + contact.mobile;

  let landlineElement = document.getElementById("clandline");
  landlineElement.textContent = "Landline:" + contact.landline;

  let websiteElement = document.getElementById("cwebsite");
  websiteElement.textContent = "Website:" + contact.website;

  let addressElement = document.getElementById("caddress");
  addressElement.textContent = "Address:" + contact.address;

  editButton.dataset.contactId = contact.id;
  deleteButton.dataset.contactId = contact.id;

  editButton.onclick = function () {
    openEditDialog(contact);
  };

  deleteButton.onclick = function () {
    deleteContactById(contact.id);
  };
}

function deleteContactById(id) {
  let contact = contactService.getContactById(id);

  if (confirm('Are you sure you want to delete this contact?')) {
    let isDeleted = contactService.deleteContact(contact);

    if (isDeleted) {
      let deletedContactElement = document.querySelector('.contact.active');
      if (deletedContactElement) {
        deletedContactElement.classList.remove('active');
        deletedContactElement.remove();
      }
      let fullDetailsBox = document.getElementById("fullDetailsBox");
      fullDetailsBox.style.display = "none";
    }
  }
}

function clearInputFields() {
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('mobile').value = '';
  document.getElementById('landline').value = '';
  document.getElementById('website').value = '';
  document.getElementById('address').value = '';
}


