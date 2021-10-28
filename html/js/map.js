if (mapboxgl) {
    const MAPBOX_KEY = "pk.eyJ1IjoiY29kaWdvbmV0IiwiYSI6ImNrdmJobnE1cThyd3Qybm9mZG1uNjY1aW4ifQ.zDYQmlCge-vpVSh8EeB2Yw";
    mapboxgl.accessToken = MAPBOX_KEY;

    // Se define constante GLOBAL con referencia al Mapa
    const map = new mapboxgl.Map({
        container: 'MapaRegion',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-70.6145295, -32.83204],
        zoom: 7
    });

    Plotly.d3.json("js/mop-region.json", function (err, json_data) {
        if (err) {
            console.log("Error al leer JSON", err);
            return;
        }


        console.log("JSON", json_data);

        // Agregar Marcadores.
        let communes_keys = Object.keys(json_data);
        // communes_keys = ["VALPARAISO", "PETORCA", "LA LIGUA", "QUILLOTA", "LOS ANDES"]
        for (const communes of communes_keys) {
            // Create a DOM element for each marker.
            const el = document.createElement('div');
            // <div class="marker" style="border-radius...></div>
            const width = 25;
            const height = 25;
            el.className = 'marker';
            el.style.borderRadius = "5px";
            //el.style.backgroundImage = `url(https://placekitten.com/g/${width}/${height}/)`;
            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
            el.style.backgroundSize = '100%';
            el.style.backgroundColor = 'green';
            /*
            if(json_data[communes].DATA["GASTO (M$)"] > json_data[communes].DATA["SALDO (M$)"]){
                el.style.backgroundColor = 'red';
            }
            */
            if (json_data[communes].DATA["SALDO (M$)"] < 14000000) {
                el.style.backgroundColor = 'red';
            }

            el.addEventListener('click', () => {
                let gasto = parseInt(json_data[communes].DATA["GASTO (M$)"]);
                let msg = `
                La comuna de ${json_data[communes].DATA.COMUNA}, \n
                tiene un gasto acumulado de: ${gasto}, \n
                La suma de 1 más 1 es: ${(1 + 1)}.
                `;
                window.alert(msg);
            });

            // Add markers to the map.
            new mapboxgl.Marker(el)
                .setLngLat([json_data[communes].DATA.GEO_LON, json_data[communes].DATA.GEO_LAT])
                .addTo(map);
        }

    })
}
