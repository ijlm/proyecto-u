# Solución Analítica Cloud para Microempresas (RESTAURANTES)

Este proyecto implementa una solución analítica en la nube de bajo costo para microempresas, específicamente en el ámbito de restaurantes. La aplicación utiliza FastAPI para crear una API web que realiza operaciones relacionadas con clientes y preferencias. También incluye un modelo de recomendación basado en reglas de asociación.

## Requisitos

- Python 3.x
- Bibliotecas requeridas (ver requirements.txt)

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tu_usuario/tu_proyecto.git
    cd tu_proyecto
    ```

2. Instala las dependencias:

    ```bash
    pip install -r requirements.txt
    ```

## Configuración

Asegúrate de configurar adecuadamente las variables de entorno para la conexión a la base de datos. Puedes establecer estas variables en tu entorno de desarrollo o crear un archivo `.env` en la raíz del proyecto.

```dotenv
SQL_SERVER=sql-server-test-analitica.database.windows.net
SQL_DATABASE=consultoria
SQL_USERNAME=consultoria
SQL_PASSWORD=TuContraseña
