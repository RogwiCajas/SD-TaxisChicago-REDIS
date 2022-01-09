#!/usr/bin/python

# Importar SYS para leer y escribir; CSV para el formato de archivos
import sys
import csv

# Leer cada linea del archivo csv
reader = csv.reader(sys.stdin, delimiter=',')
for line in reader:
    # Separar cada linea segun la estructura del csv

    # unique_key, taxi_id, trip_start_timestamp, trip_end_timestamp, trip_seconds, trip_miles
    # pickup_census_tract, dropoff_census_tract, pickup_community_area, dropoff_community_area
    # fare, tips, tolls, extras, trip_total, payment_type, company, pickup_latitude
    # pickup_longitude, pickup_location, dropoff_latitude, dropoff_longitude, dropoff_location

    company = line[16]
    trip_total = line[14]

    # Buscar los nombres de companias de taxi y el total de ganancias de cada viaje

    print('%s\t%s' % (company, trip_total))