
async function getSchedule(){
  const response = await fetch("http://localhost:3000/getSchedule");
  const schedules = await response.json();

  return schedules;
};

async function renderContent(){
  const schedules = await getSchedule();

  for (const [index, item] of schedules.entries()) {
    const row = document.createElement('tr');
    row.setAttribute('id', `row${item.id}`);
    const statusClass = item.status===1?'text-success':'text-danger';
    const statusText = item.status===1?'Active':'Inactive';
    const actionButton = item.status===1?'btn-danger':'btn-success';
    const actionButtonText = item.status===1?'Stop':'Start';
    const actionButtonIcon = item.status===1?'fas fa-stop':'fas fa-play';
    const statusToUpdate = item.status===1?0:1;
    const deleteButton = item.title.toLowerCase()==='clock in' || item.title.toLowerCase()==='clock out' || item.title.toLowerCase()==='cuaca besok' 
                          ?null
                          :`<span> <a class='button btn-sm btn-danger' style='cursor:pointer' onclick='deleteSchedule(${item.id})'><i class='fas fa-trash'></i></a></span>`;

    row.innerHTML =`
      <td>${index+1}</td>
      <td>${item.title}</td>
      <td>${item.message}</td>
      <td>${item.receiver_name}</td>
      <td class='cron-expression'>${item.cron_expression}</td>
      <td><p class=${statusClass}>${statusText}</p></td>
      <td>
      <button class='button btn-sm ${actionButton}' style='cursor:pointer' onclick='updateSchedule(${item.id}, ${statusToUpdate})'>${actionButtonText} <i class='${actionButtonIcon}'></i></button>
      ${[deleteButton]}
      </td>
      ` 
    document.getElementById("scheduleTable-body").appendChild(row);
  }
};

async function deleteSchedule(id){
  await fetch(`http://localhost:3000/deleteSchedule/${id}`);
  document.getElementById(`row${id}`).remove();
};

async function startJob(){
  await fetch(`http://localhost:3000/startJobs`);
  console.log('job started')
};

async function stopJob(){
  await fetch(`http://localhost:3000/stopJobs`);
  console.log('job stopped')
};

async function updateSchedule(id, status){
  try{
    const data = {
      status:status,
      scheduleId:id
    };
    await fetch(`http://localhost:3000/editSchedule`, {
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    });
    await fetch('http://localhost:3000/stopJobs')
    await fetch(`http://localhost:3000/startJobs`);
    location.reload();
  }catch(err){
    console.log(err)
  }
};


renderContent();
