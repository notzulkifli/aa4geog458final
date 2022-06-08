mapboxgl.accessToken =
    'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';

const filterGroup = document.getElementById('filter-group');

let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 2, // starting zoom
    center: [-12.099477714862594, 31.186699510589147] // starting center
});

const protos = ["UDP", "TCP", "ICMP"],
    colors = ['rgb(251, 176, 59)', 'rgb(34, 59, 83)', 'rgb(229, 94, 94)']

// create the legend object and anchor it to the html element with id legend.
const legend = document.getElementById('legend');

//set up legend grades content and labels
let labels = ['<strong>Protocols</strong>'],
    vbreak;

for (var i = 0; i < protos.length; i++) {
    vbreak = protos[i];
    dot_radii = 15;
    labels.push(
        '<p class="break"><i class="dot" style="background:' + colors[i] + '; width: ' + dot_radii +
        'px; height: ' +
        dot_radii + 'px; "></i> <span class="dot-label" style="top: ' + dot_radii / 2 + 'px;">' + vbreak +
        '</span></p>');

}
legend.innerHTML = labels.join('');

let chart = null,
    numTCP = 0,
    numICP = 0,
    numUDP = 0;

async function geojsonFetch() {

    // Await operator is used to wait for a promise. 
    // An await can cause an async function to pause until a Promise is settled.
    let response;
    response = await fetch('assets/aws_honeypot.geojson');
    attacks = await response.json();


    map.on('load', () => { //simplifying the function statement: arrow with brackets to define a function

        // when loading a geojson, there are two steps
        // add a source of the data and then add the layer out of the source
        map.addSource('aws_honeypot', {
            type: 'geojson',
            data: attacks
        });

        for (const feature of attacks.features) {
            const layerID = "" + feature.properties.proto
            if (!map.getLayer(layerID)) {
                map.addLayer({
                    'id': layerID,
                    'type': 'circle',
                    'source': 'aws_honeypot',
                    filter: ['==', 'proto', layerID],
                    paint: {
                        'circle-color': [
                            'match',
                            ['get', 'proto'],
                            'UDP',
                            '#fbb03b',
                            'TCP',
                            '#223b53',
                            'ICMP',
                            '#e55e5e',
                            /* other */
                            '#ccc'
                        ],
                        'circle-stroke-color': 'white',
                        'circle-stroke-width': 1,
                        'circle-opacity': 0.6
                    }
                });

                const input = document.createElement('input');
                input.type = 'checkbox';
                input.id = layerID;
                input.checked = true;
                filterGroup.appendChild(input);

                const label = document.createElement('label');
                label.setAttribute('for', layerID);
                label.textContent = "" + layerID;
                filterGroup.appendChild(label);

                input.addEventListener('change', (e) => {
                    map.setLayoutProperty(
                        layerID,
                        'visibility',
                        e.target.checked ? 'visible' : 'none'
                    );
                });
            }
        }

        // found the Protocols of all the attacks in the displayed map view. 

        protocols = calProtocols(attacks, map.getBounds());

        // enumerate the number of protocols.
        numUDP = protocols["UDP"];
        numTCP = protocols["TCP"];
        numICP = protocols["ICMP"];

        document.getElementById("udp").innerHTML = numUDP;
        document.getElementById("tcp").innerHTML = numTCP;
        document.getElementById("idp").innerHTML = numICP;


        x = Object.keys(protocols);
        x.unshift("proto")
        y = Object.values(protocols);
        y.unshift("#")

        // Create Bar Chart Here
        chart = c3.generate({
            size: {
                height: 350,
                width: 460
            },

            tooltip: {
                format: {
                    name: function (d) {
                        return 'Count';
                    }
                }
            },

            data: {
                x: 'proto',
                columns: [x, y],
                type: 'bar',
                onclick: function (d, protos) {
                    hide
                },
                colors: {
                    '#': (d) => {
                        return colors[d["x"]];
                    }
                }
            },
            axis: {
                y: {
                    label: {
                        text: 'Number of Attacks',
                        position: 'outer-middle'
                    },

                    max: 19000,
                    min: 0,
                },

                x: {
                    type: 'category',
                }
            },

            bar: {
                width: {
                    ratio: 0.5
                }
            },
            legend: {
                show: false
            },

            bindto: '#protocols-chart'

        });
    });

    //load data to the map as new layers.
    //map.on('load', function loadingData() {
    map.on('idle', () => { //simplifying the function statement: arrow with brackets to define a function
        protocols = calProtocols(attacks, map.getBounds());
        //numAttacks = attackTypes[4] + attackTypes[5] + attackTypes[6];

        numUDP = protocols["UDP"];
        numTCP = protocols["TCP"];
        numICP = protocols["ICMP"];

        document.getElementById("udp").innerHTML = numUDP;
        document.getElementById("tcp").innerHTML = numTCP;
        document.getElementById("idp").innerHTML = numICP;

        x = Object.keys(protocols);
        x.unshift("proto")
        y = Object.values(protocols);
        y.unshift("#")

        // after finishing each map reaction, the chart will be rendered in case the current bbox changes.
        chart.load({
            columns: [x, y]
        });
    });
}

// call the function
geojsonFetch();

function calProtocols(currentProtocols, currentMapBounds) {
    let protocolClasses = {
        "UDP": 0,
        "TCP": 0,
        "ICMP": 0
    };
    currentProtocols.features.forEach(function (d) { // d indicate a feature of currentProtocols
        if (d.geometry != null) {
            if (d.geometry.coordinates[1] > -90 && d.geometry.coordinates[1] < 90) {
                if (currentMapBounds.contains(d.geometry.coordinates)) {
                    // if it matches the protocol, increase our count of total protocol by 1
                    protocolClasses[d.properties.proto] += 1;
                }
            }
        }

    })
    return protocolClasses;
}