import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

interface filterCardProps {
    setSortOrder: (order: 'asc' | 'desc') => void;
}

export default function Filter_Card({ setSortOrder }: filterCardProps) {
    const [selectedOrder, setSelectedOrder] = React.useState< 'desc' | null>(null);

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newOrder = event.target.name as 'desc';
    if (selectedOrder === newOrder) {
        setSelectedOrder(null);
        setSortOrder('asc'); 
      } else {
        setSelectedOrder(newOrder);
        setSortOrder(newOrder);
      }
    };

  return (
    <Card variant='outlined' sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Ordem
        </Typography>
      </CardContent>
      <CardActions>
        <FormGroup>
            <FormControlLabel control={<Checkbox name="desc" onChange={handleSortChange} checked={selectedOrder === 'desc'}/>} label="Menor valor" />
        </FormGroup>
      </CardActions>
    </Card>
  );
}