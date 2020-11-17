
$("#bill-upload").change(function(){
  if(this.files[0].size > 2097152){
    alert("File is too big!");
    this.value=""
    return
  };
  const file = document.querySelector('#bill-upload').files[0];
  // var file = input.files[0],
    reader = new FileReader();
  reader.onloadend = function () {
    // Since it contains the Data URI, we should remove the prefix and keep only Base64 string
    var b64 = reader.result.replace(/^data:.+;base64,/, '');
    $("#billBase64").val(b64); //-> "R0lGODdhAQABAPAAAP8AAAAAACwAAAAAAQABAAACAkQBADs="
  };
  reader.readAsDataURL(file);
});
$("#zBtn").click(function(){
  if(isValid()==false){
    alert("Please fill all fields!")
  }else{
  // data=
  $.ajax({
    type: 'post',
    url: 'submit',
    data: {
      user_name:$("#name_check").val(),
      user_phone: $("#user_phone").val(),
      email_check: $("#email_check").val(),
      user_addr: $("#user_addr").val(),
      user_product: $("#user_product").val(),
      user_where: $("#user_where").val(),
      thum_base64: $("#billBase64").val()
    },
    xhrFields: {
        withCredentials: true
    },  
    headers: {
    }, 
    success: function (data) {
        if(data.response){
          alert("Thanks, we’ve received your registration. The winners of the raffle draw will be announced on Kingston official Facebook fan page and notified by December 3 2020.")
        }else{
          alert('We are sorry but our servers are having an issue right now');
        }
        window.location.reload()
      },  
    error: function () {
        console.log('We are sorry but our servers are having an issue right now');
    }
})
  }
  
});
function isValid(){
   if($("#name_check").val().trim()==""){
     return false
   }
   if($("#user_phone").val().trim()==""){
    return false
  }
  if($("#email_check").val().trim()==""){
    return false
  }
  if($("#user_addr").val().trim()==""){
    return false
  }
  if($("#user_product").val().trim()==""){
    return false
  }
  if($("#user_where").val().trim()==""){
    return false
  }
  if($("#billBase64").val().trim()==""){
    return false
  }
  if(!$('#checkterm').prop('checked')){
    return false
  }
  return true
}

/////////////////////////////////////////////////////////////