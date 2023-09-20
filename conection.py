import pymssql

server = 'sql-server-test-analitica.database.windows.net'
database = 'consultoria'
username = 'consultoria'
password = 'Colombia23*'

def conectar_db():
    return pymssql.connect(server=server, user=username, password=password, database=database)
