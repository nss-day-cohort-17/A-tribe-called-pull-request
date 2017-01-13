// initialize fireBase
firebase.initializeApp({
    apiKey: "AIzaSyCxFTKharzT4eiWSxUTs76lnwuuHsafLaQ",
    authDomain: "movie-madness-d8291.firebaseapp.com",
    databaseURL: "https://movie-madness-d8291.firebaseio.com",
    storageBucket: "movie-madness-d8291.appspot.com",
    messagingSenderId: "769576227367"
  });


// register new user on form submit
$('.register-page form').submit( (e) => {
   console.log('hi')
   var email = $('input[type="email"]').val();
   var password = $('input[type="password"]').val();

   firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => $('.register-page form')[1].reset())
      .catch((error) => {
         alert(error.message)
         $('.register-page form')[1].reset()
      })
   e.preventDefault()
   console.log(email)
})

// login user on form submit
$('.login-page form').submit( (e) => {
   var email = $('input[type="email"]').val();
   var password = $('input[type="password"]').val();
   firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => $('.login-page form')[0].reset())
      .then( () => {
      // if logged in, switch login-tab to logout-tab
         if (firebase.auth().currentUser !== null) {
            $('.login-tab').addClass('hidden');
            $('.logout-tab').removeClass('hidden')
         }
      })
      .catch((error) => {
         alert(error.message)
      })
   e.preventDefault();
})


//sign out
$('.logout-tab').click((e) => {
   firebase.auth().signOut()
   $('.logout-tab').addClass('hidden');
   $('.login-tab').removeClass('hidden')
   console.log("you've logged out");
})


// no 'myMovies' if not logged in
$('.my-movies-tab').click(() => {
   if (firebase.auth().currentUser === null) {
      alert('Please log in for the full Movie Madness experience')
   }
})
