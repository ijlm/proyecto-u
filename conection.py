import pymssql
import os

# Lee las variables de entorno
server = os.environ.get('SQL_SERVER')
database = os.environ.get('SQL_DATABASE')
username = os.environ.get('SQL_USERNAME')
password = os.environ.get('SQL_PASSWORD')

def conectar_db():
    return pymssql.connect(server=server, user=username, password=password, database=database)

