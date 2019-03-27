
require([
    "esri/map",
    "esri/dijit/LocateButton",
    "esri/dijit/BasemapGallery",
    "esri/dijit/Search",
    "esri/dijit/Measurement",
    "esri/dijit/Scalebar",
    "esri/toolbars/draw",
    "esri/graphic",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/dijit/OverviewMap",
    "esri/dijit/Print",
    "esri/geometry/Extent",
    "dojo/parser",
    "dijit/registry",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dijit/form/Button",
    "dijit/WidgetSet",
    "dojo/domReady!"],
    function (Map, LocateButton, BasemapGallery, Search, Measurement, Scalebar, Draw, Graphic,
        SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, OverviewMap, Print, Extent,
        parser, registry) {
        parser.parse();

        var map = new Map("map", {
            basemap: "topo",

            zoom: 10

        });

        var symbol = new SimpleLineSymbol();

        window.mapObject = map;

        map.on("load", createToolbar);
        registry.forEach(function (d) {
            if (d.declaredClass === "dijit.form.Button") {
                d.on("click", activateTool);
            }
        });
        function activateTool() {
            var tool = this.label.toUpperCase().replace(/ /g, "_");
            toolbar.activate(Draw[tool]);
            map.hideZoomSlider();
        }

        function createToolbar(themap) {
            toolbar = new Draw(map);
            toolbar.on("draw-end", addToMap);
        }

        function addToMap(evt) {

            toolbar.deactivate();
            map.showZoomSlider();

            var graphic = new Graphic(evt.geometry, symbol);

            map.graphics.add(graphic);
        }
        var search = new Search({ map: map }, "search");
        search.startup();

        var scalebar = new Scalebar({ map: map, scalebarUnit: "dual", attachTo: "bottom-center" });
        var measurement = new Measurement({ map: map }, "measurement");
        measurement.startup();
        var basemapGallery = new BasemapGallery({
            showArcGISBasemaps: true,
            map: map
        }, "basemapGallery");
        basemapGallery.startup();

        basemapGallery.on("error", function (msg) {
            console.log("basemap gallery error:  ", msg);
        });
        var overviewMapDijit = new OverviewMap({
            map: map,
            visible: true
        });
        overviewMapDijit.startup();
        var printer = new Print({
            map: map,
            url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
        }, "printer");
        printer.startup();

        var geoLocate = new LocateButton({
            map: map
        }, "LocateButton");
        geoLocate.startup();
        var extent = new esri.geometry.Extent({
            "xmin": 8594356.15413877, "ymin": 1108052.211220509, "xmax": 8764657.85315821, "ymax": 1190604.201768531,
            "spatialReference": { "wkid": 102100, "latestWkid": 3857 }
        });

        window.drawGraphics = (function () {
            this.drawGraphic = function (graphicsObj) {
                graphicsObj.graphics.shift();
                for (z = 0; z < graphicsObj.graphics.length; z++) {
                    var line = {
                        geometry: {
                            "paths": graphicsObj.graphics[z].paths,
                            "spatialReference": { "wkid": 3857 }
                        },
                        "symbol": { "color": [0, 0, 0, 255], "width": 1, "type": "esriSLS", "style": "esriSLSSolid" }
                    };
                    var graphic = new Graphic(line);
                    map.graphics.add(graphic);

                }
                
            }
        });

    });

      function Erase()
      {
         
          window.mapObject.graphics.clear();
          
      }

function sendMapObject() {


    var graphicsArray = [];
    for (i = 0; i < window.mapObject.graphics.graphics.length; i++) {
        graphicsArray.push(window.mapObject.graphics.graphics[i].geometry);
    }
    var graphicsObj =
    {
        "graphics": graphicsArray
    };
    var graphicsJsonString = JSON.stringify(graphicsObj);


    Add(graphicsJsonString);
   

}
function sendObject() {


    var graphicsArray = [];
    for (i = 0; i < window.mapObject.graphics.graphics.length; i++) {
        graphicsArray.push(window.mapObject.graphics.graphics[i].geometry);
    }
    var graphicsObj =
    {
        "graphics": graphicsArray
    };
    var graphicsJsonString = JSON.stringify(graphicsObj);


   
    Update(graphicsJsonString);

}


function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");

}
document.onreadystatechange = function () {
    var state = document.readyState
    if (state == 'interactive') {
        document.getElementById('contents').style.visibility = "hidden";
    } else if (state == 'complete') {
        setTimeout(function () {
            document.getElementById('interactive');
            document.getElementById('load').style.visibility = "hidden";
            document.getElementById('contents').style.visibility = "visible";
        }, 1000);
    }
}
