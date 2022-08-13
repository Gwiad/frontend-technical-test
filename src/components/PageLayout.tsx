import { Grid, Typography } from '@mui/material';
import { ReactNode } from 'react';

const PageLayout = ({
  children,
  dataTitle,
  dataStatus = 'success',
}: {
  children?: ReactNode;
  dataTitle?: string;
  dataStatus?: 'error' | 'loading' | 'empty' | 'success';
}) => (
  <>
    {dataStatus === 'error' && (
      <Typography variant='h6'>Could not load {dataTitle}...</Typography>
    )}{' '}
    {dataStatus === 'loading' && (
      <Typography variant='h6'>Loading {dataTitle}...</Typography>
    )}
    {dataStatus === 'empty' && (
      <Typography variant='h6'>No {dataTitle} found...</Typography>
    )}
    {dataStatus === 'success' && (
      <Grid item xs={12}>
        <Grid container direction='column' alignItems='center'>
          <Grid item sx={{ width: '100%' }}>
            {children}
          </Grid>
        </Grid>
      </Grid>
    )}
  </>
);

export default PageLayout;
