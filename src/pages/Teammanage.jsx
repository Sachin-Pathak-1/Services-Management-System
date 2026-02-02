export default  function TeamManage ()  {
    
  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 m-0">Team Manage</h1>
          <p className="mt-1 text-slate-500">You can add and remove team member as you want.</p>
        </div>
        <button className="bg-green-500 text-white border-none px-4.5 py-3 rounded font-medium cursor-pointer hover:bg-green-600">Invite New Member</button>
      </div>

      <div className="bg-white rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50">
              <th className="text-left text-xs tracking-widest text-slate-400 p-4">TEAM MEMBER</th>
              <th className="text-left text-xs tracking-widest text-slate-400 p-4">PERMISSION</th>
              <th className="text-left text-xs tracking-widest text-slate-400 p-4">ROLE</th>
              <th className="text-left text-xs tracking-widest text-slate-400 p-4">ACTION</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-semibold text-white">AB</div>
                  <div>
                    <h4 className="m-0 text-sm text-slate-900">Abu Bin Ishtiyak</h4>
                    <span className="text-xs text-slate-500">info@softnio.com</span>
                  </div>
                </div>
              </td>
              <td className="text-slate-700 p-4.5 border-t border-gray-200 align-middle">Owner</td>
              <td className="p-4.5 border-t border-gray-200 align-middle">All</td>
              <td className="text-right p-4.5 border-t border-gray-200 align-middle">
                <span className="text-blue-900 mr-3 cursor-pointer hover:underline">Edit</span>
                <span className="text-red-500 cursor-pointer hover:underline">Remove</span>
              </td>
            </tr>

            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-semibold text-white">Kw</div>
                  <div>
                    <h4 className="m-0 text-sm text-slate-900">mark kiefer watson</h4>
                    <span className="text-xs text-slate-500">markkieferwatson@gmail.com</span>
                  </div>
                </div>
              </td>
              <td className="text-slate-700 p-4.5 border-t border-gray-200 align-middle">Member</td>
              <td className="p-4.5 border-t border-gray-200 align-middle">
                <select className="px-3 py-2 rounded border border-indigo-200 bg-white text-slate-700">
                  <option>Super Admin</option>
                  <option>Admin</option>
                  <option>Manager</option>
                </select>
              </td>
              <td className="text-right p-4.5 border-t border-gray-200 align-middle">
                <span className="text-blue-900 mr-3 cursor-pointer hover:underline">Edit</span>
                <span className="text-red-500 cursor-pointer hover:underline">Remove</span>
              </td>
            </tr>

            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center font-semibold text-white">SB</div>
                  <div>
                    <h4 className="m-0 text-sm text-slate-900">Stephen Barber</h4>
                    <span className="text-xs text-slate-500">stephenbarber@gmail.com</span>
                  </div>
                </div>
              </td>
              <td className="text-slate-700 p-4.5 border-t border-gray-200 align-middle">Member</td>
              <td className="p-4.5 border-t border-gray-200 align-middle">
                <select className="px-3 py-2 rounded border border-indigo-200 bg-white text-slate-700">
                  <option>Super Admin</option>
                  <option>Admin</option>
                  <option>Manager</option>
                </select>
              </td>
              <td className="text-right p-4.5 border-t border-gray-200 align-middle">
                <span className="text-blue-900 mr-3 cursor-pointer hover:underline">Edit</span>
                <span className="text-red-500 cursor-pointer hover:underline">Remove</span>
              </td>
            </tr>

            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center font-semibold text-white">HP  </div>
                    <h4 className="m-0 text-sm text-slate-900">Heriberto Patterson</h4>
                    <span className="text-xs text-slate-500">heribertopatterson@gmail.com</span>
                </div>
              </td>
              <td className="text-slate-700 p-4.5 border-t border-gray-200 align-middle">Member</td>
              <td className="p-4.5 border-t border-gray-200 align-middle">
                <select className="px-3 py-2 rounded border border-indigo-200 bg-white text-slate-700">
                  <option>Admin</option>
                  <option>Super Admin</option>
                  <option>Manager</option>
                </select>
              </td>
              <td className="text-right p-4.5 border-t border-gray-200 align-middle">
                <span className="text-blue-900 mr-3 cursor-pointer hover:underline">Edit</span>
                <span className="text-red-500 cursor-pointer hover:underline">Remove</span>
              </td>
            </tr>

            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-400 flex items-center justify-center font-semibold text-white">AB</div>
                  <div>
                    <h4 className="m-0 text-sm text-slate-900">Arturo Blain</h4>
                    <span className="text-xs text-slate-500">arturoblain@gmail.com</span>
                  </div>
                </div>
              </td>
              <td className="text-slate-700 p-4.5 border-t border-gray-200 align-middle">Member</td>
              <td className="p-4.5 border-t border-gray-200 align-middle">
                <select className="px-3 py-2 rounded border border-indigo-200 bg-white text-slate-700">
                  <option>Manager</option>
                  <option>Admin</option>
                  <option>Super Admin</option>
                </select>
              </td>
              <td className="text-right p-4.5 border-t border-gray-200 align-middle">
                <span className="text-blue-900 mr-3 cursor-pointer hover:underline">Edit</span>
                <span className="text-red-500 cursor-pointer hover:underline">Remove</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}


