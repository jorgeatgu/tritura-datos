var fs = require("fs");
var d3 = require("d3");
var _ = require("lodash");

//Cargamos el dataset
fs.readFile("data-mestika/datos.csv", "utf8", function(error, data) {

    data = d3.csvParse(data);
    //Prouuection de solo las 3 keys que queremos ASAP
    data = data.map(function(item){
        return {
            'puesto': item.puesto,
            'ciudad': item.ciudad,
            'fecha': item.fecha
        }
    });

    //Filtrar las de UX
    dataBcn = data.filter(function(item) {
        return item.ciudad ? item.ciudad.match(/Barcelona/gi) : false;
    });

    dataDesigner = _.filter(data, function(item) { if (/diseñador/gi.test(item.puesto) || /designer/gi.test(item.puesto) || /diseño/gi.test(item.puesto)) return item.puesto });

    dataProgrammer = _.filter(data, function(item) { if (/programador/gi.test(item.puesto) || /desarrollador/gi.test(item.puesto)) return item.puesto });

    dataFlash = _.filter(data, function(item) { if (/flash/gi.test(item.puesto)) return item.puesto });

    dataRemoto = _.filter(data, function(item) { if (/remoto/gi.test(item.ciudad) ) return item.ciudad });


    // Agrupamos la ofertas por ciudad, y contamos el número de veces que se repite cada ciudad

    var dataCiudad = _(data)
      .groupBy('ciudad')
      .map(function(items, name) {
         return { Ciudad: name, Total: items.length };
      }).value();

    var dataPuestos = _(data)
      .groupBy('fecha')
      .map(function(items, name) {
         return { Fecha: name, Total: items.length };
      }).value();

    var dataRemotoFin = _(dataRemoto)
      .groupBy('fecha')
      .map(function(items, name) {
         return { Fecha: name, Total: items.length };
      }).value();

    var dataFlashFin = _(dataFlash)
        .groupBy('fecha')
        .map(function(items, name) {
            return { Fecha: name, Total: items.length};
        }).value();

    //Descartamos las ciudades que tienen menos de 11 ofertas publicadas
    var filterCiudad = dataCiudad.filter(function (d) { return d.Total > 10})


    var csvBcn = d3.csvFormat(dataBcn);
    var csvCiudad = d3.csvFormat(filterCiudad);
    var csvDesigner = d3.csvFormat(dataDesigner);
    var csvProgrammer = d3.csvFormat(dataProgrammer);
    var csvRemote = d3.csvFormat(dataRemotoFin);
    var csvPuestos = d3.csvFormat(dataPuestos);
    var csvFlash = d3.csvFormat(dataFlashFin);

    fs.writeFile("data-mestika-clean/data-barcelona.csv", csvBcn, function(err) {
        console.log("Hecho!!");
    });

    fs.writeFile("data-mestika-clean/data-ciudades.csv", csvCiudad, function(err) {
        console.log("Hecho!!");
    });

    fs.writeFile("data-mestika-clean/data-designer.csv", csvDesigner, function(err) {
        console.log("Hecho!!");
    });

    fs.writeFile("data-mestika-clean/data-programador.csv", csvProgrammer, function(err) {
        console.log("Hecho!!");
    });

    fs.writeFile("data-mestika-clean/data-remoto.csv", csvRemote, function(err) {
        console.log("Hecho!!");
    });

    fs.writeFile("data-mestika-clean/data-puestos.csv", csvPuestos, function(err) {
        console.log("Hecho!!");
    });

    fs.writeFile("data-mestika-clean/data-flash.csv", csvFlash, function(err) {
        console.log("Hecho!!");
    });

});
