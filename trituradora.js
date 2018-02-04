var fs = require("fs");
var d3 = require("d3");
var _ = require("lodash");

//Cargamos el dataset
fs.readFile("data/datos.csv", "utf8", function(error, data) {

    data = d3.csvParse(data);

    console.log(data)
    //Filtrar las de UX
    data = data.filter(function(item) {
        return item.puesto ? item.puesto.match(/UX/) : false;
    });

    //Prouuection de solo las 3 keys que queremos ASAP
    data = data.map(function(item){
        return {
            'puesto': item.puesto,
            'ciudad': item.ciudad,
            'fecha': item.fecha
        }
    });


    var csv = d3.csvFormat(data);

    fs.writeFile("data-clean/distritosssssss.csv", csv, function(err) {
        console.log("Hecho!!");
    });

});