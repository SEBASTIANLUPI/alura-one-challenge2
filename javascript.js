const palabras =["alura", "latinoamerica", "codigo", "arreglo", "iteracion", "objeto", "tipado", "java", "python", "kotlin", "contenedor", "algoritmo", "instruccion", "javascript", "oracle", "frontend", "backend", "fullstack", "mysql", "amazon", "google", "microsoft", "apple", "php", "azure", "cloud", "scrum", "kanban", "pomodori", "css", "html", "mozilla", "yahoo", "bing", "avast", "clase", "funcion", "variable", "constante", "numero", "cadena", "string", "booleano", "null", "undefined", "bigint", "nan", "web", "computadora"];

const palabraContenida = document.querySelector("#palabraContenida");
const inicio = document.querySelector("#inicio");

const elementoLetrasUsadas = document.querySelector("#letrasUsadas");

let canvas = document.getElementById("canvas");
let horca = canvas.getContext("2d");
horca.canvas.width = 0;
horca.canvas.height = 0;

const partesCuerpo =[
    [29,3,3,3], //estas medidas deben ser cambiadas revisar como hacer circulos
    [30,5,1,6],
    [27,7,3,1],
    [31,7,3,1],
    [30,11,1,1],
    [29,11,1,4],
    [31,11,1,4],
    [28,5,3,1]
];

let palabraElegida;
let letraUsada;
let errores;
let aciertos;

const addLetter= letra => {
    let elementoLetra = document.createElement("span");
    elementoLetra.innerHTML = letra.toUpperCase();
    elementoLetrasUsadas.appendChild(elementoLetra);
};

function agregarParteCuerpo(partesCuerpo){
    horca.fillStyle = "darkblue";
    horca.fillRect(...partesCuerpo);
};

function letraInconrrecta(){
    agregarParteCuerpo (partesCuerpo[errores]);
    errores++;
    if(errores == partesCuerpo.length) {
        gameOver();
    }
};

function endGame() {
    document.removeEventListener("keydown", eventoLetra);
    inicio.style.display = "block";
    nuevaPalabra.style.display ="block";
    canvas.style.display= "none";
    alert("¡GANASTE, FELICIDADES!\n   ...\n ¡Te salvaste por un pelo!")
};
function gameOver() {
    document.removeEventListener("keydown", eventoLetra);
    inicio.style.display = "block";
    nuevaPalabra.style.display ="block";
    canvas.style.display= "none";
    alert ("¡ F I N  \n  D E L \n \n J U E G O !\n \n La respuesta Correcta era:\n " + palabraElegida)
};

function letraCorrecta (letra){
    const {children} = palabraContenida;
    for (var i=0; i < children.length; i++) {
        if(children[i].innerHTML === letra){
            children[i].classList.toggle("oculto");
            aciertos++;
        }
    }
    if(aciertos ===palabraElegida.length) {
        endGame();
    }
};

function agregarLetra(letra){
    if(palabraElegida.includes(letra)){
        letraCorrecta(letra);
    } else{
        letraInconrrecta();
    }
    addLetter(letra);
    letraUsada.push(letra);
};

function eventoLetra (event) {
    let nuevaLetra = event.key.toUpperCase();
    if(nuevaLetra.match(/^[a-zñ]$/i) && !letraUsada.includes(nuevaLetra)){
        agregarLetra(nuevaLetra)
    } else{
        alert ("RECUERDA: Usar solo letras \n ¡Pero NO las repitas! \n Nada de números o signos")
    };
};

function pintarPalabra(){
    palabraElegida.forEach(letra => {
        const elementoLetra =document.createElement("span");
        elementoLetra.innerHTML = letra.toUpperCase();
        elementoLetra.classList.add("letra");
        elementoLetra.classList.add("oculto");
        palabraContenida.appendChild(elementoLetra);
    });
}

function seleccionarPalabraRandom() {
    let palabra = palabras[Math.floor((Math.random()* palabras.length))].toUpperCase();

    palabraElegida =palabra.split("");
};

function dibujarAhorcado() {
    horca.canvas.width = 1200;
    horca.canvas.height = 500;
    horca.scale(30,30);
    horca.clearRect(0, 0, canvas.width, canvas.height);
    //debo probar tamaños con detenimiento
    horca.fillStyle = "darkbrown";
    horca.fillRect(15,16,10,1);
    horca.fillRect(17,0,1,16);
    horca.fillRect(15,0,16,1);
    horca.fillRect(30,1,1,2);
}

const startGame = () => {
    letraUsada=[];
    errores=0;
    aciertos=0;
    palabraContenida.innerHTML =" ";
    elementoLetrasUsadas.innerHTML = " ";
    inicio.style.display= "none";
    nuevaPalabra.style.display ="none";
    canvas.style.display= "block";
    dibujarAhorcado();
    seleccionarPalabraRandom();
    pintarPalabra();
    document.addEventListener("keydown", eventoLetra)
};

inicio.addEventListener("click", startGame);