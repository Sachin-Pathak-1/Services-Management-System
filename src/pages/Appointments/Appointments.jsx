import React, { useState } from "react";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      userName: "John Doe",
      date: "2026-01-30",
      time: "10:00 AM",
      service: "Consultation",
      status: "Pending",
      email: "john@example.com",
    },
    {
      id: 2,
      userName: "Jane Smith",
      date: "2026-01-28",
      time: "2:00 PM",
      service: "Service A",
      status: "Confirmed",
      email: "jane@example.com",
    },
    {
      id: 3,
      userName: "Mike Johnson",
      date: "2026-01-27",
      time: "11:30 AM",
      service: "Service B",
      status: "Completed",
      email: "mike@example.com",
    },
    {
      id: 4,
      userName: "Sarah Wilson",
      date: "2026-02-01",
      time: "3:30 PM",
      service: "Consultation",
      status: "Pending",
      email: "sarah@example.com",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-900";
      case "Confirmed":
        return "bg-emerald-100 text-emerald-900";
      case "Completed":
        return "bg-emerald-100 text-emerald-900";
      case "Cancelled":
        return "bg-red-100 text-red-900";
      default:
        return "";
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: newStatus } : apt
      )
    );
  };

  return (
    <div className="flex min-h-screen w-5/6 mx-auto">
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Appointments</h1>
          <p className="text-gray-600 mt-2">Manage all appointments</p>
        </div>
        <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Search appointments..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded text-sm bg-gray-100"
            />
            <select className="min-w-40 px-4 py-2 border border-gray-200 rounded text-sm bg-gray-100">
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 border-b border-gray-200">
                  <th className="px-4 py-4 text-left font-semibold text-gray-800 opacity-80 text-sm">ID</th>
                  <th className="px-4 py-4 text-left font-semibold text-gray-800 opacity-80 text-sm">User Name</th>
                  <th className="px-4 py-4 text-left font-semibold text-gray-800 opacity-80 text-sm">Email</th>
                  <th className="px-4 py-4 text-left font-semibold text-gray-800 opacity-80 text-sm">Date</th>
                  <th className="px-4 py-4 text-left font-semibold text-gray-800 opacity-80 text-sm">Time</th>
                  <th className="px-4 py-4 text-left font-semibold text-gray-800 opacity-80 text-sm">Service</th>
                  <th className="px-4 py-4 text-left font-semibold text-gray-800 opacity-80 text-sm">Status</th>
                  <th className="px-4 py-4 text-left font-semibold text-gray-800 opacity-80 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-200 border-b border-gray-200">
                    <td className="px-4 py-4 text-gray-800 text-sm">#{appointment.id}</td>
                    <td className="px-4 py-4 text-gray-800 text-sm">{appointment.userName}</td>
                    <td className="px-4 py-4 text-gray-800 text-sm">{appointment.email}</td>
                    <td className="px-4 py-4 text-gray-800 text-sm">{appointment.date}</td>
                    <td className="px-4 py-4 text-gray-800 text-sm">{appointment.time}</td>
                    <td className="px-4 py-4 text-gray-800 text-sm">{appointment.service}</td>
                    <td className="px-4 py-4 text-gray-800 text-sm">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-800 text-sm">
                      <select
                        value={appointment.status}
                        onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                        className="px-2 py-1 border border-gray-200 rounded text-sm cursor-pointer bg-gray-100"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}