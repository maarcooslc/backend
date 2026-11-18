# Enlaces de peticiones - Backend Workouts

## API Key
- Obtener API Key (`GET`): https://backend-entrenamientos.onrender.com/api/v1/apiKey/

## Workouts
- Listar todos (`GET`): https://backend-entrenamientos.onrender.com/api/v1/workouts?apiKey=marcos1234
- Filtrar por nombre (`GET`): https://backend-entrenamientos.onrender.com/api/v1/workouts?apiKey=marcos1234&name=Fran
- Filtrar por modo (`GET`): https://backend-entrenamientos.onrender.com/api/v1/workouts?apiKey=marcos1234&mode=For%20Time
- Filtrar por equipamiento (`GET`): https://backend-entrenamientos.onrender.com/api/v1/workouts?apiKey=marcos1234&equipment=barbell
- Limitar resultados (`GET`): https://backend-entrenamientos.onrender.com/api/v1/workouts?apiKey=marcos1234&limit=3
- Obtener por ID (`GET`): https://backend-entrenamientos.onrender.com/api/v1/workouts/7f8a12b4-5c91-492e-9821-3a4b9101c121?apiKey=marcos1234
- Crear workout (`POST`): https://backend-entrenamientos.onrender.com/api/v1/workouts
- Actualizar workout (`PATCH`): https://backend-entrenamientos.onrender.com/api/v1/workouts/7f8a12b4-5c91-492e-9821-3a4b9101c121
- Eliminar workout (`DELETE`): https://backend-entrenamientos.onrender.com/api/v1/workouts/7f8a12b4-5c91-492e-9821-3a4b9101c121

## Records
- Listar todos (`GET`): https://backend-entrenamientos.onrender.com/api/v1/records?apiKey=marcos1234
- Filtrar por récord (`GET`): https://backend-entrenamientos.onrender.com/api/v1/records?apiKey=marcos1234&record=160
- Obtener por ID (`GET`): https://backend-entrenamientos.onrender.com/api/v1/records/ad75d475-ac57-44f4-a02a-8f6def58ff56?apiKey=marcos1234
- Crear récord (`POST`): https://backend-entrenamientos.onrender.com/api/v1/records
- Actualizar récord (`PATCH`): https://backend-entrenamientos.onrender.com/api/v1/records/ad75d475-ac57-44f4-a02a-8f6def58ff56
- Eliminar récord (`DELETE`): https://backend-entrenamientos.onrender.com/api/v1/records/ad75d475-ac57-44f4-a02a-8f6def58ff56
