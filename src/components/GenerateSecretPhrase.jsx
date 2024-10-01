import React, { useState } from 'react';

import { CiCircleChevUp } from "react-icons/ci";
import { CiCircleChevDown } from "react-icons/ci";

const GenerateSecretPhrase = ({mnemonic}) => {
  const [isOpen, setIsOpen] = useState(false);
  const mnemonicWords = mnemonic ? mnemonic.split(' '):[];
  console.log(mnemonicWords);
  return (
    <div className='mt-8'>
        <div className='flex justify-between items-center mb-6' onClick={()=> setIsOpen(!isOpen)}>
        <h2 className='flex items-center cursor-pointer text-3xl mb-2 font-semibold' >Your Secret Phrase </h2>
        <div>{isOpen ? <CiCircleChevUp className='w-8 h-8'/> : <CiCircleChevDown className='w-8 h-8'/>}</div>
        </div>
        {
          isOpen && (
            <div className='border border-gray-600 bg-slate-950 p-3 rounded-md'>
              <ol className='grid grid-cols-3 gap-2'>
                {
                  mnemonicWords.map((word,index)=>{
                    return(
                      <li key={index} className='bg-slate-900 text-white p-2 rounded-md'>
                    <span className='font-bold'>{index + 1}.</span> {word}
                  </li>
                    )
                    
                  })
                }
              </ol>
            </div>
          )
        }
       
        </div>
  )
}

export default GenerateSecretPhrase