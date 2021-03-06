// Cargar las librerías
const { log } = require("console"); // Para mensajes por consola (terminal)
const fs = require("fs"); // Para lecturas/escrituras de archivos
const path = require("path"); // Para acceso a directorios
const axios = require("axios").default; // Para acceso a API

// Crea función que consultará a la API
async function callAPI(URL) {
    return await axios.get(URL)
}

// Definir los datos de la API origen
const { API_KEY } = require("./api_key"); // Leer la KEY desde nuestro archivo
const API_METHOD = `bencina-en-linea/v1/combustibles/vehicular/estaciones/gasolina93.json${API_KEY}`;
const API_URL = `https://api.desarrolladores.energiaabierta.cl/${API_METHOD}`;

// Definir parámetros de consulta
const REGISTRIES = 100 // Registros a obtener por petición
var PAGE = 1 // Registros a obtener por petición
var API_URL_FILTERS = `${API_URL}&limit=${REGISTRIES}`

log("Dirección API:", API_URL_FILTERS);
log(API_KEY);

// Definir objeto JSON vacío para salida
let output_headers = {};
let output_data = {};

// Leer los datos de la API origen
axios.get(API_URL_FILTERS + `&page=${PAGE}`)
    .then(response => {
        output_headers = response.data["headers"];
        output_data = response.data["data"];
        // Muestra por consola el contenido de información procesada
        log("Data de Salida", output_data);

        // Definir archivo de salida (JSON)
        const json_file = path.resolve("docs/js/energia-region.json");
        // Guardar en JSON los datos transformados 
        fs.writeFileSync(json_file, JSON.stringify(output_data));
    }).catch(error => {
        log("Error al consultar la API", error)
    })
