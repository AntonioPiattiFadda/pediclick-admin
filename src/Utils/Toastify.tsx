//STUB - No estoy usando nada de este archivo
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notifyUpdatedProduct = () => {
  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 1500));
  toast.promise(resolveAfter3Sec, {
    pending: 'Actualizando producto',
    success: 'Producto actualizado correctamente 👌',
    error: 'Ocurrio un error intenta de nuevo 🤯',
  });
};

export const notifyDeletedProduct = () => {
  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 1500));
  toast.promise(resolveAfter3Sec, {
    pending: 'Eliminando producto',
    success: 'Producto eliminado correctamente 👌',
    error: 'Ocurrio un error intenta de nuevo 🤯',
  });
};

export const notifyAddedProduct = () => {
  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 1500));
  toast.promise(resolveAfter3Sec, {
    pending: 'Agregando producto',
    success: 'Producto añadido correctamente 👌',
    error: 'Ocurrio un error intenta de nuevo 🤯',
  });
};
