var fs = require("fs");
var d3 = require("d3");
var _ = require("lodash");

//Cargamos el dataset
fs.readFile("data-mestika/datos.csv", "utf8", function(error, data) {

    data = d3.csvParse(data);

    //Filtrar las de UX
    data = data.filter(function(item) {
        return item.ciudad ? item.ciudad.match(/Barcelona/gi) : false;
    });

    //Prouuection de solo las 3 keys que queremos ASAP
    data = data.map(function(item){
        return {
            'puesto': item.puesto,
            'ciudad': item.ciudad,
            'fecha': item.fecha
        }
    });

    //Descartamos las ciudades que tienen menos de 11 ofertas publicadas
    // var data = grupoCiudad.filter(function (d) { return d.value > 10})

    var csv = d3.csvFormat(data);

    fs.writeFile("data-mestika-clean/data-barcelona.csv", csv, function(err) {
        console.log("Hecho!!");
    });

});
