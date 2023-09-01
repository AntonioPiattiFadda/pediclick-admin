import './Products.scss';
import DataTable from '../../components/dataTable/DataTable';
import { GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { getProducts } from '../../Services/products.service';
import { AddProductForm } from '../../components/Forms/AddProductForm';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'img',
    headerName: 'Image',
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || '/noavatar.png'} alt="" />;
    },
  },
  {
    field: 'title',
    type: 'string',
    headerName: 'Title',
    width: 250,
  },
  {
    field: 'color',
    type: 'string',
    headerName: 'Color',
    width: 150,
  },
  {
    field: 'price',
    type: 'string',
    headerName: 'Price',
    width: 200,
  },
  {
    field: 'producer',
    headerName: 'Producer',
    type: 'string',
    width: 200,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 200,
    type: 'string',
  },
  {
    field: 'inStock',
    headerName: 'In Stock',
    width: 150,
    type: 'boolean',
  },
];

const Products = () => {
  const [rows, setRows] = useState([
    {
      id: 0,
      name: 'ejemplo',
      image: 'ejemplo',
      description: 'Descripcion de ejemplo',
      price: 0,
      category: 1,
      blocked: false,
    },
  ]);

  useEffect(() => {
    getProducts().then((res) => {
      //NOTE - deje los product como any
      const mappedProducts = res.map((product: any) => {
        return {
          id: product.id,
          name: product.name,
          image: product.image,
          description: product.description,
          price: product.price,
          category: product.category.name,
          blocked: product.blocked,
        };
      });

      setRows(mappedProducts);
    });
  }, [rows]);
  // TEST THE API

  // const { isLoading, data } = useQuery({
  //   queryKey: ["allproducts"],
  //   queryFn: () =>
  //     fetch("http://localhost:8800/api/products").then(
  //       (res) => res.json()
  //     ),
  // });

  return (
    <div className="products">
      <div className="info">
        <h1>Productos</h1>
        <AddProductForm />
      </div>
      <DataTable slug="products" columns={columns} rows={rows} />
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="products" columns={columns} rows={data} />
      )} */}
    </div>
  );
};

export default Products;
