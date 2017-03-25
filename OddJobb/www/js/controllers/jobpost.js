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
                        postID: post._id
                    })
                    map = new GMaps({
                        div: '#map',
                        lat: -12.043333,
                        lng: -77.028333
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
    const posts = [];
    $$.ajax({
        url: 'http://oddjobbackend.herokuapp.com/posts',
        method: 'GET',
        success: (response) => {
          $.get("http://oddjobbackend.herokuapp.com/users", function(data){
            let postsList = JSON.parse(response).reverse();
            postsList.forEach((post) => {
              var user = getUser(post.creator, data);
                if (post.title) {
                    posts.push({
                        title: post.title,
                        date: new Date(post.postDate).toDateString(),
                        season: 'img/green.jpg',
                        text: post.content,
                        creator: post.creator,
                        postID: post._id,
                        item: user,
                        email: window.user
                    })
                }
            });
            const myList = myApp.virtualList('.postlist', {
                items: posts,
                template: cardTemplate
            });
          })

        }
    });
    //  postPost();
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



function postPost() {
    $$.ajax({
        url: `http://oddjobbackend.herokuapp.com/newPost?title=${'snow mowing required'}&creator=${1234}&content=${'guys please help my snow is too large'}&uniqueID=${'asdf'}&category${'summer'}&postalCode=${'L2N 2H4'}`,
        method: 'POST',
        success: (response) => {
            console.log(response);
        }
    });
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
    '   <a href="post.html?postID={{postID}}" class="button">Map</a>' +
    '   <a href="indMsg.html?personName={{item}}&email={{email}}" class="button">Contact</a>' +
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
    '   <a href="#" class="button">Contact</a>' +
    '   </div>' +
    '</div >';


//Helper FUnctions
var getUser = function(email, users){
  var currentUser;
  for(var t = 0; t < users.length; t++){
    currentUser = users[t];
    console.log(currentUser);
    if (currentUser.email === email) {
      return currentUser.firstName;
    }
  }
  return false;

} 