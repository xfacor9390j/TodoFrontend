
import { Button } from '@mui/material';

import React from 'react'

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      const response = await fetch('https://todo-backend-theta-one.vercel.app/api/auth/logout', {
        method: 'GET',
        credentials: 'include', 
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Logout failed: ${errorText}`);
      }

      console.log('User logged out successfully');
      // Redirect to login page or update the UI accordingly
      window.location.href = 'http://localhost:5173/'; 
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error logging out:', error.message);
      } else {
        console.error('Unknown error occurred:', error);
      }
    }
  };
  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Logout
    </Button>
  )
}




