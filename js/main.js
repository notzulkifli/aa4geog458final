mapboxgl.accessToken =
            'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
        let map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/dark-v10',
            zoom: 2, // starting zoom
            center: [-12.099477714862594, 31.186699510589147] // starting center
        });

        const protos = ["UDP", "TCP", "ICMP"],
            colors = ['rgb(181,126,220)', 'rgb(103,169,207)', 'rgb(1,108,89)']

        map.on('load', () => { //simplifying the function statement: arrow with brackets to define a function

            // when loading a geojson, there are two steps
            // add a source of the data and then add the layer out of the source
            map.addSource('aws_honeypot', {
                type: 'geojson',
                data: 'assets/aws_honeypot.geojson'
            });

            map.addLayer({
                    'id': 'aws_honeypot-layer',
                    'type': 'circle',
                    'source': 'aws_honeypot',
                    'paint': {
                        'circle-color': '#223b53',
                        'circle-stroke-color': 'white',
                        'circle-stroke-width': 1,
                        'circle-opacity': 0.6
                    }
                },
                'waterway-label'
            );


            // click on tree to view cases in a popup
            map.on('click', 'aws_honeypot-layer', (event) => {
                new mapboxgl.Popup()
                    .setLngLat(event.features[0].geometry.coordinates)
                    .setHTML(
                        `<strong>Country:</strong> ${event.features[0].properties.country}`
                    )
                    .addTo(map);
            });
        });