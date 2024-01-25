const currentURL = window.location.href;
const currentMonth = new Date().getMonth();
const currentYear = 0;
let chooseMonth = localStorage.getItem('month') || currentMonth;

async function getCalendar(month, year){
  const response = await fetch(`http://localhost:3000/getCalendar/${month}/${year}`);
  const variables = await response.json();

  return variables[0];
};

async function renderContent(month){
  const data = await getCalendar(month, currentYear);

  for(let i=0;i<31;i++){
    const dayName = getDayName(new Date(`2024-0${month+1}-${i+1}`));
    const row = document.createElement('tr');
    row.setAttribute('id', data[i]);
    row.innerHTML = `
    <td>
       ${i+1}
    </td>
    <td>
      :
    </td>
    <td>
      <div class="text-secondary">
        ${data[i+1]===1
        ?`<button type='button' class='btn btn-success' style='width:70%' onclick='handleClick(${data.id}, ${i+1}, ${data[i+1]})'>Active</button>`
        :`<button type='button' class='btn btn-danger' style='width:70%' onclick='handleClick(${data.id}, ${i+1}, ${data[i+1]})'>InActive</button>`}
        ${dayName}
      </div>
    </td>
    `;
    document.getElementById('calendarTable-body').appendChild(row)
  }

  document.getElementById('selectMonth').value = month
};

function handleSelect(value){
  localStorage.setItem('month', value);
  location.reload();
};

async function handleClick(id, date, value){
  try{
    const data = {
      calendarId:id,
      value: value===1?0:1,
      date:date
    };
    const result = await fetch(`http://localhost:3000/editCalendar`, {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    });

    if(result.ok===false){throw new Error("fail to post data")}
    console.log('fetch data success');
    location.reload();
  }catch(err){
    console.log(err);
  }
}

function getDayName(date = new Date(), locale = 'id-ID') {
  return date.toLocaleDateString(locale, {weekday: 'long'});
}

renderContent(chooseMonth);
