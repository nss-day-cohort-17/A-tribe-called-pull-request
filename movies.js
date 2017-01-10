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

function parseMovies(url) {
   return getMovies(url).then(JSON.parse)
}

// function to populate searchResults div with search results
function showResults (x) {
   for (let i = 0; i < x.length; i++) {
      console.log(i)
      $('#searchResults').append(`
         <h4>${x[i].Title}</h4>
      `)
   }
}

// add listener for input field
$('#searchInput').keyup(function(e) {
   if (e.originalEvent.code === "Enter") {
      showResults(parseMovies(`http://www.omdbapi.com/?s=${searchInput.val()}`))
      // showResults(data)
   }
})
