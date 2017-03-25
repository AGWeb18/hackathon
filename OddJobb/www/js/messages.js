// JavaScript source code
//Js file that deal with the messages


var msgTemplate = '{{#if day}}' +
    '<div class="messages-date">{{day}} {{#if time}}, <span>{{time}}</span>{{/if}}</div>' +
    '{{/if}}' +
    '<div class="message message-{{type}} {{id}} hidden {{#if hasImage}}message-pic{{/if}} {{#if avatar}}message-with-avatar{{/if}} {{#if position}}message-appear-from-{{position}}{{/if}}">' +
    '{{#if name}}<div class="message-name {{id}} hidden">{{name}}</div>{{/if}}' +
    '<div class="message-text {{id}}">{{text}}{{#if date}}<div class="message-date hidden">{{date}}</div>{{/if}}</div>' +
    '{{#if avatar}}<div class="message-avatar" style="background-image:url({{avatar}})"></div>{{/if}}' +
    '{{#if label}}<div class="message-label">{{label}}</div>{{/if}}' +
    '</div>';

var error = "";

function messagesMain(queryParams) {
    var msgHandler = new Framework7();
    var $$ = Dom7;

    var messages = msgHandler.messages('.messages', { messageTemplate: msgTemplate });
    var msgBar = msgHandler.messagebar('.messagebar');
    var currentMsg = "";

    //Have to read from api to know which user to read from
    //console.log(queryParams);
    var prevMessages = loadMessages(queryParams);

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
        currentMsg = msgBar.value().trim();
        msgBar.clear();

        messages.addMessage({
            text: currentMsg,
            name: "Mateo",
            id: "Mateo"
        }, "append", true);
   
        console.log("message sent"); 
    }

    printErr(error);

};

//Load messages of a particular person.
var loadMessages = function (person) {
    allMsgs = $$("." + person);
    console.log(allMsgs);
    allMsgs.addClass("visible");
    allMsgs.removeClass("hidden");

    /*
    var msgs = $$("." + person);
    if (msgs === null) {
        error = "Invalid Person Called";
        return;
    }
    var people = [];
    for (var i = 0; i < msgs.length; i++) {
        var current = msgs[i];
        if (people.indexOf(current.innerHTML) === -1) {
            people.push(current);
        }
    }
    //console.log(people);
    return people;
    */
}


var printErr = function(err){
    console.log(err);
}