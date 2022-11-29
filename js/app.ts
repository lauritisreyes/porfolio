

window.addEventListener ( 'load', ( ) =>{

    // 🗒 SELECTORS

    const menuMainPage = ( document.querySelector('.menu__main-page') as HTMLDivElement)
    const menuBurger = ( document.querySelector('.menu__burger') as HTMLDivElement)
    const menuUl = ( document.querySelector('.menu__ul') as HTMLElement)

    const mouse = (document.querySelector ('.mouse') as HTMLDivElement)
    const social = (document.querySelector ('.social') as HTMLDivElement)
    const links = document.querySelectorAll <HTMLLinkElement> ('a')
    const buttons = document.querySelectorAll <HTMLButtonElement> ('button')
    const start = document.querySelectorAll <HTMLLIElement> ('.start')



    // 🗒 MOUSE MOVEMENT

    let cursorX = 0
    let cursorY = 0
        
    let mouseMovement = ()=>{
        mouse.style.transform = `translateX(${cursorX}px) translateY(${cursorY}px` 
    }

    window.addEventListener ( 'mousemove', ( { clientX, clientY } ) => {
        cursorX = clientX
        cursorY = clientY
        mouseMovement()
    })

    window.addEventListener ( 'mousemove', ( e ) => {
        console.log(e)
    })
    



    // 🗒 MOUSE OVER LINKS

    links.forEach ( eachLink => {
        eachLink.addEventListener ('mouseover', ()=> {
            mouse.classList.add('scale')
        })
        eachLink.addEventListener ('mouseout', ()=> {
            mouse.classList.remove('scale')
        })
    })

    buttons.forEach ( eachLink => {
        eachLink.addEventListener ('mouseover', ()=> {
            mouse.classList.add('scale')
        })
        eachLink.addEventListener ('mouseout', ()=> {
            mouse.classList.remove('scale')
        })
    })

    // 🗒 BURGER
    menuBurger.addEventListener ('click', () => {
        menuBurger.classList.toggle ('active')
        menuUl.classList.toggle ('active')

    })



    // 🗒 ANIMATIONS WHEN SCROLLING

    window.addEventListener ('scroll', () => {



        // 👉🏻 Sections

        let sectionsEffects = () => {

            start.forEach ( (element, i) => {
                let topElement : number = element.offsetTop
                let pixel : number = window.scrollY 
                let windowHeight : number = window.innerHeight
    
                if( pixel >= topElement - (windowHeight * 0.8) ){
                    element.classList.add('active')
                }else{
                    element.classList.remove('active')
                }
            })
        }

        start && sectionsEffects ()




        // 👉🏻 Social Menu

        let pixel : number = window.scrollY 
        let windowHeight : number = window.innerHeight

        let socialEffects = () => {
            let topElement : number = social.offsetTop

            if( pixel + windowHeight >= topElement ){
                social.classList.add('active')
            }else{
                social.classList.remove('active')
            }
        }

        social && socialEffects()




        // 👉🏻 Main Menu

        let mainmenuEffects = () => {
            
            if (pixel >= windowHeight){
                menuMainPage.classList.add('light')
            }else {
                menuMainPage.classList.remove('light')
            }
        }

        menuMainPage && mainmenuEffects ()


    })
})
