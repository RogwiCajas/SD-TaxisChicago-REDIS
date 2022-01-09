#!/usr/bin/python

from operator import itemgetter
import sys

current_company = None
current_total = 0
company = None
total = 0

# Se lee cada linea del mapeo
for line in sys.stdin:

    data_mapped = line.strip().split("\t")

    # Si no se cumple el tener solo los dos elementos, terminara el programa
    if len(data_mapped) != 2:
        continue

    # Asignar los datos mapeados a las variables
    company, total = data_mapped

    # Convertir el valor total a float
    try:
        total = float(total)
    except ValueError:
        continue

    # Calculos
    if current_company == company:
        current_total += total
    else:
        if current_company:
            print('%s\t%.2f' % (current_company, current_total))
        current_total = total
        current_company = company

# Muestra el ultimo resultado
if current_company == company:
    print('%s\t%.2f' % (current_company, current_total))