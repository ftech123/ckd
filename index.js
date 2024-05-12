// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBThat61mAP0Mb7w43Lsolt8bw67ppWPnc",
  authDomain: "train-66e6c.firebaseapp.com",
  databaseURL: "https://train-66e6c-default-rtdb.firebaseio.com",
  projectId: "train-66e6c",
  storageBucket: "train-66e6c.appspot.com",
  messagingSenderId: "687158781809",
  appId: "1:687158781809:web:6afe261155c0584bd078d0",
  measurementId: "G-G5GYCFZ4VL"
};

// Move firebase.initializeApp(firebaseConfig); to the top of the script
firebase.initializeApp(firebaseConfig);

// Initialize variables
const auth = firebase.auth()
const database = firebase.database()
// Update register function
function register() {
// Get all our input fields
var username = document.getElementById('username').value;
var email = document.getElementById('email').value;
var phone = document.getElementById('phone').value;
var password = document.getElementById('password').value;
// var repeat_password = document.getElementById('repeat_password').value;

// Validate input fields
if (validate_email(email) == false || validate_password(password) == false) {
    displayMessage('Invalid email or password, or passwords do not match!');
    return;
}
if (validate_field(username) == false || validate_field(phone) == false) {
    displayMessage('One or more extra fields are invalid!');
    return;
}

// Move on with Auth
auth.createUserWithEmailAndPassword(email, password)
    .then(function (userCredential) {
        // Declare user variable
        var user = auth.currentUser
    
        // Add this user to Firebase Database
        var database_ref = database.ref()
    
        // Create User data
        var user_data = {
          email : email,
          username : username,
          phone : phone,
          last_login : Date.now()
        }

        // Push to Firebase Database
        database_ref.child('users/' + user.uid).set(user_data)

        // Done
        displayMessage('User Created!!');
    })
    .catch(function (error) {
        // Firebase will use this to displayMessage of its errors
        var errorCode = error.code;
        var errorMessage = error.message;

        displayMessage(errorMessage);
    });
}


// Set up our login function
// Set up our login function
function login() {
  // Get all our input fields
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
      displayMessage('Email or Password is Outta Line!!');
      return;
  }

  auth.signInWithEmailAndPassword(email, password)
      .then(function () {
          // Declare user variable
          var user = auth.currentUser;

          // Log the user's username for debugging
          console.log("User's username:", user.username);

          // Check if username starts with 'dr'
          if (user.email && user.email.toLowerCase().startsWith('dr')) {
              // Redirect to dashboard for doctor
              window.location.href = 'doctorP.html';
          } else {
              // Redirect to viewMessage for others
              window.location.href = 'viewMessage.html';
          }

          // Add this user to Firebase Database
          var database_ref = database.ref();

          // Create User data
          var user_data = {
              last_login: Date.now()
          };

          // Push to Firebase Database
          database_ref.child('users/' + user.uid).update(user_data);

          // Done
          displayMessage('User Logged In!!');
      })
      .catch(function (error) {
          // Firebase will use this to displayMessage of its errors
          var error_code = error.code;
          var error_message = error.message;

          displayMessage(error_message);
      });
}

// Validate Functions
function validate_email(email) {
expression = /^[^@]+@\w+(\.\w+)+\w$/
if (expression.test(email) == true) {
  // Email is good
  return true
} else {
  // Email is not good
  return false
}
}

function validate_password(password) {
// Firebase only accepts lengths greater than 6
if (password < 6) {
  return false
} else {
  return true
}
}

function validate_field(field) {
if (field == null) {
  return false
}

if (field.length <= 0) {
  return false
} else {
  return true
}
}

 // Function to display messages
 function displayMessage(message) {
  const messageContainer = document.getElementById('messageContainer');
  messageContainer.textContent = message;
}

// Logout function
function logout() {
  auth.signOut().then(function() {
      // Sign-out successful.
      displayMessage('User Logged Out!');
      // Redirect to the login page
      window.location.href = 'login.html';
  }).catch(function(error) {
      // An error happened.
      displayMessage('Error logging out: ' + error.message);
  });
}
