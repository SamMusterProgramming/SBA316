


//set up the button on the sidebar *******************************************
const buttonReferences = [
                   {
                      title :"PERSONALITY TEST" ,
                      color: "green"
                    },
                   {
                    title:"EMOTION TEST",
                    colr: 'red'
                    },
                    {
                        title:"Chat",
                        color: 'orange'
                    }
                  ]
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

const quotes =[`Fantasy is hardly an escape from reality. It's a way of understanding it`
               , 'The best fantasy is written in the language of dreams',
               `It's still magic even if you know how it's done`,
               `Mentalism is the silent music of the mind; Magic is the orchestra of the unseen`,
               `I've seen the majestic beauty of nature and the overwhelming perfection of it. To me, there's nothing closer to God than that`,
               `Being deeply loved by someone gives you strength, while loving someone deeply gives you courage`,
               `There is no limit to the power of loving`,
               `Learn as if you will live forever, live like you will die tomorrow`,
               `Loneliness is the poverty of self; solitude is the richness of self`,
               `Loneliness expresses the pain of being alone and solitude expresses the glory of being alone`,
               `Space is an inspirational concept that allows you to dream big`,
               `There is a certain majesty in simplicity which is far above all the quaintness of wit`,
               `Once you make a decision, the universe conspires to make it happen. I find hope in the darkest of days, and focus in the brightest. I do not judge the universe.`
            ]
const audioSrc =[
    './src/asset/melodies/LoveSpell.mp3','./src/asset/melodies/beautiful-dream.mp3',
    './src/asset/melodies/endless-beauty.mp3','./src/asset/melodies/epic-relaxing-flute.mp3',
    './src/asset/melodies/moon-rain.mp3','./src/asset/melodies/relax.mp3',
    './src/asset/melodies/sad-oriental.mp3','./src/asset/melodies/sad.mp3' 
]  



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
    img.setAttribute('src',`./src/asset/nature/${image}`)
    img.style.width = '100%'
    img.style.height = '100%'
    img.style.cursor = 'pointer'
    flipboxfront.appendChild(img)
    flipboxback.textContent = quotes[index];
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

let registerSection = document.getElementById('registerSection');
registerSection.style.display = 'none';
let form = document.getElementById('form')
form.style.display = 'none'





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
        e.target.textContent = "Selected"
        }
    }
    else {  
        selectedGrid = [...unselecImg(selectedimg)]
        e.target.style.backgroundImage ='none'
        e.target.style.backgroundColor = 'green'
        e.target.textContent = "Select"
        
    }
    selectedGrid.forEach(element =>{
        selectionDisplay.appendChild(element.grid)
    })
   
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




// helper function to add selected images to the selection container
function addSelectedImage(img,grid) { 
  if(selectedGrid.length <4)
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