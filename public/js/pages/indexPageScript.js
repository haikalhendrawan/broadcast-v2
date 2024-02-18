async function renderContent(){
  // loadingSpinner.setAttribute("style", "height:1.5rem; width:1.5rem; margin-top: 5px;");
  // loadingText.setAttribute("style", "margin-top: 5px;");

  const response = await fetch('http://localhost:3000/getContact');
  const contact = await response.json();
  const selectGroup = document.getElementById('groupContactDisplay');
  const selectIndividual = document.getElementById('userContactDisplay');

  console.log(response);
  console.log(contact);

  for(const item of contact){
    const isGroup = item.id._serialized.slice(-4) ==='g.us';
    const isUser = item.id._serialized.slice(-4) ==='c.us';
    const name = item.name || null;
    const profilePicture = item.profilePic? item.profilePic : "/undraw_profile.svg";
    const newDiv = document.createElement('div');
    const innerHTML = 
    ` <div>
          <span>
          <img class='email img-profile rounded-circle' src=${profilePicture} style='height:30px;width:30px;'>
          <span class='text-dark'>${name}</span>
          </span>
      </div>`;
    newDiv.innerHTML = innerHTML;

    if(isGroup && item.name){
      selectGroup.appendChild(newDiv);
    }else if(isUser && item.name){
      selectIndividual.appendChild(newDiv);
    }
  }

  // loadingSpinner.setAttribute("style", "height:1.5rem; width:1.5rem; margin-top: 5px; display:none");
  // loadingText.setAttribute("style", "margin-top: 5px; display:none");

};

renderContent();