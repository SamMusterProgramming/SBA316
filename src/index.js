


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
                    },
                    {
                        title :"Groups" ,
                        color: "white"
                      },
                     {
                      title:"Event",
                      color: 'lightblue'
                      },
                      {
                          title:"Chat",
                          color: 'red'
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
               `Space is an inspirational concept that allows you to dream big`
            ]

const text = 'welcome to our test'
const intro ='Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum error et ducimus, harum, minus animi consequuntur impedit id eveniet unde laboriosam at dolorem sequi totam quo mollitia ea asperiores ipsum.'
const header = document.querySelector('#header')
const title = document.createElement('h3')
title.style.color = "white"
title.style.fontWeight = "500"
title.textContent = text;
const introduction = document.createElement('p');
introduction.textContent = intro;
introduction.style.fontSize = '16px'
introduction.style.color = 'white'
header.appendChild(title)
header.appendChild(introduction)

// display the grid of images in this section of code
const imagesArray = []
for(let i=41 ;i< 72 ;i++) {
  imagesArray.push (`${i}.jpg`)
}

const imgDisplayer = document.querySelector('#imgDisplayer')
imagesArray.forEach((image,index)=> {
    const grid = document.createElement('div')
    grid.style.width = '19%'
    grid.style.minWidth = '200px'
    grid.style.height = '250px'
    grid.style.perspective ='1000px';
    grid.setAttribute('class','d-flex flex-column mt-5 flip-box')
    //image element
    const flipboxinner = document.createElement('div')
    flipboxinner.classList.add('flip-box-inner');
    const flipboxfront = document.createElement('div')
    flipboxfront.classList.add('flip-box-front')
    const flipboxback = document.createElement('div')
    flipboxback.setAttribute('class','flip-box-back d-flex align-items-center justify-content-center flex-column')
    flipboxback.style.fontSize = '20px'
    const img = document.createElement('img')
    img.setAttribute('src',`./src/asset/nature/${image}`)
    img.style.width = '100%'
    img.style.height = '100%'
    img.style.cursor = 'pointer'
    flipboxfront.appendChild(img)
    flipboxback.style.backgroundImage = `url("./src/asset/nature/space.avif") `
    flipboxback.textContent = quotes[index];
    flipboxback.style.cursor = 'pointer'
    flipboxinner.appendChild(flipboxfront)
    flipboxinner.appendChild(flipboxback)
    grid.appendChild(flipboxinner)
    // audio 
    const audio = document.createElement('div')
    audio.style.width = '100%'
    audio.style.backgroundColor ='gray'
    audio.innerHTML =`<audio controls style="width:100%;height:25px;background-Color:white;">
     <source src="./src/asset/melodies/Love Spell.mp3" type="audio/mpeg">
     </audio>`
    grid.appendChild(audio)
    const button = document.createElement('button')
    button.style.backgroundColor = 'rgb(29, 210, 107)'
    button.style.color = 'white'
    button.style.fontSize = '16px'
    button.textContent ='SELECT'
    button.style.height = '15%'
    button.style.fontWeight = '500'
    button.style.border = 'none'
    grid.appendChild(button)
    imgDisplayer.appendChild(grid)
})

imgDisplayer.addEventListener('click',(e)=> {
    e.preventDefault();
   if(e.target.tagName.toLowerCase() !== 'img') return 
   const windowFeatures = "left=600,top=400,width=820,height=820";
   window.open(
    e.target.getAttribute('src'),
    "mozillaWindow",
    windowFeatures,
      );
      

})
