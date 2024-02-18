const loadingSpinner = document.getElementById("loadingSpinner");
const loadingText = document.getElementById("loadingText");

async function addSchedule(){
  try{
    await convertToCronExpression();
    const title = document.getElementById("judulpesan").value;
    const message = document.getElementById("summernote").value;
    const receiverNumber = document.getElementById("number").value;
    var selectedIndex = document.getElementById("number").selectedIndex;
    const receiverName = document.getElementById("number")[selectedIndex].getAttribute('contactName');
    console.log(receiverName);
    const cron = document.getElementById("cronexpression").value;
    const status = 0;

    const data = {
      title,
      message,
      receiverNumber,
      receiverName,
      cron,
      status
    };

    await fetch(`http://localhost:3000/addSchedule`, {
      method:'POST',
      mode: "cors",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    });
    window.location.href = 'http://localhost:3000/schedule';
  }catch(err){
    console.log(err)
  }
};

function reset(){
  location.reload()
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







// ----------------------------------------------------------------------------
async function convertToCronExpression() {
  const recurringSchedule = document.getElementById('recurringschedule').value;
  const time = document.getElementById('recurringtime').value;
  const date = document.getElementById('recurringdate').value;
  let cronExpression = '';

  // Convert the selected recurring schedule into a cron expression
  switch (recurringSchedule) {
      case 'no-schedule':
      break;
      case 'non-recurring':
          const dateParts = date.split('-');
          const selectedMinutes = time.split(':')[1];
          const selectedHours = time.split(':')[0];
          const selectedMonth = dateParts[1];
          cronExpression = `${selectedMinutes} ${selectedHours} ${dateParts[2]} ${selectedMonth} *`;
          break;
      case 'every workday':
          const workdayTimeParts = time.split(':');
          cronExpression = `${workdayTimeParts[1]} ${workdayTimeParts[0]} * * 1-5`;
          break;
      case 'every day':
          const dailyTimeParts = time.split(':');
          cronExpression = `${dailyTimeParts[1]} ${dailyTimeParts[0]} * * *`;
          break;
      }
  document.getElementById('cronexpression').value = cronExpression;
};

// fungsi initializer summernote
$(document).ready(function () {
  document.emojiButton ='fas fa-smile';
  document.emojiSource ='summernote/summernoteemoji/tam-emoji/img';
  $('#summernote').summernote({
    placeholder: 'To insert emoji press (Win + .)',
  tabsize: 3,
  height: 500,
  toolbar: [
  ['font', ['bold', 'italic', 'strikethrough']],
  ]
  })
});

// fungsi show tambahan input
function yesnoCheck(target) {
  if (target.value === "non-recurring") {
      document.getElementById("date-input").style.display = "block";
  } else {
      document.getElementById("date-input").style.display = "none";
  }
};
