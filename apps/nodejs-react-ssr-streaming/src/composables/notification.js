const { Store } = await import('react-notifications-component');

export const showSuccessNotification = (message) => {
  Store.addNotification({
    title: 'Acción exitosa',
    message,
    type: 'info',
    container: 'top-right',
    dismiss: {
      duration: 2000,
      onScreen: true,
      showIcon: true,
    },
  });
};

export const showErrorNotification = (message) => {
  Store.addNotification({
    title: 'Error',
    message,
    type: 'danger',
    container: 'top-right',
    dismiss: {
      duration: 2000,
      onScreen: true,
      showIcon: true,
    },
  });
};

export const showInfoNotification = (message) => {
  Store.addNotification({
    title: 'Info',
    message,
    type: 'info',
    container: 'top-right',
    dismiss: {
      duration: 2000,
      onScreen: true,
      showIcon: true,
    },
  });
};
