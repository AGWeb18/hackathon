myApp.onPageInit('createPost', function (page) {

  console.log("WELCOME TO HELL MOTHERFUCKER");

    $$('#submitPost').on('click', function(e) {

      var creator = window.user;
      var content = document.getElementById('content').value;
      var postalCode = document.getElementById('postalCode').value;
      var endDate = document.getElementById('when').value;
      var title = document.getElementById('title').value;
      var postDate = new Date();

      if(content === '') {
        myApp.alert('Please fill out the form!', 'Missing Values');

      }

      else if(postalCode === '') {
        myApp.alert('Please include your postal code', 'Missing PostalCode');

      }

      else if(title === '') {
        myApp.alert("Please fill out the title", "Missing Title");

      }

      else {
        var url = 'https://oddjobbackend.herokuapp.com/newPost?creator=' + creator + '&content=' + content + '&postalCode=' + postalCode + '&postDate=' + postDate + '&endDate=' + endDate + '&title=' + title;
        $.post(url, function(result){

          console.log(result);

        });

        mainView.router.loadPage({url:'postList.html' });


      }



    });
})
