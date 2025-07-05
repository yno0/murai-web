import React, { useState } from 'react';

const staticGroup = {
  name: 'MURAi Study Group',
  code: 'ABC123',
  members: [
    {
      name: 'Juan Dela Cruz',
      email: 'juan@email.com',
      role: 'Owner',
      joined: '2024-05-01',
      detections: 12,
      lastActivity: '2024-06-01 10:32',
    },
    {
      name: 'Maria Santos',
      email: 'maria@email.com',
      role: 'Member',
      joined: '2024-05-03',
      detections: 7,
      lastActivity: '2024-05-31 19:40',
    },
    {
      name: 'Pedro Reyes',
      email: 'pedro@email.com',
      role: 'Member',
      joined: '2024-05-10',
      detections: 4,
      lastActivity: '2024-05-30 18:05',
    },
  ],
};

export default function Group() {
  const [inGroup] = useState(true); // static: user is NOT in a group
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 py-8 px-2 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-slate-800 text-center">Group Management</h2>
        {/* Create/Join Group */}
        {!inGroup && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
              <div className="text-2xl font-bold mb-2">Create Group</div>
              <div className="text-slate-500 mb-4 text-center">Start a new group and invite members.</div>
              <button onClick={() => setShowCreate(true)} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">Create</button>
            </div>
            <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
              <div className="text-2xl font-bold mb-2">Join Group</div>
              <div className="text-slate-500 mb-4 text-center">Join an existing group using a code.</div>
              <button onClick={() => setShowJoin(true)} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">Join</button>
            </div>
          </div>
        )}
        {/* Modals (static placeholder) */}
        {showCreate && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
              <div className="text-xl font-bold mb-4">Create Group</div>
              <div className="mb-4">[Static form placeholder]</div>
              <button onClick={() => setShowCreate(false)} className="bg-slate-200 px-4 py-2 rounded-lg">Close</button>
            </div>
          </div>
        )}
        {showJoin && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
              <div className="text-xl font-bold mb-4">Join Group</div>
              <div className="mb-4">[Static form placeholder]</div>
              <button onClick={() => setShowJoin(false)} className="bg-slate-200 px-4 py-2 rounded-lg">Close</button>
            </div>
          </div>
        )}
        {/* Group Info & Members */}
        {inGroup && (
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <div>
                <div className="text-xl font-bold text-indigo-700">{staticGroup.name}</div>
                <div className="text-slate-500">Group Code: <span className="font-mono bg-slate-100 px-2 py-1 rounded">{staticGroup.code}</span></div>
              </div>
              <button className="bg-rose-100 text-rose-700 px-4 py-2 rounded-lg font-semibold hover:bg-rose-200 transition mt-2 md:mt-0">Leave Group</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm mb-6">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="py-2 px-3 font-semibold text-slate-600">Name</th>
                    <th className="py-2 px-3 font-semibold text-slate-600">Email</th>
                    <th className="py-2 px-3 font-semibold text-slate-600">Role</th>
                    <th className="py-2 px-3 font-semibold text-slate-600">Joined</th>
                    <th className="py-2 px-3 font-semibold text-slate-600">Total Detections</th>
                    <th className="py-2 px-3 font-semibold text-slate-600">Last Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {staticGroup.members.map((m, idx) => (
                    <tr key={idx} className="border-b last:border-b-0">
                      <td className="py-2 px-3 font-medium">{m.name}</td>
                      <td className="py-2 px-3">{m.email}</td>
                      <td className="py-2 px-3">
                        <span className={m.role === 'Owner' ? 'bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full' : 'bg-slate-100 text-slate-700 px-2 py-1 rounded-full'}>{m.role}</span>
                      </td>
                      <td className="py-2 px-3">{m.joined}</td>
                      <td className="py-2 px-3 text-center">{m.detections}</td>
                      <td className="py-2 px-3">{m.lastActivity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Analytics summary for group (static) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-indigo-50 rounded-lg p-4 flex flex-col items-center">
                <div className="text-2xl font-bold text-indigo-700">{staticGroup.members.reduce((a, b) => a + b.detections, 0)}</div>
                <div className="text-slate-600">Total Detections</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center">
                <div className="text-2xl font-bold text-green-700">{staticGroup.members.length}</div>
                <div className="text-slate-600">Members</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 flex flex-col items-center">
                <div className="text-2xl font-bold text-yellow-700">{staticGroup.members[0].lastActivity}</div>
                <div className="text-slate-600">Last Activity (Owner)</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 