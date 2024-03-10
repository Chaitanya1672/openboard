const optionsCont = document.querySelector(".options-cont");
const toolCont = document.querySelector('.tools-cont');
const pencilToolCont = document.querySelector('.pencil-tool-cont')
const eraserToolCont = document.querySelector('.eraser-tool-cont')
const pencil = document.querySelector('.pencil')
const eraser = document.querySelector('.eraser')

let pencilToolFlag = false
let eraserToolFlag = false
let optionsFlag = true

optionsCont.addEventListener('click', ()=>{
  optionsFlag = !optionsFlag
  let iconElem = optionsCont.children[0]
  
  if (optionsFlag) openTools(iconElem)  
  else closeTools(iconElem)
})

pencil.addEventListener('click', ()=>{
  if(pencilToolFlag) {
    pencilToolCont.style.display = 'none'
  } else {
    pencilToolCont.style.display = 'block'
    eraserToolCont.style.display = 'none'
    eraserToolFlag = false
  }
  pencilToolFlag = !pencilToolFlag
})

eraser.addEventListener('click', ()=>{
  if(eraserToolFlag) {
    eraserToolCont.style.display = 'none'
  } else {
    eraserToolCont.style.display = 'flex'
    pencilToolCont.style.display = 'none'
    pencilToolFlag = false
  }
  eraserToolFlag = !eraserToolFlag
})

const openTools = (iconElem) =>{
  iconElem.classList.remove("fa-times")
  iconElem.classList.add("fa-bars")
  toolCont.style.display = 'flex'
}

const closeTools = (iconElem) =>{
  iconElem.classList.remove("fa-bars")
  iconElem.classList.add("fa-times")
  toolCont.style.display = 'none'
  pencilToolCont.style.display = 'none'
  eraserToolCont.style.display = 'none'
}