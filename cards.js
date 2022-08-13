const visitas = document.querySelectorAll('.box-visitas');

visitas.forEach(visita => {
    
   visita.addEventListener('click',function(){
   
    this.classList.toggle('descubierto');
   })
    
});