var file;
var firebaseConfig = {
    apiKey: "AIzaSyDnZbfxP4v9terWgJLM6xLbICO7VESE7FQ",
    authDomain: "nfc-hall-ticket.firebaseapp.com",
    databaseURL: "https://nfc-hall-ticket.firebaseio.com",
    projectId: "nfc-hall-ticket",
    storageBucket: "nfc-hall-ticket.appspot.com",
    messagingSenderId: "238550531651",
    appId: "1:238550531651:web:e0a9eb2c20d2f92e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

$('document').ready(function(){
    $('#submit').click(e=>{
        const email = $('#email').val();
        const password = $('#password').val();
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email,password);  //TODO: Create Dialog when user enters wrong password
        promise.catch(e=>{alert(e.message);});
    });
    $('#logout').click(e=>{
        firebase.auth().signOut();
    });

    $('#post').click(e=>{
        const name = $('#name').val();
        const usn = $('#usn').val();
        var database = firebase.database();
        database.ref('data/'+makeid(10)).set(
            {
                name: name,
                usn: usn
            }
        );
        var storageRef = firebase.storage().ref(name+'.jpg');
        var task = storageRef.put(file);
        task.on('state_changed',
        function progress(snapshot){
       
        },
        function error(err){
       
        },
        function complete(){
           alert("Upload Complete");
           document.getElementById('form').reset();
        });
    });
});

firebase.auth().onAuthStateChanged(firebaseUser=>{
    if(firebaseUser==null)
    {
        console.log("No User");
        $('#id01').css('display','block');
    }
    else
    {
        console.log(firebaseUser.email);
        $('#id01').css('display','none');
    }
});

const filebutton = document.getElementById('file');
filebutton.addEventListener('change', e=>{
    file = e.target.files[0];
});

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }