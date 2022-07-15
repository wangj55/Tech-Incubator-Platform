import * as React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth, db} from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth";

import Title from "./Title";
import TopBar from "./TopBar";


export default function Dashboard({ROUTES}) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setFirstName(data.firstName);
            setLastName(data.lastName);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };



    useEffect(() => {
        if (!user) {
            alert("You are logged out");
            navigate(ROUTES.LOGIN);
            return
        }
        if (loading) {
            return;
        }
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