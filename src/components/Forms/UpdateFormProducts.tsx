'use client';
import { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { TextField, InputAdornment, Input } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { updateProduct } from '../../Services/products.service';
import { validateForm } from '../../Validator/ValidateForm';
import endPoints from '../../Services';
import axios from 'axios';
// import { BsImage } from 'react-icons/bs';
// process.env.NEXT_PUBLIC_CLOUDINARY_URL ||
const CLOUDINARY_URL: string =
  'https://api.cloudinary.com/v1_1/dm8b2resp/image/upload';

const style = {
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
    value: '1',
    label: 'Verduras',
  },
  {
    value: '2',
    label: 'Frutas',
  },
];

type Props = {
  updateModal: { active: boolean; id: number };
  setUpdateModal: (newValue: { active: boolean; id: number }) => void;
};

async function uploadImage(file: File) {
  if (file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'x1ryjgeq');

    try {
      const response = await axios.post(CLOUDINARY_URL, formData);
      return response.data.secure_url;
    } catch (error) {
      console.log(error);
      //REVIEW - Manejar el error si no se puede cargar la imagen
    }
  }
}

export default function UpdateFormProducts({
  updateModal,
  setUpdateModal,
}: Props) {
  const [serverError, setServerError] = useState({
    active: false,
    message: '',
  });
  const [formError, setFormError] = useState({
    name: false,
    nameMessage: '',
    description: false,
    descriptionMessage: '',
    price: false,
    priceMessage: '',
    categoryId: false,
    categoryIdMessage: '',
    image: false,
    imageMessage: '',
  });
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    description: '',
    image: '',
    categoryId: '',
    stock: true,
  });
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  useEffect(() => {
    if (updateModal.id === 0) return;
    setLoading(false);
    setSelectedImage(false);
    const fetchData = axios
      .get(endPoints.products.getProduct(updateModal.id))
      .then((res) => {
        const productToUpdate = {
          ...res.data,
          categoryId: res.data.categoryId.toString(),
        };
        setProduct(productToUpdate);
      });
  }, [updateModal]);
  const handleChangeImage = () => {
    setSelectedImage(true);
  };
  const handleClose = () => setUpdateModal({ active: false, id: 0 });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (e.target.image.files[0]) {
      uploadImage(e.target.image.files[0]).then((res) => {
        const newProduct = {
          name: e.target.name.value,
          price: Number(e.target.price.value),
          description: e.target.description.value,
          image: res,
          categoryId: Number(e.target.categoryId.value),
        };
        const validation = validateForm(newProduct);
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
          setLoading(false);
          setFormError(transformedObject);
        }

        if (!validation.error) {
          updateProduct(updateModal.id, newProduct).then((res) => {
            if (res.response?.data.message) {
              setServerError({
                active: true,
                message: res.response.data.message,
              });
              return;
            }
            setUpdateModal({ active: false, id: 0 });
            setLoading(false);
          });
        }
      });
    } else {
      const newProduct = {
        name: e.target.name.value,
        price: Number(e.target.price.value),
        description: e.target.description.value,
        image: product.image,
        categoryId: Number(e.target.categoryId.value),
      };
      const validation = validateForm(newProduct);
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
        setLoading(false);
        setFormError(transformedObject);
      }

      if (!validation.error) {
        updateProduct(updateModal.id, newProduct).then((res) => {
          if (res.response?.data.message) {
            setServerError({
              active: true,
              message: res.response.data.message,
            });
            return;
          }
          setUpdateModal({ active: false, id: 0 });
          setLoading(false);
        });
      }
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={updateModal.active}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={updateModal.active}>
          <Box sx={style}>
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <TextField
                margin="normal"
                name="name"
                error={formError.name}
                id={formError.name ? 'outlined-error' : 'outlined-basic'}
                label={formError.name ? formError.nameMessage : 'Name'}
                variant="outlined"
                onChange={(e) => {
                  setProduct({ ...product, name: e.target.value });
                }}
                value={product.name}
              />
              <TextField
                name="description"
                margin="normal"
                error={formError.description}
                id={
                  formError.description
                    ? 'outlined-error'
                    : 'outlined-multiline-static'
                }
                label={
                  formError.description
                    ? formError.descriptionMessage
                    : 'Description'
                }
                multiline
                rows={4}
                onChange={(e) => {
                  setProduct({ ...product, description: e.target.value });
                }}
                value={product.description}
              />
              <TextField
                name="categoryId"
                margin="normal"
                id={
                  formError.categoryId
                    ? 'outlined-error'
                    : 'outlined-select-currency'
                }
                select
                error={formError.categoryId}
                label={
                  formError.categoryId
                    ? formError.categoryIdMessage
                    : 'Categoria'
                }
                onChange={(e) => {
                  setProduct({ ...product, categoryId: e.target.value });
                }}
                value={product.categoryId}
                // helperText="Selecciona la categoria"
              >
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
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
              <div className="imageFormLabel">
                <div
                  style={{
                    color: 'grey',
                    width: '25px',
                    height: '25px',
                  }}
                ></div>
                {/* <BsImage
                  style={{
                    color: 'grey',
                    fontSize: '25px',
                  }}
                /> */}
                <label
                  style={{
                    color: 'grey',
                  }}
                  htmlFor="image"
                >
                  {selectedImage ? (
                    <span
                      style={{
                        color: 'green',
                      }}
                    >
                      Foto seleccionada
                    </span>
                  ) : (
                    <span>Actualiza la foto.</span>
                  )}
                </label>
                <Input
                  onChange={handleChangeImage}
                  style={{
                    display: 'none',
                  }}
                  type="file"
                  name="image"
                  id="image"
                  inputProps={{
                    accept: 'image/*',
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: '10px',
                  color: '#888',
                  marginBottom: '8px',
                }}
              >
                Si no cargas ninguna foto se mantendrá la anterior *
              </span>
              {serverError.active && <span>{serverError.message}</span>}

              <Button
                disabled={loading}
                type="submit"
                variant="contained"
                color="primary"
              >
                {loading ? 'Actualizando producto...' : 'Actualizar producto'}
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
