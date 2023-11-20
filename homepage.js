function openDialog() {
  document.getElementById('addDialog').style.display = 'block';
}

function closeDialog() {
  document.getElementById('addDialog').style.display = 'none';
  document.getElementById('addUpdateButton').textContent = 'Add';
}

function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidMobile(mobile) {
  var mobileRegex = /^\d{10}$/;
  return mobileRegex.test(mobile);
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
  

  var contact = {
    name: name,
    email: email,
    mobile: mobile,
    landline: landline,
    website: website,
    address: address
  };

  saveContact(contact);
}

function updateContact() {
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

  var addButton = document.getElementById('addUpdateButton');
  var existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
  var index = existingContacts.findIndex(c => c.id === addButton.dataset.contactId);

  if (index !== -1) {
    var updatedContact = {
      name: name,
      email: email,
      mobile: mobile,
      landline: landline,
      website: website,
      address: address,
      id: addButton.dataset.contactId
    };

    existingContacts[index] = updatedContact;
    localStorage.setItem('contacts', JSON.stringify(existingContacts));
    alert('Contact updated successfully');
    closeDialog();
  }
}

function addOrUpdateContact() {
  var addButton = document.getElementById('addUpdateButton');
  if (addButton.textContent === 'Update') {
    updateContact();
  } else {
    addNewContact();
  }
}

function generateUniqueId() {
  var idCounter = parseInt(localStorage.getItem('idCounter')) || 0;
  idCounter++;
  localStorage.setItem('idCounter', idCounter);
  return 'contact_' + idCounter.toString();
}

function saveContact(contact) {
  var existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
  var addButton = document.getElementById('addUpdateButton');

  if (addButton.textContent === 'Update') {
    var index = existingContacts.findIndex(c => c.id === addButton.dataset.contactId);
    if (index !== -1) {
      existingContacts[index] = contact;
      alert('Contact updated successfully');
    }
  } else {
    contact.id = generateUniqueId();
    existingContacts.push(contact);
    alert('Contact added successfully');
  }

  localStorage.setItem('contacts', JSON.stringify(existingContacts));
  closeDialog();
  
}

function displayContact() {
  var existingContacts = JSON.parse(localStorage.getItem("contacts"));
  var contactList = document.getElementById('contactList');

  if (existingContacts) {
    existingContacts.forEach(function (contact) {
      var contactElement = document.createElement('div');
      contactElement.className = 'contact';
      contactElement.innerHTML = `
      <span class="contact-name">${contact.name}</span><br>
         ${contact.email}<br>
         ${contact.mobile}<br><br>`;
      contactElement.onclick = function () {
        var allContacts = document.querySelectorAll('.contact');
        allContacts.forEach(function (element) 
        {
            element.classList.remove('active');
        });
        contactElement.classList.add('active');
        showFullDetails(contact);
      };
      contactList.appendChild(contactElement);
    });
  }
}
displayContact();

function showFullDetails(contact) {
  var fullDetailsBox = document.getElementById('fullDetailsBox');
  var detailsHTML = `
    <div class="contact-details">
      <strong><h1>${contact.name}</h1></strong>
      <p class="email">Email: ${contact.email}</p>
      <p class="mobile">Mobile: ${contact.mobile}</p>
      <p class="landline">Landline: ${contact.landline}</p>
      <p class="website">Website: ${contact.website}</p>
      <p class="address">Address: ${contact.address}</p>
    </div>
  `;
  fullDetailsBox.innerHTML = detailsHTML;

  let editDeleteContainer = document.createElement("div");
  editDeleteContainer.className = "editDeleteButtons";

  let editIconImage = document.createElement("img");
  editIconImage.className = "editicon";
  editIconImage.src = 'assets/Edit-icon.png';

  let editText = document.createElement("span");
  editText.textContent = "EDIT";

  let editButton = document.createElement("div");
  editButton.className = "editicon";
  editButton.appendChild(editIconImage);
  editButton.appendChild(editText);

  let deleteIconImage = document.createElement("img");
  deleteIconImage.className = "deleteicon";
  deleteIconImage.src = 'assets/delete2.png';

  let deleteText = document.createElement("span");
  deleteText.textContent = "DELETE";

  let deleteButton = document.createElement("div");
  deleteButton.className = "deleteicon";
  deleteButton.appendChild(deleteIconImage);
  deleteButton.appendChild(deleteText);

  editDeleteContainer.appendChild(editButton);
  editDeleteContainer.appendChild(deleteButton);

  fullDetailsBox.appendChild(editDeleteContainer);

  editButton.onclick = function () {
    openEditDialog(contact);
  };

  deleteButton.onclick = function () {
    if (confirm('Are you sure you want to delete this contact?')) {
      deleteContact(contact);
      closeDetailsBox();
    }
    return false;
  };
}

function closeDetailsBox() {
  var fullDetailsBox = document.getElementById('fullDetailsBox');
  fullDetailsBox.innerHTML = '';
}

function openEditDialog(contact) {
  document.getElementById('name').value = contact.name;
  document.getElementById('email').value = contact.email;
  document.getElementById('mobile').value = contact.mobile;
  document.getElementById('landline').value = contact.landline;
  document.getElementById('website').value = contact.website;
  document.getElementById('address').value = contact.address;

  document.getElementById('addUpdateButton').textContent = 'Update';
  document.getElementById('addUpdateButton').dataset.contactId = contact.id; // Set contact ID as a data attribute
  openDialog();
}

function deleteContact(contact) {
  var existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
  var index = existingContacts.findIndex(function (c) {
    return c.id === contact.id;
  });
  existingContacts.splice(index, 1);
  localStorage.setItem('contacts', JSON.stringify(existingContacts));
}
