import React from "react";
import './HeaderComponentStyle.css'
import { IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate} from "react-router-dom";

const Header = ({ title, useBackButton = false }) => {
  let navigate = useNavigate();
  if (useBackButton) {
    return (
      <header className="header-container">
        <IconButton aria-label="back" className="iconButton" onClick={() => navigate(-1)}>
          <ArrowBackIcon sx={{ color: '#000000', fontSize:40 }}/>
        </IconButton>
        <h1 className="header-title">{title}</h1>
      </header>
    )
  }
  return (
    <header className="header-main">
      <h1>{title}</h1>
    </header>
  );
};

export default Header;