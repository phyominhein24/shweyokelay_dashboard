import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const valueFormatter = (value) => `${value}`;

const chartSetting = {
  yAxis: [{ label: 'count' }],
  series: [{ dataKey: 'count', label: 'Count', valueFormatter }],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

export default function StackBars({dataset}) {
  return (
    <div style={{ width: '100%' }}>
      <BarChart
        dataset={dataset}
        xAxis={[
          { scaleType: 'band', dataKey: 'name', tickPlacement: 'middle', tickLabelPlacement: 'middle' },
        ]}
        {...chartSetting}
      />
    </div>
  );
}