class Sujeto{
    constructor(){
        this.observer=[];
    }
    subscribe(observer){
        this.observer.push(observer);
    }
    unsubscribe(observer){
        this.observer=this.observer.filter(o=>o!==observer);
    }

    notify(data){
        this.observer.forEach(e=>{
            e.refresh(data);
        });
    }
}


class Error extends Sujeto{
    constructor(){
        super();
        this.data='';
    }
    add(item){
        this.data=item;
        this.notify(this.data);
    }
}
/*
class ErrorNombre extends Sujeto{
    constructor(){
        super();
        this.data='';
    }
    add(item){
        this.data=item;
        this.notify(this.data);
    }
}
class ErrorEmail extends Sujeto{
    constructor(){
        super();
        this.data='';
    }
    add(item){
        this.data=item;
        this.notify(this.data);
    }
}
*/
class SelectDestino extends Sujeto{
    constructor(){
        super();
        this.data=-1;
    }
    add(item){
        this.data=item;
        this.notify(this.data);
    }
}
class SelectOrigen extends Sujeto{
    constructor(){
        super();
        this.data=-1;
    }
    add(item){
        this.data=item;
        this.notify(this.data);
    }
}

class HtmlElementObserver{
    constructor(element){
        this.element=element;
    }

    refresh(data){
        
        this.element.innerHTML=data;
    }

}

class Observer{
    constructor(fn){
        this.fn=fn;
    }
    refresh(data){
        this.fn(data);
    }
}

// select destino y origen

const selectDestinos=document.querySelector('#destino');
const selectOrigenes = document.querySelector('#origen');
//const btnReserva = document.querySelector('#btnReserva');
let indexOrigen=-1;
let indexDestino=-1;
let matrizPrecios=[];
let listaOrigenes=[];
const url = './assets/data.json';
const selectO = new SelectOrigen();
const selectD = new SelectDestino();
crearMatriz(url);

const observerDestino = new Observer((opcion)=>{
    borrarOptions(selectDestinos); 
    populateSelect(selectDestinos,listaOrigenes[opcion].destinos);
});

const observerPrecio = new Observer((opcion)=>{
   actualizarPrecio(indexOrigen,indexDestino)
});



selectO.subscribe(observerDestino);
selectD.subscribe(observerPrecio);


origen.addEventListener('change',(event)=>{   
    indexOrigen=event.target.value;
    selectO.add(indexOrigen);
});


destino.addEventListener('change',(event)=>{ 
    indexDestino=event.target.value;
    selectD.add(indexDestino);
});


async function getLista(url){

    const response = await fetch(url);
    const lista = await response.json();
    return lista;
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
  
    populateSelect(selectOrigenes,listaOrigenes);
}

function populateSelect(select,list){
    list.forEach(item=>{
        const option = document.createElement('option');        
        option.classList.add('ff-text');
        option.value=item.id;
        option.text=item.lugar;
        select.appendChild(option);
    });

}
function borrarOptions(select){
    const listOptions = select.querySelectorAll('option');    
    listOptions.forEach(option => {
        if (option.value!=-1){
            option.remove();            
        }
    });    
}

function actualizarPrecio(origen,destino){
    
    if (origen<0||destino<0){
        precio.textContent='0 €';

    }else{
        precio.textContent='';
        const valor = matrizPrecios[origen][destino];
        precio.textContent=`${valor} €`
      
    }
}

//boton reserva

btnReserva.addEventListener('click',()=>{
    
    if (indexOrigen<0||indexDestino<0){
        
        return;
    }else{
        
        formReserva.classList.remove('sr-only');
        btnReserva.classList.add('sr-only');        
    }

});

const errorNombre = new HtmlElementObserver(msgErrorNombre);
const errorEmail = new HtmlElementObserver(msgErrorEmail);
const errorPhone = new HtmlElementObserver(msgErrorPhone)
const nameInput = new Error();
const emailInput = new Error();
const phoneInput = new Error();
nameInput.subscribe(errorNombre);
emailInput.subscribe(errorEmail);
phoneInput.subscribe(errorPhone);
const inputName = document.querySelector('#name');
//inputName.addEventListener('input',validarNombre);

function validarNombre(){
    const valueInputName= document.querySelector('#name').value;
    if (valueInputName.trim()===''){
        nameInput.notify('Indique a nombre de quien será la reserva');        
        return false;
    }else{
        nameInput.notify('');
    }
    return true;
}
function validarEmail(){
    
    const inputEmail= document.querySelector('#email');
    const valueInputEmail = inputEmail.value;
    if (valueInputEmail.trim()==='' || !inputEmail.validity.valid ){
        emailInput.notify('Indique un mail válido');        
        return false;
    }else{
        emailInput.notify('');
    }
    return true;
}
function validarPhone(){
    const valueInputPhone= document.querySelector('#phone').value;
    if (valueInputPhone.trim()===''){
        phoneInput.notify('Indique un teléfono de contacto para la reserva');        
        return false;
    }else{
        phoneInput.notify('');
    }
    return true;
}

function validarFormulario(){
    
    //validamos nombre
    let esValido = validarNombre();
    if (!esValido){
        return esValido;
        
    }
    esValido = validarEmail();    
    if (!esValido){
        return esValido;
    }
    esValido = validarPhone();
    if (!esValido){
        return esValido;
    }

    return esValido;
}


btnConfirmarReserva.addEventListener('click',(event)=>{
    event.preventDefault();
    const esValido = validarFormulario()
})

