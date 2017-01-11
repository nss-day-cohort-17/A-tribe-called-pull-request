// define variables
let searchInput = $('#searchInput')
let data

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

// ----- promise chain to parse and populate ------
function parseMovies(url) {
   getData(url)
      .then(function(movie) {
         return JSON.parse(movie)
      })
      .then(showResults)
      .then(getActors)
      .then(showActors)
      .catch(function() {
         alert('No search results found')
      })
}

function getActors () {
   for (let j = 0; j < x.Search.length; j++) {
      getData(`http://www.omdbapi.com/?i=${x.Search[j].imdbID}`)
         .then(function (actors) {
            return JSON.parse(actors)
         })
   }
}

// function to populate searchResults div with search results
function showResults (x) {
      console.log(x)
      resetSearch()
   for (let i = 0; i < x.Search.length; i++) {
      $('#searchResults').append(`
         <a href="#">
            <div class="movieCard text-center col-xs-6 col-sm-4 col-lg-2 col-md-3">
               <h5>${x.Search[i].Title}</h4>
               <img class="img-responsive" src="${x.Search[i].Poster}" />
               <h6>${x.Search[i].Year}</h3>

               // <p class="movieInfo" id="actorInfo">http://www.omdbapi.com/?s=</p>
               // <div id="actorContent" class="actor">Actors: </div>
            </div>
         </a>
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
