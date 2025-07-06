// Función para formatear RUT (11111111-1 -> 11.111.111-1)
const formatRUT = (rut) => {
  if (!rut || typeof rut !== 'string') return rut;
  if (!/^\d{7,8}[-][\dKk]$/.test(rut)) return rut;

  const rutClean = rut.replace(/[.-]/g, '');
  const dv = rutClean.slice(-1);
  const rutNumber = rutClean.slice(0, -1);
  const rutFormatted = rutNumber.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${rutFormatted}-${dv.toUpperCase()}`;
};
// Función para formatear teléfono (+56912345678 -> +56 9 1234 5678)
const formatPhone = (phone) => {
  if (!phone || typeof phone !== 'string') return phone;
  if (!/^\+56\d{1}\d{4}\d{4}$/.test(phone)) return phone;

  const areaCode = phone.slice(0, 3);
  const prefix = phone.slice(3, 4);
  const firstPart = phone.slice(4, 8);
  const secondPart = phone.slice(8);

  return `${areaCode} ${prefix} ${firstPart} ${secondPart}`;
};
// Función para formatear celular (+56912345678 -> +56 9 1234 5678)
const formatCellPhone = (cellphone) => {
  if (!cellphone || typeof cellphone !== 'string') return cellphone;
  if (!/^(\+56) (9) (\d{4}) (\d{4})$/.test(cellphone)) return cellphone;

  const areaCode = cellphone.slice(0, 3);
  const prefix = cellphone.slice(3, 4);
  const firstPart = cellphone.slice(4, 8);
  const secondPart = cellphone.slice(8);

  return `${areaCode} ${prefix} ${firstPart} ${secondPart}`;
};
// Función para formatear fecha (2024-03-15T00:00:00.000Z -> dd/MM/yyyy)
const formatDate = (dateString) => {
  if (!dateString) return dateString;
  try {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  } catch {
    return dateString;
  }
};
// Función para limpiar formato de RUT (11.111.111-1 -> 11111111-1)
const cleanRUTFormat = (rut) => {
  if (!rut || typeof rut !== 'string') return rut;
  if (!/^\d{1,2}\.\d{3}\.\d{3}-[\dKk]$/.test(rut)) return rut;

  return rut.replace(/\./g, '');
};
// Función para limpiar formato de teléfono (+56 9 1234 5678 -> +56912345678)
const cleanPhoneFormat = (phone) => {
  if (!phone || typeof phone !== 'string') return phone;
  if (!/^\+56 \d{1,2} \d{3,4} \d{4}$/.test(phone)) return phone;
  return phone.replace(/\s/g, '');
};
// Funcion para limpiar formato de celular (+56 9 1234 5678 -> +56912345678)
const cleanCellPhoneFormat = (cellphone) => {
  if (!cellphone || typeof cellphone !== 'string') return cellphone;
  if (!/^\+56 9 \d{4} \d{4}$/.test(cellphone)) return cellphone;
  return cellphone.replace(/\s/g, '');
};
// Función para limpiar formato de fecha (dd/MM/yyyy -> yyyy-MM-dd)
const cleanDateFormat = (dateString) => {
  if (!dateString || typeof dateString !== 'string') return dateString;
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) return dateString;

  const [day, month, year] = dateString.split('/');
  return `${year}-${month}-${day}`;
};
// Función recursiva para transformar datos
export const transformData = (data, transformer) => {
  if (!data) return data;
  if (typeof data !== 'object') return data;

  if (Array.isArray(data)) {
    return data.map((item) => transformData(item, transformer));
  }

  const transformed = {};
  for (const [key, value] of Object.entries(data)) {
    if (key.toLowerCase().includes('rut')) {
      transformed[key] = transformer === 'format' ? formatRUT(value) : cleanRUTFormat(value);
    } else if (key.toLowerCase().includes('phone') || key.toLowerCase().includes('telefono')) {
      transformed[key] = transformer === 'format' ? formatPhone(value) : cleanPhoneFormat(value);
    } else if (key.toLowerCase().includes('cellphone')) {
      transformed[key] =
        transformer === 'format' ? formatCellPhone(value) : cleanCellPhoneFormat(value);
    } else if (
      key.toLowerCase().includes('date') ||
      key.toLowerCase().includes('createdat') ||
      key.toLowerCase().includes('year')
    ) {
      transformed[key] = transformer === 'format' ? formatDate(value) : cleanDateFormat(value);
    } else if (typeof value === 'object' && value !== null) {
      transformed[key] = transformData(value, transformer);
    } else {
      transformed[key] = value;
    }
  }
  return transformed;
};
