async function renderContent(){
  renderContact();
  renderInfo();
};


async function renderContact(){
  const selectGroup = document.getElementById('groupContactDisplay');
  const selectIndividual = document.getElementById('userContactDisplay');

  try{
    loadingSpinner.setAttribute("style", "height:1.5rem; width:1.5rem; margin-top: 5px;");
    loadingText.setAttribute("style", "margin-top: 5px;");

    const response = await fetch('http://localhost:3000/getContact');
    const contact = await response.json();

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

    loadingSpinner.setAttribute("style", "height:1.5rem; width:1.5rem; margin-top: 5px; display:none");
    loadingText.setAttribute("style", "margin-top: 5px; display:none");
    console.log('render contact success');

  }catch(err){
    const newDiv = document.createElement('div');
    const innerHTML = `<p> Fail to load contact </p>`;
    newDiv.innerHTML = innerHTML;
    selectGroup.appendChild(newDiv);
    selectIndividual.appendChild(newDiv);

    return console.log(err)
  }
}

async function renderInfo(){
  const clientDiv =  document.getElementById('client-info');
  try{
    const response = await fetch('http://localhost:3000/getInfo');
    const info = await response.json();
    const newDiv= document.createElement('div');
    const text = 
      `
        <p class="text-success" style=" margin: 0px;">Up</p>
        <p style=" margin: 0px;"> ${info.pushname} </p>
        <p style=" margin: 0px;"> ${info.wid} </p>
      `;
    newDiv.innerHTML = text;
    clientDiv.appendChild(newDiv);
    console.log("success render info");
  }catch(err){
    const text = 
      `
        <p class="text-success" style=" margin: 0px;">Down</p>
        <p style=" margin: 0px;">-</p>
        <p style=" margin: 0px;">-</p>
      `;
    const newDiv= document.createElement('div');
    newDiv.innerHTML = text;
    clientDiv.appendChild(newDiv);
    console.log("fail to render Info" + err)
  }
}

renderContent();