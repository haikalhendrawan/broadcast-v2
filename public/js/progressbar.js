$(document).ready(function(){
  $("#upload").click(function(){
      var the_file = $('#the_file').val();
      if(the_file ==""){
          alert('Please select the file');
          return false;
      }else{
      $('#progress_container').css("display","block");
          var file = document.getElementById('the_file').files[0];
          if (file!="") {
          var formdata = new FormData();
          formdata.append("upload_file", file);
          var ajax = new XMLHttpRequest();
          ajax.upload.addEventListener("progress", progressHandler, false);
          ajax.addEventListener("load", completeHandler, false);
          ajax.addEventListener("error", errorHandler, false);
          ajax.addEventListener("abort", abortHandler, false);
          ajax.open("POST", "upload.php");
          ajax.send(formdata);
          }
      }
  });
  $('#btn_abort').click(function(){
      abortHandler();
  });
  });
  function bytesToSize(bytes) {
  var sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  }
  function progressHandler(event){
  var percent = (event.loaded / event.total) * 100;
  $('#progressBar').val(Math.round(percent));
  $('#status_bar').html("Uploaded " + bytesToSize(event.loaded) + " bytes of " + bytesToSize(event.total));
  $('#message_info').html(Math.round(percent)+"% uploaded... please wait");
  }
  function completeHandler(event){
  $('#message_info').html(event.target.responseText);
  $('#progress_container').css("display","none");
  }
  function errorHandler(event){
  $('#message_info').html("Upload Failed");
  }
  function abortHandler(event){
  $('#message_info').html("Upload Aborted");
  }
