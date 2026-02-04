import { useEffect, useState } from "react";

const API = "http://localhost:5000/api/dashboard";

export function StaffDashboard() {

  const [stats, setStats] = useState({
    todayAppointments: 0,
    completed: 0,
    pending: 0,
    totalServices: 0
  });

  const [popularServices, setPopularServices] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const statsRes = await fetch(`${API}/staff-stats`);
      const popularRes = await fetch(`${API}/popular-services`);
      const activityRes = await fetch(`${API}/recent-activity`);

      const statsData = await statsRes.json();
      const popularData = await popularRes.json();
      const activityData = await activityRes.json();

      setStats({
        todayAppointments: statsData.todayAppointments,
        completed: statsData.completed,
        pending: statsData.pending,
        totalServices: statsData.pending
      });

      setPopularServices(popularData);
      setRecentActivity(activityData);

    } catch (err) {
      console.error("Dashboard load failed");
    }
  };

  return (

    <div className="min-h-screen w-full bg-(--background) px-6 md:px-10 py-10">

      <div className="max-w-7xl mx-auto text-(--text)">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">
            Staff Dashboard
          </h1>
          <p className="opacity-80">
            Overview of salon activities and services
          </p>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

          <StatCard title="Today's Appointments" value={stats.todayAppointments} />
          <StatCard title="Completed Services" value={stats.completed} />
          <StatCard title="Pending Services" value={stats.pending} />
          <StatCard title="Total Services" value={stats.totalServices} />

        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-(--gray-100) border border-(--border-light) rounded-xl p-6 mb-12">

          <h2 className="text-xl font-semibold mb-4">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4">

            <ActionButton label="View Appointments" />
            <ActionButton label="View Services" />
            <ActionButton label="View Reports" />

          </div>

        </div>

        {/* TABLES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* POPULAR SERVICES */}
          <div className="bg-(--gray-100) border border-(--border-light) rounded-xl p-6">

            <h2 className="text-xl font-semibold mb-4">
              Popular Services
            </h2>

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead>
                  <tr className="border-b border-(--border-light) opacity-70">
                    <th className="text-left p-3">Service Name</th>
                    <th className="text-right p-3">Bookings</th>
                  </tr>
                </thead>

                <tbody>

                  {popularServices.length === 0 && (
                    <tr>
                      <td colSpan="2" className="text-center p-6 opacity-60">
                        No data available
                      </td>
                    </tr>
                  )}

                  {popularServices.map((s, i) => (
                    <tr
                      key={i}
                      className="border-b border-(--border-light) hover:bg-black/5"
                    >
                      <td className="p-3">{s.name}</td>
                      <td className="p-3 text-right">{s.count}</td>
                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* RECENT ACTIVITY */}
          <div className="bg-(--gray-100) border border-(--border-light) rounded-xl p-6">

            <h2 className="text-xl font-semibold mb-4">
              Recent Activity
            </h2>

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead>
                  <tr className="border-b border-(--border-light) opacity-70">
                    <th className="text-left p-3">Customer</th>
                    <th className="text-left p-3">Activity</th>
                    <th className="text-right p-3">Time</th>
                  </tr>
                </thead>

                <tbody>

                  {recentActivity.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center p-6 opacity-60">
                        No recent activity
                      </td>
                    </tr>
                  )}

                  {recentActivity.map((a, i) => (
                    <tr
                      key={i}
                      className="border-b border-(--border-light) hover:bg-black/5"
                    >
                      <td className="p-3">{a.customer}</td>
                      <td className="p-3">{a.action}</td>
                      <td className="p-3 text-right">{a.time}</td>
                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

/* SMALL COMPONENTS */

function StatCard({ title, value }) {
  return (
    <div className="bg-(--gray-100)
                    border border-(--border-light)
                    rounded-xl
                    p-6
                    text-center">

      <p className="opacity-70 mb-1">{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>

    </div>
  );
}

function ActionButton({ label }) {
  return (
    <button
      className="bg-(--primary)
                 hover:bg-(--secondary)
                 text-white
                 font-semibold
                 px-6 py-3
                 rounded-xl"
    >
      {label}
    </button>
  );
}
