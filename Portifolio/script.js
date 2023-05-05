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
    let header = document.querySelector('header') 

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
ScrollReveal().reveal('.skills', { origin:'top' });
ScrollReveal().reveal('.portfolio', { origin:'top' });
ScrollReveal().reveal('.contact', { origin:'top' });

/* Multiple Text */
const typed = new Typed('.multiple-text', {
    strings:['Programador web' , 'Estudante de programação','Entusiasta da tecnologia'],
    typeSpeed: 35,
    backSpeed:35,
    backDelay:1100,
    loop:true
})

/* Pop Up*/


document.querySelectorAll('.portfolio-box').forEach( element => element.addEventListener('click', ()=>
{ 
  let modal = document.querySelector('.popUp');
  let siteID = element.getAttribute('data-key');
  let siteItem = sites[(siteID - 1)];
  let title = document.querySelector('.popUpRight .content h2');
  let desc = document.querySelector('.popUpRight .content p');
  let img = document.querySelector('.popUpLeft .siteImg');
  let sitelink = document.querySelector('.buttons .site');
  sitelink.href = siteItem.link
  title.innerHTML = siteItem.name;
  desc.innerHTML = siteItem.desc;
  img.style.backgroundImage = `url(${siteItem.img})`


  modal.style.display ='flex'
  setTimeout(()=> modal.style.opacity = '100', 100)
  


  
  modal.querySelector('.buttons .closePC    ').addEventListener('click', ()=>
   { modal.style.opacity ='0'
    setTimeout(()=> 
    {modal.style.display = 'none'}, 200)
    
   })

   modal.querySelector('.close').addEventListener('click', ()=>
   { modal.style.opacity ='0'
    setTimeout(()=> 
    {modal.style.display = 'none'}, 200)
    
   })
  
}))
