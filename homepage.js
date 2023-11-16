function openDialog() 
{
    document.getElementById('addDialog').style.display = 'block';
}
function closeDialog() 
{
  document.getElementById('addDialog').style.display = 'none';
}

function addContact() 
{
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var mobile = document.getElementById('mobile').value;
    var mobile = document.getElementById('landline').value;
    var mobile = document.getElementById('website').value;
    var mobile = document.getElementById('address').value;
   
    var contact = 
    {
      name: name,
      email: email,
      mobile: mobile,
      landline:landline,
      website:website,
      address:address,
    };
    saveContact(contact);
  }
   
  function saveContact(contact) 
  {
    var existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    existingContacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(existingContacts));
    alert("Contact added successfully")
    closeDialog();
  }
   
  function displayContact() 
  {
      var existingContacts = JSON.parse(localStorage.getItem("contacts"))
      var contactList = document.getElementById('contactList');
      existingContacts.forEach(function(contact) {
      var contactElement = document.createElement('div');
      contactElement.className = 'contact';
      contactElement.innerHTML = `
        Name: ${contact.name}<br>
        Email: ${contact.email}<br>
        Mobile: ${contact.mobile}<br><br>`;
      contactList.appendChild(contactElement);
    });
  }
  displayContact();

   
  function showFullDetails(contact) {
    var fullDetailsBox = document.getElementById('fullDetailsBox');
    fullDetailsBox.innerHTML = `
      Name: ${contact.name}<br>
      Email: ${contact.email}<br>
      <strong>Mobile:</strong> ${contact.mobile}<br>
      landline: ${contact.landline}<br>
      Website: ${contact.website}<br>
      Address: ${contact.address}<br>;
      `;
  fullDetailsBox.style.display = 'block';
  }

   

   
  

