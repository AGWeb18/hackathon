myApp.onPageInit('login', function (page) {
    // Do something here for "about" page
    console.log("WELCOME TO LOGIN");


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
        }

        else {

          myApp.alert('Incorrect password!');

        }


      });

})


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
