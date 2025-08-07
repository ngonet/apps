import axios from 'axios';
import { showErrorNotification, showSuccessNotification } from '@/composables/notification.js';
import { transformData } from '@/utils/transform-data.js';


export function axiosCreate(route, { internal = true } = {}) {
  const baseURL = internal
    ? `/api/${route}` // ruta interna para SSR
    : `${import.meta.env.VITE_API_URL}/${route}`; // ruta externa en CSR

  const instance = axios.create({ baseURL });

  // Interceptor de request para limpiar formato de datos
  instance.interceptors.request.use(
    (config) => {
      if (config.data) {
        config.data = transformData(config.data, 'clean');
      }
      if (config.params) {
        config.params = transformData(config.params, 'clean');
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Interceptor de respuesta para formatear datos y manejar errores
  instance.interceptors.response.use(
    (response) => {
      if (response.data) {
        response.data = transformData(response.data, 'format');
      }
      showSuccessNotification('Operación exitosa');
      return response;
    },
    (error) => {
      let errorMessage = 'Ha ocurrido un error inesperado';

      if (error.response) {
        // Error de respuesta del servidor (400-500)
        switch (error.response.status) {
          case 400:
            errorMessage = 'Solicitud incorrecta';
            break;
          case 401:
            errorMessage = 'No autorizado';
            break;
          case 403:
            errorMessage = 'Acceso denegado';
            break;
          case 404:
            errorMessage = 'Recurso no encontrado';
            break;
          case 422:
            errorMessage = 'Error de validación';
            break;
          case 500:
            errorMessage = 'Error interno del servidor';
            break;
          default:
            errorMessage = 'Error en la solicitud';
        }
      } else if (error.request) {
        // Error de red o servidor no disponible
        errorMessage = 'No se pudo conectar con el servidor';
      }

      showErrorNotification(errorMessage);
      return Promise.reject(error);
    }
  );

  return instance;
}
