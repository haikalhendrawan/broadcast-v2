
async function renderContent(){
  renderContact();
  renderInfo();
  renderSchedule();
  renderActiveSession()
};


async function renderContact(){
  const selectGroup = document.getElementById('groupContactDisplay');
  const selectIndividual = document.getElementById('userContactDisplay');

  try{
    // loadingSpinner.setAttribute("style", "height:1.5rem; width:1.5rem; margin-top: 5px;");
    // loadingText.setAttribute("style", "margin-top: 5px;");

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

    // loadingSpinner.setAttribute("style", "height:1.5rem; width:1.5rem; margin-top: 5px; display:none");
    // loadingText.setAttribute("style", "margin-top: 5px; display:none");
    console.log('render contact success');

  }catch(err){
    const newDiv = document.createElement('div');
    const innerHTML = `<p> Fail to load contact </p>`;
    newDiv.innerHTML = innerHTML;
    selectGroup.appendChild(newDiv);
    selectIndividual.appendChild(newDiv);

    return console.log('render contact fail' +err)
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
        <p style=" margin: 0px;"> ${info.wid._serialized} </p>
      `;
    newDiv.innerHTML = text;
    clientDiv.appendChild(newDiv);
    console.log("success render info");
  }catch(err){
    const text = 
      `
        <p class="text-danger" style=" margin: 0px;">Down</p>
        <p style=" margin: 0px;">-</p>
        <p style=" margin: 0px;">-</p>
      `;
    const newDiv= document.createElement('div');
    newDiv.innerHTML = text;
    clientDiv.appendChild(newDiv);
    console.log("fail to render Info" + err)
  }
}

async function renderSchedule(){
  const schedDiv =  document.getElementById('schedule-info');
  try{
    const response = await fetch('http://localhost:3000/getSchedule');
    const schedule = await response.json();
    const response2 = await fetch('http://localhost:3000/getTodayValAPI');
    const dayVal = await response2.json();
    const processed = schedule.filter((item) => {
      return item.status ===1
    }).toSorted((a, b) => {
      return parseInt(a.timeDue) - parseInt(b.timeDue)
    });
    const nextSched = processed[0];
    const dueTime = new Date(new Date().getTime()+nextSched.timeDue);
    const options = { hour: 'numeric', minute: 'numeric', hour12: false };
    const dueTimeStr = dueTime.toDateString() + ' ' + dueTime.toLocaleTimeString('en-US', options);
    const newDiv= document.createElement('div');
    const text = 
      `
        <p  style=" margin: 0px;"> ${nextSched.title}</p>
        <p style=" margin: 0px;"> ${dueTimeStr} </p>
        <p class=${dayVal===1?"text-success":"text-danger"} style=" margin: 0px;"> 
          ${dayVal===1?"Active":"Inactive"} 
        </p>
      `;
    newDiv.innerHTML = text;
    schedDiv.appendChild(newDiv);

  }catch(err){
    console.log('fail to render Schedule' + err)
  }
}

async function renderActiveSession(){
  const ipCount = document.getElementById("ip-count");
  const lastIP = document.getElementById("last-ip");

  try{
    const response = await fetch("http://localhost:3000/getActiveSession");
    const data = await response.json();
    const filteredIP = [];

    data.forEach((item) => {
      filteredIP.includes(item.value)?null:filteredIP.push(item.value)
    })
    const filteredData = filteredIP.map((item) => {
      return data.find((row) => row.value===item)
    })

    ipCount.innerText = data.length;
    lastIP.innerHTML = `
    ${filteredIP[0]?filteredIP[0]:''} <br/> 
    ${filteredIP[1]?filteredIP[1]:''} <br/> 
    ${filteredIP[2]?filteredIP[2]:''}`
  }catch(err){
    console.log(err)
  }
}

renderContent();