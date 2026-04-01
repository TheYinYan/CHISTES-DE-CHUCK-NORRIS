# [Chistes de Chuck Norris](https://theyinyan.github.io/CHISTES-DE-CHUCK-NORRIS/)

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue.svg)](https://theyinyan.github.io/CHISTES-DE-CHUCK-NORRIS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![API](https://img.shields.io/badge/API-Chuck%20Norris-red.svg)](https://api.chucknorris.io)

> *"No son chistes, son hechos"*

## 📖 Descripción del proyecto

Aplicación web interactiva que consume la **API de Chuck Norris** para mostrar chistes del famoso actor y artista marcial. La aplicación permite a los usuarios explorar chistes por categorías, obtener chistes aleatorios y copiarlos al portapapeles con un solo clic.

Los chistes de Chuck Norris no son simples chistes, son verdades universales con un toque de humor. Esta aplicación te permite descubrirlos y compartirlos fácilmente.

## ✨ Características principales

| Característica | Descripción |
|----------------|-------------|
| 🎯 **Categorías** | Selecciona entre múltiples categorías de chistes (animal, career, celebrity, etc.) |
| 🎲 **Chiste aleatorio** | Obtén un chiste sorpresa de cualquier categoría |
| 📋 **Copiar al portapapeles** | Copia cualquier chiste con un solo clic para compartirlo |
| 🔢 **Contador de chistes** | Lleva la cuenta de cuántos chistes has obtenido |
| 🎨 **Diseño temático** | Interfaz inspirada en Chuck Norris con animaciones y efectos visuales |
| ⚡ **Manejo de errores** | Mensajes de error humorísticos al estilo Chuck Norris |

## 📁 Estructura del proyecto

```
CHISTES-DE-CHUCK-NORRIS/
│
├── 📄 index.html          # Estructura principal de la página
├── 📁 css/
│   └── 🎨 estilos.css     # Estilos y animaciones
├── 📁 js/
│   └── ⚡ javascript.js   # Lógica de la aplicación
└── 📁 imagenes/
    └── 🖼️ sealofapproval.png  # Logo/sello de Chuck Norris
    └── 🖼️ chuck-icon.png   # Icono de Chuck Norris

```

## 🚀 Cómo ejecutar el proyecto

### Opción 1: Localmente

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/CHISTES-DE-CHUCK-NORRIS.git
   ```

2. **Navega al directorio del proyecto**
   ```bash
   cd CHISTES-DE-CHUCK-NORRIS
   ```

3. **Abre el archivo principal**
   - Doble clic en `index.html`
   - O usa un servidor local (recomendado):
     ```bash
     # Con Python
     python -m http.server 8000
     
     # Con Node.js
     npx serve .
     ```

4. **¡Disfruta de los chistes!** Selecciona una categoría y haz clic en "Obtener chiste"

### Opción 2: En línea

Puedes acceder a la aplicación directamente desde GitHub Pages:

🔗 **[Chistes de Chuck Norris - Demo en vivo](https://theyinyan.github.io/CHISTES-DE-CHUCK-NORRIS/)**

## 🎮 Cómo usar la aplicación

1. **Al cargar la página**: Las categorías se cargan automáticamente desde la API
2. **Para obtener un chiste por categoría**: 
   - Selecciona una categoría del desplegable
   - Pulsa el botón **"Obtener chiste"**
3. **Para un chiste aleatorio**: 
   - Pulsa el botón **"Chiste aleatorio"** (sin necesidad de seleccionar categoría)
4. **Para copiar un chiste**:
   - Una vez obtenido un chiste, pulsa **"Copiar chiste"**
   - El chiste se copiará automáticamente al portapapeles
5. **Contador**: Cada vez que obtienes un chiste, el contador se incrementa

## 🔌 Endpoints de la API utilizados

| Endpoint | Método | Descripción | Ejemplo |
|----------|--------|-------------|---------|
| `/jokes/categories` | GET | Obtiene todas las categorías disponibles | `https://api.chucknorris.io/jokes/categories` |
| `/jokes/random` | GET | Obtiene un chiste aleatorio | `https://api.chucknorris.io/jokes/random` |
| `/jokes/random?category={categoria}` | GET | Obtiene un chiste de una categoría específica | `https://api.chucknorris.io/jokes/random?category=science` |

## 🎨 Funcionalidades destacadas

### Manejo de errores humorístico
Cuando ocurre un error (fallo de red, servidor, etc.), se muestra un mensaje aleatorio al estilo Chuck Norris:

> *"El servidor no sobrevivió a Chuck Norris."*
> *"Chuck Norris dice 'no' a esta petición."*
> *"Error de red. Chuck Norris rompió el protocolo."*

### Feedback visual
- El botón "Copiar chiste" cambia temporalmente a "¡Copiado!" con un icono de check
- Mensajes de carga durante las peticiones a la API
- Botones deshabilitados mientras se cargan los datos

### Animaciones CSS
- Brillo pulsante en el título
- Rotación continua de las estrellas
- Efecto flotante en la imagen de Chuck Norris
- Transiciones suaves en botones

## 📱 Responsive Design

La aplicación se adapta a diferentes tamaños de pantalla:

| Dispositivo | Ancho máximo | Adaptaciones |
|-------------|--------------|--------------|
| 📱 Móvil | 480px | Texto más pequeño, imagen reducida, elementos en columna |
| 📱 Tablet | 768px | Ajustes de padding y márgenes |
| 💻 Escritorio | >768px | Diseño completo con todos los efectos |

## 📚 Aprendizajes aplicados

Este proyecto demuestra las siguientes competencias:

- ✅ Consumo de APIs REST con `fetch()` y manejo de promesas
- ✅ Manipulación dinámica del DOM
- ✅ Manejo de errores y estados de carga
- ✅ Construcción dinámica de URLs con objetos `URL` y `searchParams`
- ✅ Eventos y listeners en JavaScript
- ✅ Diseño responsive con CSS
- ✅ Animaciones CSS (@keyframes)
- ✅ Documentación de código con Doxygen
- ✅ Uso de Git y GitHub Pages para despliegue

## 📄 Licencia

Este proyecto es de carácter educativo y se desarrolló como parte de los estudios de **Desarrollo de Aplicaciones Multiplataforma (DAM)**.

## 🙏 Agradecimientos

- [Chuck Norris API](https://api.chucknorris.io) por proporcionar los chistes gratuitamente

---

<div align="center">
  <sub>⚡ "Chuck Norris no necesita README, el README necesita a Chuck Norris" ⚡</sub>
</div>
