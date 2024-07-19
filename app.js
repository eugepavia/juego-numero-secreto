
let num_secreto = 0;
let intentos = 0;
let lista = [];
let num_max = 10; //límite del rango a adivinar


condiciones_iniciales();

//título y párrafo
function condiciones_iniciales() {
    asignar_texto_elemento('h1','Juego del número secreto');
    asignar_texto_elemento('p',`Adivina el número entre 1 y ${num_max}`);
    num_secreto = generar_num_secreto();
    intentos = 1;
}

//cambiar el texto de los elementos del HTML
function asignar_texto_elemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento); //es un OBJETO, no sólo el texto que contiene
    elementoHTML.innerHTML = texto;
    return;  // no retorna nada, pero es buena práctica
}

//generar el número secreto de forma aleatoria
function generar_num_secreto () {
    let num_generado = Math.floor(Math.random()*num_max) + 1;

    console.log(num_generado);
    console.log(lista);

    if (lista.length == num_max ) {
        asignar_texto_elemento('p','Ya se adivinaron todos los números');
        return 0;
    } else {
        if (lista.includes(num_generado)) {
            return generar_num_secreto(); //recursividad
        } else {
            lista.push(num_generado);
            return num_generado;
        }
    }
}

//evento click botón Intento
function verificar_intento() {
    let num_user = parseInt(document.getElementById('valor_user').value);
    
    if (num_user === num_secreto) { //si adivina
        asignar_texto_elemento('p',`¡Acertaste! Adivinaste en ${intentos} ${(intentos==1) ? 'intento':'intentos'}`)
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else { //si NO adivina
        if (num_user > num_secreto) {
            asignar_texto_elemento('p','El número secreto es menor');
        } else {
            asignar_texto_elemento('p','El número secreto es mayor');
        }
        intentos ++;
        limpiar_caja();
    }
    return;
}

//limpiar caja de respuestas del usuario
function limpiar_caja() {
    valor_caja = document.querySelector('#valor_user').value = '';
    return;
}

//reiniciar juego al ganar
function reiniciar_juego() {
    limpiar_caja();
    condiciones_iniciales();
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}
