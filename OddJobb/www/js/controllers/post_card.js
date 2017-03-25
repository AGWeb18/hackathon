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