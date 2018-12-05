## Documentación


Ya tenemos el CSV con todas las ofertas por día en data-puestos.csv

Ahora queremos sumar por mes el número de ofertas pero hay demasiadas, para ello vamos a usar csvkit


csvgrep -c 1 -r "(-oct-18)" data-puestos.csv | csvstat --sum
