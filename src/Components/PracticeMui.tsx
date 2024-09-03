import  { useState } from 'react'
export default function PracticeMui() {
  const fetchStatus = async () => {
    try {
      const response = await fetch('https://todo-backend-theta-one.vercel.app/api/auth/status', {
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  useState(() => {
    console.log('fetching status');
    fetchStatus()
  })
  return (
    <div>PracticeMui</div>
  )
}
