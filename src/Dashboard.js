import * as React from 'react';
import { useEffect, useState } from "react";

import { auth, fetchUserData } from "./firebase";

import Title from "./Title";
import TopBar from "./TopBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";


export default function Dashboard({ROUTES}) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            console.log("You are logged out");
            navigate(ROUTES.LOGIN);
            return
        }

        if (loading) {
            return;
        }

        const fetchUserName = async () => {
            try {
                const data = await fetchUserData();
                setFirstName(data.firstName);
                setLastName(data.lastName);
            } catch (err) {
                console.error(err);
                alert("An error occurred while fetching user data");
            }
        };
        fetchUserName();
    }, [user, loading]);

    return (
        <>
            <TopBar ROUTES={ROUTES}/>
            <Title>
                Hello, {firstName} {lastName}!
            </Title>
        </>
    );
};