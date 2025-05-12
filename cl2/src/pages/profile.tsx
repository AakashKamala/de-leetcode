
import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { WalletContext } from './_app';
import { useRouter } from 'next/router';

export default function ProfilePage() {
  const { connected, publicKey, connect } = useContext(WalletContext);
  const router = useRouter();
  const [solvedQuestions, setSolvedQuestions] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!connected) {
      return;
    }


    async function fetchSolvedQuestions() {
      setLoading(true);
      try {

        setSolvedQuestions([1, 3]); 
      } catch (error) {
        console.error('Error fetching solved questions:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSolvedQuestions();
  }, [connected, publicKey]);

  if (!connected) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-6">Connect Your Wallet to View Profile</h1>
        <button
          onClick={connect}
          className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Connect Wallet
        </button>
        <Link href="/" className="mt-4 text-indigo-600 hover:text-indigo-800">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Your Profile | Solana Code Challenges</title>
      </Head>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <header className="bg-white shadow rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <Link href="/" className="text-indigo-600 hover:text-indigo-800 text-sm mb-2 inline-block">
                  ← Back to challenges
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Your Profile</h1>
              </div>
              <div className="text-sm bg-green-100 text-green-800 px-4 py-2 rounded-md">
                Connected: {publicKey?.slice(0, 6)}...{publicKey?.slice(-4)}
              </div>
            </div>
          </header>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Solved Challenges</h2>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-700"></div>
              </div>
            ) : solvedQuestions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {solvedQuestions.map((id) => (
                  <div key={id} className="bg-green-50 border border-green-200 p-4 rounded-md">
                    <div className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      <h3 className="font-medium">
                        {/* In a real app, you would fetch the question title */}
                        {id === 1 ? "Two Sum" : id === 2 ? "Reverse String" : "Fibonacci Number"}
                      </h3>
                    </div>
                    <Link 
                      href={`/challenge/${id}`}
                      className="text-sm text-indigo-600 hover:text-indigo-800 mt-2 inline-block"
                    >
                      View Challenge
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>You haven't solved any challenges yet.</p>
                <Link href="/" className="text-indigo-600 hover:text-indigo-800 mt-2 inline-block">
                  Go solve some challenges!
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}