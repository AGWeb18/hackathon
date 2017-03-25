myApp.onPageInit('post', function (page) {
    console.log('posted!');

    const testPost = {
        season: 'img/green.jpg',
        title: 'Grass Mowing Required',
        date: 'January 21, 2015',
        text: 'Guys please help my grass is growing too large',
        postalCode: 'l1n4e5'
    }

    const posts = [];

    posts.push(testPost);

    const myList = myApp.virtualList('.single-card', {
        items: posts,
        template: cardTemplate
    });


    myApp.params.swipePanel = false;
    map = new GMaps({
        div: '#map',
        lat: -12.043333,
        lng: -77.028333
    });

    address(testPost.postalCode);
})

myApp.onPageInit('postList', function (page) {
    console.log('posted!');

    const posts = [];

    $$.ajax({
        url: 'http://oddjobbackend.herokuapp.com/posts',
        method: 'GET',
        success: (response) => {
            console.log(response);
            console.log(typeof (response));

            let postsList = JSON.parse(response);
            console.log(typeof (postsList));
            postsList.forEach((post) => {
                if (post.title) {
                    console.log(post);
                    posts.push({
                        title: post.title,
                        date: 'January 1 2015',
                        season: 'img/white.jpg',
                        text: post.content,
                        creator: post.creator
                    })
                }
                const myList = myApp.virtualList('.postlist', {
                    items: posts,
                    template: cardTemplate
                });
            });
        }
    });
})


function address(adr) {
    GMaps.geocode({
        address: adr,
        callback: function (results, status) {
            if (status == 'OK') {
                var latlng = results[0].geometry.location;
                map.setCenter(latlng.lat(), latlng.lng());
                map.addMarker({
                    lat: latlng.lat(),
                    lng: latlng.lng()
                });
            }
        }
    });
}

const cardTemplate =
    '<div class="card" >' +
    '   <div style="background-image:url({{season}})" valign="bottom" class="card-header color-white"></div>' +
    '       <div class="card-content">' +
    '           <div class="card-content-inner">' +
    '               <h3 class=card-title">{{title}}</h3>' +
    '               <p class="color-gray">Posted on {{date}}</p>' +
    '               <p>{{text}}</p>' +
    '           </div>' +
    '       </div>' +
    '   <div class="card-footer">' +
    '   <a href="#" class="button button-big">Contact</a>' +
    '   <a href="post.html?postID=5" class="button button-big">Map</a>' +
    '   </div>' +
    '</div >';