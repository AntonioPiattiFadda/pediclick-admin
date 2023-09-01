'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import { useMediaQuery } from '@mui/material';

export function GridSkeleton() {
  const isMediumScreen = useMediaQuery('(max-width: 475px)');

  const styles = isMediumScreen
    ? {
        width: 'calc(100% - 80px)',
        '& .MuiSkeleton-root': {
          lineHeight: '5rem',
          marginTop: '-25px',
        },
      }
    : {
        width: '100%',
        '& .MuiSkeleton-root': {
          lineHeight: '5rem',
          marginTop: '-25px',
        },
      };
  return (
    <Box marginTop={'18px'} sx={styles}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
}

export function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', margin: '18px' }}>
      <CircularProgress />
    </Box>
  );
}

export function SimpleBackdrop() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Show backdrop</Button>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
