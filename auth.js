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
      .then(() => $('form')[1].reset())
      .catch((error) => {
         alert(error.message)
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
      .then(() => $('form')[0].reset())
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
// $('.sign-out').click((e) => {
//    firebase.auth().signOut()
//    console.log("You are signed out");
