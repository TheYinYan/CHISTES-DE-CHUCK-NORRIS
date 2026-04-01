"use strict";

let contadorChistes = 0;
const selectCategoria = document.getElementById("categoria");
const botonObtener = document.querySelector(".boton-obtener-chiste");
const botonAleatorio = document.querySelector("#aleatorio");
const botonCopiar = document.querySelector("#copiar");
const textoChiste = document.querySelector(".chiste-texto");
const contador = document.querySelector("#contador");

/**
 * @brief Inicializa la aplicación al cargar la página.
 * Esta función se ejecuta cuando el DOM ha sido completamente cargado.
 * Realiza las siguientes
 * acciones:
 * 1. Llama a la función obtenerCategorias() para cargar las categorías de chistes.
 * 2. Configura los event listeners para los botones de la interfaz:
 *    - Botón "aleatorio": Al hacer clic, llama a la función chisteRandom() para obtener un chiste aleatorio.
 *    - Botón "copiar": Al hacer clic, llama a la función copiarChiste() para copiar el chiste actual al portapapeles.
 *    - Botón "obtener": Al hacer clic, obtiene la categoría seleccionada y llama a la función chisteCategoria() para obtener un chiste de esa categoría.
 * 3. Configura el event listener para el select de categorías para mostrar la categoría seleccionada en la consola.
 */
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

/**
 * @brief Copia el chiste actual al portapapeles.
 * Esta función obtiene el texto del chiste mostrado en la interfaz y lo copia al portapapeles utilizando la API de Clipboard.
 * - Si el chiste se copia correctamente, muestra un mensaje de éxito en la consola y una alerta al usuario.
 * - Si ocurre un error al copiar el chiste, muestra una alerta al usuario.
 */
function copiarChiste() {

    const chisteTexto = textoChiste.textContent;
    if (chisteTexto && chisteTexto !== "Cargando chiste...") {
        navigator.clipboard.writeText(chisteTexto)
            .then(() => {
                console.log("Chiste copiado al portapapeles. Chuck Norris no necesitó Ctrl+C.");
                alert("Chiste copiado al portapapeles");
            })
            .catch(() => {
                alert("El chiste intento copiarse... pero Chuck Norris lo detuvo.");
            });
    } else {
        console.warn("No hay chiste para copiar");
    }
}

/**
 * @brief Obtiene un chiste aleatorio desde el endpoint correspondiente.
 * Esta función realiza una petición fetch al endpoint de chistes aleatorios, valida la respuesta y actualiza el texto del chiste en la interfaz.
 * - Si la petición es exitosa, muestra el chiste obtenido y actualiza el contador de chistes obtenidos.
 * - Si ocurre un error al obtener el chiste, muestra un mensaje de error aleatorio en la interfaz y deshabilita el botón de copiar.
 * @param {HTMLElement} textoChiste - El elemento HTML donde se mostrará el chiste obtenido.
 * @see obtenerErrorAleatorio @see actualizarContador
 */
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

/**
 * @brief Configura el event listener para el select de categorías.
 * Esta función agrega un event listener al elemento <select> de categorías para detectar cambios en la selección.
 * Cada vez que el usuario selecciona una categoría diferente, se muestra la categoría seleccionada en la consola.
 * @see obtenerCategorias
 */
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

/**
 * @brief Actualiza el contador de chistes obtenidos.
 * Esta función incrementa el contador de chistes obtenidos cada vez que se obtiene un nuevo chiste exitosamente.
 * Luego, actualiza el texto del elemento HTML que muestra el contador para reflejar el número actual de chistes obtenidos.
 */
function actualizarContador() {
    contadorChistes++;
    contador.textContent = `Chistes obtenidos: ${contadorChistes}`;
}
