// define variables
let searchInput = $('#searchInput')

// set up new promise factory
function getMovie (url) {
   return new Promise (function (res, rej) {
      var xhr = new XMLHttpRequest ()
      xhr.addEventListener ('load', function(evt) {
         if (evt.target.status < 400) {
            res(JSON.parse(evt.target.responseText))
         } else {
            rej(evt.target.status)
         }
      })
      xhr.open ('GET', url )
      xhr.send()
   })
}

// add listener for input field
$('#submitBtn').keyup(getMovie(`http://www.omdbapi.com/?s=${searchInput}`))
