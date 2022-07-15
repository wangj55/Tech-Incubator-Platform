import * as React from 'react';
import { auth, logout } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";


export default function Dashboard({loginRoute}) {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            return;
        }
        if (!user) {
            alert("You are logged out");
            navigate(loginRoute);
        }
    }, [user, loading]);

    return (
        <>
            <Button onClick={logout}>
                Log Out
            </Button>
        </>
    );
};