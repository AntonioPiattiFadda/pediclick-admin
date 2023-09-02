import './dataTableCat.scss';
import { deleteProduct } from '../../Services/products.service';
import { useState } from 'react';
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridDeleteIcon,
} from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import UpdatePriceAndStockForm from '../Forms/UpdatePriceAndStock';
import UpdateFormProducts from '../Forms/UpdateFormProducts';
import { GridSkeleton } from '../../Utils/Skeletons';

type Row = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  category: number;
  blocked: boolean;
};

type Props = {
  columns: GridColDef[];
  rows: Row[];
  slug: string;
};

const DataTableCat = (props: Props) => {
  //TODO -  - Llevar el columns al componente products
  const columns: GridColDef[] = [
    {
      field: 'image',
      headerName: 'Image',
      minWidth: 115,
      renderCell: (params) => (
        <div
          style={{
            width: 50,
            height: 50,
            display: 'grid',
            placeContent: 'center',
          }}
        >
          <img
            width={50}
            height={50}
            src={params.value}
            alt="Product"
            style={{
              width: '45px',
              height: '45px',
              objectFit: 'cover',
              borderRadius: '10%',
            }}
          />
        </div>
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 130,
    },
    {
      field: 'products',
      headerName: 'Nro de productos',
      minWidth: 130,
    },

    {
      field: 'eliminate',
      headerName: 'Eliminar',
      width: 120,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="Delete"
            onClick={() => handleDeleteProduct(params.row.id)}
          >
            <GridDeleteIcon />
          </IconButton>
        </>
      ),
    },
    {
      field: 'edit',
      headerName: 'Editar',
      width: 110,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="Edit"
            onClick={() => handleUpdateProduct(params.row.id)}
          >
            <img
              style={{
                width: '20px',
                height: '20px',
              }}
              src="/view.svg"
              alt=""
            />
          </IconButton>
        </>
      ),
    },
  ];
  const [updateModal, setUpdateModal] = useState({ active: false, id: 0 });
  const [updatePriceAndStockModal, setUpdatePriceAndStockModal] = useState({
    active: false,
    id: 0,
  });

  const handleDeleteProduct = (id: number) => {
    try {
      deleteProduct(id);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateProduct = (id: number) => {
    setUpdateModal({
      active: true,
      id: id,
    });
  };
  if (props.rows[0] && props.rows[0].image === 'ejemplo') {
    return <GridSkeleton />;
  }
  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...columns]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        // checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
      {updateModal && (
        <UpdateFormProducts
          updateModal={updateModal}
          setUpdateModal={setUpdateModal}
        />
      )}
      <UpdatePriceAndStockForm
        updatePriceAndStockModal={updatePriceAndStockModal}
        setUpdatePriceAndStockModal={setUpdatePriceAndStockModal}
      />
    </div>
  );
};

export default DataTableCat;
