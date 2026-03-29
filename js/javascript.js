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
    init();
});

// Función para inicializar los eventos y la lógica de la aplicación
function init() {
    botonAleatorio.forEach((boton) => {
        boton.addEventListener("click", () => {
            console.log("Botón aleatorio clicado");
            chisteRandom(textoChiste);
        });
    });

    botonCopiar.addEventListener("click", () => {
        console.log("Botón copiar clicado");
    });
};

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
        });

}

// Función para actualizar el contador de chistes obtenidos
function actualizarContador() {
    contadorChistes++;
    contador.textContent = `Chistes obtenidos: ${contadorChistes}`;
}

// const x = fetch("https://api.chucknorris.io/jokes/categories")

// console.log(x);


// x.then((response) => {
//     return response.json();
// }).then((data) => {
//     console.log(data);
// });
