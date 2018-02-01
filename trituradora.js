var fs = require("fs");
var d3 = require("d3");
var _ = require("lodash");

//Cargamos el dataset
fs.readFile("data/distritos.csv", "utf8", function(error, data) {

    data = d3.csvParse(data);

    var votoFilter = data.filter(function(d) {
        return d.poblacion > 40000;
    });

    votoFilterClean = d3.csvFormat(votoFilter);

    fs.writeFile("data-clean/distritos.csv", votoFilterClean, function(err) {
        console.log("Hecho!");
    });

});
