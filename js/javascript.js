"use strict";

let contadorChistes = 0;
const selectCategoria = document.getElementById("categoria");
const botonObtener = document.querySelector(".boton-obtener-chiste");
const botonAleatorio = document.querySelectorAll("#aleatorio");
const botonCopiar = document.querySelector("#copiar");
const textoChiste = document.querySelector(".chiste-texto");
const contador = document.querySelector("#contador");

document.addEventListener("DOMContentLoaded", () => {
    console.log("La página ha cargado");
    ponerCategoria(); 
    
    botonAleatorio.forEach((boton) => {
        boton.addEventListener("click", () => {
            console.log("Botón aleatorio clicado");
            chisteRandom(textoChiste);
        });
    });

    botonCopiar.addEventListener("click", () => {
        console.log("Botón copiar clicado");
        copiarChiste(); 
    });

    botonObtener.addEventListener("click", () => {
        const categoriaSeleccionada = selectCategoria.value;
        if (categoriaSeleccionada) {
            console.log(`Obteniendo chiste de la categoría: ${categoriaSeleccionada}`);
            chisteCategoria(categoriaSeleccionada, textoChiste);
        } else {
            console.warn("No se ha seleccionado ninguna categoría");
            textoChiste.textContent = "Por favor, selecciona una categoría para obtener un chiste.";
        }
    });

    configurarSelectCategoria(); 
});

// Función para copiar el chiste al portapapeles
function copiarChiste() {
    const chisteTexto = textoChiste.textContent;
    if (chisteTexto && chisteTexto !== "Cargando chiste...") {
        navigator.clipboard.writeText(chisteTexto)
            .then(() => {
                console.log("Chiste copiado al portapapeles");
                setTimeout(() => {
                    botonCopiar.textContent = textoOriginal;
                }, 2000);
            })
            .catch((error) => {
                console.error("Error al copiar el chiste:", error);
            });
    } else {
        console.warn("No hay chiste para copiar");
    }
}

// Función para obtener un chiste aleatorio de la API de Chuck Norris
function chisteRandom(textoChiste) {
    fetch("https://api.chucknorris.io/jokes/random")
        .then((response) => response.json())
        .then((data) => {
            console.log(data.value);
            textoChiste.textContent = data.value;
            actualizarContador();
        })
        .catch((error) => {
            console.error("Error al obtener el chiste:", error);
            textoChiste.textContent = "Error al cargar el chiste. Intenta de nuevo.";
        });
}

function ponerCategoria() { 
    fetch("https://api.chucknorris.io/jokes/categories")
        .then((response) => response.json())
        .then((data) => {
            console.log("Categorías obtenidas:", data);
            // Añadir una opción por defecto
            const opcionDefault = document.createElement("option");
            opcionDefault.value = "";
            opcionDefault.textContent = "Selecciona una categoría";
            opcionDefault.disabled = true;
            opcionDefault.selected = true;
            selectCategoria.appendChild(opcionDefault);
            
            data.forEach((categoria) => {
                const option = document.createElement("option");
                option.value = categoria;
                option.textContent = categoria;
                selectCategoria.appendChild(option);
            });
        })
        .catch((error) => {
            console.error("Error al obtener las categorías:", error);
        });
}

function configurarSelectCategoria() {
    selectCategoria.addEventListener("change", () => {
        const categoriaSeleccionada = selectCategoria.value;
        console.log(`Categoría seleccionada: ${categoriaSeleccionada}`);
    });
}

function chisteCategoria(categoria, textoChiste) {
    fetch(`https://api.chucknorris.io/jokes/random?category=${categoria}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(`Chiste de la categoría ${categoria}:`, data.value);
            textoChiste.textContent = data.value;
            actualizarContador();
        })
        .catch((error) => {
            console.error(`Error al obtener el chiste de la categoría ${categoria}:`, error);
            textoChiste.textContent = `Error al cargar el chiste de la categoría ${categoria}. Intenta de nuevo.`;
        });
}

// Función para actualizar el contador de chistes obtenidos
function actualizarContador() {
    contadorChistes++;
    contador.textContent = `Chistes obtenidos: ${contadorChistes}`;
}