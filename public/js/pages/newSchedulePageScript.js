async function addSchedule(){
  try{
    await convertToCronExpression();
    const title = document.getElementById("judulpesan").value;
    const message = document.getElementById("summernote").value;
    const receiverNumber = document.getElementById("number").value;
    const receiverName = document.getElementById("number").value;
    const cron = document.getElementById("cronexpression").value;
    const status = 0;

    console.log(time);
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
