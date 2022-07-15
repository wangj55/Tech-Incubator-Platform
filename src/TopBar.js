import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "./firebase";

export default function TopBar({ROUTES}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [profileClicked, setProfileClicked] = useState(false);
    const navigate = useNavigate();

    const handleUserMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (profileClicked) {
            navigate(ROUTES.PROFILE);
            return;
        }
    }, [profileClicked]);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Tech Incubator Platform
                </Typography>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="user-menu-appbar"
                    aria-haspopup="true"
                    onClick={handleUserMenuOpen}
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <Menu
                    sx={{mt: "45px"}}
                    id="user-menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleUserMenuClose}
                >
                    <MenuItem onClick={() => setProfileClicked(true)}>Profile</MenuItem>
                    <MenuItem onClick={logout}>Log out</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}