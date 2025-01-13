import { Paper, Typography, Grid } from '@mui/material';

const AnalyticEcommerce = ({ title, count }) => (
  <Paper elevation={5} sx={{ padding: 2, textAlign: 'center' }}>
    <Typography variant="h6" color="textSecondary" gutterBottom>
      {title}
    </Typography>
    <Typography variant="h4" color="primary">
      {count}
    </Typography>
  </Paper>
);

export default AnalyticEcommerce;