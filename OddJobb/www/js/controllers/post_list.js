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