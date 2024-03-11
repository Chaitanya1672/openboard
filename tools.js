const optionsCont = document.querySelector(".options-cont");
const toolCont = document.querySelector('.tools-cont');
const pencilToolCont = document.querySelector('.pencil-tool-cont')
const eraserToolCont = document.querySelector('.eraser-tool-cont')
// const stickyCont = document.querySelector('.sticky-cont')

const pencil = document.querySelector('.pencil')
const eraser = document.querySelector('.eraser')
const sticky = document.querySelector('.sticky')
const upload = document.querySelector('.upload')

let pencilToolFlag = false
let eraserToolFlag = false
let optionsFlag = true
// let stickyToolFlag = false

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

sticky.addEventListener('click',(e)=> {
  const stickyTemplateHTML = `
    <div class="header-cont">
      <div class="minimize"></div>
      <div class="remove"></div>
    </div>
    <div class="note-cont">
      <textarea></textarea>
    </div>
  `
  createSticky(stickyTemplateHTML)
})

upload.addEventListener('click', () => {
  // Open file explorer
  let input = document.createElement('input')
  input.setAttribute('type', "file")
  input.click()
  
  //add image to sticky note
  input.addEventListener('change', (e)=>{
    let file = input.files[0]
    let url = URL.createObjectURL(file)
    
    const stickyTemplateHTML = `
      <div class="header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
      </div>
      <div class="note-cont">
        <img src="${url}" alt="Uploaded Image from files"/>
      </div>
    `
    createSticky(stickyTemplateHTML)
  })
})

const createSticky = (stickyTemplateHTML) => {
  const stickyCont = document.createElement('div')
  stickyCont.setAttribute('class', 'sticky-cont')
  stickyCont.innerHTML = stickyTemplateHTML
  document.body.appendChild(stickyCont)
  let minimize = stickyCont.querySelector('.minimize')
  let remove = stickyCont.querySelector('.remove')
  noteActions(minimize, remove, stickyCont)
  dragAndDrop(stickyCont)
}
function noteActions (minimize, remove, stickyCont) {
  remove.addEventListener('click', ()=>{
    stickyCont.remove()
  })
  minimize.addEventListener('click', (e)=>{
    const noteCont = stickyCont.querySelector('.note-cont')
    let display = getComputedStyle(noteCont).getPropertyValue('display')
    if(display === 'none') noteCont.style.display = 'block'
    else noteCont.style.display = 'none'
  })
}

const dragAndDrop = (element) => {
  element.onmousedown = function(event) {

    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;
  
    element.style.position = 'absolute';
    element.style.zIndex = 1000;
    // document.body.append(element);
  
    moveAt(event.pageX, event.pageY);
  
    // moves the element at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
      element.style.left = pageX - shiftX + 'px';
      element.style.top = pageY - shiftY + 'px';
    }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // drop the ball, remove unneeded handlers
    element.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      element.onmouseup = null;
    };
  
  };
  
  element.ondragstart = function() {
    return false;
  };
}

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