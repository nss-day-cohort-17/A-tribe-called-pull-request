// define variables
let searchInput = $('#searchInput')

let data
let imdbIDs = []
let movieInfo = []


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
               <div class="movieCard text-center col-xs-6 col-sm-4 col-lg-2 col-md-3">
                     <h5>${movieInfo[i].Title}</h5>
                     <img class="img-responsive" src="${movieInfo[i].Poster}" />
                     <h6>${movieInfo[i].Year}</h6>
                     <a><span class="glyphicon glyphicon-plus-sign add"></span></a>
                     <a><span class="glyphicon glyphicon-minus-sign remove"></span></a>
                     <label for="#rating">Rating</label>
                     <input class="rating" id="rating" type="text" maxlength="1"></input>
               </div>`)
         })
         .then(function() {
            if(i === ids.length - 1) {
         addMovie();
         removeMovie();
         // console.log()
      }
      })
         .catch(() => {
            console.log('Could not get movie IDs')
         })

   }
   return movieInfo
}


function getIDs (result) {
   console.log(result)
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
}

// add listener for input field on enter key
$('#searchInput').keydown(function(e) {
   if (e.originalEvent.code === "Enter") {
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
$('.register-tab').click((e) => {
   $('form')[1].reset()
   $('.register-page').removeClass('hidden')
   $('.login-page').addClass('hidden')
})

// show user login on login tab click
$('.login-tab').click((e) => {
   $('form')[0].reset()
   $('.login-page').removeClass('hidden')
   $('.register-page').addClass('hidden')
})



//Search Input Override
$('#searchInput').focus(() => {
   $('.login-page').addClass('hidden')
   $('.register-page').addClass('hidden')
})

//  'PUT' a movie onto fireBase
// function putMovie () {
//    var xhr = new XMLHttpRequest ()
//    xhr.addEventListener ('load', function() {})
//    xhr.open ('POST', 'https://movie-madness-d8291.firebaseio.com/fu/.json' )
//    xhr.send()
// }

// add to fireBase on add button click
// function addMovie () {
//    $('.glyphicon-plus-sign').click(putMovie(e))
// }


//ADD-REMOVE BUTTONS*******************
//create add button for DI card, function will add movie to personal firebase object
function addMovie() {
   $('.add').click(function(e) {
   console.log(e.currentTarget)
   })
}

//create remove button for DI card, function will remove movie from
function removeMovie() {
   $('.remove').click(function(e) {
      console.log(e.currentTarget)
   })
}
// personal firebase object

//RATING INPUT*********************
// function movieRate() {
//    $(".rating").keyup(function(e) {
//       var rating = $(e.currentTarget).val()
//       // return rating
//       console.log(rating)
//    } )
// }
