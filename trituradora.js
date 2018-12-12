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

    dataMadrid = data.filter(function(item) {
        return item.ciudad ? item.ciudad.match(/Madrid/gi) : false;
    });

    dataRemoto = data.filter(function(item) {
        return item.ciudad ? item.ciudad.match(/remoto/gi) : false;
    });

    dataMadridDesigner = _.filter(dataRemoto, function(item) { if (/seo/gi.test(item.puesto)) return item.puesto });

    dataDesigner = _.filter(data, function(item) { if (/diseñador/gi.test(item.puesto) || /designer/gi.test(item.puesto) || /diseño/gi.test(item.puesto)) return item.puesto });

    dataProgrammer = _.filter(data, function(item) { if (/programador/gi.test(item.puesto) || /desarrollador/gi.test(item.puesto)) return item.puesto });

    dataFront = _.filter(data, function(item) { if (/front/gi.test(item.puesto)) return item.puesto });

    dataMarketing = _.filter(data, function(item) { if (/marketing/gi.test(item.puesto)) return item.puesto });

    dataUX = _.filter(data, function(item) { if (/ux/gi.test(item.puesto)) return item.puesto });

    dataUI = _.filter(data, function(item) { if (/\bui\b/gi.test(item.puesto)) return item.puesto });

    dataFlash = _.filter(data, function(item) { if (/flash/gi.test(item.puesto)) return item.puesto });


    dataNinja = _.filter(data, function(item) { if (/ninja/gi.test(item.puesto) ) return item.puesto });


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

    var dataDesignerFin  = _(dataDesigner)
        .groupBy('fecha')
        .map(function(items, name) {
            return { Fecha: name, Total: items.length};
        }).value();

    var dataProgrammerFin  = _(dataProgrammer)
        .groupBy('fecha')
        .map(function(items, name) {
            return { Fecha: name, Total: items.length};
        }).value();

    var dataFrontFin  = _(dataFront)
        .groupBy('fecha')
        .map(function(items, name) {
            return { Fecha: name, Total: items.length};
        }).value();

    var dataMarketingFin  = _(dataMarketing)
        .groupBy('fecha')
        .map(function(items, name) {
            return { Fecha: name, Total: items.length};
        }).value();

    var dataUxFin  = _(dataUX)
        .groupBy('fecha')
        .map(function(items, name) {
            return { Fecha: name, Total: items.length};
        }).value();

    //Descartamos las ciudades que tienen menos de 11 ofertas publicadas
    var filterCiudad = dataCiudad.filter(function (d) { return d.Total > 10})


    var csvBcn = d3.csvFormat(dataBcn);
    var csvMadrid = d3.csvFormat(dataMadrid);
    var csvMadridDesigner = d3.csvFormat(dataMadridDesigner);
    var csvCiudad = d3.csvFormat(filterCiudad);
    var csvDesigner = d3.csvFormat(dataDesigner);
    var csvProgrammer = d3.csvFormat(dataProgrammer);
    var csvFront = d3.csvFormat(dataFront);
    var csvRemote = d3.csvFormat(dataRemotoFin);
    var csvPuestos = d3.csvFormat(dataPuestos);
    var csvFlash = d3.csvFormat(dataFlashFin);
    var csvDesignerCount = d3.csvFormat(dataDesignerFin);
    var csvProgrammerCount = d3.csvFormat(dataProgrammerFin);
    var csvFrontCount = d3.csvFormat(dataFrontFin);
    var csvMarketingCount = d3.csvFormat(dataMarketingFin);
    var csvUxCount = d3.csvFormat(dataUxFin);
    var csvNinja = d3.csvFormat(dataNinja);
    var csvUi = d3.csvFormat(dataUI);

    fs.writeFile("data-mestika-clean/data-barcelona.csv", csvBcn, function(err) {
        console.log("Hecho!!");
    });

    fs.writeFile("data-mestika-clean/data-madrid.csv", csvMadrid, function(err) {
        console.log("Hecho!!");
    });

    fs.writeFile("data-mestika-clean/data-madrid-designer.csv", csvMadridDesigner, function(err) {
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

    fs.writeFile("data-mestika-clean/data-front.csv", csvFront, function(err) {
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

    fs.writeFile("data-mestika-clean/data-designer-count.csv", csvDesignerCount, function(err) {
        console.log("Hecho!!");
    });

    fs.writeFile("data-mestika-clean/data-programmer-count.csv", csvProgrammerCount, function(err) {
        console.log("Hecho!!");
    });

    fs.writeFile("data-mestika-clean/data-front-count.csv", csvFrontCount, function(err) {
        console.log("Hecho!!");
    });

    fs.writeFile("data-mestika-clean/data-marketing-count.csv", csvMarketingCount, function(err) {
        console.log("Hecho!!");
    });

    fs.writeFile("data-mestika-clean/data-ux-count.csv", csvUxCount, function(err) {
        console.log("Hecho!!");
    });

    fs.writeFile("data-mestika-clean/data-ninja.csv", csvNinja, function(err) {
        console.log("Hecho!!");
    });

    fs.writeFile("data-mestika-clean/data-ui.csv", csvUi, function(err) {
        console.log("Hecho!!");
    });

});
