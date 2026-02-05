import { useEffect, useState } from "react";
import axios from "axios";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";

export function Settings() {
    /* ================= THEME ================= */
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem("theme");
        if (saved) return saved;
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () =>
        setTheme((t) => (t === "light" ? "dark" : "light"));

    /* ================= SALON DATA ================= */
    const [salon, setSalon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSalon = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/salon/details"
                );
                setSalon(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load salon details");
            } finally {
                setLoading(false);
            }
        };

        fetchSalon();
    }, []);

    /* ================= UI ================= */
    return (
        <div className="min-h-screen w-full px-4 py-10">
            <div className="max-w-5xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)]">
                        Settings
                    </h1>
                    <p className="text-sm text-[var(--gray-700)] mt-2">
                        Manage your store preferences, appearance and account settings.
                    </p>
                </header>

                {/* ===== SALON ACTION ===== */}
                <section className="mb-6 bg-[var(--gray-100)] p-6 rounded-lg border border-[var(--border-light)] shadow-sm flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-[var(--text)]">
                            Salon Details
                        </h2>
                        <p className="text-sm text-[var(--gray-700)] mt-1">
                            View or manage your salon information.
                        </p>
                    </div>

                    <Link to="/salondetails">
                        <button className="px-5 py-2 rounded bg-[var(--primary)] text-white font-semibold">
                            {salon ? "Edit Salon" : "Add Salon"}
                        </button>
                    </Link>
                </section>

                {/* ===== SALON DETAILS VIEW ===== */}
                <section className="mb-6 bg-[var(--gray-100)] p-6 rounded-lg border border-[var(--border-light)] shadow-sm">
                    <h2 className="text-xl font-semibold text-[var(--text)] mb-4">
                        Salon Details
                    </h2>

                    {loading && (
                        <p className="text-sm text-[var(--gray-700)]">
                            Loading salon details...
                        </p>
                    )}

                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}

                    {!loading && salon && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Detail label="Salon ID" value={salon._id} />
                            <Detail label="Name" value={salon.name} />
                            <Detail label="Address" value={salon.address} />
                            <Detail label="Phone" value={salon.phone} />
                            <Detail label="Email" value={salon.email} />
                            <Detail label="Timezone" value={salon.timezone} />
                        </div>
                    )}

                    {!loading && !salon && !error && (
                        <p className="text-sm text-[var(--gray-700)]">
                            No salon details found.
                        </p>
                    )}
                </section>

                {/* ===== REST OF PAGE (UNCHANGED) ===== */}
                <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <section className="md:col-span-2 bg-[var(--gray-100)] p-6 rounded-lg border border-[var(--border-light)] shadow-sm">
                            <h2 className="text-xl font-semibold text-[var(--text)] mb-4">Web Store Settings</h2>
                            <p className="text-sm text-[var(--gray-700)] mb-6">Here are the basic store settings for your services.</p>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--gray-700)] mb-1">Store Name</label>
                                        <input className="w-full p-2.5 rounded border border-[var(--border-light)] bg-[var(--background)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" type="text" placeholder="My Services" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[var(--gray-700)] mb-1">Store URL</label>
                                        <input className="w-full p-2.5 rounded border border-[var(--border-light)] bg-[var(--background)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" type="text" placeholder="https://example.com" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[var(--gray-700)] mb-1">Description</label>
                                    <textarea className="w-full p-2.5 rounded border border-[var(--border-light)] bg-[var(--background)] text-[var(--text)] h-28 resize-y focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" placeholder="Short description about your services" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--gray-700)] mb-1">Contact Email</label>
                                        <input className="w-full p-2.5 rounded border border-[var(--border-light)] bg-[var(--background)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" type="email" placeholder="owner@example.com" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[var(--gray-700)] mb-1">Currency</label>
                                        <select className="w-full p-2.5 rounded border border-[var(--border-light)] bg-[var(--background)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                                            <option>USD</option>
                                            <option>EUR</option>
                                            <option>GBP</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[var(--gray-700)] mb-1">Timezone</label>
                                        <select className="w-full p-2.5 rounded border border-[var(--border-light)] bg-[var(--background)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                                            <option>UTC</option>
                                            <option>GMT</option>
                                            <option>EST</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-[var(--gray-700)]">Changes are not saved — this is a UI demo.</div>
                                    <div className="flex gap-3">
                                        <button type="button" className="px-4 py-2 rounded border border-[var(--border-light)] bg-[var(--background)] text-[var(--text)]">Cancel</button>
                                        <button type="button" className="px-4 py-2 rounded bg-[var(--primary)] text-white font-semibold hover:opacity-95">Save changes</button>
                                    </div>
                                </div>
                            </form>
                        </section>

                    <aside className="bg-[var(--gray-100)] p-6 rounded-lg border border-[var(--border-light)] shadow-sm">
                        <h3 className="text-lg font-semibold text-[var(--text)] mb-4">
                            Appearance
                        </h3>

                        <button
                            onClick={toggleTheme}
                            className="px-3 py-1.5 rounded bg-[var(--primary)] text-white"
                        >
                            {theme === "light" ? "Dark" : "Light"}
                        </button>
                    </aside>
                </main>

                <div className="mt-10">
                    <Footer />
                </div>
            </div>
        </div>
    );
}

/* ===== Reusable Field ===== */
function Detail({ label, value }) {
    return (
        <div className="flex gap-2">
            <span className="text-sm font-medium text-[var(--gray-700)]">
                {label}:
            </span>
            <span className="text-[var(--text)]">
                {value || "-"}
            </span>
        </div>
    );
}
