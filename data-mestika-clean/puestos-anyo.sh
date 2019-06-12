#!/bin/bash

<<comentario
Dependencias: csvkit => https://github.com/wireservice/csvkit
Este pequeño script sirve para calcular el total de puestos ofertados en un año
Los datos tienen que venir agrupados por día y meses
Un ejemplo son los datos de remoto, que en primera instancia
son agrupados en trituradora.js con la siguiente función:
var dataRemotoFin = _(dataRemoto)
     .groupBy('fecha')
     .map(function(items, name) {
        return { Fecha: name, Total: items.length };
     }).value();
comentario

# Array con todos los años
year=('-19' '-18' '-17' '-16' '-15' '-14' '-13' '-12' '-11' '-10' '-09' '-08' )

<<comentario
Lo primero es recorrer el array de años.
Ahora con csvgrep buscamos en la columna de la fecha(en este caso la primera)
Usamos una expresión regular para que agrupe todos los días de cada mes del archivo
Y ahora concatenamos(PIPE) con | lo que vamos a hacer es sumar los valores de todos esos días con csvstat --sum
Por último guardamos el resultado en un archivo.
comentario

# Recorremos el array de numeros
for (( i=0; i<${#year[@]}; ++i )); do
    csvgrep -c 1 -r "(${year[$i]})" data-designer-count.csv | csvstat --zero --sum >> total-designer.csv
done
