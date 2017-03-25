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
  window.user = false;
  window.login = false;
  document.getElementById('myPost').style.display = 'none';
  document.getElementById('createPost').style.display = 'none';
  document.getElementById('viewMessages').style.display = 'none';
  document.getElementById('profile').style.display = 'none';
  document.getElementById('logout').style.display = 'none';
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
        myApp.alert('Oops! You left your username blank', 'Blank Username');

      }

      else if(password === '') {
        myApp.alert('Oops! You left your password blank', "Blank Password");


      }
      else if(isPasswordCorrect(username, password, users)) {
        //set global variable to indicate correct login
        myApp.alert('Welcome ' + username + '! You are now logged in.', "Welcome");
        window.user = username;
        window.login = true;
        document.getElementById('myPost').style.display = 'block';      
        document.getElementById('createPost').style.display = 'block';
        document.getElementById('viewMessages').style.display = 'block';
        document.getElementById('profile').style.display = 'block';
        document.getElementById('logout').style.display = 'block';
        mainView.router.loadPage({url:'postList.html', ignoreCache:true, reload:true });
      }

      else {

        myApp.alert('Incorrect password!', 'Error!');

      }

    });
});


function isPasswordCorrect(username, password, users) {
  for(var i=0; i < users.length; i++) {
    if(users[i].email === username && users[i].password === password) {
      window.firstname = users[i].firstName;
      window.lastname = users[i].lastName;
      return true;

    }

    else if(users[i].email === username) {

      return false;

    }


  }


}

function logout(e) {

  if(window.login === true) {
    myApp.alert('Goodbye '+ window.user + ' You have been logged out!', "Goodbye!");
    window.user = false;
    window.login = false;
    document.getElementById('createPost').style.display = 'none';
    document.getElementById('viewMessages').style.display = 'none';
    document.getElementById('profile').style.display = 'none';
    document.getElementById('logout').style.display = 'none';
    mainView.router.loadPage({url:'index.html', ignoreCache:true, reload:true });
  }

  else {
    myApp.alert('You can\'t log out if you\'re not logged in');
  }
}
