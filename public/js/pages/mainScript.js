async function handleLogout(){
  try{
    const response = await fetch('http://localhost:3000/logout');
    if(response.status===200){
      window.location.href="/login"
    }
  }catch(err){
    console.log(err)
  } 
}