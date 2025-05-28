import React, { useState } from 'react';
import WalletConnectButton from './components/WalletConnectButton';
import CriminalRecordSystem from './components/CriminalRecordSystem'; 
import Navbar from './components/Navbar';
const App = () => {
  const [account, setAccount] = useState(null);

  return (<>
      <Navbar />
    <div className="bg-[#111827] text-white min-h-screen">
      {!account ? (
        <WalletConnectButton onConnect={setAccount} />
      ) : (
        <CriminalRecordSystem userAddress={account} />
      )}
    </div>
      </>
  );
};

export default App;
