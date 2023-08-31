'use client';
import { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { TextField, InputAdornment } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { updateProduct } from '../../Services/products.service';
import { validateFormPriceAndStock } from '../../Validator/ValidateForm';
import endPoints from '../../Services';
import axios from 'axios';

const style = {
  //TODO - Hacerlo responsive
  width: 250,
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid lightgrey',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const categories = [
  {
    id: 1,
    value: '1',
    label: 'Hay stock',
  },
  {
    id: 2,
    value: '2',
    label: 'NO hay stock',
  },
];

type Props = {
  updatePriceAndStockModal: { active: boolean; id: number };
  setUpdatePriceAndStockModal: (newValue: {
    active: boolean;
    id: number;
  }) => void;
};

export default function UpdatePriceAndStockForm({
  updatePriceAndStockModal,
  setUpdatePriceAndStockModal,
}: Props) {
  const [serverError, setServerError] = useState({
    active: false,
    message: '',
  });
  const [formError, setFormError] = useState({
    name: false,
    nameMessage: '',
    price: false,
    priceMessage: '',
    stock: false,
    stockMessage: '',
  });
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    stock: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (updatePriceAndStockModal.id === 0) return;
    const fetchData = axios
      .get(endPoints.products.getProduct(updatePriceAndStockModal.id))
      .then((res) => {
        const newProduct = {
          name: res.data.name,
          price: res.data.price,
          stock: '1',
        };
        if (res.data.blocked) {
          newProduct.stock = '2';
        }
        setProduct(newProduct);
      });
  }, [updatePriceAndStockModal]);

  const handleClose = () => {
    setUpdatePriceAndStockModal({ active: false, id: 0 });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const newProduct = {
      price: Number(e.target.price.value),
      blocked: true,
    };

    if (e.target.stock.value === '1') {
      newProduct.blocked = false;
    }

    const validation = validateFormPriceAndStock(newProduct);

    if (validation.error) {
      const transformedObject = validation.errors.reduce(
        (obj: any, item: any) => {
          // Extraer las claves y valores de cada objeto en el array
          const [key, value] = Object.entries(item)[0];

          // Agregar las propiedades al objeto resultante
          obj[key] = value;

          // Agregar las propiedades de mensaje al objeto resultante
          obj[`${key}Message`] = item[`${key}Message`];

          return obj;
        },
        {}
      );
      setFormError(transformedObject);
      setLoading(false);
    }

    if (!validation.error) {
      updateProduct(updatePriceAndStockModal.id, newProduct).then((res) => {
        if (res.response?.data.message) {
          setServerError({
            active: true,
            message: res.response.data.message,
          });
          return;
        }
        setUpdatePriceAndStockModal({ active: false, id: 0 });
        setLoading(false);
      });
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={updatePriceAndStockModal.active}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={updatePriceAndStockModal.active}>
          <Box sx={style}>
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <label>{product.name} </label>
              <TextField
                name="stock"
                margin="normal"
                id={
                  formError.stock
                    ? 'outlined-error'
                    : 'outlined-select-currency'
                }
                select
                error={formError.stock}
                label={formError.stock ? formError.stockMessage : 'Stock'}
                onChange={(e) => {
                  setProduct({ ...product, stock: e.target.value });
                }}
                value={product.stock}
                // helperText="Selecciona la categoria"
              >
                {categories.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="price"
                fullWidth
                margin="normal"
                error={formError.price}
                label={formError.price ? formError.priceMessage : 'Precio'}
                id="outlined-start-adornment"
                sx={{ width: '25ch' }}
                onChange={(e) => {
                  setProduct({ ...product, price: Number(e.target.value) });
                }}
                value={product.price}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
              {serverError.active && <span>{serverError.message}</span>}

              <Button
                disabled={loading}
                type="submit"
                variant="contained"
                color="primary"
              >
                {loading
                  ? 'Actualizando producto...'
                  : 'Actualizar precio y stock'}
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
