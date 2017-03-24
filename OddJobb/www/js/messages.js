// JavaScript source code
//Js file that deal with the messages


function messagesMain() {
    var msgHandler = new Framework7();
    var $$ = Dom7;

    var messages = msgHandler.messages('.messages');
    var msgBar = msgHandler.messagebar('.messagebar');
    var currentMsg = "";

    $$('.messagebar').on('keypress', function (e) {
        if (e.keyCode == 13) {
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
            name: "Mateo"

        }, "append", true);
        console.log("message sent");
    }

};