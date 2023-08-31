import Joi from 'joi';
import { AddProduct, UpdateProduct } from '../Types/Types';

const productSchema = Joi.object({
  name: Joi.string().min(3).max(15),
  price: Joi.number().integer().min(10),
  description: Joi.string().min(10),
  // image: Joi.string().uri(),
  image: Joi.string()
    .regex(/\.(jpg|jpeg|png|gif)$/i)
    .error(
      new Error(
        'El campo "image" debe ser una imagen válida con una extensión jpg, jpeg, png o gif.'
      )
    ),
  categoryId: Joi.number().integer().min(1),
  blocked: Joi.boolean(),
});

export const validateForm = (data: AddProduct) => {
  const validationResult = productSchema.validate(data, { abortEarly: false });

  if (validationResult.error) {
    const errors = validationResult.error.details.map((error: any) => {
      return {
        [error.context.key]: true,
        [error.context.key + 'Message']: error.message,
      };
    });

    return {
      error: true,
      message: 'Validation Error',
      errors: errors,
    };
  }

  return {
    error: false,
    message: 'Validation Successful',
    data: validationResult.value,
  };
};

export const validateFormPriceAndStock = (data: UpdateProduct) => {
  const validationResult = productSchema.validate(data, { abortEarly: false });

  if (validationResult.error) {
    const errors = validationResult.error.details.map((error: any) => {
      return {
        [error.context.key]: true,
        [error.context.key + 'Message']: error.message,
      };
    });

    return {
      error: true,
      message: 'Validation Error',
      errors: errors,
    };
  }

  return {
    error: false,
    message: 'Validation Successful',
    data: validationResult.value,
  };
};
