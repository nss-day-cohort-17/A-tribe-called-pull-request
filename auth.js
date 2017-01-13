// initialize fireBase
firebase.initializeApp({
    apiKey: "AIzaSyCT6Olqns1kus1qwC_v10PDqIXlRloBUBE",
    authDomain: "c17-jquery-auth-4f244.firebaseapp.com",
    databaseURL: "https://c17-jquery-auth-4f244.firebaseio.com",
    storageBucket: "c17-jquery-auth-4f244.appspot.com",
    messagingSenderId: "483267125880"
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
         alert("*** Unable to register user ***")
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
      .then(() => $('form')[1].reset())
      .catch((error) => {
         alert("*** Unable to login ***")
      })
   e.preventDefault();
})


//sign out
// $('.sign-out').click((e) => {
//    firebase.auth().signOut()
//    console.log("You are signed out");
