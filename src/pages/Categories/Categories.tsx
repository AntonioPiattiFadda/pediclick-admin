import './Categories.scss';
import DataTableCat from '../../components/dataTableCat/DataTableCat';
import { GridColDef, GridAddIcon } from '@mui/x-data-grid';

import { useState, useEffect } from 'react';
import { getProducts } from '../../Services/products.service';
import { Button } from '@mui/material';

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

const Categories = () => {
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

  const handleOpen = () => {
    alert('ingresa la categoria');
  };

  return (
    <div className="products">
      <div className="info">
        <h1>Categorias</h1>
        <Button
          style={{
            maxWidth: '44px',
            marginTop: '10px',
            width: '200%',
            padding: '10px',
          }}
          variant="contained"
          onClick={handleOpen}
        >
          <GridAddIcon />
        </Button>
      </div>
      <DataTableCat slug="products" columns={columns} rows={rows} />
    </div>
  );
};

export default Categories;
