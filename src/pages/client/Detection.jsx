import React, { useState } from 'react';

const staticDetections = [
  {
    word: 'idiot',
    datetime: '2024-06-01 10:32',
    site: 'Facebook',
    url: 'facebook.com/post/123',
    language: 'English',
    type: 'profanity',
  },
  {
    word: 'bobo',
    datetime: '2024-06-01 09:50',
    site: 'Twitter',
    url: 'twitter.com/tweet/456',
    language: 'Tagalog',
    type: 'slur',
  },
  {
    word: 'hate',
    datetime: '2024-05-31 20:15',
    site: 'Reddit',
    url: 'reddit.com/r/test/789',
    language: 'English',
    type: 'sensitive',
  },
  {
    word: 'gago',
    datetime: '2024-05-31 19:40',
    site: 'YouTube',
    url: 'youtube.com/watch?v=abc',
    language: 'Tagalog',
    type: 'profanity',
  },
  {
    word: 'stupid',
    datetime: '2024-05-30 18:05',
    site: 'Facebook',
    url: 'facebook.com/post/999',
    language: 'English',
    type: 'profanity',
  },
  {
    word: 'tanga',
    datetime: '2024-05-30 17:00',
    site: 'Twitter',
    url: 'twitter.com/tweet/888',
    language: 'Tagalog',
    type: 'slur',
  },
  {
    word: 'dumb',
    datetime: '2024-05-29 16:00',
    site: 'Reddit',
    url: 'reddit.com/r/test/777',
    language: 'English',
    type: 'profanity',
  },
  {
    word: 'loko',
    datetime: '2024-05-29 15:00',
    site: 'YouTube',
    url: 'youtube.com/watch?v=def',
    language: 'Tagalog',
    type: 'sensitive',
  },
];

const sites = ['All', ...Array.from(new Set(staticDetections.map(d => d.site)))];
const languages = ['All', ...Array.from(new Set(staticDetections.map(d => d.language)))];
const types = ['All', ...Array.from(new Set(staticDetections.map(d => d.type)))];

export default function Detection() {
  const [search, setSearch] = useState('');
  const [site, setSite] = useState('All');
  const [language, setLanguage] = useState('All');
  const [type, setType] = useState('All');

  // Filter logic
  const filtered = staticDetections.filter(d =>
    (site === 'All' || d.site === site) &&
    (language === 'All' || d.language === language) &&
    (type === 'All' || d.type === type) &&
    (
      d.word.toLowerCase().includes(search.toLowerCase()) ||
      d.url.toLowerCase().includes(search.toLowerCase())
    )
  );

  // Chart data (static for demo)
  const detectionsByDay = [4, 2, 3, 1, 0, 2, 1]; // last 7 days
  const detectionsBySite = [
    { name: 'Facebook', count: 2 },
    { name: 'Twitter', count: 2 },
    { name: 'Reddit', count: 2 },
    { name: 'YouTube', count: 2 },
  ];
  const detectionsByLanguage = [
    { name: 'English', count: 4 },
    { name: 'Tagalog', count: 4 },
  ];
  const detectionsByType = [
    { name: 'profanity', count: 4, color: 'bg-indigo-500' },
    { name: 'slur', count: 2, color: 'bg-rose-500' },
    { name: 'sensitive', count: 2, color: 'bg-yellow-400' },
  ];
  const totalType = detectionsByType.reduce((a, b) => a + b.count, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 py-8 px-2 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-slate-800 text-center">Detections Log & Analytics</h2>
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6 items-center justify-between">
          <input
            type="text"
            placeholder="Search word or URL..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-64 px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <div className="flex gap-2 w-full md:w-auto">
            <select value={site} onChange={e => setSite(e.target.value)} className="px-2 py-2 border border-slate-300 rounded-lg">
              {sites.map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={language} onChange={e => setLanguage(e.target.value)} className="px-2 py-2 border border-slate-300 rounded-lg">
              {languages.map(l => <option key={l}>{l}</option>)}
            </select>
            <select value={type} onChange={e => setType(e.target.value)} className="px-2 py-2 border border-slate-300 rounded-lg">
              {types.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        {/* Log Table */}
        <div className="bg-white rounded-xl shadow p-4 mb-10 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-100">
                <th className="py-2 px-3 font-semibold text-slate-600">Word/Phrase</th>
                <th className="py-2 px-3 font-semibold text-slate-600">Date & Time</th>
                <th className="py-2 px-3 font-semibold text-slate-600">Site</th>
                <th className="py-2 px-3 font-semibold text-slate-600">URL</th>
                <th className="py-2 px-3 font-semibold text-slate-600">Language</th>
                <th className="py-2 px-3 font-semibold text-slate-600">Type</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-6 text-slate-400">No detections found.</td></tr>
              ) : (
                filtered.map((d, idx) => (
                  <tr key={idx} className="border-b last:border-b-0">
                    <td className="py-2 px-3 font-medium">{d.word}</td>
                    <td className="py-2 px-3">{d.datetime}</td>
                    <td className="py-2 px-3">{d.site}</td>
                    <td className="py-2 px-3 text-blue-600 underline"><a href={`https://${d.url}`} target="_blank" rel="noopener noreferrer">{d.url}</a></td>
                    <td className="py-2 px-3">{d.language}</td>
                    <td className="py-2 px-3 capitalize">
                      <span className={
                        d.type === 'profanity' ? 'bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full' :
                        d.type === 'slur' ? 'bg-rose-100 text-rose-700 px-2 py-1 rounded-full' :
                        'bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full'
                      }>{d.type}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Detections by Day (Bar Chart) */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-semibold text-slate-700 mb-4">Detections by Day (Last 7 Days)</div>
            <div className="flex items-end h-32 gap-2">
              {detectionsByDay.map((count, i) => (
                <div key={i} className="flex flex-col items-center w-8">
                  <div className="bg-indigo-500 rounded-t-lg" style={{ height: `${count * 20}px`, width: '100%' }}></div>
                  <span className="text-xs text-slate-500 mt-1">{['S','M','T','W','T','F','S'][i]}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Detections by Site (Horizontal Bar) */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-semibold text-slate-700 mb-4">Detections by Site</div>
            <div className="space-y-3">
              {detectionsBySite.map(site => (
                <div key={site.name} className="flex items-center">
                  <div className="w-24 text-slate-600 font-medium">{site.name}</div>
                  <div className="flex-1 h-3 bg-indigo-100 rounded-full mr-3">
                    <div className="h-3 bg-indigo-500 rounded-full" style={{ width: `${site.count * 20}%` }} />
                  </div>
                  <div className="w-8 text-right text-slate-500 font-semibold">{site.count}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Detections by Language (Horizontal Bar) */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-semibold text-slate-700 mb-4">Detections by Language</div>
            <div className="space-y-3">
              {detectionsByLanguage.map(lang => (
                <div key={lang.name} className="flex items-center">
                  <div className="w-24 text-slate-600 font-medium">{lang.name}</div>
                  <div className="flex-1 h-3 bg-yellow-100 rounded-full mr-3">
                    <div className="h-3 bg-yellow-400 rounded-full" style={{ width: `${lang.count * 25}%` }} />
                  </div>
                  <div className="w-8 text-right text-slate-500 font-semibold">{lang.count}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Detections by Type (Pie Chart) */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="font-semibold text-slate-700 mb-4 self-start">Detections by Type</div>
            {/* CSS Pie Chart */}
            <div className="relative w-32 h-32 mb-4">
              {/* Pie slices using conic-gradient */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(
                    #6366f1 0% ${(detectionsByType[0].count / totalType) * 100}%,
                    #f43f5e ${(detectionsByType[0].count / totalType) * 100}% ${(detectionsByType[0].count / totalType + detectionsByType[1].count / totalType) * 100}%,
                    #facc15 ${(detectionsByType[0].count / totalType + detectionsByType[1].count / totalType) * 100}% 100%
                  )`
                }}
              />
              <div className="absolute inset-4 bg-white rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-lg text-slate-700">{totalType}</div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              {detectionsByType.map(type => (
                <div key={type.name} className="flex items-center gap-2">
                  <span className={`inline-block w-4 h-4 rounded-full ${type.color}`}></span>
                  <span className="capitalize text-slate-700 font-medium">{type.name}</span>
                  <span className="ml-auto text-slate-500 font-semibold">{type.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 