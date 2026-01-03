

window.addEventListener ( 'load', ( ) =>{

    // 🗒 SELECTORS

    const menuMainPage = ( document.querySelector('.menu__main-page') as HTMLDivElement)
    const menuBurger = ( document.querySelector('.menu__burger') as HTMLDivElement)
    const menu = ( document.querySelector('.menu') as HTMLDivElement)
    const menuUl = ( document.querySelector('.menu__ul') as HTMLElement)

    const social = (document.querySelector ('.social') as HTMLDivElement)
  
    const start = document.querySelectorAll <HTMLLIElement> ('.start')

    // 🗒 BURGER
    menuBurger.addEventListener ('click', () => {
        menuBurger.classList.toggle ('active')
        menuUl.classList.toggle ('active')
        menu.classList.toggle ('active')

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
