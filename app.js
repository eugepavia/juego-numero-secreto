
let num_secreto = 0;
let contador = 0;
let lista = []; //guarda todos los números secretos usados
let num_max = 0;
let intentos = 0;


restart_juego();


// regresa el juego a su estado inicial
function restart_juego() {
    lista = [];
    intentos = 0;
    validar_num_max();
    validar_intentos();
    reiniciar_juego();
}

//reiniciar juego al ganar o terminar el juego (título, párrafo, generación de número, reset intentos, cambio en botones)
function reiniciar_juego() {
    asignar_texto_elemento('h1','Juego del número secreto');
    asignar_texto_elemento('p',`Adivina el número entre 1 y ${num_max}`);
    num_secreto = generar_num_secreto();
    contador = 0;  
    limpiar_caja();

    if (num_secreto == -1) {
        document.getElementById('reiniciar').setAttribute('disabled','true');
        document.getElementById('intentar').setAttribute('disabled','true');
    } else {
        document.querySelector('#reiniciar').setAttribute('disabled','true');
        document.getElementById('intentar').removeAttribute('disabled');
    }
}

// revisar que NUM_MAX sea un número, mayor que 1
function validar_num_max() {
    num_max = parseInt(prompt('Ingresa el número máximo hasta el cual adivinar:'));
    if (isNaN(num_max) || num_max<=1) {
        alert('Valor no válido');
        return validar_num_max(); //recursivo
    }
}

//revisar que INTENTOS sea un número, mayor que 0 y menor que el número máximo del rango a adivinar
function validar_intentos() {
    intentos = parseInt(prompt('Ingresa la cantidad de intentos para adivinar:'));
    if (isNaN(intentos) || intentos <=0 || intentos>=num_max) {
        alert('Valor no válido');
        return validar_intentos(); //recursivo
    }
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

    if (lista.length == num_max ) {
        asignar_texto_elemento('p','Ya se adivinaron todos los números');
        return -1;
    } else {
        if (lista.includes(num_generado)) {
            return generar_num_secreto(); //recursividad
        } else {
            lista.push(num_generado);
            console.log(num_generado) //en caso de trampa, F12
            return num_generado;
        }
    }
}

//revisar si el usuario adivinó, dar pista si no
function verificar_intento(n) {
    if (n === num_secreto) { //si adivina
        asignar_texto_elemento('p',`¡Acertaste! Adivinaste en ${contador} ${(contador==1) ? 'intento':'intentos'}`)
        document.getElementById('reiniciar').removeAttribute('disabled'); //activar botón nuevo juego
        document.getElementById('intentar').setAttribute('disabled','true'); //desactivar botón intento
    } else { //si NO adivina
        if (n > num_secreto) {
            asignar_texto_elemento('p',`El número secreto es menor \n Intentos restantes: ${intentos-contador}`);
        } else {
            asignar_texto_elemento('p',`El número secreto es mayor \n Intentos restantes: ${intentos-contador}`);
        }
        limpiar_caja();
    }
    return;
}

//evento click botón Intentar
function num_intentos() {
    let num_user = parseInt(document.getElementById('valor_user').value);
    contador++;

    if (contador < intentos) {
        verificar_intento(num_user);
    } else {
        document.getElementById('reiniciar').removeAttribute('disabled'); //activar botón nuevo juego
        document.getElementById('intentar').setAttribute('disabled','true'); //desactivar botón intento
        if (num_user === num_secreto) {
            asignar_texto_elemento('p',`¡Acertaste! Adivinaste en ${contador} ${(contador==1) ? 'intento':'intentos'}`);
        } else {
            asignar_texto_elemento('p',`Alcanzaste el límite de intentos. \n El número es ${num_secreto}`);  //REVISAR: problema con salto de línea
        }
    }
}

//limpiar caja de respuestas del usuario
function limpiar_caja() {
    valor_caja = document.querySelector('#valor_user').value = '';
    return;
}


