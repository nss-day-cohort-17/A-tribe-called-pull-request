// define variables
let searchInput = $('#searchInput')
let data

// set up new promise factory
function getMovies (url) {
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

// promise chain to parse and populate
function parseMovies(url) {
   getMovies(url)
      .then(function(movie) {
         return JSON.parse(movie)
      })
      .then(showResults)
}

// function to populate searchResults div with search results
function showResults (x) {
      console.log(x)
      resetSearch()
   for (let i = 0; i < x.Search.length; i++) {
      console.log(i)
      $('#searchResults').append(`
         <h4>${x.Search[i].Title}</h4>
      `)
   }
}

// reset search field
function resetSearch() {
   $('#searchResults').empty()
}

// add listener for input field
$('#searchInput').keyup(function(e) {
   if (e.originalEvent.code === "Enter") {
      parseMovies(`http://www.omdbapi.com/?s=${searchInput.val()}`)
   }
})
