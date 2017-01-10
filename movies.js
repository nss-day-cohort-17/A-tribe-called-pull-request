// define variables
let searchInput = $('#searchInput')
let searchResults

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

function parseMovies(url) {
   return getMovies(url).then(JSON.parse)
}

// add listener for input field
$('#searchInput').keyup(function(e) {
   if (e.originalEvent.code === "Enter") {
      searchResults = parseMovies(`http://www.omdbapi.com/?s=${searchInput.val()}`))
   }
})


// populate searchResults div with search results
