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
            "dojo/parser",
            "dijit/registry",
            "dijit/layout/BorderContainer",
            "dijit/layout/ContentPane",
            "dijit/form/Button",
            "dijit/WidgetSet",
            "dojo/domReady!"],
            function (Map, LocateButton, BasemapGallery, Search, Measurement, Scalebar, Draw, Graphic,
                SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, OverviewMap, Print,
                parser, registry) {
                parser.parse();



                var map = new Map("map", {
                    basemap: "topo",
                    center: [78, 10],
                    zoom: 10

                });


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
                    var symbol;
                    toolbar.deactivate();
                    map.showZoomSlider();
                    switch (evt.geometry.type) {

                        case "polyline":
                            symbol = new SimpleLineSymbol();

                            break;
                        case "Line":
                            symbol = new SimpleLineSymbol();
                            break;
                        default:
                            symbol = new SimpleLineSymbol();
                            break;
                    }
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

            });
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
//Load Data in Table when documents is ready
$(document).ready(function () {
    loadData();
});
//Load Data function
function loadData() {
    $.ajax({
        url: "/Home/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {

                html += '<tr>';
                html += '<td>' + item.RoadID + '</td>';
                html += '<td>' + item.Name + '</td>';

                html += '<td><a href="#" onclick="return getbyID(' + item.RoadID + ')" class="glyphicon glyphicon-pencil"><i class="icon-pencil icon-white"></i></a> | <a href="#" onclick="Delele(' + item.RoadID + ')" class="glyphicon glyphicon-trash"><i class="icon-pencil icon-white"></i></a></td>'
                html += '</tr>';
                return '<input type="checkbox" name="RoadID[]" >';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Add Data Function
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        RoadID: $('#RoadID').val(),
        Name: $('#Name').val()

    };
    $.ajax({
        url: "/Home/Add",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Function for getting the Data Based upon Employee ID
function getbyID(EmpID) {
    $('#Name').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Home/getbyID/" + EmpID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#RoadID').val(result.RoadID);
            $('#Name').val(result.Name);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}
//function for updating employee's record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        RoadID: $('#RoadID').val(),
        Name: $('#Name').val(),

    };
    $.ajax({
        url: "/Home/Update",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#RoadID').val("");
            $('#Name').val("");

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//function for deleting employee's record
function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Home/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}
//Function for clearing the textboxes
function clearTextBox() {
    $('#RoadID').val("");
    $('#Name').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');

}
//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }

    return isValid;
}