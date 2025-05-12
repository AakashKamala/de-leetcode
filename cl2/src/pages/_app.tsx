
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { PublicKey } from '@solana/web3.js';

import React from 'react';

interface WalletContextType {
  connected: boolean;
  publicKey: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export const WalletContext = React.createContext<WalletContextType>({
  connected: false,
  publicKey: null,
  connect: async () => {},
  disconnect: () => {},
});

export default function App({ Component, pageProps }: AppProps) {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  useEffect(() => {
    const checkWalletConnection = async () => {
      // if (typeof window !== 'undefined' && window.solana && window.solana.isPhantom) {
      if (typeof window !== 'undefined' && window.solana) {
        try {
          const response = await window.solana.connect({ onlyIfTrusted: true });
          setConnected(true);
          setPublicKey(response.publicKey.toString());
        } catch (error) {
        }
      }
    };
    
    checkWalletConnection();
  }, []);

  const connect = async () => {
    // if (typeof window !== 'undefined' && window.solana && window.solana.isPhantom) {
    if (typeof window !== 'undefined' && window.solana) {
      try {
        const response = await window.solana.connect();
        setConnected(true);
        setPublicKey(response.publicKey.toString());
      } catch (error) {
        console.error('Failed to connect to wallet', error);
      }
    } else {
      window.open('https://phantom.app/', '_blank');
    }
  };

  const disconnect = () => {
    if (typeof window !== 'undefined' && window.solana) {
      window.solana.disconnect();
      setConnected(false);
      setPublicKey(null);
    }
  };

  const walletContextValue = {
    connected,
    publicKey,
    connect,
    disconnect,
  };

  return (
    <WalletContext.Provider value={walletContextValue}>
      <Component {...pageProps} />
    </WalletContext.Provider>
  );
}