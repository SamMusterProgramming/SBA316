 import { buttonReferences ,quotes , audioSrc } from "./modules/data";


//set up the button on the sidebar *******************************************

const buttonContainer = document.getElementById('buttonContainer')
const buttonDivs = buttonContainer.querySelectorAll('div')
let index = 0;
Array.from(buttonDivs, (buttonDiv) => {
    const reference = buttonReferences[index]
    buttonDiv.style.fontSize ="18px"
    buttonDiv.style.width = '100%'
    const button =document.createElement('button');
    button.textContent = reference.title
    button.style.fontWeight = "500"
    button.classList.add('button')
    button.style.backgroundColor = reference.color;
    buttonDiv.appendChild(button)
    index++;
})
 

//grid section display*********************************************************** 





// display the grids in this section of code
const GridArray = []
for(let i=41 ;i< 72 ;i++) {
  GridArray.push (`${i}.jpg`)
}

const imgDisplayer = document.querySelector('#imgDisplayer')
GridArray.forEach((image,index)=> {
    const grid = document.createElement('div')
    grid.style.width = '18%'
    grid.style.minWidth = '200px'
    grid.style.height = '250px'
    grid.style.perspective ='1000px';
    grid.setAttribute('class','d-flex flex-column mt-2 flip-box')
    //image element
    const flipboxinner = document.createElement('div')
    flipboxinner.classList.add('flip-box-inner');
    const flipboxfront = document.createElement('div')
    flipboxfront.classList.add('flip-box-front')
    const flipboxback = document.createElement('div')
    flipboxback.setAttribute('class','flip-box-back d-flex align-items-center justify-content-center flex-column')
    flipboxback.style.fontSize = '16px'
    const img = document.createElement('img')
    // img.setAttribute('src',`../asset/nature/${image}`)
    img.setAttribute('src',`./asset/nature/44.jpg`)
    
    img.style.width = '100%'
    img.style.height = '100%'
    img.style.cursor = 'pointer'
    flipboxfront.appendChild(img)
    flipboxback.textContent = quotes[index%13];
    flipboxback.style.cursor = 'pointer'
    flipboxback.style.backgroundSize = 'cover'
    flipboxback.classList.add('quoteCard')
    flipboxinner.appendChild(flipboxfront)
    flipboxinner.appendChild(flipboxback)
    grid.appendChild(flipboxinner)
    // audio 
    const audio = document.createElement('div')
    audio.style.width = '100%'
    audio.style.backgroundColor ='gray'
    audio.innerHTML =`<audio controls style="width:100%;height:25px;background-Color:white;">
     <source src=${audioSrc[index%8]} type="audio/mpeg">
     </audio>`
    grid.appendChild(audio)
    const button = document.createElement('button')
    button.style.backgroundColor = 'green'
    button.style.color = 'white'
    button.style.fontSize = '16px'
    button.textContent ='SELECT'
    button.style.height = '15%'
    button.style.fontWeight = '500'
    button.style.border = 'none'
    grid.appendChild(button)
    imgDisplayer.appendChild(grid)
})

// selection section + register form 
const selectionDisplay = document.querySelector('#selection')
let selectedGrid =[];

let registerSection = document.getElementById('register');
registerSection.style.display = 'none';
let form = document.getElementById('form')
 form.style.display = 'none'

const registerButton = document.querySelector('#registerButton')



imgDisplayer.addEventListener('click',(e)=> {
   e.preventDefault();
   const targetName = e.target.tagName.toLowerCase();
   if(targetName !== 'img' && targetName != 'button') return 
   if(targetName == 'img') {
      const windowFeatures = "left=600,top=400,width=820,height=820";
      window.open(
      e.target.getAttribute('src'),
      "mozillaWindow",
      windowFeatures,
      );}
   if(targetName == 'button') {
    // select the image from the parent node of the button , Sibling
    const selectedimg = e.target.parentElement.firstElementChild.firstElementChild.firstElementChild.getAttribute('src')
   
    if(!isImgSelected(selectedimg))
     {  
        if(addSelectedImage(selectedimg,e.target.parentElement)){
        e.target.style.backgroundColor = 'white'
        e.target.style.backgroundImage = `url('./src/asset/nature/50.jpg')`
        e.target.textContent = "Remove"
        }
    }
   
    selectedGrid.forEach(element =>{
        selectionDisplay.appendChild(element.grid)
    })
    //display the register button when 4 grids selected by user
    if(selectedGrid.length >= 4) registerSection.style.display ='block'
    else registerSection.style.display ='none'
   }   
})



// add movehover event to flip the grid's image 
const imgElements = imgDisplayer.querySelectorAll('img')
const audios = imgDisplayer.querySelectorAll('audio')
Array.from(imgElements, imgElement => {
    imgElement.addEventListener('mouseover',(e)=>{
        e.preventDefault()
        // stop all audios when we hover 
        Array.from(audios , audio =>{
            audio.pause();
        })
        // play the mp3 targeted audio
        const audio = e.target.parentElement.parentElement.parentElement.lastElementChild.previousElementSibling.firstElementChild
        audio.load()
        audio.volume = 0.100000;
        audio.play()
    })
})

// remove selected items from selection section 
selectionDisplay.addEventListener('click',(e)=> {
    e.preventDefault();
    if(e.target.tagName = 'button')
    {   e.target.textContent = 'select'
        e.target.style.backgroundColor = 'green'
        e.target.style.backgroundImage = ''
        e.target.parentElement.style.width = '18%';
        selectedGrid = selectedGrid.filter(obj => obj.img == e.target.parentElement.firstElementChild.firstElementChild.firstElementChild.getAttribute('src'))
        imgDisplayer.appendChild( e.target.parentElement)
    }
   
})


//display register form when registration button is clicked
registerButton.addEventListener('click',(e)=> {
   e.preventDefault();
   
   selectionDisplay.setAttribute('class','')
   selectionDisplay.style.display ='none'
   registerSection.style.display ='none'
   form.style.display ='block'
})

const perso = document.querySelector('#personality') 
perso.addEventListener('click',(e)=>{
    e.preventDefault()
    console.log(e.target.textContent)
    if(e.target.tagName != "p") return ; 
    console.log(document.querySelector('#dropdownMenuButton'))
    // .innerHTML = e.target.textContent

})


// val;idate the form  upon submition
const username =document.querySelector('#username');
const email = document.querySelector("email");
const password = document.querySelector("password");
const confirmpassword = document.querySelector("confirmpassword");
const displayError = document.querySelector('#errordisplay')
let errormessage = ''

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    displayError.textContent = errormessage;
    if(!validateUsername(username.value)){
        displayError.textContent = errormessage ;
        displayError.style.display = 'block'
        username.focus();
        return
    }
    if(!validateEmail()){
        displayError.textContent =errormessage;
        email.focus();
        return
    }
    if(validatePassword(password,confirmpassword)){
        displayError.textContent = errormessage;
        password.focus()
        return
    }
    return true ; 
})


//username validation
function validateUsername(user) {
    if (user.length < 4) {
      errormessage ="The username must be at least four characters long";
      return false;
    }
    const regex = /^[a-zA-Z0-9_]+$/;
    if (!regex.test(user)) {
      errormessage = 'username must contain at least one capital letter ,at least a number';
      return false;
    }
    errormessage =''
    return user;
  }
//validate email 
function validateEmail() {
    let regex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    if (!regex.test(email.value)) {
      errormessage ="invalid email";
      return false;
    }
    errormessage =''
    return email.value;
  }
// validate password
function validatePassword(pass, confirmPass) {
    let regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    if (!regex.test(pass)) {
      errormessage="invalid password";
      return false;
    }
    // no need to test this cause we kmow username does't contain special char
    // and password must contain special char , automatically they won't match
    if (pass == username.value) {
      errormessage ="password can't be same as username";
      return false;
    }
    if (pass != confirmPass && confirmPass) {
      errormessage ="confirm password don't match password";
      return false;
    }
    errormessage =''
    return pass;
  }  

// helper function to add selected images to the selection container
function addSelectedImage(img,grid) { 
  if(selectedGrid.length < 4)
   { grid.style.width = '48%' 
    selectedGrid.push({['img']:img,['grid']:grid})
     return true;
    }
    return false;
}
function isImgSelected(img) {
    if (selectedGrid.find(grid => grid.img === img )) {
        return true;
     }
     return false;
}
function unselecImg(img) {
    return selectedGrid.filter(grid => grid.img !== img)
}