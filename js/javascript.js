"use strict";

let contadorChistes = 0;
const selectCategoria = document.getElementById("categoria");
const botonObtener = document.querySelector(".boton-obtener-chiste");
const botonAleatorio = document.querySelector("#aleatorio");
const botonCopiar = document.querySelector("#copiar");
const textoChiste = document.querySelector(".chiste-texto");
const contador = document.querySelector("#contador");

document.addEventListener("DOMContentLoaded", () => {
    console.log("La página ha cargado");
    obtenerCategorias();


    botonAleatorio.addEventListener("click", () => {
        console.log("Botón aleatorio clicado");
        chisteRandom(textoChiste);
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

/**
 * @brief Devuelve un mensaje de error aleatorio al estilo Chuck Norris.
 * @return {string} Un mensaje de error aleatorio.
 */
function obtenerErrorAleatorio() {
    const errores = [
        "Error al obtener los datos. Chuck Norris los obtuvo primero.",
        "No se pudieron cargar los datos. Chuck Norris estaba cerca.",
        "El servidor falló antes de que Chuck Norris terminara su movimiento.",
        "Algo salió mal. Chuck Norris no aprobó esta petición.",
        "Conexión perdida. Chuck Norris desconectó el servidor.",
        "No hay respuesta del servidor. Chuck Norris lo dejó inconsciente.",
        "Los datos existen, pero Chuck Norris decidió no compartirlos.",
        "No se pudieron obtener los datos. El servidor entró en pánico por Chuck Norris.",
        "Estamos trabajando en el problema... antes de que Chuck Norris vuelva.",
        "Chuck Norris interrumpió la carga de datos.",
        "El servidor no sobrevivió a Chuck Norris.",
        "Chuck Norris dice \"no\" a esta petición.",
        "Error: Chuck Norris.",
        "Chuck Norris estuvo aquí.",
        "El servidor se rindió ante Chuck Norris.",
        "Error al obtener los datos. Chuck Norris los redondeó hacia abajo.",
        "El servidor intentó responder... pero Chuck Norris lo miró fijamente.",
        "Datos no disponibles. Chuck Norris los está usando ahora mismo.",
        "La petición falló. Chuck Norris ganó esta ronda.",
        "No se pudieron cargar los datos. Chuck Norris cerró la conexión de una patada voladora.",
        "Timeout agotado. Chuck Norris nunca espera.",
        "El servidor se escondió cuando oyó el nombre de Chuck Norris.",
        "Error de red. Chuck Norris rompió el protocolo.",
        "Los datos se negaron a venir. Saben quién es Chuck Norris.",
        "El servidor respondió con miedo. Chuck Norris respondió con silencio.",
        "Petición rechazada. Chuck Norris ya aprobó otra.",
        "Error desconocido. Chuck Norris lo conoce.",
        "El servidor cayó. Chuck Norris ni siquiera tocó el teclado."
    ];

    const indiceAleatorio = Math.floor(Math.random() * errores.length);
    return errores[indiceAleatorio];
}

// Función para copiar el chiste al portapapeles
function copiarChiste() {

    const chisteTexto = textoChiste.textContent;
    if (chisteTexto && chisteTexto !== "Cargando chiste...") {
        navigator.clipboard.writeText(chisteTexto)
            .then(() => {
                console.log("Chiste copiado al portapapeles. Chuck Norris no necesitó Ctrl+C.");
                alert("Chiste copiado al portapapeles");
            })
            .catch(() => {
                textoChiste.textContent = obtenerErrorAleatorio();
            });
    } else {
        console.warn("No hay chiste para copiar");
    }
}

// Función para obtener un chiste aleatorio de la API de Chuck Norris
function chisteRandom(textoChiste) {
    const url = new URL('https://api.chucknorris.io/jokes/random');
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log("Chiste aleatorio obtenido:", data.value);
            textoChiste.textContent = data.value;
            actualizarContador();
            botonCopiar.disabled = false;
        })
        .catch(() => {
            textoChiste.textContent = obtenerErrorAleatorio();
            botonCopiar.disabled = true;
        });
}

/**
 * @brief Obtiene las categorías de chistes desde su endpoint correspondiente.
 * Esta función realiza una petición fetch al endpoint de las categorías de chistes,
 * valida la respuesta y actualiza un elemento <select> con las categorías obtenidas.
 * Además, habilita o deshabilita botones de la interfaz dependiendo del resultado.
 * @see obtenerErrorAleatorio
 */
function obtenerCategorias() {

    const url = new URL('https://api.chucknorris.io/jokes/categories');
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log("Categorías obtenidas:", data);

            data.forEach((categoria) => {
                const option = document.createElement("option");
                option.value = categoria;
                option.textContent = categoria;
                selectCategoria.appendChild(option);
            });
            botonAleatorio.disabled = false;
            botonCopiar.disabled = false;
            botonObtener.disabled = false;
        })
        .catch(() => {
            textoChiste.textContent = obtenerErrorAleatorio();
            botonAleatorio.disabled = true;
            botonObtener.disabled = true;
            botonCopiar.disabled = true;
        });
}

function configurarSelectCategoria() {
    selectCategoria.addEventListener("change", () => {
        const categoriaSeleccionada = selectCategoria.value;
        console.log(`Categoría seleccionada: ${categoriaSeleccionada}`);
    });
}

function chisteCategoria(categoria, textoChiste) {
    const url = new URL('https://api.chucknorris.io/jokes/random');
    url.searchParams.set('category', categoria);
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(`Chiste de la categoría ${categoria}:`, data.value);
            textoChiste.textContent = data.value;
            actualizarContador();
            botonCopiar.disabled = false;
        })
        .catch(() => {
            textoChiste.textContent = obtenerErrorAleatorio();
            botonCopiar.disabled = true;
        });
}

// Función para actualizar el contador de chistes obtenidos
function actualizarContador() {
    contadorChistes++;
    contador.textContent = `Chistes obtenidos: ${contadorChistes}`;
}
