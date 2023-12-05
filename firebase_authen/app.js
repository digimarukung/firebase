import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {getAuth,createUserWithEmailAndPassword,onAuthStateChanged,signOut,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBDzvih1DAn7fAI-7JqipeIZgJOw4aNAmc",
    authDomain: "ashimaruhosting.firebaseapp.com",
    projectId: "ashimaruhosting",
    storageBucket: "ashimaruhosting.appspot.com",
    messagingSenderId: "329274100291",
    appId: "1:329274100291:web:d6162f14b9c2e94f9622f6",
    measurementId: "G-Q7PZYQNMSC"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const form = document.getElementById("registerForm")
const formarea = document.getElementById("form-area")
const profile = document.getElementById("profile")
const welcome = document.getElementById("welcome")
const logout=document.getElementById("logout")
const loginForm = document.getElementById("loginForm")

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const email = form.email.value
    const password = form.password.value
    createUserWithEmailAndPassword(auth,email,password)
    .then((result)=>{
        alert("สร้างบัญชีผู้ใช้เรียบร้อย")
    }).catch((error)=>{
        alert(error.message)
    })
})

onAuthStateChanged(auth,(user)=>{
    //login
    if(user){
        profile.style.display="block"
        formarea.style.display="none"
        welcome.innerText=`ยินดีต้อนรับ ${user.email}`
    }else{
        profile.style.display="none"
        formarea.style.display="block"
    }
})
logout.addEventListener("click",(e)=>{
    signOut(auth).then(()=>{
        alert("ออกจากระบบเรียบร้อย")
    }).catch((error)=>{
        alert(error.message)
    })
})

loginForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const email = loginForm.email.value
    const password = loginForm.password.value
    signInWithEmailAndPassword(auth,email,password)
    .then((result)=>{
        alert("ลงชื่อเข้าใช้เรียบร้อย")
    }).catch((error)=>{
        alert(error.message)
    })
})