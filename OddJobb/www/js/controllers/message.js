//Each message Page
myApp.onPageInit('indMsg', function (page) {
  //deleteAllMsgs();
  var personName = page.query["personName"];
  var email = page.query["email"];
  var title = document.getElementById("currentPerson");
  //Change title of message
  title.innerHTML = personName;
  //Get message of people using their email
  if(email === null || email === ""){
    printErr("No email has been entered.");
  }
  getMessages(email);
  sendMessage(personName, email);
})

//Messages Page
myApp.onPageInit('messages', function (page) {
  var peopleTemplate = '<li>' +
  '<a href="indMsg.html?personName={{item}}&email={{email}}" class="item-link item-content">' +
  '<div>{{item}}: {{messagePreview}}</div>' +
  '</a>' +
  '</div>' +
  '</li>';

  //Will be reading this from the database
  //Get list of users
  const people = [];
  var currentP = {};
  var currentMsg = {}
  $.get('http://oddjobbackend.herokuapp.com/users', function(users) {
    $.get("http://oddjobbackend.herokuapp.com/messages", function(msgs){
      for(var i = 0; i < users.length; i++){
        currentP = users[i];
        //Default message, in case there person has not sent any messages.
        currentMsg = {message:"Test Message Test Message Test Message", email:"none"};
        if(msgs.length > 0){
          currentMsg = msgs[msgs.length - 1];
        }

        for(var a = 0; a < msgs.length; a++){
          //Check current email belongs to correct user
          if(currentP.email === currentMsg.email){
            people.push({item:currentP.firstName, messagePreview:currentMsg.message.substring(0, 20).substring(0, 10), email:currentP.email});
            const myListOfPeople = myApp.virtualList('.list-block.virtual-list', {
              items: people,
              template: peopleTemplate
            });
            break;
          }
          else{
            //Set email to previous one in list
            currentMsg = msgs[msgs.length - (a + 1)];
          }
        }
      }
    });
  });
})
