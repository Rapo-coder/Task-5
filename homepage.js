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
    console.log('contactttttt',contact);
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


function generateUniqueId()
{
  var idCounter = parseInt(localStorage.getItem('idCounter')) || 0;
  idCounter+=1;
  localStorage.setItem('idCounter', idCounter);
  return idCounter.toString();
}

  //save the contact

  function saveContact(contact) 
  {
    var existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    var id = generateUniqueId();
    existingContacts.push({...contact,id});
    console.log("contact",existingContacts)
    localStorage.setItem('contacts', JSON.stringify(existingContacts));
    alert("Contact added successfully")
    closeDialog();
  }
   
  //displaying contacts in homepage

  function displayContact() 
  {
      var existingContacts = JSON.parse(localStorage.getItem("contacts"))
      var contactList = document.getElementById('contactList');
      existingContacts.forEach(function(contact){
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
       
          let editIconImage = document.createElement("img");
          editIconImage.className = "editicon";
          editIconImage.src = 'assets/Edit-icon.png';
          editIconImage.style.width = '20px'; 
          editIconImage.style.height = '20px'; 
          
          let editText = document.createElement("span");
          editText.textContent = "Edit";
          
          let editButton = document.createElement("div");
          editButton.className = "editicon";
          editButton.appendChild(editIconImage);
          editButton.appendChild(editText);
         
       
          let deleteButton = document.createElement("div");
          deleteButton.textContent = "DELETE"
          deleteButton.className = "deleteicon";
          deleteButton.style.color = "#black";
          deleteButton.style.background = "white";
       
          editDeleteContainer.appendChild(editButton);
          editDeleteContainer.appendChild(deleteButton);
       
          fullDetailsBox.appendChild(editDeleteContainer);
        
          editButton.onclick = function()
          {
            openEditDialog(contact);
          }
          deleteButton.onclick = function () 
          {
            if (confirm('Are you sure you want to delete this contact?')) 
            {
              deleteContact(contact.id); 
              closeDetailsBox();
            }
            return false;
          };
  }

  function closeDetailsBox() 
  {
    var fullDetailsBox = document.getElementById('fullDetailsBox');
    fullDetailsBox.innerHTML = '';
  }
  
 
//open edit dialog box

function openEditDialog(contact) {
  isEditing = true;
  document.getElementById('name').value = contact.name;
  document.getElementById('email').value = contact.email;
  document.getElementById('mobile').value = contact.mobile;
  document.getElementById('landline').value = contact.landline;
  document.getElementById('website').value = contact.website;
  document.getElementById('address').value = contact.address;

  var idElement = document.getElementById('id');
  if (idElement) {
    idElement.value = contact.id;
  }

  openDialog();
}

 

function updateContact(updatedContact) {
  var existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
  var index = existingContacts.findIndex(contact => contact.id === updatedContact.id);

  if (index !== -1) {
    existingContacts[index] = { ...existingContacts[index], ...updatedContact };
    localStorage.setItem('contacts', JSON.stringify(existingContacts));
    alert('Contact updated successfully');
  }
}



//Delete Contacts
function deleteContact(contactId) {
  var existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
  var updatedContacts = existingContacts.filter(existingContact => existingContact.id !== contactId);
  localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  alert('Contact deleted successfully');
}


