import { Navigate,Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";


import React from 'react'

const PrivateRoute = ({element:Element, ...rest}) => {
    const [auth,setAuth]= useState(false);
    useEffect(()=>{
        const session = supabase.auth.session();
        setAuth(!!session);
        supabase.auth.onAuthStateChange((_event, session)=>{
            setAuth(!!session);

        });
    },[]);
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute
