myApp.onPageInit('post', function (page) {
    /*
         1. Do AJAX call to get post based on postID
         2. Generate post data!
         */

    const testPost = {
        season: 'img/green.jpg',
        title: 'Grass Mowing Required',
        date: 'January 21, 2015',
        text: 'Guys please help my grass is growing too large',
    }
    
    const posts = [];
    posts.push(testPost);

    console.log(posts);


    const myList = myApp.virtualList('.virtual-list.cardslist', {
        items: posts,
        template:
        '<div class="card" >' +
        '   <div style="background-image:url({{season}})" valign="bottom" class="card-header color-white"></div>' +
        '       <div class="card-content">' +
        '           <div class="card-content-inner">' +
        '               <h1>{{title}}</h1>' +
        '               <p class="color-gray">Posted on {{date}}</p>' +
        '               <p>{{text}}</p>' +
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

    $$.ajax({
        url: 'http://oddjobbackend.herokuapp.com/newPost',
        method: 'POST',
        data: {
            title: 'abcd',
            creator: '12345',
            content: 'i tried to write this',
            uniqueID: '123',
            category: 'summer',
            postalCode: 'l1n4e5'
        },
        success: (response) => {
            console.log(response);
        }
    });

    const testPost = {
        season: 'img/green.jpg',
        title: 'Grass Mowing Required',
        date: 'January 21, 2015',
        text: 'Guys please help my grass is growing too large',
    }

    const testPost2 = {
        season: 'img/white.jpg',
        title: 'Snow Mowing Required',
        date: 'January 21, 2015',
        text: 'Guys please help my grass is growing too large'
    };

    const testPost3 = {
        season: 'img/brown.jpg',
        title: 'Snow Mowing Required',
        date: 'January 21, 2015',
        text: 'Guys please help my grass is growing too large'
    };

    const testPost4 = {
        season: 'img/orange.jpg',
        title: 'Snow Mowing Required',
        date: 'January 21, 2015',
        text: 'Guys please help my grass is growing too large'
    };

    const posts = [];

    posts.push(testPost);
    posts.push(testPost2);
    posts.push(testPost3);
    posts.push(testPost4);

    const myList = myApp.virtualList('.postlist', {
        items: posts,
        template:
        '<div class="card" >' +
        '   <div style="background-image:url({{season}})" valign="bottom" class="card-header color-white"></div>' +
        '       <div class="card-content">' +
        '           <div class="card-content-inner">' +
        '               <h1>{{title}}</h1>' +
        '               <p class="color-gray">Posted on {{date}}</p>' +
        '               <p>{{text}}</p>' +
        '           </div>' +
        '       </div>' +
        '   <div class="card-footer">' +
        '   <a href="#" class="button button-big">Contact</a>' +
        '   <a href="#" class="button button-big">Map</a>' +
        '   </div>' +
        '</div >'
    });
})