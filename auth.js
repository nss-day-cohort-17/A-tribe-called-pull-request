// initialize fireBase
firebase.initializeApp({
		apiKey: "AIzaSyCxFTKharzT4eiWSxUTs76lnwuuHsafLaQ",
		authDomain: "movie-madness-d8291.firebaseapp.com",
		databaseURL: "https://movie-madness-d8291.firebaseio.com",
		storageBucket: "movie-madness-d8291.appspot.com",
		messagingSenderId: "769576227367"
	});

// different view depending on current user
firebase.auth().onAuthStateChanged(() => {
	if (firebase.auth().currentUser) {
		// logged in
		currentUID = firebase.auth().currentUser.uid
		var email = firebase.auth().currentUser.email
			$('welcome-page').removeClass('hidden')
			$('.welcome-page').html(`<h1 class="text-center">Welcome to Movie Madness, ${firebase.auth().currentUser.email}!</h1>`)
			$('.login-tab').addClass('hidden')
			$('.logout-tab').removeClass('hidden')
	} else {
		// logged out
		$('.login-page').removeClass('hidden')
		$('.main-page').addClass('hidden')
	}
})


// register new user on form submit
$('.register-page form').submit( (e) => {
	 console.log('hi')
	 var email = $('.register-email').val();
	 var password = $('.register-password').val();

	 firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(() => $('form')[0].reset())
			.catch((error) => {
				 alert(error)
				 $('.register-page form')[0].reset()
			})
	 e.preventDefault()
	 console.log(email)
})

// login user on form submit
$('.login-page form').submit( (e) => {
	 var email = $('.login-email').val();
	 var password = $('.login-password').val();
	 firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => $('form')[0].reset())
			.then( () => {
			// if logged in, switch 'login-tab' to 'logout-tab' and remove 'register-tab'
				 if (firebase.auth().currentUser !== null) {
						$('.login-tab').addClass('hidden');
						$('.logout-tab').removeClass('hidden')
						$('.register-tab').addClass('hidden')
						currentUID = firebase.auth().currentUser.uid
				 }
			})
			.then(() => {
				 $('.welcome-page').html(`<h1 class="text-center">Welcome to Movie Madness, ${firebase.auth().currentUser.email}!</h1>`)
				 $('.login-page').addClass('hidden')
				 $('.welcome-page').removeClass('hidden')
			})
			.catch((error) => {
				 alert(error.message)
			})
	 e.preventDefault();
})


//sign out
$('.logout-tab').click((e) => {
	 firebase.auth().signOut()
	 $('.logout-tab').addClass('hidden')
	 $('.login-tab').removeClass('hidden')
	 $('.welcome-page').addClass('hidden')
	 console.log("you've logged out");
})


// no 'myMovies' if not logged in
$('.my-movies-tab').click(() => {
	$('form')[0].reset()
	if (firebase.auth().currentUser === null) {
		alert('Please log in for the full Movie Madness experience')
	} else {
		$('.login-page').addClass('hidden')
		$('.welcome-page').addClass('hidden')
		$('.register-page').addClass('hidden')
		$('#searchResults').addClass('hidden')
		$('.my-movies-page').removeClass('hidden')
		showMyMovies(`https://movie-madness-d8291.firebaseio.com/${currentUID}.json`)
	}
})
