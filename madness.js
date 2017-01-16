// generate a string of 7 random digits 0-9
let empt = ""
let madness = []

function randomID(x) {
   for (let i = 0; i < 7; i++) {
      let rando = (Math.floor(Math.random()*10)).toString()
      x = x + rando
   }
   x = "tt" + x
   return x
}

function populateMadness() {
   console.log('go')
   // populate searchResults div with search results
   for (let j = 0; j < 9; j++) {
            $('.madness-page').append(`
               <div class="movieCard text-center">
                     <p class="hidden">${j}</p>
                     <h4>${madness[j].Title}</h4>
                     <h5>${madness[j].Year}</h5>
                     <img class="img-responsive" src="${madness[j].Poster}" />
                     <a><span class="glyphicon glyphicon-plus-sign add"></span></a>
                     <p class="text-left">Add to * My Movies *</p>
                     <p class="hidden">${madness[j].imdbID}</p>
                     <p class="hidden">${madness[j].Actors}</p>
               </div>`)
   }
}

function movieMadness() {
      let newRando = randomID(empt)
      console.log(newRando)
      getData(`http://www.omdbapi.com/?i=${newRando}`)
         .then(function (id) {
            return JSON.parse(id)
         })
         .then(function (x) {
            console.log(x)
            if (x.Response === "False") {
               console.log("not a movie")
            } else {
               madness.push(x)
            }
         })
   // run the movieMadness function until 9 movie cards are displayed
         .then(() => {
            if (madness.length < 9) {
               movieMadness()
            } else {
               populateMadness()
            }
         })
         .then( () => {
            addMovie(madness)
         })
}


$('.navbar-brand').click( () => {
   $('#searchResults').addClass('hidden')
   $('.my-movies-page').addClass('hidden')
   $('.welcome-page').addClass('hidden')
   $('.register-page').addClass('hidden')
   $('.login-page').addClass('hidden')
   $('.madness-page').empty()
   $('.madness-page').removeClass('hidden')
   madness = []
   movieMadness()
})
