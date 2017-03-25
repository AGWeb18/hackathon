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
    myApp.alert('Cannot leave First Name blank', "Missing firstName");

  }

  else if(lastName === '') {
    myApp.alert("Cannot leave Last Name blank", "Missing Last Name");

  }

  else if(email === '') {
    myApp.alert("Cannot leave email blank", "Missing Email");

  }
  else if(emailReg.test(email) === false) {
    myApp.alert("Invalid email address!");

  }


  else if(phone === '') {
    myApp.alert("Cannot leave phone number blank", "Missing Phone");

  }

  else if(phoneReg.test(phone) === false) {
    myApp.alert("Invalid phone number", "Invalid");

  }

  else if(password === '') {

    myApp.alert("Cannot leave password blank", "Blank Password");
  }

  else {
    console.log(firstName, lastName, password);
    //everything passes submit
    var url = 'https://oddjobbackend.herokuapp.com/newUser?firstName=' + firstName + '&lastName=' + lastName + '&email=' + email + '&phone=' + phone + '&password=' + password;
    console.log('url', url);
    if(doesUserExist(email,currentUsers)){
      myApp.alert("Error, the current email address is already being used.", "Existing User");

    }

    else {

      $.post(url, function(result) {
        console.log(result);

      });

      myApp.alert('Congratulations! You are registered! You can now log in!', "Welcome");
      $.get('https://oddjobbackend.herokuapp.com/users', function(data){

        window.MyLib = data;

      });
      mainView.router.loadPage({url:'index.html'});

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
