
import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import { Question, SubmissionResult } from '@/types';
import Head from 'next/head';
import { WalletContext } from '../_app';
import Link from 'next/link';

export default function ChallengePage() {
  const router = useRouter();
  const { id } = router.query;
  const { connected, publicKey, connect } = useContext(WalletContext);
  
  const [question, setQuestion] = useState<Question | null>(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);

  useEffect(() => {
    async function fetchQuestion() {
      if (!id) return;
      
      try {
        const response = await fetch(`http://localhost:5000/api/questions/${id}`);
        if (response.ok) {
          const data = await response.json();
          setQuestion(data);
          setCode(data.starterCode);
        } else {
          console.error('Failed to fetch question');
        }
      } catch (error) {
        console.error('Error fetching question:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestion();
  }, [id]);

  const handleSubmit = async () => {
    if (!connected || !publicKey) {
      alert("Please connect your wallet first!");
      return;
    }

    setSubmitting(true);
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          questionId: Number(id),
          userPublicKey: publicKey,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error submitting solution:', error);
      setResult({
        success: false,
        message: 'Error submitting solution. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700"></div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Question not found</h1>
        <Link href="/" className="text-indigo-600 hover:text-indigo-800">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{question.title} | Solana Code Challenges</title>
      </Head>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <header className="bg-white shadow rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <Link href="/" className="text-indigo-600 hover:text-indigo-800 text-sm mb-2 inline-block">
                  ← Back to challenges
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">{question.title}</h1>
                <span 
                  className={`mt-2 inline-block px-3 py-1 text-xs rounded-full ${
                    question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}
                >
                  {question.difficulty}
                </span>
              </div>
              {!connected ? (
                <button
                  onClick={connect}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Connect Wallet
                </button>
              ) : (
                <div className="text-sm bg-green-100 text-green-800 px-4 py-2 rounded-md">
                  Connected: {publicKey?.slice(0, 6)}...{publicKey?.slice(-4)}
                </div>
              )}
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
              <div className="prose max-w-none">
                <p>{question.description}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Your Solution</h2>
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !connected}
                  className={`px-6 py-2 rounded-md text-white ${
                    submitting || !connected
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {submitting ? 'Submitting...' : 'Submit Solution'}
                </button>
              </div>
              <div className="border border-gray-300 rounded-md overflow-hidden">
                <textarea
                  className="w-full h-96 p-4 font-mono text-sm outline-none resize-none"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={submitting}
                />
              </div>

              {result && (
                <div className={`mt-4 p-4 rounded-md ${
                  result.success ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'
                }`}>
                  <h3 className={`font-medium ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                    {result.success ? '✅ Success!' : '❌ Error'}
                  </h3>
                  <p className="mt-1">{result.message}</p>
                  
                  {result.tx && (
                    <p className="mt-2 text-sm">
                      Transaction ID: 
                      <a 
                        href={`https://explorer.solana.com/tx/${result.tx}?cluster=devnet`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-1 text-indigo-600 hover:text-indigo-800"
                      >
                        {result.tx.slice(0, 12)}...{result.tx.slice(-8)}
                      </a>
                    </p>
                  )}
                  
                  {!result.success && result.output && (
                    <div className="mt-2">
                      <p className="font-medium text-sm">Your Output:</p>
                      <pre className="mt-1 p-2 bg-white border border-red-200 rounded text-xs overflow-x-auto">
                        {result.output}
                      </pre>
                    </div>  
                  )}
                  
                  {!result.success && result.expected && (
                    <div className="mt-2">
                      <p className="font-medium text-sm">Expected Output:</p>
                      <pre className="mt-1 p-2 bg-white border border-red-200 rounded text-xs overflow-x-auto">
                        {result.expected}
                      </pre>
                    </div>  
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}