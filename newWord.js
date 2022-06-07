const nuevaPalabra = document.getElementById("nueva-palabra");
const guardar= document.getElementById("guardar-palabra")
const cancelar= document.getElementById("cancelar")
var textoNuevo = document.getElementById("agrega-palabra");


function mostrarNuevaPalabra(){
    
    let save= document.createElement("button");
    save.type= "button";
    save.innerText ="Guardar y Empezar";
    guardar.appendChild(save);
    let cancel= document.createElement("button");
    cancel.type= "button";
    cancel.innerText ="Cancelar";
    cancelar.appendChild(cancel);
    inicio.style.display = "none";
    nuevaPalabra.style.display ="none";
    textoNuevo.classList.remove("invisible");
    
};

function archivar(){
    
    let esteTexto = document.getElementById("agrega-palabra").value;
    if(esteTexto !== ""){
       
        palabras.push(esteTexto);
    } else if (esteTexto !== " "){
        alert("NO HAS INGRESADO \n NINGUNA PALABRA");
        
    } 
        
};

const guardarEmpezar = () => {
    //let newWord = textoNuevo.setAttribute("type", "hidden");
    textoNuevo.classList.add("invisible");
    nuevaPalabra.style.display ="none";
    guardar.style.display= "none";
    cancelar.style.display= "none";
       
    archivar();
    startGame();
    textoNuevo.textContent.reset();
};


const atras=()=>{
   // let newWord = textoNuevo.setAttribute("type", "hidden");
    guardar.remove();
    cancelar.remove();
    inicio.style.display = "block";
    nuevaPalabra.style.display ="block";
    canvas.style.display= "none";
    textoNuevo.classList.add("invisible");
}
guardar.addEventListener("click",guardarEmpezar)
cancelar.addEventListener("click", atras )
nuevaPalabra.addEventListener("click", mostrarNuevaPalabra)