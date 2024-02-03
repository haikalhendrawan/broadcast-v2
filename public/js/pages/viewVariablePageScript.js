async function getVariableById(id, month, year){
  const response = await fetch(`http://localhost:3000/getVariable/${id}/${month}/${year}`);
  const variables = await response.json();

  return variables[0];
};

const currentURL = window.location.href;
const currentMonth = new Date().getMonth();
const currentYear = 0;
const splitURL = currentURL.split('/');
const variableId = splitURL[splitURL.length-1];
let chooseMonth = localStorage.getItem('month') || currentMonth;

async function renderContent(month){
  const data = await getVariableById(variableId, month, currentYear);
  const currentDate = new Date().getDate();
  document.getElementById('variableTitle').innerText=data.variable_name;

  for(let i=0;i<31;i++){
    const row = document.createElement('tr');
    row.setAttribute('id', data[i]);
    if(i+1===currentDate && month==currentMonth){row.setAttribute('style', 'background-color:rgba(214, 13, 36, 0.3);')}
    row.innerHTML = `
    <td>
      ${i+1} 
    </td>
    <td>
      :
    </td>
    <td>
      <div>
        <input type='text' class="form-control" value='${data[i+1]}' id='input${i+1}' onblur="handleBlur(${data.id}, ${i+1})">
      </div>
    </td>
    `;
    document.getElementById('variableDetailTable-body').appendChild(row)
  }

  document.getElementById('selectMonth').value = month
};

async function handleBlur(id, date){
  try{
    const data = {
      junctionId:id,
      value:document.getElementById(`input${date}`).value,
      date:date
    };
    const result = await fetch(`http://localhost:3000/editVariable`, {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    });

    if(result.ok===false){throw new Error("fail to post data")}
    console.log('fetch data success')
  }catch(err){
    console.log(err);
  }
};

function handleSelect(value){
  localStorage.setItem('month', value);
  location.reload();
};

renderContent(chooseMonth);


