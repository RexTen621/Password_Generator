import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length,setLength]=useState(8);
  const[isNumAllowed,setNumAllowed]=useState(false);
  const[isCharAllowed,setCharAllowed]=useState(false);
  const[Password,setPassword]=useState("")

  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(isNumAllowed) str+='0123456789';
    if(isCharAllowed) str+='!@#$%^&*+=';
   for(let i=0;i<length;i++){
    let x=Math.floor(Math.random()*str.length+1)
    pass+=str.charAt(x);
   }
   setPassword(pass);
  },[length,isCharAllowed,isNumAllowed,setPassword])

  useEffect(()=>{
    passwordGenerator();
  },[length,isCharAllowed,isNumAllowed],passwordGenerator)

  const passRef=useRef()

  const copyToClipboard=useCallback(()=>{
    passRef.current?.select()
    passRef.current?.setSelectionRange(0,10)
    window.navigator.clipboard.writeText(Password);
  },[length,isCharAllowed,isCharAllowed])

  return (
    <>
     
      <div className='bg-gray-600 rounded-xl shadow-md w-full text-blue-200'>
        <h1 className='text-3xl px-10 py-4 text-center text-blue-200'>PassWord Generator</h1>
        <div className='flex px-2 py-3 gap-1'>
          <input type="text"

          value={Password}
          
          placeholder='Password'
          
          className=' bg-slate-900 px-5 rounded-lg w-full shadow-md outline-none '
          ref={passRef}
          readOnly />

          <button className='bg-orange-700 rounded-lg shadow-lg text-gray-50 outline-none' onClick={copyToClipboard}>copy</button>
        </div>
        <div className='flex p-2 py-2 gap-3'>
          <input type="range"   
          min={6}
          max={99}
          value={length}
          className='bg-orange-700'
          onChange={(e)=>{setLength(e.target.value)}}
           />
           <label >Length:{length}</label>
           
           <input type="checkbox"
           value={isNumAllowed}
          onChange={()=>{setNumAllowed((prev)=>!prev)}} />
           <label >Number</label>

           <input type="checkbox"
           value={isCharAllowed}
           onChange={()=>{setCharAllowed((prev)=>!prev)}} />
           <label >Character</label>
        </div>
      </div>
    
    </>
  )
}

export default App
