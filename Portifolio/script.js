let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => 
{   sections.forEach(sec => { 
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id')

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => 
                { links.classList.remove('active')
                  document.querySelector(`header nav a[href*= ${id}]`).classList.add('active')
                })
        }
    })
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100)
    menuIcon.classList.remove('bx-x')
    navbar.classList.remove('active')
}
/* Menu Icon */

let menuIcon = document.querySelector('#menu-item');
let navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', ()=>{
    menuIcon.classList.toggle('bx-x')
    navbar.classList.toggle('active')
})

/* Scroll reveal */
ScrollReveal({ reset: true ,   
distance:'80px',
delay:200,
duration:2000});

ScrollReveal().reveal('.home-content', { origin:'top' });
ScrollReveal().reveal('.abtm', { origin:'top' });
ScrollReveal().reveal('.services', { origin:'top' });
ScrollReveal().reveal('.portfolio', { origin:'top' });
ScrollReveal().reveal('.contact', { origin:'top' });

/* Multiple Text */
const typed = new Typed('.multiple-text', {
    strings:['Desenvolvedor FrontEnd' , 'Auxiliar de recebimento','Programador'],
    typeSpeed: 50,
    backSpeed:50,
    backDelay:1100,
    loop:true
})