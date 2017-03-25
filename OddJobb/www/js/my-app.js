// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
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
    messagesMain();
})

//Messages Page
myApp.onPageInit('messages', function (page) {
    //messagesMain();
    /*
    1. Do AJAX call
    2. Put data into Array
    3. Set array
    */
    const people = [
        /*
        {
            name: nameOfPerson
            message: This is a mess...
            
        }*/
    ];

    for (var i = 0; i < 10; i++) {
        people.push({
            item: i
        });
    }

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
    /*
         1. Do AJAX call to get post based on postID
         2. Generate post data!
         */


    const testPost = {
        season: 'img/green.jpg',
        title: 'Grass Mowing Required',
        date: 'January 21, 2015',
        text: 'Guys please help my grass is growing too large'
    }

    const posts = [];

    if (page.query) {
        console.log(page.query);
        posts.push(testPost);


    } else {
        posts.push(testPost);
        posts.push(testPost);
        posts.push(testPost);
    }


    const myList = myApp.virtualList('.list-block.virtual-list.cardslist', {
        items: posts,
        template:
        '<div class="card demo-card-header-pic" >' +
        '   <div style="background-image:url(img/green.jpg)" valign="bottom" class="card-header color-white no-border"></div>' +
        '       <div class="card-content">' +
        '           <div class="card-content-inner">' +
        '               <h1>Grass Mowing Required</h1>' +
        '               <p class="color-gray">Posted on January 21, 2015</p>' +
        '               <p>Quisque eget vestibulum nulla...</p>' +
        '           </div>' +
        '       </div>' +
        '   <div class="card-footer">' +
        '   <a href="#" class="button button-big">Contact</a>' +
        '   <a href="#" class="button button-big">Map</a>' +
        '   </div>' +
        '</div >'
    });
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
            price: '5',*/
    ];

    for (var i = 0; i < 50; i++) {
        posts.push({
            item: i
        });
    }

    const myList = myApp.virtualList('.list-block.virtual-list.postlist', {
        items: posts,
        template:
        '<li>' +
        '   <a href="post.html?postID={{item}}" class="item-link item-content">' +
        '       <div>{{item}}</div>' +
        '   </a>' +
        '</li>'
    });
})
