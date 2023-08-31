'use client';
import { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { GridAddIcon } from '@mui/x-data-grid';
import { TextField, InputAdornment, Input } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { addProduct } from '../../Services/products.service';
import axios from 'axios';
// import { BsImage } from 'react-icons/bs';
import './addProductForm.css';
import { validateForm } from '../../Validator/ValidateForm';

// process.env.NEXT_PUBLIC_CLOUDINARY_URL ||
const CLOUDINARY_URL: string =
  'https://api.cloudinary.com/v1_1/dm8b2resp/image/upload';

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
    }
  }
}

const style = {
  //TODO - Hacerlo responsive
  width: 250,
  margin: 'auto',
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

export default function AddProductForm() {
  const [open, setOpen] = useState(false);
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
  const [selectedImage, setSelectedImage] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setFormError({
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
    setLoading(false);
    setServerError({ active: false, message: '' });
  }, [open]);
  const handleChangeImage = () => {
    setSelectedImage(true);
    setLoading(false);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
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
            const [key, value] = Object.entries(item)[0];
            obj[key] = value;
            obj[`${key}Message`] = item[`${key}Message`];
            return obj;
          },
          {}
        );
        setLoading(false);
        setFormError(transformedObject);
      }
      if (!validation.error) {
        addProduct(newProduct).then((res) => {
          if (res.response?.data.message) {
            setServerError({
              active: true,
              message: res.response.data.message,
            });
            return;
          }
          setOpen(false);
          setSelectedImage(false);
          setLoading(false);
        });
      }
    });
  };

  return (
    <div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button
          style={{ marginTop: '10px', width: '200%', padding: '10px' }}
          variant="contained"
          onClick={handleOpen}
        >
          <GridAddIcon />
        </Button>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
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
                    width: '10px',
                    height: '10px',
                  }}
                ></div>
                {/* <BsImage
                  style={{
                    color: 'grey',
                    fontSize: '25px',
                  }} 
                />*/}
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
                    <span>Elige una foto</span>
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
              {serverError.active && <span>{serverError.message}</span>}

              <Button
                disabled={loading}
                type="submit"
                variant="contained"
                color="primary"
              >
                {loading ? 'Añadiendo producto...' : ' Añadir producto'}
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
