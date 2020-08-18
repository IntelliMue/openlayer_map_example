
window.onload = start;

function start() {

    /*
     * Coordinates for Pasadena California to serve as an example
     */
    var x = -13152200.617877632;
    var y = 4048680.122585318;

    /*
     * Base layer for the map
     */
    var raster = new ol.layer.Tile({
        source: new ol.source.OSM()
});

    /*
     * Vectors are the layers on top of the map. In this case will be used as zones
     */
    var source = new ol.source.Vector();
    var vector = new ol.layer.Vector({
        source: source,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
            color: 'rgba(204, 245, 255, 0.4)'
          }),
          stroke: new ol.style.Stroke({
            color: '#0099ff',
            width: 2
          }),
          image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#0099ff'
            })
          })
        })
      });


    const map = new ol.Map({
        view: new ol.View({
            // Following values need to be set based on user input to center in that city
            center: [x, y],
            zoom: 13,
            maxZoom: 17,
            minZoom: 11
        }),
        layers: [
            raster, 
            vector
        ],
        target: 'js-map'
    })

    
// Darwing Section for map follows example set on openlayers vectors

var modify = new ol.interaction.Modify({source: source});
map.addInteraction(modify);

var draw, snap;
var typeSelect = document.getElementById('drawtype');

function addInteractions() {
  draw = new ol.interaction.Draw({
    source: source,
    type: typeSelect.value
  });
  map.addInteraction(draw);
  snap = new ol.interaction.Snap({source: source});
  map.addInteraction(snap);

}

/*
 * Handle change event
 */
typeSelect.onchange = function() {
  map.removeInteraction(draw);
  map.removeInteraction(snap);
  addInteractions();
};

addInteractions();

source.on('addfeature', function(evt){
  var feature = evt.feature;
  var coords = feature.getGeometry().getCoordinates();
  /* 
   * For now log coords to console. Later will be tied to other zone data.
  */
  console.log(coords);
  document.getElementById("box").innerHTML = coords;
});

}