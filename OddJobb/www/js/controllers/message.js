//Each message Page
myApp.onPageInit('indMsg', function (page) {
    var queryParams = page.query["messageId"];
    var title = document.getElementById("currentPerson");
    title.innerHTML = queryParams;
    messagesMain(queryParams);
})

//Messages Page
myApp.onPageInit('messages', function (page) {

    //Will be reading this from the database
    const people = [{ item: "Mateo" }, { item: "Holly" }, { item: "Anthony" }, { item: "Haowei" }];

    const myListOfPeople = myApp.virtualList('.list-block.virtual-list', {
        items: people,
        template:
        '<li>' +
        '<a href="indMsg.html?messageId={{item}}" class="item-link item-content">' +
        '<div>{{item}}</div>' +
        '</a>' +
        '</div>' +
        '</li>'
    });
})