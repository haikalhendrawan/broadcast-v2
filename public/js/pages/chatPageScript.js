const loadingSpinner = document.getElementById("loadingSpinner");
const loadingText = document.getElementById("loadingText");

async function submit(){
  const fileInput = document.getElementById('file').value;

  if(fileInput && fileInput.length>1){
    sendChatAndFile()
  }else{
    sendChat()
  }
}


async function sendChat(){
  try{
    const message = document.getElementById("message").value;
    const receiverNumber = document.getElementById("snumber").value;

    const data = {
      msg:message,
      number:receiverNumber,
    };

    await fetch(`http://localhost:3000/sendChat`, {
      method:'POST',
      mode: "cors",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    });
    window.location.href = 'http://localhost:3000/chat';
  }catch(err){
    console.log(err)
  }
};

async function sendChatAndFile(){
  try{
    const message = document.getElementById("message").value;
    const receiverNumber = document.getElementById("snumber").value;
    const file = document.getElementById("file").files[0];

    let formData = new FormData();
    formData.append('msg', message);
    formData.append('number', receiverNumber);
    formData.append('file', file);

    await fetch(`http://localhost:3000/sendChatWithFile`, {
      method:'POST',
      mode: "cors",
      body:formData
    });
    window.location.href = 'http://localhost:3000/chat';
  }catch(err){
    console.log(err)
  }
};

function reset(){
  location.reload()
}

function handleChange(){
  const fileInputValue = document.getElementById("file").files[0].name;
  const fileInputLabel = document.getElementById("file-input-label");

  fileInputLabel.innerText = fileInputValue;
}

function handleFileReset(){
  const fileInput= document.getElementById("file");
  fileInput.value = '';
  const fileInputLabel = document.getElementById("file-input-label");
  fileInputLabel.innerText = 'Choose File';
}

async function renderContent(){
  loadingSpinner.setAttribute("style", "height:1.5rem; width:1.5rem; margin-top: 5px;");
  loadingText.setAttribute("style", "margin-top: 5px;");
  const response = await fetch('http://localhost:3000/getContact');
  const contact = await response.json();
  const selectGroup = document.getElementById('group-option');
  const selectIndividual = document.getElementById('individual-option');

  console.log(response);
  console.log(contact);

  for(const item of contact){
    const isGroup = item.id._serialized.slice(-4) ==='g.us'; // can be "g.us" or "c.us" or "lid.us"
    const isUser = item.id._serialized.slice(-4) ==='c.us';
    const profilePicture = item.profilePic? item.profilePic : "/undraw_profile.svg";
    const contactName = item.name || null ;
    const option = document.createElement('option');
    option.value = item.id._serialized;
    option.setAttribute('data-content', `<img class='email img-profile rounded-circle' src='${profilePicture}' style='height:20px;width:20px;'><span class='text-dark'>${contactName}</span>`);
    option.setAttribute('contactName', `${contactName}`);

    if(isGroup && contactName){
      selectGroup.appendChild(option);
    }else if(isUser && contactName){
      selectIndividual.appendChild(option);
    }
  }

  $('.selectpicker').selectpicker('refresh');
  loadingSpinner.setAttribute("style", "height:1.5rem; width:1.5rem; margin-top: 5px; display:none");
  loadingText.setAttribute("style", "margin-top: 5px; display:none");

};

renderContent();


// --------------------------------------------------------------------------------------------------------
// fungsi initializer summernote
$(document).ready(function () {
  document.emojiButton ='fas fa-smile';
  document.emojiSource ='summernote/summernoteemoji/tam-emoji/img';
  $('#message').summernote({
    placeholder: 'To insert emoji press (Win + .)',
  tabsize: 3,
  height: 500,
  toolbar: [
  ['font', ['bold', 'italic', 'strikethrough']],
  ]
  })
});
