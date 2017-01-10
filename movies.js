// define variables
let searchInput = $('#searchInput')

// set up new promise factory
function fetch (url) {
   return new Promise (function (res, rej) {
      var xhr = new XMLHttpRequest ()
      xhr.addEventListener ('load', function(evt) {
         if (evt.target.status < 400) {
            console.log(evt.target.responseText)
            res(evt.target.responseText)
         } else {
            rej(evt.target.status)
         }
      })
      xhr.open ('GET', url )
      xhr.send()
   })
}

function getMovie (url) {
   return fetch(url).then(JSON.parse)
}

// add listener for input field
$('#searchInput').keypress(getMovie(`http://www.omdbapi.com/?s=${searchInput.val()}`))
