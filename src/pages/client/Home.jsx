import React, { useState, useEffect } from 'react';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Static data
  const totalDetected = 142;
  const trendToday = 18;
  const trendYesterday = 15;
  const trendUp = trendToday > trendYesterday;
  const topWebsites = [
    { name: 'Facebook', percent: 65 },
    { name: 'Twitter', percent: 20 },
    { name: 'Reddit', percent: 10 },
    { name: 'YouTube', percent: 5 },
  ];
  const topWords = ['idiot', 'stupid', 'hate', 'dumb', 'loser'];
  const falsePositives = 3;
  const falseNegatives = 2;
  const latestActivity = [
    { word: 'idiot', time: '10:32 AM', site: 'Facebook' },
    { word: 'stupid', time: '9:50 AM', site: 'Twitter' },
    { word: 'hate', time: 'Yesterday 8:15 PM', site: 'Reddit' },
    { word: 'dumb', time: 'Yesterday 7:40 PM', site: 'YouTube' },
    { word: 'loser', time: 'Yesterday 6:05 PM', site: 'Facebook' },
  ];
  const [extensionOn, setExtensionOn] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 py-8 px-2 md:px-8">
      <div className="max-w-5xl mx-auto">
        {user && (
          <div className="bg-white rounded-xl shadow p-4 mb-6 text-center">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">
              Welcome back, {user.name || user.email}!
            </h1>
            <p className="text-slate-600">You're successfully logged in and ready to monitor your content.</p>
          </div>
        )}
        <h2 className="text-3xl font-bold mb-8 text-slate-800 text-center">Analytics Summary</h2>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="text-4xl font-extrabold text-indigo-600">{totalDetected}</div>
            <div className="text-slate-500 text-center mt-2">Inappropriate words detected<br className="hidden md:block"/>this week</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="flex items-center text-lg font-semibold">
              <span className={trendUp ? 'text-green-600' : 'text-red-600'}>
                {trendUp ? '▲' : '▼'} {Math.abs(trendToday - trendYesterday)}
              </span>
              <span className="ml-2 text-slate-500 font-normal">Today vs Yesterday</span>
            </div>
            <div className="text-slate-400 text-sm mt-1">Today: {trendToday} | Yesterday: {trendYesterday}</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="font-semibold text-slate-700">False Positives</div>
            <div className="text-2xl font-bold text-orange-500">{falsePositives}</div>
            <div className="font-semibold text-slate-700 mt-2">False Negatives</div>
            <div className="text-2xl font-bold text-rose-500">{falseNegatives}</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
            <div className="font-semibold text-slate-700 mb-2">Extension</div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={extensionOn} onChange={() => setExtensionOn(v => !v)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-400 rounded-full peer peer-checked:bg-indigo-600 transition-all"></div>
              <span className="ml-3 text-sm font-medium text-slate-700">{extensionOn ? 'On' : 'Off'}</span>
            </label>
          </div>
        </div>

        {/* Top Websites */}
        <div className="bg-white rounded-xl shadow p-6 mb-8 max-w-xl mx-auto">
          <div className="font-semibold text-slate-700 mb-4">Top Websites</div>
          <div className="space-y-3">
            {topWebsites.map(site => (
              <div key={site.name} className="flex items-center">
                <div className="w-24 text-slate-600 font-medium">{site.name}</div>
                <div className="flex-1 h-3 bg-indigo-100 rounded-full mr-3">
                  <div className="h-3 bg-indigo-500 rounded-full" style={{ width: `${site.percent}%` }} />
                </div>
                <div className="w-10 text-right text-slate-500 font-semibold">{site.percent}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Flagged Words */}
        <div className="bg-white rounded-xl shadow p-6 mb-8 max-w-xl mx-auto">
          <div className="font-semibold text-slate-700 mb-4">Top Flagged Words</div>
          <div className="flex flex-wrap gap-3">
            {topWords.map(word => (
              <span key={word} className="bg-rose-100 text-rose-700 px-4 py-1 rounded-full font-semibold text-base shadow-sm">
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Latest Activity */}
        <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto">
          <div className="font-semibold text-slate-700 mb-4">Latest Activity</div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="py-2 px-3 font-semibold text-slate-600">Word</th>
                  <th className="py-2 px-3 font-semibold text-slate-600">Time</th>
                  <th className="py-2 px-3 font-semibold text-slate-600">Site</th>
                </tr>
              </thead>
              <tbody>
                {latestActivity.map((item, idx) => (
                  <tr key={idx} className="border-b last:border-b-0">
                    <td className="py-2 px-3">{item.word}</td>
                    <td className="py-2 px-3">{item.time}</td>
                    <td className="py-2 px-3">{item.site}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 