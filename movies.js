// define variables
let searchInput = $('#searchInput')

let data
let imdbIDs = []
let movieInfo = {}


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
function parseMovies(url) {
   getData(url)
      .then(function(movie) {
         return JSON.parse(movie)
      })
      .then(showResults)

      .then(getIDs)
      // .then(showActors)
      .catch(function() {
         alert('No search results found')
      })
}


function getIDs () {
   for (let i = 0; i < imdbIDs.length; i++) {
      getData(`http://www.omdbapi.com/?i=${imdbIDs[i]}`)
         .then(function (id) {
            return JSON.parse(id)
         })
         .then( function (x) {
            movieInfo[i] = x
         })
   }
      // .then(movieRate)
}

// function to populate searchResults div with search results
function showResults (obj) {
   console.log(obj)
   resetSearch()

   // grab movie ID for each search result
   for (let j = 0; j < obj.Search.length; j++) {
      imdbIDs.push(obj.Search[j].imdbID)
   }

   // create a card for each search result
   for (let i = 0; i < obj.Search.length; i++) {
      $('#searchResults').append(`

                <div class="movieCard text-center col-xs-6 col-sm-4 col-lg-2 col-md-3">
                  <h5>${obj.Search[i].Title}</h5>
                  <img class="img-responsive" src="${obj.Search[i].Poster}" />
                  <h6>${obj.Search[i].Year}</h6>
                  <a><span class="glyphicon glyphicon-plus-sign"></span></a>
                  <a><span class="glyphicon glyphicon-minus-sign"></span></a>
                  <label for="#rating">Rating</label>
                  <input class="rating" id="rating" type="text" maxlength="1"></input>
              </div>

      `)
   }
}

// reset search field
function resetSearch() {
   $('#searchResults').empty()
}

// add listener for input field on enter key
$('#searchInput').keyup(function(e) {
   if (e.originalEvent.code === "Enter") {
      parseMovies(`http://www.omdbapi.com/?s=${searchInput.val()}`)
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

//ADD-REMOVE BUTTONS*******************
//create add button for DI card, function will add movie to personal firebase object


//create remove button for DI card, function will remove movie from
// personal firebase object

//RATING INPUT*********************
// function movieRate() {
//    $(".rating").keyup(function(e) {
//       var rating = $(e.currentTarget).val()
//       // return rating
//       console.log(rating)
//    } )
// }
