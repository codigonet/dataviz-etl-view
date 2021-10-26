if (mapboxgl) {
    const MAPBOX_KEY = "pk.eyJ1IjoiY29kaWdvbmV0IiwiYSI6ImNrdjhqajhxNDI1MHEyeGwwYTU3b2NjdXEifQ.CYSagmmBL2RYaQjOpSm4Zg";
    mapboxgl.accessToken = MAPBOX_KEY;

    Plotly.d3.json("js/mop-region.json", function (err, json_data) {
        if (err) {
            console.log("Error al leer JSON", err);
            return;
        }

        const map = new mapboxgl.Map({
            container: 'MapaRegion',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-70.6145295, -32.83204],
            zoom: 7
        });

        console.log("JSON", json_data);

        // Agregar Marcadores.
        let communes_keys = Object.keys(json_data);
        for (const communes of communes_keys) {
            // Create a DOM element for each marker.
            const el = document.createElement('div');
            const width = 25;
            const height = 25;
            el.className = 'marker';
            el.style.borderRadius = "5px";
            el.style.backgroundImage = `url(https://placekitten.com/g/${width}/${height}/)`;
            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
            el.style.backgroundSize = '100%';

            el.addEventListener('click', () => {
                let gasto = parseInt(json_data[communes].DATA["GASTO (M$)"]); 
                let msg = `
                La comuna de ${json_data[communes].DATA.COMUNA}, \n
                tiene un gasto acumulado de: ${gasto}
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
