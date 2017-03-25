myApp.onPageInit('register', function (page) {
    // Do something here for "about" page
    console.log("WELCOME TO REGISTER");


    $.get('https://oddjobbackend.herokuapp.com/users', function(data){
      users = data;
      console.log(users);
      window.MyLib = users;

    });

})
function submitRegistration() {
  console.log("CLICK");
  var currentUsers = window.MyLib;
  var firstName = document.getElementById('firstName').value;
  var lastName = document.getElementById('lastName').value;
  var email = document.getElementById('email').value;
  var phone = document.getElementById('phone').value;
  var password = document.getElementById('password').value;

  //validation
  var phoneReg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var existsFlag = 0;
  //checking validation
  if(firstName === '') {
    myApp.alert('Cannot leave First Name blank');

  }

  else if(lastName === '') {
    myApp.alert("Cannot leave Last Name blank");

  }

  else if(email === '') {
    myApp.alert("Cannot leave email blank");

  }
  else if(emailReg.test(email) === false) {
    myApp.alert("Invalid email address!");

  }


  else if(phone === '') {
    myApp.alert("Cannot leave phone number blank");

  }

  else if(phoneReg.test(phone) === false) {
    myApp.alert("Invalid phone number");

  }

  else if(password === '') {

    myApp.alert("Cannot leave password blank");
  }

  else {
    console.log(firstName, lastName, password);
    //everything passes submit
    var url = 'https://oddjobbackend.herokuapp.com/newUser?firstName=' + firstName + '&lastName=' + lastName + '&email=' + email + '&phone=' + phone + '&password=' + password;
    console.log('url', url);
    if(doesUserExist(email,currentUsers)){
      myApp.alert("Error, the current email address is already being used.");

    }

    else {

      $.post(url, function(result) {
        console.log(result);

      });

    }
  }

}

function doesUserExist(email, currentUsers) {
  for(var i=0; i < currentUsers.length; i++) {
    if(currentUsers[i].email === email) {
      return true;
    }
  }
  return false;
}
