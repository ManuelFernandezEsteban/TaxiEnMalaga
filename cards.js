const visitas = document.querySelectorAll('.box-visitas');

visitas.forEach(visita => {
    
   visita.addEventListener('click',function(){
    console.log(this)
    this.classList.toggle('descubierto');
   })
    
});