import { useCallback, useEffect, useState } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import { Breadcrumb } from '../../../shares/Breadcrumbs';
import AnalyticEcommerce from '../../../shares/AnalyticEcommerce';
import StackBars from '../../../shares/StackBars';
import SkeletonDashboard from '../../../shares/SkeletonDashboard';

export const DashboardList = () => {

  const [isLoading, setIsLoading] = useState(true);

  // Fake data for the dashboard
  const total_data = [
    { name: "Today Ticket Count", count: 0 },
    { name: "Weekly Ticket Count", count: 0 },
    { name: "Monthly Ticket Count", count: 0 },
    { name: "Yearly Ticket Count", count: 0 },
    { name: "Monthly Agent Ticket Count", count: 0 },
  ];

  const chart_data = [
    { name: "Ticket Sales Trend", data: [100, 200, 300, 400, 350, 500, 600] }, // Fake trend data
  ];

  const bestSellerAgents = [
    { rank: 1, name: 'Agent 1', sales: 0 },
    { rank: 2, name: 'Agent 2', sales: 0 },
    { rank: 3, name: 'Agent 3', sales: 0 },
    { rank: 4, name: 'Agent 4', sales: 0 },
    { rank: 5, name: 'Agent 5', sales: 0 },
    { rank: 6, name: 'Agent 6', sales: 0 },
    { rank: 7, name: 'Agent 7', sales: 0 },
    { rank: 8, name: 'Agent 8', sales: 0 },
    { rank: 9, name: 'Agent 9', sales: 0 },
    { rank: 10, name: 'Agent 10', sales: 0 },
  ];

  // Simulate loading data with fake data
  const loadingData = useCallback(() => {
    setIsLoading(false); // Remove loading state after setting data
  }, []);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  return (
    <div>
      <Breadcrumb />
      {isLoading ? <SkeletonDashboard /> : (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>

          {/* Total Count Section */}
          <Grid item xs={12} sx={{ mb: -3.65, mt: 1 }}>
            <Typography sx={{ fontWeight: 'bold' }} variant="h5">Total Count</Typography>
          </Grid>

          {total_data.map((data, index) => (
            <Grid item xs={3} sm={3} md={3} lg={3} key={index}>
              <AnalyticEcommerce title={data.name} count={data.count} />
            </Grid>
          ))}

          {/* Ticket Sales Trend */}
          <Grid item xs={12} sx={{ mb: -3.65, mt: 1 }}>
            <Typography sx={{ fontWeight: 'bold' }} variant="h5">Item List</Typography>
          </Grid>

          {chart_data.map((data, index) => (
            <Grid item xs={12} sm={12} md={12} lg={6} key={index}>
              <Typography variant="h6">{data.name}</Typography>
              <StackBars dataset={data.data} />
            </Grid>
          ))}

          {/* Best Seller Agents Section */}
          <Grid item xs={12} sx={{ mb: -3.65, mt: 1 }}>
            <Typography sx={{ fontWeight: 'bold' }} variant="h5">Top 10 Best Seller Agents</Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              {bestSellerAgents.map((agent, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Typography variant="body1">{`Rank ${agent.rank}: ${agent.name} - ${agent.sales} Sales`}</Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>

        </Grid>
      )}
    </div>
  );
};
