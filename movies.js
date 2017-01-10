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
         <div class="add-remove col-xs-6 col-sm-4 col-lg-2 col-md-3">
            <h5>${x.Search[i].Title}</h4>
            <h6>${x.Search[i].Year}</h3>
            <a></a>
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

//ADD-REMOVE BUTTONS*******************
//create add button for DI card, function will add movie to personal firebase object
$(".add-remove a").append("<span class='glyphicon glyphicon-plus'</span>")

//create remove button for DI card, function will remove movie from personal firebase object
