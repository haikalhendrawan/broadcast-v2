async function getVariable(){
    const response = await fetch("http://localhost:3000/getAllVariable");
    const variables = await response.json();

    return variables;
};

async function getVariableById(id, month, year){
  const response = await fetch(`http://localhost:3000/getVariable/${id}/${month}/${year}`);
  const variables = await response.json();

  return variables[0];
};


async function renderContent(){
  const variables = await getVariable();
  const currentMonth = new Date().getMonth();
  const currentDate = new Date().getDate();
  const tomorrowDate = new Date().getDate()+1;
  const currentYear = new Date().getFullYear();

  for (const [index, item] of variables.entries()) {
    const variableId = item.id;
    const variableData = await getVariableById(variableId, currentMonth, currentYear);
  
    const row = document.createElement('tr');
    row.setAttribute('id', `row${variableId}`);
    row.innerHTML =`
      <td>${index+1}</td>
      <td>${item.variable_name}</td>
      <td>${item.period}</td>
      <td>${variableData?.[currentDate] || null}</td>
      <td>${variableData?.[tomorrowDate] || null}</td>
      <td>
        <span> <a class='button btn-sm btn-success' href='variable/view-variable/${item.id}'><i class='fas fa-eye'></i></a></span>
        <span> <a class='button btn-sm btn-danger' onClick='deleteVariable(${item.id})'><i class='fas fa-trash'></i></a></span>
      </td>
      ` 
    document.getElementById("variablesTable-body").appendChild(row);
  }
 
};

async function deleteVariable(id){
  await fetch(`http://localhost:3000/deleteVariable/${id}`);
  document.getElementById(`row${id}`).remove();

};

let isCallingAPI = false;

async function addVariable(){
  try{
    document.getElementById("addVariableButton").classList.add("d-none")
    const value = document.getElementById("addVariableInput").value;
    const year = document.getElementById("yearVariableInput").value;
    const data = {
      varName:value,
      year:year
    };
    if(value.length<1){return}
    await fetch(`http://localhost:3000/addVariable`, {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    });
    document.getElementById("addVariableInput").value = "";
    document.getElementById("yearVariableInput").value = "";
    await $('#addVariableModal').modal('hide');
    location.reload();
  }catch(err){
    console.log(err);
    document.getElementById("addVariableButton").classList.remove("d-none")
  }
};



renderContent();



