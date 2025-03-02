import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import db from '../config/Config';
import { Input, Spin } from 'antd';
function Authentication() {
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState("")
    const [passcode,setPasscode]=useState("")
   const [message,setMessage]=useState("")
     
  
   


 const handlesubmit=async(e)=>{
e.preventDefault()

setLoading(true)
try {
  const Password = collection(db, "dataProtected");
  const snapshot = await getDocs(Password);
  const adminpass = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  
  const password = adminpass[0]?.Password
 if(passcode===password){
   setMessage("Welcome Admin")
   localStorage.setItem("adminpassword",password)
   setLoading(false)}
   else{
    
    setError("Invalid Passcode")
    setLoading(false)
 
   }
} catch (err) {
  setError("Failed to fetch data: " + err.message);
} finally {
  setLoading(false);
}

window.location.reload();

 }

  return (

    <div  className='absolute z-30 left-[25%]'> <div className='flex justify-center items-center h-screen'>
    <div className='bg-gray-200 w-[600px]  rounded-lg shadow-lg p-8 m-4 '>
  
  
    {loading ? <div className='flex justify-center items-center'><Spin/></div>:<>
     <div>
      <h2 className='flex text-2xl font-medium justify-center'>
        {message ? <div className='text-green-500'>{message}</div> : error ? <div className='text-red-500'>{error}</div> : "Enter The PassWord"}
      </h2>
     </div>
  
     <div className='flex justify-center items-center mt-5'>
      <form onSubmit={(e)=>handlesubmit(e)}>
                <Input type='text'name='passcode' onChange={(e)=>setPasscode(e.target.value)} placeholder='Enter your Passcode ...' style={{"backgroundColor":"none", "width":'400px',"padding":"15px",border:"1px solid black"}}/>
      </form>
     </div>
     </>}
     
  
    
     
   
    
    </div>
  
  
  
   
         
      </div></div>
  
  )
}

export default Authentication