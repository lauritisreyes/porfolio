

window.addEventListener ( 'load', ( ) =>{

    // 🗒 SELECTORS

    const menuMainPage = ( document.querySelector('.menu__main-page') as HTMLDivElement)
    const menuBurger = ( document.querySelector('.menu__burger') as HTMLDivElement)
    const menu = ( document.querySelector('.menu') as HTMLDivElement)
    const menuUl = ( document.querySelector('.menu__ul') as HTMLElement)

    const social = (document.querySelector ('.social') as HTMLDivElement)
  
    const start = document.querySelectorAll <HTMLLIElement> ('.start')

    // 🗒 BURGER
    const toggleMenu = ( open: boolean ) => {
        menuBurger.classList.toggle ('active', open)
        menuUl.classList.toggle ('active', open)
        menu.classList.toggle ('active', open)
        menuBurger.setAttribute ('aria-expanded', String (open))
        menuBurger.setAttribute ('aria-label', open ? 'Close menu' : 'Open menu')
        // While the menu covers the page, the content behind can't be reached with Tab
        document.querySelectorAll <HTMLElement> ('main, footer').forEach ( el => el.inert = open )
    }

    menuBurger.addEventListener ('click', () => {
        toggleMenu (!menu.classList.contains ('active'))
    })

    // 👉🏻 The burger menu only exists on mobile: close it when the screen gets wider
    window.matchMedia ('(min-width: 561px)').addEventListener ('change', ( event ) => {
        if ( event.matches ) toggleMenu (false)
    })

    // 👉🏻 Close with Escape and give focus back to the burger
    document.addEventListener ('keydown', ( event ) => {
        if ( event.key === 'Escape' && menu.classList.contains ('active') ) {
            toggleMenu (false)
            menuBurger.focus ()
        }
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
