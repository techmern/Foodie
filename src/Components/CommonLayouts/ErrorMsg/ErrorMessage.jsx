import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const ErrorMessage = ({showToast,msg,type}) => {

    const notify = () => {
     
        toast[type](msg,{
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
      }

      useEffect(()=>{
        if(showToast){
            notify()
        }
      },[showToast,msg,type])
  

  return (
    <ToastContainer/>

  )
}
