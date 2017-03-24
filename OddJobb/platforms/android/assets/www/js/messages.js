// JavaScript source code
//Js file that deal with the messages


function messagesMain() {
    var msgHandler = new Framework7();
    var $$ = Dom7;

    var messages = msgHandler.messages('.messages');
    var msgBar = msgHandler.messagebar('.messagebar');
    var currentMsg = "";

    $$('.messagebar').on('click', function () {
        currentMsg = msgBar.value().trim();
        msgBar.clear();
        messages.add

        messages.addMessage({
            text: currentMsg,
            name: "Mateo"

        }, "append", true);

    })

};