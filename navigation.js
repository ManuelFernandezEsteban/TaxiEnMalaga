const nav = document.querySelector('.navigation');
const navToggle = document.querySelector('.mobile-toggle-nav');

navToggle.addEventListener('click',()=>{
    const visibility = nav.getAttribute('data-visible');
    if (visibility==='false'){
        nav.setAttribute('data-visible','true');
        navToggle.setAttribute('aria-expanded',true);
        //navToggle.style('display','flex');
    }else{
        nav.setAttribute('data-visible','false');
        navToggle.setAttribute('aria-expanded',false);
        //navToggle.style('display','none');
    }

    const barra = navToggle.querySelector('.barra');
    const cruz = navToggle.querySelector('.cruz');
    if (barra.classList.contains('sr-only')){
        barra.classList.remove('sr-only');
        cruz.classList.add('sr-only');
    }else{
        barra.classList.add('sr-only');
        cruz.classList.remove('sr-only');
    }
})