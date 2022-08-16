const form = document.querySelector('form');
const selectOrigenes = document.querySelector('#origen');
const selectDestinos=document.querySelector('#destino');
const spanPrecio = document.querySelector('#precio');

let indexOrigen=-1;
let indexDestino=-1;
const url = './assets/data.json';
let matrizPrecios=[];
let listaOrigenes=[];
const formReserva=document.formReserva;
const formCalculadora=document.formCalculadora;
const reservaPax=formReserva.pax;
//const destinoReserva=formReserva.destinoReserva;
//const recogidaReserva=formReserva.recogidaReserva;
const btnReserva=document.querySelector('#btnReserva');


async function getLista(url){

    const response = await fetch(url);
    const lista = await response.json();
    return lista;
}

function selectionDestinosChange(event){
    indexDestino=event.target.value;    
    actualizarPrecio(indexOrigen,indexDestino);
}

function selectionOrigenChange(event){
    indexOrigen = event.target.value;    
    indexDestino=-1;
    if ( indexOrigen>=0){
        populateSelectDestinos(indexOrigen);
    }
    actualizarPrecio(indexOrigen,indexDestino);
   
}

function populateSelectDestinos(origen){
    const listaDestinos = listaOrigenes[origen].destinos;
    borrarOptions(selectDestinos); 
    listaDestinos.forEach(destino=>{
        const option = document.createElement('option');
        option.classList.add('ff-text');
        option.value=destino.id;
        option.text=destino.destino;
        selectDestinos.appendChild(option);
    });
}


async function crearMatriz(url){
    listaOrigenes = await getLista(url);
    let i=0;
    listaOrigenes.forEach(origen => {
        let j =0;        
        let listaDestinos=[];
        origen.destinos.forEach(destino => {            
            listaDestinos.push(destino.precio);  
        });        
        matrizPrecios.push(listaDestinos);        
    });    
  
    populateSelectOrigenes();
}

function populateSelectOrigenes(){       
    
    listaOrigenes.forEach(origen=>{
        const option = document.createElement('option');
        option.classList.add('ff-text');
        option.value=origen.id;
        option.text=origen.origen;
       
        selectOrigenes.appendChild(option);

    })
}

function actualizarPrecio(origen,destino){
    
    if (origen<0||destino<0){
        spanPrecio.textContent='0 €';
        btnReserva.disabled=true;
    }else{
        spanPrecio.textContent='';
        const precio = matrizPrecios[origen][destino];
        spanPrecio.textContent=`${precio} €`
        btnReserva.disabled=false;
        
    }
}

function borrarOptions(select){
    const listOptions = select.querySelectorAll('option');    
    listOptions.forEach(option => {
        if (option.value!=-1){
            option.remove();            
        }
    });
    
}

crearMatriz(url);

function reservaPaxChange(event){
    const paxSpan = document.querySelector('#paxSpan');
    paxSpan.innerHTML='';
    paxSpan.innerHTML=`${event.target.value} pax`;
}

selectOrigenes.addEventListener('change',selectionOrigenChange);
selectDestinos.addEventListener('change',selectionDestinosChange);
reservaPax.addEventListener('change',reservaPaxChange);

borrarOptions(selectDestinos);

function habilitarReserva(){
    if (formReserva.classList.contains('sr-only')){
        formReserva.classList.remove('sr-only');
    } 
}
function desHabilitarReserva(){
    if (!formReserva.classList.contains('sr-only')){
        formReserva.classList.add('sr-only');
    } 
}

const mostrarReserva=()=>{
    console.log(formReserva);
    
    habilitarReserva();
    btnReserva.classList.add('sr-only');


}
