import React, { useState } from "react";
import { Avatar, Modal, Box } from "@mui/material";
import { endpoints } from "../constants/endpoints";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '90%',
  maxHeight: '90%',
  boxShadow: 24,
  outline: 'none',
};

const ScreenshotPreview = ({ value }) => {
  const [open, setOpen] = useState(false);

  const imageUrl = value ? `${endpoints.image}${value}` : null;

  return (
    <>
      <Avatar
        alt="screenshot"
        src={imageUrl}
        sx={{ cursor: "pointer" }}
        onClick={() => setOpen(true)}
      />

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <img
            src={imageUrl}
            alt="screenshot-preview"
            style={{ width: "100%", height: "auto", borderRadius: 8 }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default ScreenshotPreview;
