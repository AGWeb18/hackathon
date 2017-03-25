// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page
    myApp.alert('Here comes About page');
})


//Each message Page
myApp.onPageInit('indMsg', function (page) {
    hideAll();
    var person = page.query["messageId"];
    var title = document.getElementById("currentPerson");
    title.innerHTML = person;
    loadMessages(person);
    messagesMain(person);
})

//Messages Page
myApp.onPageInit('messages', function (page) {

    //Will be reading this from the database
    var temp;
    httpGet();
    
    const people = [{ item: "Mateo" }, { item: "Holly" }, { item: "Anthony" }, { item: "Haowei" }, { item: "Kate" }];

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

myApp.onPageInit('post', function (page) {
    console.log(page.query);
    /*
    1. Do AJAX call to get post based on postID
    2. Generate post data!
    */

})

myApp.onPageInit('postList', function (page) {
    console.log('posted!');

    /*
    1. Do AJAX call
    2. Put data into Array
    3. Set array
    */
    const posts = [
        /*
        {
            title: 'Need people to show shovel for me tomorrow!',
            text: 'House is not too large, so should not be an issue!',
            price: '5',
            postalCode: '5'
            
        }*/
    ];

    for (var i = 0; i < 50; i++) {
        posts.push({
            item: i
        });
    }

    const myList = myApp.virtualList('.list-block.virtual-list', {
        items: posts,
        template:
        '<li>' +
        '<a href="post.html?postID={{item}}" class="item-link item-content">' +
        '<div>{{item}}</div>' +
        '</a>' +
        '</div>' +
        '</li>'
    });
})


function httpGet(){
    $.get('http://oddjobbackend.herokuapp.com/users', function (data) {
        console.log(data);
    });
}
