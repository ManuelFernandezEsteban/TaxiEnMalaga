class Sujeto {
    constructor() {
        this.observer = [];
    }
    subscribe(observer) {
        this.observer.push(observer);
    }
    unsubscribe(observer) {
        this.observer = this.observer.filter(o => o !== observer);
    }

    notify(data) {
        this.observer.forEach(e => {
            e.refresh(data);
        });
    }
}


class Error extends Sujeto {
    constructor() {
        super();
        this.data = '';
    }
    add(item) {
        this.data = item;
        this.notify(this.data);
    }
}

class SelectDestino extends Sujeto {
    constructor() {
        super();
        this.data = -1;
    }
    add(item) {
        this.data = item;
        this.notify(this.data);
    }
}
class SelectOrigen extends Sujeto {
    constructor() {
        super();
        this.data = -1;
    }
    add(item) {
        this.data = item;
        this.notify(this.data);
    }
}

class PaxRange extends Sujeto {
    constructor() {
        super();
        this.data = 1;
    }
    add(item) {
        this.data = item;
        this.notify(this.data);
    }
}

class CHKPrivacidad extends Sujeto {
    constructor() {
        super();
        this.data = 'no aceptada';
    }
    add(item) {
        this.data = item;
        this.notify(this.data);
    }
}

class HtmlElementObserver {
    constructor(element) {
        this.element = element;
    }

    refresh(data) {
        this.element.innerHTML = data;
    }

}

class Observer {
    constructor(fn) {
        this.fn = fn;
    }
    refresh(data) {
        this.fn(data);
    }
}

// select destino y origen

const selectDestinos = document.querySelector('#destino');
const selectOrigenes = document.querySelector('#origen');
//const btnReserva = document.querySelector('#btnReserva');
let indexOrigen = -1;
let indexDestino = -1;
let origenText = '';
let destinoText = '';
let matrizPrecios = [];
let listaOrigenes = [];
const url = './assets/data.json';
const selectO = new SelectOrigen();
const selectD = new SelectDestino();

crearMatriz(url);

const observerDestino = new Observer((opcion) => {
    borrarOptions(selectDestinos);
    populateSelect(selectDestinos, listaOrigenes[opcion].destinos);
});

const observerPrecio = new Observer((opcion) => {
    actualizarPrecio(indexOrigen, indexDestino)
});



selectO.subscribe(observerDestino);
selectD.subscribe(observerPrecio);


origen.addEventListener('change', (event) => {
    indexOrigen = event.target.value;
    document.querySelector('#recogidaReserva').value = origen.options[origen.selectedIndex].innerHTML;
    selectO.add(indexOrigen);
});


destino.addEventListener('change', (event) => {
    indexDestino = event.target.value;
    document.querySelector('#destinoReserva').value = destino.options[destino.selectedIndex].innerHTML;
    selectD.add(indexDestino);
});


async function getLista(url) {

    const response = await fetch(url);
    const lista = await response.json();
    return lista;
}

async function crearMatriz(url) {
    listaOrigenes = await getLista(url);
    let i = 0;
    listaOrigenes.forEach(origen => {
        let j = 0;
        let listaDestinos = [];
        origen.destinos.forEach(destino => {
            listaDestinos.push(destino.precio);
        });
        matrizPrecios.push(listaDestinos);
    });

    populateSelect(selectOrigenes, listaOrigenes);
}

function populateSelect(select, list) {
    list.forEach(item => {
        const option = document.createElement('option');
        option.classList.add('ff-text');
        option.value = item.id;
        option.text = item.lugar;
        select.appendChild(option);
    });

}
function borrarOptions(select) {
    const listOptions = select.querySelectorAll('option');
    listOptions.forEach(option => {
        if (option.value != -1) {
            option.remove();
        }
    });
}

function actualizarPrecio(origen, destino) {

    if (origen < 0 || destino < 0) {
        precio.textContent = '0 €';

    } else {
        precio.textContent = '';
        const valor = matrizPrecios[origen][destino];
        precio.textContent = `${valor} €`

    }
}

//boton reserva

btnReserva.addEventListener('click', () => {

    if (indexOrigen < 0 || indexDestino < 0) {

        return;
    } else {

        formReserva.classList.remove('sr-only');
        btnReserva.classList.add('sr-only');
    }

});

//validacion Formulario

function dosDigitos(digito) {
    if (digito === 0) {
        digito = '01';
    } else if (digito > 0 && digito < 10) {
        digito = `0${digito}`;
    }
    return digito
}


function initDate() {
    const inputDate = document.querySelector('#fecha');
    const fechaHoy = new Date();
    const [month, day, year] = [fechaHoy.getMonth(), fechaHoy.getDate(), fechaHoy.getFullYear()];
    const stFechaHoy = `${year}-${dosDigitos(month + 1)}-${dosDigitos(day)}`;

    inputDate.setAttribute('min', stFechaHoy)
}
initDate();
const errorNombre = new HtmlElementObserver(msgErrorNombre);
const errorEmail = new HtmlElementObserver(msgErrorEmail);
const errorPhone = new HtmlElementObserver(msgErrorPhone);
const errorDate = new HtmlElementObserver(msgErrorDate);
const errorTime = new HtmlElementObserver(msgErrorTime);
const spanPax = new HtmlElementObserver(paxSpan);
const spanPrivacidad = new HtmlElementObserver(privaciadSpan);
const nameInput = new Error();
const emailInput = new Error();
const phoneInput = new Error();
const dateInput = new Error();
const timeInput = new Error();
const inputSpanPax = new PaxRange();
const inputPrivacidad = new CHKPrivacidad();
nameInput.subscribe(errorNombre);
emailInput.subscribe(errorEmail);
phoneInput.subscribe(errorPhone);
dateInput.subscribe(errorDate);
timeInput.subscribe(errorTime);
inputSpanPax.subscribe(spanPax);
inputPrivacidad.subscribe(spanPrivacidad);


const rangePax = document.querySelector('#pax');
rangePax.value = 1;
rangePax.addEventListener('change', (event) => {
    inputSpanPax.notify(`${event.target.value} pax`);
})

const chkPrivacidad = document.querySelector('#chkPrivacidad');
chkPrivacidad.addEventListener('change', (event) => {

    if (event.target.checked) {
        inputPrivacidad.notify('aceptada');
    } else {
        inputPrivacidad.notify('no aceptada');
    }
})

function validarNombre() {
    const valueInputName = document.querySelector('#name').value;
    if (valueInputName.trim() === '') {
        nameInput.notify('Indique a nombre de quien será la reserva');
        return false;
    } else {
        nameInput.notify('');
    }
    return true;
}
function validarEmail() {

    const inputEmail = document.querySelector('#email');
    const valueInputEmail = inputEmail.value;
    if (valueInputEmail.trim() === '' || !inputEmail.validity.valid) {
        emailInput.notify('Indique un mail válido');
        return false;
    } else {
        emailInput.notify('');
    }
    return true;
}
function validarPhone() {
    const valueInputPhone = document.querySelector('#phone').value;
    if (valueInputPhone.trim() === '') {
        phoneInput.notify('Indique un teléfono de contacto para la reserva');
        return false;
    } else {
        phoneInput.notify('');
    }
    return true;
}
function validarFecha() {
    const valueInputDate = document.querySelector('#fecha').value;

    if (valueInputDate === '') {
        dateInput.notify('Indique una fecha para la reserva')
        return false;
    }
    dateInput.notify('');
    return true;
}

function validarHora() {
    const valueInputTime = document.querySelector('#hora').value;

    if (valueInputTime === '') {
        timeInput.notify('Indique una hora para la reserva')
        return false;
    }
    timeInput.notify('');
    return true;
}
function validarFormulario() {

    //validamos nombre
    let esValido = validarNombre();
    if (!esValido) {
        return esValido;

    }
    esValido = validarEmail();
    if (!esValido) {
        return esValido;
    }
    esValido = validarPhone();
    if (!esValido) {
        return esValido;
    }
    esValido = validarFecha();
    if (!esValido) {
        return esValido
    }
    esValido = validarHora();
    if (!esValido) {
        return esValido
    }
    return esValido && chkPrivacidad.checked;
}


btnConfirmarReserva.addEventListener('click', (event) => {
    event.preventDefault();
    const esValido = validarFormulario();
    //console.log(esValido);
    if (esValido) {
        //enviamos formulario
        const data = new FormData(formReserva);
        //const values = Object.fromEntries(data.entries());        
/*
        envioFormulario(data).then(data => {
            
        }).then(data=>data.json()){
            console.log(error);
        })
  */
        fetch('./php/envioFormulario.php', {
            method: 'POST',
            mode: 'no-cors',
           
            body: data
        }).then(datos=>datos.json()).then(datos=>{
           
            formReserva.reset();
            formReserva.classList.remove('sr-only');
            //TO-DO pop-up con mensaje de exito o error
        });



    }

})

async function envioFormulario(form) {
    const response = await fetch('./php/envioFormulario.php', {
        method: 'POST',
        mode: 'no-cors',
        redirect: 'follow',
        body: form
    });
    return response;
}

