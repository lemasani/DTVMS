// src/hooks/useAuth.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userData = sessionStorage.getItem('userData');
        if (!userData) {
            navigate('/');
        }
    }, [navigate]);
};