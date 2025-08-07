// Función para formatear fecha (dd-MM-yyyy -> yyyy-MM-dd)
export const formatDateForInput = (dateString) => {
  if (!dateString || typeof dateString !== 'string') return '';
  const [day, month, year] = dateString.split('-');
  return `${year}-${month}-${day}`;
};
