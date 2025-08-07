export function cleanErrorPrisma(error) {
  let errorPrisma;
  let splitErrorPrisma;
  let errorMessage = '';

  if (error.code === 'P2002') {
    errorPrisma = error.message.replace(/(\r\n|\n|\r| \(|\)|`|\t)/gm, '');
    splitErrorPrisma = errorPrisma.split(':');
    errorMessage = {
      message: `${splitErrorPrisma[1]}: ${splitErrorPrisma[2]}`,
    };
  }
  if (error.code === 'P2003') {
    errorPrisma = error.message.replace(/(\r\n|\n|\r|\(|\)|`|\t)/gm, '');
    splitErrorPrisma = errorPrisma.split(':');
    errorMessage = {
      message: splitErrorPrisma[1],
    };
  }
  if (error.code === 'P2022') {
    errorPrisma = error.meta.column;
    errorMessage = {
      message: `The column ${errorPrisma} does not exist in the current database.`,
    };
  }
  if (error.code === 'P2025') {
    errorPrisma = error.meta.cause;
    errorMessage = { message: errorPrisma };
  }
  return errorMessage;
}
