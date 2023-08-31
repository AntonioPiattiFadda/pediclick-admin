// const API = process.env.NEXT_PUBLIC_API_URL;
const API = 'https://web-production-deee.up.railway.app';
// const VERSION = process.env.NEXT_PUBLIC_API_VERSION;
const VERSION = 'v1';

const endPoints = {
  //NOTE - Controlar porque no me fije bien como esta armada la base de datos
  auth: {
    login: `${API}/api/${VERSION}/auth/login`,
    profile: `${API}/api/${VERSION}/auth/profile`,
  },
  products: {
    getProduct: (id: number) => `${API}/api/${VERSION}/products/${id}`,
    getAllProduct: `${API}/api/${VERSION}/products`,
    getProducts: (limit: number, offset: number) =>
      `${API}/api/${VERSION}/products?limit=${limit}&offset=${offset}`,
    addProducts: `${API}/api/${VERSION}/products`,
    updateProducts: (id: number) => `${API}/api/${VERSION}/products/${id}`,
    deleteProduct: (id: number) => `${API}/api/${VERSION}/products/${id}`,
  },
  categories: {
    getCategoriesList: `${API}/api/${VERSION}/categories/`,
    addCategory: `${API}/api/${VERSION}/categories/`,
    getCategoryItems: (id: number) =>
      `${API}/api/${VERSION}/categories/${id}/products/`,
    updateCategory: (id: number) => `${API}/api/${VERSION}/categories/${id}/`,
  },
  files: {
    addImage: `${API}/api/${VERSION}/files/upload/`,
  },
};

export default endPoints;
