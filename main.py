from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import conection
import pandas as pd
from fastapi.staticfiles import StaticFiles
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import string
nltk.download('stopwords')
nltk.download('punkt')

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


class ClienteRequest(BaseModel):
    client_id: str

def preprocesar_texto(texto):
    palabras = word_tokenize(texto, language='spanish') 
    palabras = [palabra.lower() for palabra in palabras if palabra not in string.punctuation]    
    
    stopwords_es = set(stopwords.words('spanish'))
    palabras = [palabra for palabra in palabras if palabra not in stopwords_es]    
    
    palabras_clave = list(set([palabra.upper() for palabra in palabras]))    
    palabras_clave_str = ' '.join(palabras_clave)
    
    return palabras_clave_str


@app.post("/existe_cliente/")
#async def consultar_cliente_api(client_id: str = Form(...)):
async def existe_cliente_api(cliente_request: ClienteRequest):

    try:
        conn = conection.conectar_db() 
        cursor = conn.cursor()
        query = f"SELECT nombre FROM cliente WHERE ID = '{cliente_request.client_id}'"
        cursor.execute(query)
        row = cursor.fetchone()
        conn.close()
        if row:
            nombre_cliente= row[0]
        else:
            nombre_cliente= None
    except Exception as e:
        return {"error":str(e) }
    if nombre_cliente:
        return {"nombre_cliente": nombre_cliente}
    else:
        return {"mensaje": "No se encontró el cliente con el ID especificado."}


class ClienteRequest3(BaseModel):
    client_id: str
    nombre_cliente: str
    preferencias_cliente: str

@app.post("/registra_cliente/")
async def existe_cliente_api(cliente_request: ClienteRequest3):    
    try:        
        conn = conection.conectar_db() 
        cursor = conn.cursor()
        query = f"INSERT INTO cliente(id, nombre) VALUES (%s, %s)"
        values = (cliente_request.client_id, cliente_request.nombre_cliente)                
        cursor.execute(query, values)
        conn.commit()
        
        query = f"INSERT INTO preferencias(ID_CLIENTE,prefencia) VALUES (%s,%s)"
        values = (cliente_request.client_id, preprocesar_texto(cliente_request.preferencias_cliente))        
        cursor.execute(query, values)
        conn.commit()

        return {"salida": "Registro Cliente exitoso"}
    except Exception as e:
        return {"salida": str(e)}

    finally:
        if conn:
            conn.close()

@app.post("/consultar_cliente/")
#async def consultar_cliente_api(client_id: str = Form(...)):
async def consultar_cliente_api(cliente_request: ClienteRequest):
    preferencias_cliente = ''
    try:
        conn = conection.conectar_db() 
        cursor = conn.cursor()
        query = f"SELECT prefencia FROM preferencias WHERE id_cliente = '{cliente_request.client_id}'"
        cursor.execute(query)
        rows = cursor.fetchall()
        conn.close()

        for row in rows:
            preferencias_cliente += str(row[0] + " ")              
        words = preferencias_cliente.split()  
        preferencias_cliente = pd.DataFrame(words, columns=['item'])
        preferencias_cliente=preferencias_cliente.value_counts().reset_index().head(5)
        preferencias_cliente.columns=['item','cantidad']
        preferencias_cliente=preferencias_cliente.to_dict(orient='records')
    except Exception as e:
        return {"error":str(e) }   
    if preferencias_cliente:
        return preferencias_cliente#{"preferencias_cliente": preferencias_cliente}    
    else:
        return {"mensaje": "No se encontró el cliente con el ID especificado."}


class ClienteRequest2(BaseModel):
    client_id: str
    preferencia: str

@app.post("/registra_preferencia/")
async def registra_preferencia_api(cliente_request: ClienteRequest2):
#async def registra_preferencia_api(client_id: str = Form(...),preferencia: str = Form(...)):
    try:
        conn = conection.conectar_db() 
        cursor = conn.cursor()
        query = f"INSERT INTO preferencias(ID_CLIENTE, prefencia) VALUES (%s,%s)"
        values=(cliente_request.client_id,preprocesar_texto(cliente_request.preferencia))
        cursor.execute(query,values)
        conn.commit()
        conn.close()            
        return {"salida":"Registro Exitoso"}
    except Exception as e:
        return {"error":str(e)}
    

@app.get("/")
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=80)

