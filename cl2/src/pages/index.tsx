import Head from 'next/head';
import { useState, useEffect, useContext } from 'react';
import { WalletContext } from './_app';
import { Question } from '@/types';
import Link from 'next/link';

export default function Home() {
  const { connected, publicKey, connect } = useContext(WalletContext);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch('http://localhost:5000/api/questions');
        if (response.ok) {
          const data = await response.json();
          setQuestions(data);
        } else {
          console.error('Failed to fetch questions');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  return (
    <>
      <Head>
        <title>Solana Code Challenges</title>
        <meta name="description" content="Solve coding challenges and earn on Solana" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <header className="bg-white shadow rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-indigo-700">Solana Code Challenges</h1>
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

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {questions.map((question) => (
                <Link href={`/challenge/${question.id}`} key={question.id}>
                  <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">{question.title}</h2>
                      <span 
                        className={`px-2 py-1 text-xs rounded-full ${
                          question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                          question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {question.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-3">{question.description}</p>
                    <div className="flex justify-end">
                      <span className="text-sm text-indigo-600 hover:text-indigo-800">Solve Challenge →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
