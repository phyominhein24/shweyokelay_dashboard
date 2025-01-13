import { useState } from 'react';
import { Grid, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import DownloadIcon from '@mui/icons-material/Download';
import Menu from '@mui/material/Menu';
import UploadIcon from '@mui/icons-material/Upload';
import { payloadHandler } from '../helpers/handler';

export default function ExportImportButton({ exportExcelData, importData, exportPdfData, exportExcelParamsData, exportPdfParamsData }) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const importSelect = (e) => {
    const result = window.confirm("Are you sure want to inport this datas ?");
        if (result) {
          importData(e.target.files[0])
        } 
  }


  return (
  <Grid container direction="row" spacing={0} sx={{ paddingTop: 1 }}>

    <Grid item sx={{ marginRight: 0.5 }} xs={5} sm={5} md={5} lg={5}>
      <Stack direction="row" spacing={2}>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          variant="outlined"
          startIcon={<DownloadIcon />}
        >
          Export
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={()=>{exportExcelData();handleClose()}}>Excel All Export</MenuItem>
          <MenuItem onClick={()=>{exportExcelParamsData();handleClose()}}>Excel Params Export</MenuItem>
          <MenuItem onClick={()=>{exportPdfData();handleClose()}}>Pdf All Export</MenuItem>
          <MenuItem onClick={()=>{exportPdfParamsData();handleClose()}}>Pdf Params Export</MenuItem>
        </Menu>
      </Stack>
    </Grid>

    <Grid item xs={5} sm={5} md={5} lg={5}>
      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          onClick={() => {
              document.getElementById("file").click();
          }}
          startIcon={<UploadIcon />}
        >
          Import
          <input type="file" id="file" name="file" accept=".xlsx, .xls" hidden onChange={(e)=>importSelect(e)} />
        </Button>
      </Stack>
    </Grid>

  </Grid>
  );
}