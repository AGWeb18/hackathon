// JavaScript source code
//Js file that deal with the messages


var msgTemplate = '{{#if day}}' +
    '<div class="messages-date">{{day}} {{#if time}}, <span>{{time}}</span>{{/if}}</div>' +
    '{{/if}}' +
    '<div class="message message-{{type}} hidden {{id}} {{#if hasImage}}message-pic{{/if}} {{#if avatar}}message-with-avatar{{/if}} {{#if position}}message-appear-from-{{position}}{{/if}}">' +
    '{{#if name}}<div class="message-name hidden {{id}}">{{name}}</div>{{/if}}' +
    '<div class="message-text {{id}}">{{text}}{{#if date}}<div class="message-date hidden {{id}}">{{date}}</div>{{/if}}</div>' +
    '{{#if avatar}}<div class="message-avatar hidden {{id}}" style="background-image:url({{avatar}})"></div>{{/if}}' +
    '{{#if label}}<div class="message-label hidden {{id}}">{{label}}</div>{{/if}}' +
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
    //loadMessages(queryParams);

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
            id: queryParams
        }, "append", true);

        console.log("Message Sent");
    }

    printErr(error);

};

//Load messages of a particular person.
var loadMessages = function (person) {
    allMsgs = document.getElementsByClassName(person);
    console.log(allMsgs);
    if (allMsgs === null) {
        return;
    }
    for (var i = 0; i < allMsgs.length; i++) {
        var current = allMsgs[i];
        if (current.classList.contains("hidden")) {
            current.classList.remove("hidden");
            current.style["display"] = "inline";
        }
    }
}

var hideAll = function () {
    var allElements = document.getElementsByClassName("hidden");
    for (var i = 0; i < allElements.length; i++) {
        var current = allElements[i];
        current.style["display"] = "none";
    }
}


var printErr = function(err){
    console.log(err);
}
