# TRITURA-DATOS

Muchos de los datasets traen información que por diversos motivos no sirve.

La trituradora sigue el ejemplo de [Analyzing Data with Node
](http://learnjsdata.com/node.html)

## Ejemplo

Tenemos un dataset con todos los votos por distrito de Zaragoza. Ahora solo queremos obtener aquellos distritos donde los votos fueron superiores a 40000

```
//Cargamos el dataset
fs.readFile("data/distritos.csv", "utf8", function(error, data) {

    data = d3.csvParse(data);

    //usando el filter de d3 nos quedamos con aquellos distritos con más de 40000 votos
    var votoFilter = data.filter(function(d) {
        return d.poblacion > 40000;
    });

    //El resultado obtenido con el filter lo volvemos a transformar en CSV
    votoFilterClean = d3.csvFormat(votoFilter);

    //Creamos un nuevo CSV con los datos ya filtrados
    fs.writeFile("data-clean/distritos.csv", votoFilterClean, function(err) {
        console.log("Hecho!");
    });

});



```

Ahora simplemente escribimos

```
node trituradora.js
```

Y ya esta :)
