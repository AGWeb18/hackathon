//Each message Page
myApp.onPageInit('indMsg', function (page) {
  //deleteAllMsgs();
  var personName = page.query["personName"];
  var email = page.query["email"];
  var title = document.getElementById("currentPerson");
  //Change title of message
  title.innerHTML = personName;
  //Get message of people using their email
  getMessages(email, true);
  sendMessage(personName, email);
})

//Messages Page
myApp.onPageInit('messages', function (page) {
  var peopleTemplate = '<li>' +
  '<a href="indMsg.html?personName={{personName}}&email={{email}}" class="item-link item-content">' +
  '<div>{{item}}: {{messagePreview}}</div>' +
  '</a>' +
  '</div>' +
  '</li>';

  //Will be reading this from the database
  //Get list of users
  $.get('http://oddjobbackend.herokuapp.com/users', function(data) {
    const people = [];
    for(var i = 0; i < data.length; i++){
      var currentP = data[i];
      console.log(currentP);
      getMessages(currentP.email, false, function(msgs){
        var msg = "Test Message Test Message Test Message";
        if(msgs.length > 0){
          msg = msgs[msgs.length - 1].message;
        }
        people.push({item:currentP.firstName, messagePreview:msg.substring(0, 20).substring(0, 10), email:currentP.email});
        const myListOfPeople = myApp.virtualList('.list-block.virtual-list', {
          items: people,
          template: peopleTemplate
        });
      });

    }

  });
})
