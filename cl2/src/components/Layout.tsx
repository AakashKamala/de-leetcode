
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContext } from 'react';
import { WalletContext } from '../pages/_app';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { connected, publicKey, connect, disconnect } = useContext(WalletContext);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <nav className="bg-indigo-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-bold">
                CodeOnChain
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link 
                  href="/" 
                  className={`hover:text-indigo-200 ${router.pathname === '/' ? 'font-medium' : ''}`}
                >
                  Challenges
                </Link>
                <Link 
                  href="/leaderboard" 
                  className={`hover:text-indigo-200 ${router.pathname === '/leaderboard' ? 'font-medium' : ''}`}
                >
                  Leaderboard
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {connected ? (
                <>
                  <Link 
                    href="/profile" 
                    className={`hover:text-indigo-200 ${router.pathname === '/profile' ? 'font-medium' : ''}`}
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={disconnect}
                    className="bg-indigo-800 hover:bg-indigo-900 px-4 py-1 rounded-md text-sm"
                  >
                    Disconnect
                  </button>
                  <div className="text-xs bg-indigo-600 px-3 py-1 rounded-md">
                    {publicKey?.slice(0, 4)}...{publicKey?.slice(-4)}
                  </div>
                </>
              ) : (
                <button 
                  onClick={connect}
                  className="bg-indigo-600 hover:bg-indigo-500 px-4 py-1 rounded-md text-sm"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-white py-6 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 text-sm">© {new Date().getFullYear()} CodeOnChain. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-indigo-600 text-sm">Terms</a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 text-sm">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 text-sm">About</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
