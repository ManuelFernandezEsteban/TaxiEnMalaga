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


})