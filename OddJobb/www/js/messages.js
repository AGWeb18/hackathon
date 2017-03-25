// JavaScript source code
//Js file that deal with the messages

var prevMsgs = {};


var msgTemplate = '{{#if day}}' +
    '<div class="messages-date">{{day}} {{#if time}}, <span>{{time}}</span>{{/if}}</div>' +
    '{{/if}}' +
    '<div class="message message-{{type}}  {{id}} {{#if hasImage}}message-pic{{/if}} {{#if avatar}}message-with-avatar{{/if}} {{#if position}}message-appear-from-{{position}}{{/if}}">' +
    '{{#if name}}<div class="message-name {{id}}">{{name}}</div>{{/if}}' +
    '<div class="message-text {{id}}">{{text}}{{#if date}}<div class="message-date {{id}}">{{date}}</div>{{/if}}</div>' +
    '{{#if avatar}}<div class="message-avatar {{id}}" style="background-image:url({{avatar}})"></div>{{/if}}' +
    '{{#if label}}<div class="message-label {{id}}">{{label}}</div>{{/if}}' +
    '</div>';

var error = "";

function sendMessage(personName, email) {
  var msgHandler = new Framework7();
  var $$ = Dom7;

  var messages = msgHandler.messages('.messages', { messageTemplate: msgTemplate });
  var msgBar = msgHandler.messagebar('.messagebar');
  var currentMsg = "";

  //Really only applicable to desktop version
  $$('.messagebar').on('keypress', function (e) {
      if (e.keyCode === 13) {
          sendMsg();
      }
  })
  $$('.messagebar').on('click', function () {
      sendMsg();
  })

  var sendMsg = function () {
      var msgId = newId(1000);
      currentMsg = msgBar.value().trim();
      msgBar.clear();
      messages.addMessage({
          text: currentMsg,
          name: personName,
          id: msgId
      }, "append", true);

      $.post("http://oddjobbackend.herokuapp.com/newMessage?email=" + email + "&name=" + personName + "&message="+ currentMsg + "&personSent=(PERSONSENT)&id="+ msgId, function(data){
        console.log("Messgae submitted " + data);
      });
  }
  printErr(error);
};

var deleteAllMsgs = function(){
  getMessages(undefined, function(msgs){
    console.log(msgs);
    var curMsgs = {};
    for(var t = 0; t < msgs.length; t++){
      curMsgs = msgs[t];
      console.log(msgs[t]);
      $.del("http://oddjobbackend.herokuapp.com/deleteMessage/" + curMsg["_id"], function(data){
        console.log("Message " + curMsgs["id"] + " deleted.");
      });

    }
  });

}

//Load messages of a particular person.
var getMessages = function (personEmail, seeMessages, callback) {
  var msgHandler = new Framework7();
  var $$ = Dom7;

  var allMessages = msgHandler.messages('.messages', { messageTemplate: msgTemplate });
  var msgBar = msgHandler.messagebar('.messagebar');
  var currentM = {};
  var pMsgs = [];

  $.get("http://oddjobbackend.herokuapp.com/messages", function(data){
    for(var i = 0; i < data.length; i++){
      var currentM = data[i];
      //Get all messages
      if(personEmail === undefined){
        pMsgs.push(currentM);
      }
      else if(currentM.email === personEmail && currentM.message !== "()"){
        pMsgs.push(currentM);
        //console.log(currentM);
        if(seeMessages){
          allMessages.addMessage({
            text: currentM.message,
            name: currentM.name,
            id: currentM.id
          }, "append", true);
          console.log("Message Added");
        }
      }
    }
    if(callback){
      callback(pMsgs);
      return pMsgs;
    }

  });
  return pMsgs;

}

var newId = function(range){
  var res = Math.floor(Math.random() * range);
  return res;
}

var printErr = function(err){
    console.log(err);
}
