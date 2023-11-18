function openDialog() 
{
    document.getElementById('addDialog').style.display = 'block';
}
function closeDialog() 
{
  document.getElementById('addDialog').style.display = 'none';
}

var isEditing=false;

//add contact
function addContact() 
{

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
    var contact = 
    {
      name: name,
      email: email,
      mobile: mobile,
      landline:landline,
      website:website,
      address:address,
    };
    console.log(contact);
    if(isEditing)
    {
      updateContact(contact);
    }
    else
    {
      saveContact(contact);
    }
    closeDialog();
    isEditing = false;
  }
   
  function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
   
  function isValidMobile(mobile) {
    var mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
  }

  //save the contact

  function saveContact(contact) 
  {
    var existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    existingContacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(existingContacts));
    alert("Contact added successfully")
    closeDialog();
  }
   
  //displaying contacts in homepage

  function displayContact() 
  {
      var existingContacts = JSON.parse(localStorage.getItem("contacts"))
      var contactList = document.getElementById('contactList');
      existingContacts.forEach(function(contact) {
      var contactElement = document.createElement('div');
      contactElement.className = 'contact';
      contactElement.innerHTML = `
         ${contact.name}<br>
         ${contact.email}<br>
         ${contact.mobile}<br><br>`;
         contactElement.onclick = function() 
        {
          showFullDetails(contact);
        };  
        contactElement.set
      contactList.appendChild(contactElement);
      
    });

  }
  displayContact();

  //show full details of the contact

  function showFullDetails(contact) {
    var fullDetailsBox = document.getElementById('fullDetailsBox');
      var detailsHTML = `
      <strong><h1>${contact.name}</h1></strong>
          Email: ${contact.email}<br><br>
          Mobile: ${contact.mobile}<br>
          Landline:${contact.landline}<br><br>
          Website: ${contact.website}<br><br>

          Addres: ${contact.address}<br>
          `;
          fullDetailsBox.innerHTML = detailsHTML;

          
          
          let editDeleteContainer = document.createElement("div");
          editDeleteContainer.className = "editDeleteButtons";
       
          let editButton = document.createElement("button");
          let editIcon = document.createElement('img')
          editIcon.src ='assets/Edit-icon.png'
          editButton.textContent = "Edit";
          editButton.style.color = "#black";  
          editButton.background= "white"
       
          let deleteButton = document.createElement("button");
          let deleteIcon = document.createElement('img')
          deleteIcon.src ='assets/Edit-icon.png'
          deleteButton.textContent = "Delete";
          deleteButton.style.color = "black";
       
          editDeleteContainer.appendChild(editButton);
          editDeleteContainer.appendChild(deleteButton);
       
          fullDetailsBox.appendChild(editDeleteContainer);
        
          
          editButton.onclick = function()
          {
            openEditDailog(contact)
          }

          deleteButton.onclick = function () {
            if (confirm('Are you sure you want to delete this contact?')) {
              deleteContact(contact);
              closeDetailsBox();
            }
          };
  }

  function closeDetailsBox() {
    var fullDetailsBox = document.getElementById('fullDetailsBox');
    fullDetailsBox.innerHTML = '';
}
 
//open edit dialog box
function openEditDailog(contact)
{
  isEditing = true;
  document.getElementById('name').value = contact.name;
  document.getElementById('email').value = contact.email;
  document.getElementById('mobile').value = contact.mobile;
  document.getElementById('landline').value = contact.landline;
  document.getElementById('website').value = contact.website;
  document.getElementById('address').value = contact.address;

  openDialog();
}
 

//Update the contact
function updateContact(updatedContact) {
  var existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
  var index = existingContacts.findIndex(contact => contact.name === updatedContact.name);
 
  if (index != -1) {
    existingContacts[index] = updatedContact;
    localStorage.setItem('contacts', JSON.stringify(existingContacts));
    alert('Contact updated successfully');
  }
}


//Delete Contacts
function deleteContact(contact) {
  var existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
  var contact = existingContacts.filter(existingContact => existingContact.name !== contact.name);
  localStorage.setItem('contacts', JSON.stringify(contact));
  alert('Contact deleted successfully');
  }

