import { AppBar, Avatar, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserProfileImage, logout } from "./firebase";

export default function TopBar({ROUTES}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [profileClicked, setProfileClicked] = useState(false);
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const navigate = useNavigate();

    const handleUserMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setAnchorEl(null);
    };

    const onLogout = async () => {
        await logout();
    };

    const getProfileImageUrl = async () => {
        try {
            fetchUserProfileImage()
                .then((url) => {
                    setProfileImageUrl(url);
                })
        } catch (err) {
            console.error(err);
            alert("An error occurred while fetching user profile image");
        }
    };

    useEffect(() => {
        if (profileClicked) {
            navigate(ROUTES.PROFILE);
        }

        getProfileImageUrl();
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
                    {profileImageUrl ?
                        <Avatar
                            alt="Profile Image"
                            src={profileImageUrl}
                            sx={{width: 40, height: 40}}
                        /> :
                        <AccountCircle/>
                    }
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
                    <MenuItem onClick={onLogout}>Log out</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}