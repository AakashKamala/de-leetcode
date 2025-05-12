
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface LeaderboardEntry {
  publicKey: string;
  solvedCount: number;
  rank: number;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      setLoading(true);
      try {

        setLeaderboard([
          { publicKey: "8xKzukmd4WhFKGa1e9EvBSLGNx9dXzFxT5UNiXXQCbjs", solvedCount: 3, rank: 1 },
          { publicKey: "GWvnAaFJdYP6UJmZBNqJKVPsD9yYZB5RsXQXXDJiPbvE", solvedCount: 2, rank: 2 },
          { publicKey: "2xZjKvxjJqJRmvWWbv6qV9PZ5KQW6i16qGDDAkybWZpN", solvedCount: 2, rank: 3 },
          { publicKey: "9pGJ5eHU6KnEMJSU3VPbhjQtwT9kwNXLbRZ7m8TgbVx5", solvedCount: 1, rank: 4 },
        ]);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, []);

  return (
    <>
      <Head>
        <title>Leaderboard | Solana Code Challenges</title>
      </Head>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <header className="bg-white shadow rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <Link href="/" className="text-indigo-600 hover:text-indigo-800 text-sm mb-2 inline-block">
                  ← Back to challenges
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Leaderboard</h1>
              </div>
            </div>
          </header>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700"></div>
              </div>
            ) : (
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Problems Solved</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaderboard.map((entry) => (
                    <tr key={entry.publicKey} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`flex items-center justify-center h-6 w-6 rounded-full text-xs font-medium ${
                            entry.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                            entry.rank === 2 ? 'bg-gray-200 text-gray-800' :
                            entry.rank === 3 ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {entry.rank}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {entry.publicKey.slice(0, 4)}...{entry.publicKey.slice(-4)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {entry.solvedCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}