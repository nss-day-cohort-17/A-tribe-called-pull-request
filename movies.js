// define variables
let searchInput = $('#searchInput')

let data
let imdbIDs = []
let movieInfo = []
let myMovies = []
let currentUID



// new promise factory to get array of movies
function getData (url) {
   return new Promise (function (res, rej) {
      var xhr = new XMLHttpRequest ()
      xhr.addEventListener ('load', function(evt) {
         if (evt.target.status < 400) {
            res(evt.target.responseText)
         } else {
            rej(evt.target.status)
         }
      })
      xhr.open ('GET', url )
      xhr.send()
   })
}

// ----- PROMISE CHAIN to parse and populate ------
function promiseChain(url) {
   getData(url)
      .then(function(movie) {
         return JSON.parse(movie)
      })
      .then(getIDs)
      .then(parseIDs)
      // .then(showActors)
      .catch(function() {
         alert('No search results found')
      })
}


function parseIDs (ids) {

   for (let i = 0; i < ids.length; i++) {
      getData(`http://www.omdbapi.com/?i=${ids[i]}`)
         .then(function (id) {
            return JSON.parse(id)
         })
         .then(function (x) {
            movieInfo[i] = x;
      // populate searchResults div with search results
            $('#searchResults').append(`
               <div class="movieCard text-center">
                     <p class="hidden">${i}</p>
                     <h5>${movieInfo[i].Title}</h5>
                     <img class="img-responsive" src="${movieInfo[i].Poster}" />
                     <h6>${movieInfo[i].Year}</h6>
                     <a><span class="glyphicon glyphicon-plus-sign add"></span></a>
                     <p text-left>Add to * My Movies *</p>
                     <p class="hidden">${movieInfo[i].imdbID}</p>
                     <p class="hidden">${movieInfo[i].Actors}</p>
               </div>`)
         })
         .then(function() {
            if(i === ids.length - 1) {
         addMovie();
         console.log(movieInfo)
      }
      })
         .catch(() => {
            console.log('Could not get movie IDs')
      })
   }
   return movieInfo
}


function getIDs (result) {
   // grab movie ID for each search result
   for (let j = 0; j < result.Search.length; j++) {
      imdbIDs.push(result.Search[j].imdbID)
   }
   return imdbIDs
}

// reset search field
function resetSearch() {
   movieInfo = []
   imdbIDs = []
   $('#searchResults').html("")
   $('#searchResults').removeClass('hidden')
   $('.my-movies-page').addClass('hidden')
}

// add listener for input field on enter key
$('#searchInput').keydown(function(e) {
   if (e.originalEvent.code === "Enter") {
      $('.welcome-page').addClass('hidden')
      resetSearch()
      promiseChain(`http://www.omdbapi.com/?s=${searchInput.val()}`)
   }

})



// function to show major actors on hover of item
function showActors () {
   $('.movieCard').hover(
      function(e) {
         $(this).addClass()
      },
      function() {
         $(this).removeClass()
      }
   )
}


// show register page on register tab click
$('.register-link').click((e) => {
   $('form')[1].reset()
   $('#searchResults').html("")
   $('.register-page').removeClass('hidden')
   $('.login-page').addClass('hidden')
})

// show user login on login tab click
$('.login-tab').click((e) => {
   $('form')[1].reset()
   $('#searchResults').html("")
   $('.login-page').removeClass('hidden')
   $('.register-page').addClass('hidden')
})



//Search Input Override
$('#searchInput').focus(() => {
   $('.login-page').addClass('hidden')
   $('.register-page').addClass('hidden')
})


//ADD-REMOVE BUTTONS*******************
//create add button for DI card, function will add movie to personal firebase object
function addMovie() {
   $('.add').click(function(e) {
      if (firebase.auth().currentUser === null) {
         alert("You must be logged in to add flicks to *My Movies*")
      } else {
      let thisIndex = e.target.parentElement.parentElement.firstElementChild.innerHTML
      $.post(
         `https://movie-madness-d8291.firebaseio.com/${currentUID}.json`,
         JSON.stringify({ movie : movieInfo[thisIndex] })
      )
      .then(res => console.log(res.name))
      }
   })
}

//create remove button for DI card, function will remove movie from
function removeMovie() {

}

$('.glyphicon-minus-sign').click(function(e) {
   console.log('hi')
})


// pull movies down from firebase to myMovies
function showMyMovies(url) {
   getData(url)
      .then(function(movie) {
         myMovies = JSON.parse(movie);
         console.log(myMovies)
      })
      .then(() => {
         Object.keys(myMovies).forEach(function(id, i) {
            console.log(myMovies[id]);
            $('.my-movies-page').append(`
               <div class="movieCard text-center">
                  <p class="hidden">${i}</p>
                  <h5>${myMovies[id].movie.Title}</h5>
                  <img class="img-responsive" src="${myMovies[id].movie.Poster}" />
                  <h6>${myMovies[id].movie.Year}</h6>
                  <a><span class="glyphicon glyphicon-minus-sign remove"></span></a>
                  My Rating: <form id="myRating"><input class="rating" pattern="[1-5]{1}" id="rating" type="text" maxlength="1" ></form>
                  <p class="hidden">${myMovies[id].movie.imdbID}</p>
                  <p class="hidden">${myMovies[id].movie.Actors}</p>
               </div>`)
         })
      })

}

// function to add rating to movie card
function rateMovie () {

}

// rating submission on .submit
   $('#myRating').submit(function(e) {
      console.log('hi')
      //  if ($('#rating').val()) {
      //    let myRating = $('#rating').val()
      //    rateMovie(myRating)
      //  }
   e.preventDefault()
   })
