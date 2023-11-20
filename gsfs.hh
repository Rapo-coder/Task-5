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



            function displayContact()
  {
      let existingContacts = JSON.parse(localStorage.getItem("contacts"))
      let contactList = document.getElementById('contactList');
      contactList.textContent=""
      existingContacts.forEach(element => {
        console.log("element")
        let detailContainer = document.createElement("div")
        detailContainer.classList.add("contact")
 
        detailContainer.innerHTML = `
        <span class="contaclisttname"> ${element.name}</span><br>
         ${element.email}<br>
         ${element.mobile}<br><br>`;
 
         detailContainer.onclick = function()
        {
          showFullDetails(element);
        };  
 
        contactList.appendChild(detailContainer)
      });
  }


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