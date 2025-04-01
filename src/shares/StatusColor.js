import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StatusBox = styled(Box)(({ theme, status }) => ({
  display: 'inline-block',
  padding: '3px 6px',
  borderRadius: '20px',
  backgroundColor: getStatusColor(status),
}));

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'success':
      return '#4CAF50'; // Bright green for success
    case 'pending':
      return '#FFC107'; // Warm yellow-orange for pending
    case 'active':
      return '#2196F3'; // Vibrant blue for active
    case 'inactive':
      return '#9E9E9E'; // Neutral grey for inactive
    case 'transfer':
      return '#2196F3';
    case 'added':
      return '#4CAF50'
    default:
      return '#BDBDBD'; // Light grey for unknown/default
  }
};


const StatusColor = ({ value }) => {
  return (
    <StatusBox status={value}>
      <Typography variant="subtitle2">{value}</Typography>
    </StatusBox>
  );
};

export default StatusColor;
