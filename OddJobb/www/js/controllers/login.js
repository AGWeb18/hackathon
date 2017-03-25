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
          myApp.alert('Oops! You left your username blank', 'Blank username');

        }

        else if(password === '') {
          myApp.alert('Oops! You left your password blank', 'Blank Password');


        }
        else if(isPasswordCorrect(username, password, users)) {
          //set global variable to indicate correct login
          myApp.alert('Welcome ' + username + '! You are now logged in!', 'Log In Success');
          window.user = username;
          window.login = true;
          document.getElementById('createPost').style.display = 'block';
          document.getElementById('viewMessages').style.display = 'block';
          document.getElementById('profile').style.display = 'block';
          document.getElementById('logout').style.display = 'block';
          mainView.router.loadPage({url:'postList.html', ignoreCache:true, reload:true });
        }

        else {

          myApp.alert('Incorrect password!', "Error");

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
