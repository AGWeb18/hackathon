// Initialize app
var myApp = new Framework7({
    swipePanel: 'left'

});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
    console.log("Device is ready!");
    $.get('https://oddjobbackend.herokuapp.com/users', function(data){
      users = data;
      console.log(users);
      window.MyLib = users;

    });
    $$('#login-box-link').on('click', function(e){
      var username = document.getElementById('username').value;
      var password = document.getElementById('pass').value;
      var users = window.MyLib;

      console.log('users',users);
      if(username === '') {
        myApp.alert('Oops! You left your username blank');

      }

      else if(password === '') {
        myApp.alert('Oops! You left your password blank');


      }
      else if(isPasswordCorrect(username, password, users)) {
        //set global variable to indicate correct login
        console.log('Correct welcome my friend');
        window.user = username;
        window.login = true;
      }

      else {

        myApp.alert('Incorrect password!');

      }

    });
});


function isPasswordCorrect(username, password, users) {
  for(var i=0; i < users.length; i++) {
    if(users[i].email === username && users[i].password === password) {
      return true;

    }

    else if(users[i].email === username) {

      return false;

    }


  }


}
