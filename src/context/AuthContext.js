'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
const endPoint=process.env.API_ENDPOINT

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const token =localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const login = async (email,password) => {
    try{
        const response= await axios.post(`https://furniture-renting-odoo-combat.onrender.com/api/auth/login/`, { "email": email, "password":password });
        const token = response.data.token 
        setUserDetails(response.data.user);
        router.push('/dashboard');
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
        
    } catch(error){
        console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/');
    setIsLoggedIn(false);
  };
   const getToken = () => {
    const token = localStorage.getItem('token');
    return token;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userDetails, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);