import React from 'react'
import { SiSolana } from "react-icons/si";
const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-8 mb-4'>
      <div className='flex items-center'><SiSolana className='mr-3 w-6 h-6' color='white'/>
      <span className='text-2xl font-mono'>Solana Wallet</span>
      </div>

      <div className='font-light text-2xl'>Nithin Kshetriya</div>
      
    </div>
  )
}

export default Navbar