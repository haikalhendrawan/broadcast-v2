$(document).ready(function() {
 
  const data = [{'contactName':'+62 812-9124-9590','contactNumber':'6281291249590','lastMessage':'Tes 2 Tes 3','lastMessageTime':1705124679,'lastMessageType':'chat','fromMe':true,'messageAck':2},{'contactName':'Test broadcast','contactProfilePicture':'https://pps.whatsapp.net/v/t61.24694-24/416470365_346962311609674_3295493382750445020_n.jpg?ccb=11-4&oh=01_AdSv-rXd7qk_BHnS0jc9W9i_Av6n2irG8cEHbXqVueAI6w&oe=65AF771B&_nc_sid=e6ed6c&_nc_cat=100','contactNumber':'120363154792682631','lastMessage':'1705142416','lastMessageTime':1705142417,'lastMessageType':'gp2','fromMe':true,'messageAck':null},{'contactName':'Broadcast Group','contactNumber':'120363152199205490','lastMessage':'\ntest\n','lastMessageTime':1687265220,'lastMessageType':'chat','fromMe':true,'messageAck':3},{'contactName':'Broadcast Group','contactNumber':'120363136902569016','lastMessage':null,'lastMessageTime':null,'lastMessageType':null,'fromMe':null,'messageAck':null}];
  for (const item of data) {

    let contactProfilePicture = "default_avatar.jpg";
    let onlineIcon =item.fromMe? "<span></span>":"<span class='online_icon'></span>";
    const date = new Date().getDate();
    const formatDate = formattedDate(item.lastMessageTime);

    const listItem = `<li class='chatSidebar' id=${item.contactNumber}>
    <div class='d-flex bd-highlight'>
        <div class='img_cont'>
            <img src=${item.contactProfilePicture || contactProfilePicture} class='rounded-circle user_img'>
            ${onlineIcon}
        </div>
        <div class='user_info'>
            <span>${item.contactName}</span>
            <p style="font-size:14px">${item.lastMessage}</p>
            <p>${formatDate}</p>
        </div>
    </div>
    </li>`;

    // Append the new li element to the ul
    $('#contacts').append(listItem);
  }
});


function formattedDate(timestamp) {
 
  // Create a new Date object from the timestamp
  const messageDate = new Date(timestamp);

  // Get current date
  const currentDate = new Date();

  // Check if the message date is in the same month as today
  const isSameMonth = messageDate.getMonth() === currentDate.getMonth();

  let formattedDate;

  if (isSameMonth) {
    // Format for the same month: "Hour.Minute"
    const hour = messageDate.getHours();
    const minute = messageDate.getMinutes();

    // Add leading zero if needed
    const formattedHour = hour < 10 ? `0${hour}` : hour;
    const formattedMinute = minute < 10 ? `0${minute}` : minute;

    formattedDate = `${formattedHour}.${formattedMinute}`;
  } else {
    // Format for a different month: "Day/Month"
    const day = messageDate.getDate();
    const month = messageDate.toLocaleString('en-US', { month: 'short' });

    formattedDate = `${day}/${month}`;
  }

  return formattedDate;
}
