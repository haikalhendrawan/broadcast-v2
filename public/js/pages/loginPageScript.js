async function getIP(){
  try{
    const IP = await fetch("https://api.ipify.org/?format=json");
    return IP
  }catch(err){
    console.log(err);
    return null
  }
}

async function handleLogin(){
  try{
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const res = await fetch("https://api.ipify.org/?format=json")
    const obj = await res.json();
    const ip = obj.ip


    const data = {
      userId: username,
      password,
      ip
    }

    const response = await fetch("http://localhost:3000/login", {
      method:'POST',
      mode:'cors',
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify(data)
    })

    if(response.status===200){
      window.location.href = "/home"
    }

  }catch(err){
    console.log(err)
  }
}
