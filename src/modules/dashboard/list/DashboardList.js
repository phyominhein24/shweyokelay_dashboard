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
  const [params, setParams] = useState({});
  const [agents, setAgents] = useState([]);

  const dispatch = useDispatch();

  const loadingData = useCallback(async () => {
    try {
      setIsLoading(true);

      const result = await dashboardService.index(dispatch, params);
      if (result.status === 200) {
        setTotalData([
          { name: "Today Ticket Count", count: result?.data.today || 0 },
          { name: "Weekly Ticket Count", count: result?.data.week || 0 },
          { name: "Monthly Ticket Count", count: result?.data.month || 0 },
          { name: "Yearly Ticket Count", count: result?.data.year || 0 },
          { name: "Monthly Agent Ticket Count", count: 0 } // update later if needed
        ]);

        setChartData([
          {
            name: "Ticket Sales Trend",
            data: Object.values(result?.data.trend || {})
          }
        ]);
      }

      const result2 = await dashboardService.topAgent(dispatch, params);
      if (result2.status === 200) {
        const formattedAgents = result2.data.map((agent, index) => ({
          rank: index + 1,
          name: agent.name,
          sales: agent.total_sales,
        }));
        setAgents(formattedAgents);
      }

    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, params]);

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

          {/* Best Seller Agents Section */}
          <Grid item xs={12} sx={{ mb: -3.65, mt: 1 }}>
            <Typography sx={{ fontWeight: 'bold' }} variant="h5">Top 10 Best Seller Agents</Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              {agents?.map((agent, index) => (
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
