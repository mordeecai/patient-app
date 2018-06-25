// Initialize Firebase
var config = {
 apiKey: "AIzaSyBD_Kmw4hayXg0kI1jEZcm83A8vVCyi3NI",
 authDomain: "patient-auth.firebaseapp.com",
 databaseURL: "https://patient-auth.firebaseio.com",
 projectId: "patient-auth",
 storageBucket: "patient-auth.appspot.com",
 messagingSenderId: "234710714862"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById("login-page").style.display="none";
    document.getElementById("service-page").style.display="block";
    document.getElementById("welcome").innerHTML = "Welcome user " + user.email + "!";
  } else {
    document.getElementById("login-page").style.display="block";
    document.getElementById("service-page").style.display="none";
  }
});

function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error: " + errorMessage)
  });
}

function signup() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error: " + errorMessage)
  });
}

function logout() {
  firebase.auth().signOut();
}
