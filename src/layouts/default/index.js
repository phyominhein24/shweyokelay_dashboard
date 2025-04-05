import { AppBar, Drawer, DrawerHeader, keys } from "../../constants/config";
import {
  Box,
  Collapse,
  Container,
  Divider,
  IconButton,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";
import { getData, removeAllData } from "../../helpers/localstorage";
import { updateMan, updateUser } from "../../shares/shareSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import CloseIcon from "@mui/icons-material/Close";
import CssBaseline from "@mui/material/CssBaseline";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Logout from "@mui/icons-material/Logout";
import LogoutIcon from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Tooltip from "@mui/material/Tooltip";
import { endpoints } from "../../constants/endpoints";
import { getRequest } from "../../helpers/api";
import { items } from "./defaultPaths";
import { paths } from "../../constants/paths";
import { useTheme } from "@emotion/react";
import wavFile from "../../assets/sound/3.wav";

export const DefaultLayout = () => {
  const audioRef = useRef(null);
  audioRef.current = new Audio(wavFile);
  audioRef.current.loop = true;

  const theme = useTheme();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const profileOpen = Boolean(anchorEl);

  const [time, setTime] = useState(new Date());
  const [open, setOpen] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const { user, man, role, permission, startAudio } = useSelector(
    (state) => state.share
  );

  const handleClickOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toogleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const token = getData(keys.API_TOKEN);
  const navigate = useNavigate();

  const logout = async () => {
    removeAllData();
    navigate(paths.adminLogout);
  };

  const getUserData = async () => {
    const result = await getRequest(`${endpoints.profile}`);
    if (result.status === 200) {
      dispatch(updateMan(result.data.user));
    }
  };

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const formattedTime = time.toLocaleTimeString();

  useEffect(() => {
    if (Object.keys(man).length === 0) {
      // getUserData()
    }

    // const data = getData(keys.USER)
    // // if (user.length === undefined) {
    // //     dispatch(updateUser(data));
    // // }
  });

  useEffect(() => {
    const data = getData(keys.USER);
    if (!token) {
      navigate("/auth/login");
    }
    // else if(user?.shop_id === 1){
    //     navigate('/dashboard')
    // }else{
    //     navigate('/counter')
    // }
  }, [token]);

  useEffect(() => {
    if (startAudio) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    } else {
      audioRef.current.pause();
    }
  }, [startAudio]);

  return (
    <>
      {token && (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={open ? handleDrawerClose : handleDrawerOpen}
                edge="start"
                sx={{ mr: 2 }}
              >
                {open ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                {formattedTime}
              </Typography>

              <Tooltip title="Account settings">
                <span>
                  <Typography variant="h6" sx={{ display: "inline" }}>
                    {man?.name}
                  </Typography>
                  <IconButton
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={profileOpen ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={profileOpen ? "true" : undefined}
                  >
                    <Avatar
                      sx={{ width: 32, height: 32 }}
                      src={man?.image ? `${endpoints.image}${man.image}` : null}
                    />
                  </IconButton>
                  <IconButton
                    id="basic-button"
                    size="small"
                    onClick={handleClickOpen}
                  >
                    <MoreVertIcon style={{ color: "white" }} />
                  </IconButton>
                </span>
              </Tooltip>
              <Menu
                id="account-menu"
                open={profileOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <Container>Shwe Yote Lay Express</Container>
            </DrawerHeader>
            <Divider />
            <List sx={{ overflow: "scroll", overflowX: "hidden" }}>
              {items.map((nav, index) => (
                <div key={index}>
                  <ListItemButton
                    onClick={() => {
                      toogleExpand(index);
                      if (nav.url) {
                        navigate(nav.url);
                      }
                    }}
                  >
                    <ListItemIcon>{nav.icon}</ListItemIcon>
                    <ListItemText primary={nav.label} />
                    {nav?.children?.length > 0 &&
                      (expandedIndex === index ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      ))}
                  </ListItemButton>

                  {nav?.children?.length > 0 && (
                    <Collapse
                      in={expandedIndex === index}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {nav.children.map((child, index) => (
                          <ListItemButton
                            onClick={() => {
                              navigate(child.url);
                            }}
                            key={child.key}
                            sx={{ pl: 4 }}
                          >
                            <ListItemIcon>{child.icon}</ListItemIcon>
                            <ListItemText primary={child.label} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </div>
              ))}
              <Divider />
              <ListItemButton onClick={() => navigate(paths.admin)}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText>{man?.name}</ListItemText>
              </ListItemButton>
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </ListItemButton>
            </List>
            <Divider />
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Outlet />
          </Box>
        </Box>
      )}
    </>
  );
};
