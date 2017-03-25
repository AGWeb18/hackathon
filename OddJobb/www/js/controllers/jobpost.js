myApp.onPageInit('post', function (page) {
    myApp.params.swipePanel = false;
    const posts = [];

    $$.ajax({
        url: 'http://oddjobbackend.herokuapp.com/posts',
        method: 'GET',
        success: (response) => {
            let postsList = JSON.parse(response);
            postsList.forEach((post) => {
                if (post.endDate && post._id == page.query.postID) {
                    posts.push({
                        title: post.title,
                        date: new Date(post.postDate).toDateString(),
                        season: 'img/green.jpg',
                        text: post.content,
                        creator: post.creator,
                        postalCode: post.postalCode,
                        postID: post._id
                    })
                    map = new GMaps({
                        div: '#map',
                    });
                    address(post.postalCode);
                }
            });
            const myList = myApp.virtualList('.single-card', {
                items: posts,
                template: cardTemplate2
            });
        }
    });
})

myApp.onPageInit('postList', function (page) {
    var posts = [];
    var changes = 0;

    var myList = myApp.virtualList('.postlist', {
        items: posts,
        template: cardTemplateDistance
    });

    $$.ajax({
        url: 'http://oddjobbackend.herokuapp.com/posts',
        method: 'GET',
        success: (response) => {
            let postsList = JSON.parse(response).reverse();
            postsList.forEach((post) => {
                if (post.endDate) {
                    posts.push({
                        title: post.title,
                        date: new Date(post.postDate).toDateString(),
                        postalCode: post.postalCode,
                        season: 'img/green.jpg',
                        text: post.content,
                        creator: post.creator,
                        postID: post._id,
                        distance: ''
                    })
                }
            });
            myList.replaceAllItems(posts);
        }
    });

    const notify = () => {
        changes++;
        posts = posts.sort(function (post1, post2) {
            return parseInt(post1.distance) - parseInt(post2.distance);
        });
        myList.replaceAllItems(posts);
    }

    $$('#get-address').click(function () {
        const postalCode = $$('#distance-address').val();
        GMaps.geocode({
            address: postalCode,
            callback: function (results, status) {
                if (status == 'OK') {
                    var latlng = results[0].geometry.location;
                    getAddresses(posts, { lat: latlng.lat, lng: latlng.lng }, notify);
                }
            }
        });
        console.log(posts);
    });
})


myApp.onPageInit('myPosts', function (page) {
    const posts = [];
    $$.ajax({
        url: 'http://oddjobbackend.herokuapp.com/posts',
        method: 'GET',
        success: (response) => {
            let postsList = JSON.parse(response).reverse();
            postsList.forEach((post) => {
                if (post.endDate && post.creator == window.user) {
                    posts.push({
                        title: post.title,
                        date: new Date(post.postDate).toDateString(),
                        season: 'img/green.jpg',
                        text: post.content,
                        postalCode: post.postalCode,
                        creator: post.creator,
                        postID: post._id
                    })
                }
            });
            const myList = myApp.virtualList('.my-postlist', {
                items: posts,
                template: cardTemplate
            });
        }
    });
});


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

function getAddresses(postList, latlong, callbackFn) {
    const latlngList = [];

    postList.forEach((post) => {
        GMaps.geocode({
            address: post.postalCode,
            callback: function (results, status) {
                if (status == 'OK') {
                    var latlng = results[0].geometry.location;
                    const postCoords = {
                        lat: latlng.lat,
                        lng: latlng.lng
                    };
                    post.distance = calcDistance(postCoords, latlong);
                    console.log(post.distance);
                    callbackFn();
                }
                else {
                    console.log(post.postID);
                }
            }
        });
    })
    return latlngList;
}

function calcDistance(p1, p2) {
    return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 10).toFixed(2) + 'm';
}


const cardTemplate =
    '<div class="card" >' +
    '   <div style="background-image:url({{season}})" valign="bottom" class="card-header color-white"></div>' +
    '       <div class="card-content">' +
    '           <div class="card-content-inner">' +
    '               <p class="color-gray">Posted on {{date}}</p>' +
    '               <h3 class=card-title">{{title}}</h3>' +
    '               <p>{{text}}</p>' +
    '           </div>' +
    '       </div>' +
    '   <div class="card-footer">' +
    '       <a href="post.html?postID={{postID}}" class="button">Map</a>' +
    '       <a href="#" class="button">Contact</a>' +
    '   </div>' +
    '</div >';

const cardTemplate2 =
    '<div class="card" >' +
    '   <div style="background-image:url({{season}})" valign="bottom" class="card-header color-white"></div>' +
    '       <div class="card-content">' +
    '           <div class="card-content-inner">' +
    '               <p class="color-gray">Posted on {{date}}</p>' +
    '               <h3 class=card-title">{{title}}</h3>' +
    '               <p>{{text}}</p>' +
    '           </div>' +
    '       </div>' +
    '   <div class="card-footer">' +
    '       <a href="#" class="button">Contact</a>' +
    '   </div>' +
    '</div >';


const cardTemplateDistance =
    '<div class="card" >' +
    '   <div style="background-image:url({{season}})" valign="bottom" class="card-header color-white"></div>' +
    '       <div class="card-content">' +
    '           <div class="card-content-inner">' +
    '               <p class="color-gray">Posted on {{date}}</p>' +
    '               <h3 class=card-title">{{title}}</h3>' +
    '               <p>{{text}}</p>' +
    '               <h3 class=right>Distance: {{distance}} </h3>' +
    '           </div>' +
    '       </div>' +
    '   <div class="card-footer">' +
    '       <a href="post.html?postID={{postID}}" class="button">Map</a>' +
    '       <a href="#" class="button">Contact</a>' +
    '   </div>' +
    '</div >';