const downButton = document.querySelector('.down-button')
const upButton = document.querySelector('.up-button')
const pictures = document.querySelector('.main-slide')
const sideBar = document.querySelector('.sidebar')
const slideAmount = sideBar.querySelectorAll('div').length
const height = document.querySelector('.container').clientHeight

let activeSlideIndex = 0


sideBar.style.top = `-${(slideAmount - 1) * 100}vh`


upButton.addEventListener('click', ()=>{
    activeSlideIndex++
    if(activeSlideIndex === slideAmount){
        activeSlideIndex = 0
    }
    pictures.style.transform = `translateY(-${height * activeSlideIndex}px)`
    sideBar.style.transform = `translateY(${height * activeSlideIndex}px)`

})

downButton.addEventListener('click',()=>{
    activeSlideIndex--
    if(activeSlideIndex === -1){
        activeSlideIndex = slideAmount - 1
    }
    pictures.style.transform = `translateY(-${height * activeSlideIndex}px)`
    sideBar.style.transform = `translateY(${height * activeSlideIndex}px)`
})



