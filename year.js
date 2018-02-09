var fs = require("fs");
var d3 = require("d3");
var _ = require("lodash");

//Cargamos el dataset
fs.readFile("data-mestika/data-ux.csv", "utf8", function(error, data) {

    data = d3.csvParse(data);

    function getYear(stringDate) {
        return stringDate.split('-')[4];
    }

    //Prouuection de solo las 3 keys que queremos ASAP
    data = data.map(function(item){
        return {
            'puesto': item.puesto,
            'ciudad': item.ciudad,
            'fecha': item.fecha
        }
    });


    var csv = d3.csvFormat(data);

    fs.writeFile("data-mestika-clean/data-ux.csv", csv, function(err) {
        console.log("Hecho!!");
    });

});
