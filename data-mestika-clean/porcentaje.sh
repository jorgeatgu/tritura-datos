#!/bin/bash

ofertas=('7467' '5660' '1497' '693' '209' '189' '187' '176' '138' '120' '118' '89' '84' '81' '75' '63' '62' '62' '60' '57' '56' '55' '54' '53' '53' '52' '51' '50' '47' '44')

total='20387'

for (( i=0; i<${#ofertas[@]}; ++i )); do
    echo "scale=2; ${ofertas[$i]}*100/${total}" | bc >> porcentaje-ofertas.csv
done
