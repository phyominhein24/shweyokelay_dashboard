import { useCallback, useEffect, useState } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import { Breadcrumb } from '../../../shares/Breadcrumbs';
import AnalyticEcommerce from '../../../shares/AnalyticEcommerce';
import StackBars from '../../../shares/StackBars';
import SkeletonDashboard from '../../../shares/SkeletonDashboard';
import { dashboardService } from '../dashboardService';
import { useDispatch } from 'react-redux';

export const DashboardList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [totalData, setTotalData] = useState([
    { name: "Today Ticket Count", count: 0 },
    { name: "Weekly Ticket Count", count: 0 },
    { name: "Monthly Ticket Count", count: 0 },
    { name: "Yearly Ticket Count", count: 0 },
    { name: "Monthly Agent Ticket Count", count: 0 },
  ]);
  const [params, setParams] = useState({})

  const dispatch = useDispatch();

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

  const loadingData = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await dashboardService.index(dispatch, params);
      if (result.status === 200) {
        setTotalData([
          { name: "Today Ticket Count", count: result?.data.today },
          { name: "Weekly Ticket Count", count: result?.data.week },
          { name: "Monthly Ticket Count", count: result?.data.month },
          { name: "Yearly Ticket Count", count: result?.data.year },
          { name: "Monthly Agent Ticket Count", count: 0 }
        ]);
      }
      setIsLoading(false);
      setChartData([
        { name: "Ticket Sales Trend", data: Object.values(result?.data.trend) },
      ]);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  return (
    <div>
      <Breadcrumb />

      {isLoading ? (
        <SkeletonDashboard />
      ) : (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
          {/* Total Count Header */}
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: 'bold' }} variant="h5">Total Count</Typography>
          </Grid>

          {/* Total Count Cards */}
          {totalData.map((data, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <AnalyticEcommerce title={data.name} count={data.count} />
            </Grid>
          ))}

          {/* Chart Header */}
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: 'bold' }} variant="h5">Ticket Sales Trend</Typography>
          </Grid>

          {/* Chart Section */}
          {chartData.map((data, index) => (
            <Grid item xs={12} sm={12} md={12} lg={6} key={index}>
              <Typography variant="h6">{data.name}</Typography>
              <StackBars dataset={data.data} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};
