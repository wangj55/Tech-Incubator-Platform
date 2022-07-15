import { useEffect, useState } from "react";

import { auth, setUserProfileImage } from "./firebase";
import TopBar from "./TopBar";
import Title from "./Title";

import { Avatar, Button, Input } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";


export default function Profile({ROUTES}) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const uploadImage = async () => {
        await setUserProfileImage(selectedImage);
    };

    useEffect(() => {
        if (!user) {
            console.log("You are logged out");
            navigate(ROUTES.LOGIN);
            return
        }

        if (loading) {
            return;
        }
    });

    return (
        <>
            <TopBar/>
            <Title>
                This is your profile
            </Title>
            <Input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files[0])}
                multiple={false}
            />
            {selectedImage && (
                <>
                    <Avatar
                        alt="Selected Image"
                        src={URL.createObjectURL(selectedImage)}
                        sx={{width: 200, height: 200}}
                    />
                    <Button
                        variant="contained"
                        onClick={uploadImage}>
                        Upload
                    </Button>
                </>
            )}
        </>
    );
}