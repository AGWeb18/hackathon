myApp.onPageInit('profile', function (page) {
  console.log("BACK THE FUCK UP FUCKERS");
  $$('#updateProfile').on('click', function(e){
    var name = document.getElementById('name').value;
    var lastname = document.getElementById('lastname').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var password = document.getElementById('passWord').value;
    var data = "";
    if(name !== '') {
      data +='firstName=' + name;

    }

    if(lastname !== '') {
      data +='&lastName=' + lastname;

    }

    if(email !== ''){
      data += '&email=' + email;
    }

    if(email !== '') {
      data += '&phone=' + phone;

    }

    if(password !== '') {
      data += '&password=' + password;

    }

    $.ajax({
      url: 'http://oddjobbackend.herokuapp.com/users/' + window.user + '?',
      type: 'PUT',
      data: data,
      success: function(data) {
        myApp.alert('Profile Updated!', 'Update Complete');
    }
   });



  });
  //grab fields

  //update
})
