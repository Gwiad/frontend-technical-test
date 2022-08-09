import { Grid } from '@mui/material';
import { ReactNode } from 'react';

const PageLayout = ({ children }: { children: ReactNode }) => (
  <Grid item xs={12}>
    <Grid container direction='column' alignItems='center'>
      <Grid item sx={{ width: '100%' }}>
        {children}
      </Grid>
    </Grid>
  </Grid>
);

export default PageLayout;
