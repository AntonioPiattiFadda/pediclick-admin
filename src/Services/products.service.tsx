import axios from 'axios';
import endPoints from './index';
import { AddProduct, UpdateProduct } from '../Types/Types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getProducts = async () => {
  const response = await axios.get(endPoints.products.getAllProduct);
  return response.data;
};

//En realidad no aplique el toastify 100 por ciento correcto pero funciona de diez igual

const addProduct = async (body: AddProduct) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post(
      endPoints.products.addProducts,
      body,
      config
    );
    notifyAddedProduct(true);
    return response.data;
  } catch (error) {
    notifyAddedProduct(false);
    return error;
  }
};

export const notifyAddedProduct = (success: boolean) => {
  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 1500));
  const rejectAfter3Sec = new Promise((reject) => setTimeout(reject, 1500));
  if (success) {
    toast.promise(resolveAfter3Sec, {
      pending: 'Agregando producto',
      success: 'Producto añadido correctamente 👌',
    });
  } else {
    toast.promise(rejectAfter3Sec, {
      pending: 'Agregando producto',
      error: 'Ocurrió un error, intenta de nuevo o recarga la pagina 🤯',
    });
  }
};

const deleteProduct = async (id: number) => {
  try {
    const response = await axios.delete(endPoints.products.deleteProduct(id));
    notifyDeletedProduct(true); // Notificar éxito
    return response.data;
  } catch (error) {
    notifyDeletedProduct(false); // Notificar error
    console.log('Estoy errando aquí:');
    console.log(error);
  }
};

export const notifyDeletedProduct = (success: boolean) => {
  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 1500));
  const rejectAfter3Sec = new Promise((reject) => setTimeout(reject, 1500));
  if (success) {
    toast.promise(resolveAfter3Sec, {
      pending: 'Eliminando producto',
      success: 'Producto eliminado correctamente 👌',
    });
  } else {
    toast.promise(rejectAfter3Sec, {
      pending: 'Eliminando producto',
      error: 'Ocurrió un error, intenta de nuevo o recarga la pagina 🤯',
    });
  }
};

const updateProduct = async (id: number, body: UpdateProduct) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.patch(
      endPoints.products.updateProducts(id),
      body,
      config
    );

    // Si el producto se actualizó correctamente, se resuelve la promesa con éxito
    notifyUpdatedProduct(true);

    return response.data;
  } catch (error) {
    // Si ocurrió un error al actualizar el producto, se resuelve la promesa con error
    notifyUpdatedProduct(false);

    throw error;
  }
};

export const notifyUpdatedProduct = (success: boolean) => {
  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 1500));
  const rejectAfter3Sec = new Promise((reject) => setTimeout(reject, 1500));
  if (success) {
    toast.promise(resolveAfter3Sec, {
      pending: 'Actualizando producto',
      success: 'Producto actualizado correctamente 👌',
    });
  } else {
    toast.promise(rejectAfter3Sec, {
      pending: 'Actualizando producto',
      error: 'Ocurrió un error, intenta de nuevo o recarga la pagina 🤯',
    });
  }
};

export { getProducts, addProduct, deleteProduct, updateProduct };
