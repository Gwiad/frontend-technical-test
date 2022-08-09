import type { FC } from 'react';
import ConversationList from '../components/ConversationList';
import { Grid } from '@mui/material';

const Home: FC = () => {
  return (
    <Grid container justifyContent='center' sx={{ height: '100vh' }}>
      <Grid item xs={12} sm={8} sx={{ padding: '10px' }}>
        <ConversationList />
      </Grid>
    </Grid>
  );
};

export default Home;
