import { useState, useEffect } from 'react';
import { generateMnemonic } from 'bip39';
import Navbar from './components/Navbar';
import GenerateSecretPhrase from './components/GenerateSecretPhrase';
import SolanaWallet from './components/SolanaWallet';

function App() {
  const [mnemonic, setMnemonic] = useState('');
  const [wallets, setWallets] = useState([]);

  // Load wallets from localStorage on mount
  useEffect(() => {
    const savedWallets = JSON.parse(localStorage.getItem('wallets')) || [];
    setWallets(savedWallets);
  }, []);

  // Save wallets to localStorage whenever the wallets state changes
  useEffect(() => {
    localStorage.setItem('wallets', JSON.stringify(wallets));
  }, [wallets]);

  // Generate a new mnemonic and add a new wallet
  const handleGenerateMnemonic = async () => {
    const mn = await generateMnemonic();
    const newWallet = {
      id: wallets.length + 1, // Unique ID based on wallet count
      mnemonic: mn,
    };
    setMnemonic(mn);
    setWallets([...wallets, newWallet]); // Add new wallet to the list
  };

  // Clear all wallets
  const clearWallets = () => {
    setWallets([]);
    localStorage.removeItem('wallets'); // Clear wallets from localStorage
  };

  // Delete a specific wallet
  const handleDeleteWallet = (id) => {
    const updatedWallets = wallets.filter(wallet => wallet.id !== id);
    setWallets(updatedWallets);
  };

  // Add a new wallet from the existing mnemonic
  const handleAddWalletFromMnemonic = () => {
    if (!mnemonic) return; // Don't add if there's no mnemonic
    const newWallet = {
      id: wallets.length + 1, // Increment ID for uniqueness
      mnemonic: mnemonic, // Use the existing mnemonic
    };
    setWallets([...wallets, newWallet]); // Add new wallet to the list
  };

  return (
    <>
      <Navbar />
      <div className='m-7'>
        <h1 className='text-4xl font-semibold mb-1'>Secret Recovery Phrase</h1>
        <h2 className='text-lg text-slate-300 font-semibold'>
          Save these words in a safe place.
        </h2>

        <div className='mt-5 flex items-center justify-center gap-4'>
          <input
            type='text'
            placeholder='Enter your secret phrase (or leave blank to generate)'
            value={mnemonic} // Bind the input to mnemonic state
            onChange={(e) => setMnemonic(e.target.value)} // Update mnemonic on input change
            className='bg-slate-950 placeholder-white w-full rounded-md border border-gray-600 text-sm py-2 px-3 placeholder-slate-300 font-light'
          />
          <button
            onClick={handleGenerateMnemonic}
            className='bg-slate-200 text-black py-2 px-3 rounded-md font-mono text-sm'
          >
            Generate
          </button>
        </div>

        {mnemonic && <GenerateSecretPhrase mnemonic={mnemonic} />}

        {/* Render all wallets */}
        {wallets.map((wallet) => (
          <SolanaWallet
            key={wallet.id}
            id={wallet.id}
            mnemonic={wallet.mnemonic}
            walletName={`Wallet ${wallet.id}`}
            onDelete={() => handleDeleteWallet(wallet.id)}
          />
        ))}

        <div className='flex items-center justify-between mt-4'>
          {wallets.length>0 && <button
            onClick={handleAddWalletFromMnemonic}
            className='bg-slate-200 text-black py-2 px-4 rounded-md font-mono text-sm'
          >
            Add Wallet
          </button>}

          {wallets.length > 0 && (
            <button
              onClick={clearWallets}
              className='bg-red-500 text-white px-3 py-2 rounded-md'
            >
              Clear All Wallets
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
