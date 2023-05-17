const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
  console.log("yes") ;
	container.classList.add("right-panel-active");

});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});




import {initializeApp} from 'firebase/app'

import {
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc
} from 'firebase/firestore'


import {
    getAuth , 
    createUserWithEmailAndPassword , 
    signInWithEmailAndPassword , 
    onAuthStateChanged,
    signOut
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCsMxJzQ0OSQ9MQ8GiPuVkET9tzkh7Xq1g",
    authDomain: "puzzle-23497.firebaseapp.com",
    projectId: "puzzle-23497",
    storageBucket: "puzzle-23497.appspot.com",
    messagingSenderId: "145335876225",
    appId: "1:145335876225:web:066ed32a21f07f0f216b80"
  };

  initializeApp(firebaseConfig)


  //init services
  const auth = getAuth()

 
 let mail ; 

  //signing users
  const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {

  e.preventDefault()

  const email = signupForm.email.value

  const password = signupForm.password.value

  createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user created:', cred.user)
      signupForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
})


const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log("yes") ;
      //console.log('user signed out')
    })
    .catch(err => {
      console.log(err.message)
    })
})

const logoutButtonadmin = document.getElementById("logoutadmin")
logoutButtonadmin.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log("yes") ;
      //console.log('user signed out')
    })
    .catch(err => {
      console.log(err.message)
    })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value

  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user logged in:', cred.user)
      
      loginForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
})



let m ; 
let adminlogin = false ; 
onAuthStateChanged(auth, (user) => {
    let c =  document.querySelector('.container') 
    let g = document.querySelector('.game');
    let tb = document.getElementById("admin-dashboard")
    if(user && user.email == "admin@gmail.com")
    {
      console.log("admin login")
      tb.classList.remove("hide") ;
      c.classList.add("hide")
      createtable();
      adminlogin = true ; 

    }
    else if(user)
    {
       m = user.email ; 
       c.classList.add("hide")
       g.classList.remove("hide")
      //  restart();
       

    }
    else
    {
        if(adminlogin)
        {
          tb.classList.add("hide") ;
          c.classList.remove("hide");
          // adminlogin = false;
          // console.log("this is admin logout")

        }
        else
        {
        c.classList.remove("hide")
        g.classList.add("hide")
        // restart() ; 
        localStorage.setItem("cnt" , -1) ; 
        localStorage.setItem("sec" , 0) ; 
        localStorage.setItem("live" , 4) ;
        count = -1; 
        seconds = 0 ; 
        lives = 0 ; 
        clearInterval(intervalId);
        }
        

    }
    console.log('user status changed:', user)
  })


  //database
  const db = getFirestore()

// collection ref
  const colRef = collection(db, 'Gamedetails')





  getDocs(colRef)
  .then(snapshot => {
    // console.log(snapshot.docs)
    let game = []
    snapshot.docs.forEach(doc => {
      game.push({ ...doc.data(), id: doc.id })
    })
    console.log(game)
  })
  .catch(err => {
    console.log(err.message)
  })
  
//   addDoc(colRef, {
//     email : m=,
//     winstatus: false ,
//     totaltimetaken : "sjs"

//  })

  const questions = [ 
     {    "questionText": "What is Princess Grace's favorite flower?",    "hints": [      "It's a symbol of love and beauty.",      "It has many varieties and colors.",      "She once said that she would love to fill her whole house with them."    ],
    "answer": "rose"
  },
  {
    "questionText": "What is Princess Grace's favorite color?",
    "hints": [
      "It's a calm and soothing color.",
      "It's often associated with trust and loyalty.",
      "She wore this color on her wedding day."
    ],
    "answer": "blue"
  },
  {
    "questionText": "What is Princess Grace's favorite winter sport?",
    "hints": [
      "It's a sport that involves sliding on snow or ice.",
      "It's often associated with mountainous regions.",
      "She once practiced this sport in the Swiss Alps with her family."
    ],
    "answer": "skiing"
  },
  {
    "questionText": "What is Princess Grace's favorite animal?",
    "hints": [
      "It's a large, majestic animal.",
      "It's often associated with royalty and nobility.",
      "She once rode this animal during a visit to a royal palace."
    ],
    "answer": "horse"
  },
  {
    "questionText": "What is Princess Grace's favorite leisure activity?",
    "hints": [
      "It's a relaxing and calming activity.",
      "It's often used as a form of meditation or stress relief.",
      "She often practices this activity in the morning."
    ],
    "answer": "yoga"
  },
  {
    "questionText": "What is Princess Grace's favorite season?",
    "hints": [
      "It's the season of new beginnings.",
      "She enjoys the fresh and mild weather during this season.",
      "She once said, 'I love the feeling of renewal and growth that comes with this time of year.'"
    ],
    "answer": "spring"
  },
  {
    "questionText": "What is Princess Grace's favorite type of literature?",
    "hints": [
      "She enjoyed reading classic books from this genre.",
      "She was known to be an avid reader and had a personal library of over 10,000 books.",
      "She once said, 'When I read, I can escape to another place, another time, and live vicariously through the characters.'"
    ],
    "answer": "classics"
  },
  {
    "questionText": "What is Princess Grace's favorite type of music?",
    "hints": [
      "It's a genre that originated in Europe.",
      "It's often characterized by its use of orchestral instruments.",
      "She once attended a performance of this type of music in Vienna."
    ],
    "answer": "classical"
  },
  {
    "questionText": "What is Princess Grace's favorite gemstone?",
    "hints": [
      "It's a precious stone that comes in many colors.",
      "It's often associated with purity and innocence.",
      "She once wore a stunning necklace featuring this gemstone to a gala event."
    ],
    "answer": "diamond"
  },
  {
    "questionText": "What is Princess Grace's favorite outdoor activity?",
    "hints": [
      "It's a water-based sport.",
      "She enjoyed practicing this sport in the summer months.",
      "She once competed in a charity swim across the English Channel."
    ],
    "answer": "swimming"
  }
]
;


let intervalId;


let timetaken = "NA"


// for(let i = 0 ; i < 4; i++)
// {
// option[i].addEventListener("click",startquestions)
// }

//DOM elements and event listeners

let startpage = document.querySelector("#startpage")
let questionpage = document.querySelector("#questionpage")
let scorecard = document.querySelector("#scorecard")

let start = document.querySelector('#butt'); 
start.addEventListener("click",startquiz);

let  usersubmit = document.getElementById("answersubmit")  ; 
usersubmit.addEventListener("click" , chackanswer)

let question = document.querySelector("#question") ;
let status = document.querySelector("#status") ;

let sco = document.querySelector("#sco")

let option = document.querySelectorAll(".option")

let timerEl = document.getElementById("time") ;

let res = document.getElementById("restartbutton") ; 
res.addEventListener("click" , restart) ; 

let res2 = document.getElementById("restartbutton2") ; 
res2.addEventListener("click" , restart) ; 

let live = document.getElementById("live") ;

let tableBody = document.querySelector('#admin-dashboard-table tbody');

//Variable used
let count  ;
let score = 0 ; 
let lives  ; 
let seconds ;
// localStorage.setItem("sec" , 0) ; 
//Functions 
window.addEventListener("load", () => {
  console.log("I got printed")

  if(localStorage.getItem("sec") === null)
  {
      seconds = 0 ; 
      localStorage.setItem("sec" , 0) ; 
  }
  else{
    seconds = localStorage.getItem("sec")
  }

  if(localStorage.getItem("live") === null)
  {
      lives = 4; 
      localStorage.setItem("live" , 4) ; 
  }
  else{
       lives = localStorage.getItem("live")
       setlives();
  }
   
  if (localStorage.getItem("cnt") === null) { 

      count = -1; 
      localStorage.setItem("cnt", -1) ;
      startquiz();

  } else {
      count = localStorage.getItem("cnt") ;
      if(count == 10)
      {
          endgame() ;
      }
      else if(count != -1)
      {
       startquiz() ; 
      }
     

  }


  
});

function startquiz()
{
   lives = 4 ;
   setlives(); 
   startpage.classList.add("hide")
   questionpage.classList.remove("hide")
   count = localStorage.getItem("cnt"); 
   console.log(count, "nsn") ;
   if(count == -1)
   {
    console.log(count, "uruen")
    count = 0 ; 
    localStorage.setItem("cnt", count) ;
   }
   projectquestions()
   intervalId = setInterval(updateTime, 1000);
   

}

function projectquestions()
{
  question.innerText= questions[count]["questionText"]
  for(let i = 0 ; i < 3; i++)
  {
    option[i].innerText = questions[count]["hints"][i]
  } 
}

function chackanswer()
{
        let userguess = false; 
        let answer =  questions[count]["answer"]
       
        let userinput = document.getElementById("useranswer").value ;
        let ua = userinput; 
        document.getElementById("useranswer").value = "" ;
        
           
        if(answer.toLowerCase() === ua.toLowerCase())
        { 
            userguess = true ; 
            score = score + 1
            status.innerText = "correct!!"
        }
        else{
            status.innerText = "incorrect!!"
        } 

        if(userguess)
        {
           count++ ; 
           if(count == 10)
           {
              localStorage.setItem("cnt" , count) ; 
              timetaken = timerEl.innerHTML ; 
              endgame() ; 
              return  ; 
           }
           localStorage.setItem("cnt" , count) ;
           projectquestions() ; 
           lives = 4 ; 
           setlives();
          
        }
        else
        {
           lives = lives - 1;
           if(lives == 0)
           {
             endgame() ;
             return ;
           }
           setlives(); 
           
        }
        
        
}

function endgame()
{



  seconds = 0 ; 
  localStorage.setItem("sec" , 0) ; 
  startpage.classList.add("hide")
  
  scorecard.classList.remove("hide")
  questionpage.classList.add("hide")
  let win = false ;
  if(count == 10)
  {
    win = true ; 
    sco.innerText = "Freedom achieved"
  }
  else{
    sco.innerText = "You were not able to answer all the questions, but don't give up. Keep learning and striving for freedom"
       timetaken = "NA" ; 

  }
  console.log(m)
  addDoc(colRef, {
     email : m,
     winstatus: win ,
     totaltimetaken : timetaken 

  })
  
  clearInterval(intervalId)


}

function updateTime() {
  
  // Calculate the minutes and seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Update the timer element with the new time
  timerEl.innerHTML = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;

  // Increment the seconds
  seconds++;

  localStorage.setItem("sec" , seconds) ; 
}

function reset()
{
    status.innerText = ""
}

function restart()
{
  console.log("RESTARTED")
  count = -1 ; 
  localStorage.setItem("cnt", -1);
  clearInterval(intervalId) ; 
  seconds = 0 ; 
  localStorage.setItem("sec" , 0) ; 
  
  location.reload();
}

function setlives()
{
   localStorage.setItem("live" , lives);
   live.innerHTML = lives ; 
}

function createtable()
{
  getDocs(colRef)
  .then(snapshot => {
    // console.log(snapshot.docs)
    let game = []
    snapshot.docs.forEach(doc => {
      var data = doc.data();
      var email = data.email;
      var winStatus = data.winstatus;
      var timeTaken = data.totaltimetaken;
      var newRow = document.createElement('tr');
      newRow.innerHTML = '<td>' + email + '</td>' +
                          '<td>' + winStatus + '</td>' +
                          '<td>' + timeTaken + '</td>';
  
      // Add the new row to the table body
      tableBody.appendChild(newRow);
    })
    console.log(game)
  })
  .catch(err => {
    console.log(err.message)
  })
}

// MAINTAININGG SCORE AND NAMES
// let submit = document.querySelector("#submit")
// submit.addEventListener("click",store)

// const nameofuser = document.querySelector("#name")


// highscore = {}
// let one = 0
// let two  = 0
// let n1 = document.querySelector("#no1")
// let n2 = document.querySelector("#no2")

// function store()
// {
//     let a = nameofuser.value
    
//     highscore[a] = score
//     //update()
    
//     scorecard.classList.add("hide")
//     startpage.classList.remove("hide")
//     if(score > one)
//   {
//      n2.innerHTML = n1.innerHTML
//      n1.innerHTML = "1."  + a + "-" + score
//      one = score
//      two = one
//   }
//   else if(score > two)
//   {
//       n2.innerHTML = "2."  + a + "-" + score
//      two = score
//   }
//   count = 0 
//     score = 0 
   
  
//     sec = 30
    

// }
// //logic to maintain highscore


// // function update()
// // {
  
// // }


// //Creating logic for highscore
// leaderboard = document.querySelector("#leaderboard")
// leaderboard.addEventListener("click",view)
// highscore = document.querySelector("#highscore")
// function view()
// {
//     highscore.classList.remove("hide")
//     questionpage.classList.add("hide")
//     startpage.classList.add("hide")
//     scorecard.classList.add("hide")
//     score = 0
// }


// //creating logic for go back in highscore
// goback = document.querySelector("#goback")
// goback.addEventListener("click",gb)
// function gb()
// {
//     highscore.classList.add("hide")
//     startpage.classList.remove("hide")
//     sec = 30
   
// }

// //creating logic for clearing score 
// clear = document.querySelector("#clear")
// clear.addEventListener("click",clr)
// function clr()
// {
//     one = 0
//     two = 0
//     n1.innerHTML = "1.none"
//     n2.innerHTML = "2.none"

// }

// //Setting Timer
// var sec = 30;
// function timer(){
    
    
//     var timer = setInterval(function(){
//         if(sec == 0)
//         {
//             endgame()
//             return
//         }
//         document.getElementById('time').innerHTML='00:'+sec;
//         sec--;
//         if (sec < 0) {
//             clearInterval(timer);
//         }
//     }, 2000);
// }









// //QUESTION SET
