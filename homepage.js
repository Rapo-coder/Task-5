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
          ${contact.name}<br>
          Email: ${contact.email}<br>
          Mobile: ${contact.mobile}<br>
          Landline:${contact.landline}<br>
          Website: ${contact.website}<br>
          Addres: ${contact.address}<br>
          `;
          fullDetailsBox.innerHTML = detailsHTML;
          
          let editDeleteContainer = document.createElement("div");
          editDeleteContainer.className = "editDeleteButtons";
         
          let editButton = document.createElement("button");
          editButton.textContent = "Edit";
         
          let deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";

          editDeleteContainer.appendChild(editButton);
          editDeleteContainer.appendChild(deleteButton);

          fullDetailsBox.appendChild(editDeleteContainer);
        
          editButton.onclick = function()
          {
            openEditDailog(contact)
          }
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
 
  if (index !== -1) {
    existingContacts[index] = updatedContact;
    localStorage.setItem('contacts', JSON.stringify(existingContacts));
    alert('Contact updated successfully');
  }
}


