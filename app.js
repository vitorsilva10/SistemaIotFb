// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyC33u8HEkev-9rYo3AwpECVjnxZnhC9O2I",
    authDomain: "roomcontroll.firebaseapp.com",
    databaseURL: "https://roomcontroll-default-rtdb.firebaseio.com",
    projectId: "roomcontroll",
    storageBucket: "roomcontroll.appspot.com",
    messagingSenderId: "156225306274",
    appId: "1:156225306274:web:a30f681fa573cd07d1e1fb",
    measurementId: "G-LSEC90P626"
};
//Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.database();
// Cria os listeners dos dados no firebase

var tempRef = db.ref('sala/temperatura');
var umidRef = db.ref('sala/umidade');
var distRef = db.ref('sala/distancia');
var lumRef = db.ref('sala/luminosidade');
var lampRef = db.ref('sala/set_luminosidade');
var setPortaRef = db.ref('sala/set_porta');
var setArRef = db.ref('sala/set_ar');
var setMultimidiaRef = db.ref('sala/set_multimidia');



//Registra as funções que atualizam os gráficos e dados atuais da telemetria



firebase.database().ref('sala/temperatura').on('value', snapshot => {
    var temp = snapshot.val();
    document.getElementById('currentTemp').innerText = temp + '°C';
});

firebase.database().ref('sala/umidade').on('value', snapshot => {
    var umid = snapshot.val();
    document.getElementById('currentUmid').innerText = umid + ' % ';
});


firebase.database().ref('sala/distancia').on('value', snapshot => {
    var dist = snapshot.val();
    document.getElementById('currentDist').innerText = dist;
});



firebase.database().ref('sala/luminosidade').on('value', snapshot => {
    var lumi = snapshot.val();
    document.getElementById('currentLum').innerText = lumi;
});



firebase.database().ref('sala/porta').on('value', snapshot => {
    let porta = document.querySelector('#porta');
    var portaValue = '';
    portaValue = snapshot.val();
    console.log('porta >>', portaValue);
    if (portaValue == '0') {
        porta.src = 'Porta-Fechada.png';
        document.getElementById('porta-title').innerText = 'Porta Fechada';
    } else {
        porta.src = 'Porta-Aberta.png';
        document.getElementById('porta-title').innerText = 'Porta Aberta';
    }
});


firebase.database().ref('sala/presenca').on('value', snapshot => {
    let presenca = document.querySelector('#presenca');
    var presencaValue = '';
    presencaValue = snapshot.val();
    console.log('presenca >>', presencaValue);
    if (presencaValue == '1') {
        presenca.src = 'presence.jpg';
        document.getElementById('presenca-title').innerText = 'Presença';
    } else {
        presenca.src = 'nopresence.jpg';
        document.getElementById('presenca-title').innerText = 'Ausência';
    }
});



// Registrar função ao alterar valor


var currentAr = false;
setArRef.on('value', function(snapshot) {
    var value = snapshot.val();
    var el = document.getElementById('currentSetAr');
    if (value) {
        el.classList.add('amber-text');
    } else {
        el.classList.remove('amber-text');
    }
    currentAr = !!value;
});


var currentLampValue = false;
lampRef.on('value', function(snapshot) {
    var value = snapshot.val();
    var el = document.getElementById('currentLamp')
    if (value) {
        el.classList.add('amber-text');
    } else {
        el.classList.remove('amber-text');
    }
    currentLampValue = !!value;
});

var currentSetPorta = false;
setPortaRef.on('value', function(snapshot) {
    var value = snapshot.val();
    var el = document.getElementById('currentSetPorta')
    if (value) {
        el.classList.add('amber-text');
    } else {
        el.classList.remove('amber-text');
    }
    currentSetPorta = !!value;
});

var currentMultimidia = false;
setMultimidiaRef.on('value', function(snapshot) {
    var value = snapshot.val();
    var el = document.getElementById('currentMultimidia')
    if (value) {
        el.classList.add('amber-text');
    } else {
        el.classList.remove('amber-text');
    }
    currentMultimidia = !!value;
});


// Registrar função de click
var btnLamp = document.getElementById('btn-lamp');
btnLamp.addEventListener('click', function(evt) {
    currentLampValue == true ? lampRef.set(0) : lampRef.set(1);
});

var btnPorta = document.getElementById('btn-porta');
btnPorta.addEventListener('click', function(evt) {
    currentSetPorta == true ? setPortaRef.set(0) : setPortaRef.set(1);
});



var btnMultimiidia = document.getElementById('btn-multimidia');
btnMultimiidia.addEventListener('click', function(evt) {
    currentMultimidia == true ? setMultimidiaRef.set(0) : setMultimidiaRef.set(1);
});



var btnAr = document.getElementById('btn-ar');
btnAr.addEventListener('click', function(evt) {
    currentAr == true ? setArRef.set(0) : setArRef.set(1);
});