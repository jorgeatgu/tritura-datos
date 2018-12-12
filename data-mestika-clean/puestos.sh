#!/bin/bash

<<comentario
Dependencias: csvkit => https://github.com/wireservice/csvkit
Este pequeño script sirve para calcular el total de puestos ofertados en un mes
Los datos tienen que venir agrupados por día y meses
Un ejemplo son los datos de remoto, que en primera instancia
son agrupados en trituradora.js con la siguiente función:
var dataRemotoFin = _(dataRemoto)
     .groupBy('fecha')
     .map(function(items, name) {
        return { Fecha: name, Total: items.length };
     }).value();
comentario

# Array con todos los meses
mes=('nov-18' 'oct-18' 'sep-18' 'aug-18' 'jul-18' 'jun-18' 'may-18' 'apr-18' 'mar-18' 'feb-18' 'jan-18' 'dec-17' 'nov-17' 'oct-17' 'sep-17' 'aug-17' 'jul-17' 'jun-17' 'may-17' 'apr-17' 'mar-17' 'feb-17' 'jan-17' 'dec-16' 'nov-16' 'oct-16' 'sep-16' 'aug-16' 'jul-16' 'jun-16' 'may-16' 'apr-16' 'mar-16' 'feb-16' 'jan-16' 'dec-15' 'nov-15' 'oct-15' 'sep-15' 'aug-15' 'jul-15' 'jun-15' 'may-15' 'apr-15' 'mar-15' 'feb-15' 'jan-15' 'dec-14' 'nov-14' 'oct-14' 'sep-14' 'aug-14' 'jul-14' 'jun-14' 'may-14' 'apr-14' 'mar-14' 'feb-14' 'jan-14' 'dec-13' 'nov-13' 'oct-13' 'sep-13' 'aug-13' 'jul-13' 'jun-13' 'may-13' 'apr-13' 'mar-13' 'feb-13' 'jan-13' 'dec-12' 'nov-12' 'oct-12' 'sep-12' 'aug-12' 'jul-12' 'jun-12' 'may-12' 'apr-12' 'mar-12' 'feb-12' 'jan-12' 'dec-11' 'nov-11' 'oct-11' 'sep-11' 'aug-11' 'jul-11' 'jun-11' 'may-11' 'apr-11' 'mar-11' 'feb-11' 'jan-11' 'dec-10' 'nov-10' 'oct-10' 'sep-10' 'aug-10' 'jul-10' 'jun-10' 'may-10' 'apr-10' 'mar-10' 'feb-10' 'jan-10' 'dec-09' 'nov-09' 'oct-09' 'sep-09' 'aug-09' 'jul-09' 'jun-09' 'may-09' 'apr-09' 'mar-09' 'feb-09' 'jan-09' 'dec-08' 'nov-08' 'oct-08' )

<<comentario
Lo primero es recorrer el array de meses.
Ahora con csvgrep buscamos en la columna de la fecha(en este caso la primera)
Usamos una expresión regular para que agrupe todos los días de cada mes del archivo
Y ahora concatenamos(PIPE) con | lo que vamos a hacer es sumar los valores de todos esos días con csvstat --sum
Por último guardamos el resultado en un archivo.
comentario

# Recorremos el array de numeros
for (( i=0; i<${#mes[@]}; ++i )); do
    csvgrep -c 1 -r "(${mes[$i]})" data-puestos.csv | csvstat --zero --sum >> total-puestos.csv
done
