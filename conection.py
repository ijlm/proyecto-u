import pymssql
import os

# Lee las variables de entorno
server = os.environ.get('SQL_SERVER')
database = os.environ.get('SQL_DATABASE')
username = os.environ.get('SQL_USERNAME')
password = os.environ.get('SQL_PASSWORD')

def conectar_db():
    if not all([server, database, username, password]):
        raise ValueError("Faltan variables de entorno. Asegúrate de configurar SQL_SERVER, SQL_DATABASE, SQL_USERNAME y SQL_PASSWORD.")
    
    return pymssql.connect(server=server, user=username, password=password, database=database)

