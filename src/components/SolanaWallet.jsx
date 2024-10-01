import React, { useEffect, useState } from 'react';
import { mnemonicToSeedSync } from 'bip39';
import * as ed25519 from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import nacl from 'tweetnacl';
import { AiOutlineDelete, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const SolanaWallet = ({ mnemonic, walletName, id, onDelete }) => { // Added id as a prop
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [isPrivateKeyVisible, setPrivateKeyVisible] = useState(false); // State for private key visibility
  const derivationPath = `m/44'/501'/0'/${id}'`; // Use the wallet id for the derivation path

  useEffect(() => {
    const generateKeys = async () => {
      try {
        const { key: seed } = ed25519.derivePath(
          derivationPath,
          mnemonicToSeedSync(mnemonic).toString('hex')
        );

        const keyPair = nacl.sign.keyPair.fromSeed(seed);
        const solKeypair = Keypair.fromSeed(seed);

        setPublicKey(solKeypair.publicKey.toBase58());
        setPrivateKey(Buffer.from(keyPair.secretKey).toString('hex'));
      } catch (error) {
        console.log('Error generating keys:', error);
      }
    };
    generateKeys();
  }, [mnemonic, id]); // Include id in the dependency array

  // Toggle private key visibility
  const togglePrivateKeyVisibility = () => {
    setPrivateKeyVisible(!isPrivateKeyVisible);
  };

  return (
    <div className=''>
      <div className='flex justify-between mb-8'>
        <h2 className='text-3xl font-medium'>{walletName}</h2>
        <AiOutlineDelete className='text-red-500 cursor-pointer w-7 h-7' onClick={onDelete} />
      </div>

      <div className='m-2 border border-gray-600 rounded-md py-4 px-4 bg-[hsl(0deg_0%_14.9%_/_50%)]'>
        <div className=''>
          <h2 className='font-semibold text-lg py-2'>Public Key</h2>
          <h3 className='public-key py-3'>{publicKey}</h3>
        </div>
        <div className='flex items-center justify-between'>
          <h2 className='font-semibold text-lg py-2'>Private Key</h2>
          <span onClick={togglePrivateKeyVisibility} className='cursor-pointer'>
            {isPrivateKeyVisible ? <AiOutlineEyeInvisible className='text-gray-500' /> : <AiOutlineEye className='text-gray-500' />}
          </span>
        </div>
        <h3 className='private-key'>{isPrivateKeyVisible ? privateKey : '•••••••••••••••••••••••'}</h3>
      </div>
    </div>
  );
};

export default SolanaWallet;
