import pymssql
import os

# Lee las variables de entorno
server = os.environ.get('SQL_SERVER', 'sql-server-test-analitica.database.windows.net')
database = os.environ.get('SQL_DATABASE', 'consultoria')
username = os.environ.get('SQL_USERNAME', 'consultoria')
password = os.environ.get('SQL_PASSWORD', 'Colombia23*')

def conectar_db():
    return pymssql.connect(server=server, user=username, password=password, database=database)

