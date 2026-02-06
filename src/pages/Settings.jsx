import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";

export function Settings() {
    const API_URL = "http://localhost:5000/api/salons/get";
    const [theme, setTheme] = useState(() => {
        const saved = typeof window !== 'undefined' && localStorage.getItem('theme');
        if (saved) return saved;
        return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });
    const [salons, setSalons] = useState([]);
    const [salonLoading, setSalonLoading] = useState(true);
    const [salonError, setSalonError] = useState("");

    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    useEffect(() => {
        const fetchSalons = async () => {
            try {
                setSalonLoading(true);
                setSalonError("");
                const res = await fetch(API_URL);
                if (!res.ok) {
                    throw new Error("Failed to load salons");
                }
                const data = await res.json();
                setSalons(Array.isArray(data) ? data : (data ? [data] : []));
            } catch (err) {
                setSalonError("Failed to load salon details");
                setSalons([]);
            } finally {
                setSalonLoading(false);
            }
        };

        fetchSalons();
    }, []);

    const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

    return (
            <div className="min-h-screen w-full px-4 py-10">
                <div className="max-w-5xl mx-auto">
                    <header className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)]">Settings</h1>
                        <p className="text-sm text-[var(--gray-700)] mt-2">Manage your store preferences, appearance and account settings.</p>
                    </header>
                    <section className="mb-6 bg-[var(--gray-100)] p-6 rounded-lg border border-[var(--border-light)] shadow-sm flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-[var(--text)]">Salon Details</h2>
                            <p className="text-sm text-[var(--gray-700)] mt-1">
                                View or manage your salon information like ID, name, address and contact.
                            </p>
                        </div>
                        <Link to="/salondetails">
                        <button
                            type="button"
                            className="px-5 py-2 rounded bg-[var(--primary)] text-white font-semibold hover:opacity-95">
                            Add Salon
                        </button>
                        </Link>
                    </section>
                    <section className="mb-6 bg-[var(--gray-100)] p-6 rounded-2xl border border-[var(--border-light)] shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                            <div>
                                <h2 className="text-xl font-semibold text-[var(--text)]">Salon Details</h2>
                                <p className="text-sm text-[var(--gray-700)] mt-1">A quick snapshot of your salon profile.</p>
                            </div>
                            <Link
                                to="/salondetails"
                                className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white font-semibold hover:opacity-95"
                            >
                                Edit Details
                            </Link>
                        </div>
                        {salonLoading && (
                            <p className="text-sm text-[var(--gray-700)]">Loading salon details...</p>
                        )}
                        {!salonLoading && salonError && (
                            <p className="text-sm text-[var(--danger)]">{salonError}</p>
                        )}
                        {!salonLoading && !salonError && salons.length === 0 && (
                            <div className="rounded-xl border border-dashed border-[var(--border-light)] p-6 text-center bg-[var(--background)]">
                                <p className="text-sm text-[var(--gray-700)]">No salons found yet.</p>
                                <Link to="/salondetails" className="mt-3 inline-flex text-sm font-semibold text-[var(--primary)] hover:underline">
                                    Add your first salon
                                </Link>
                            </div>
                        )}
                        {!salonLoading && !salonError && salons.length > 0 && (
                            <div className="space-y-8">
                                {salons.map((salon) => (
                                    <div
                                        key={salon._id}
                                        className="relative overflow-hidden rounded-3xl border border-[var(--border-light)] bg-[var(--background)] shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
                                    >
                                        <div className="absolute inset-0 pointer-events-none">
                                            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[color:var(--primary)]/10 blur-3xl"></div>
                                            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[color:var(--secondary)]/10 blur-3xl"></div>
                                        </div>

                                        <div className="relative p-6">
                                            <div className="flex flex-wrap items-center justify-between gap-4">
                                                <div className="min-w-0">
                                                    <p className="text-xs uppercase tracking-[0.25em] text-[var(--gray-700)]">Salon Profile</p>
                                                    <h3 className="mt-1 text-2xl font-semibold text-[var(--text)] truncate">
                                                        {salon.name || "Unnamed Salon"}
                                                    </h3>
                                                    <p className="mt-2 text-sm text-[var(--gray-700)]">
                                                        {salon.address || "Address not set"}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-right">
                                                        <p className="text-xs text-[var(--gray-700)]">Status</p>
                                                        <div className="mt-1 inline-flex items-center gap-2 rounded-full border border-[var(--border-light)] bg-[var(--background)] px-3 py-1 text-xs font-semibold text-[var(--primary)]">
                                                            <span className="h-2 w-2 rounded-full bg-[var(--primary)]"></span>
                                                            Active
                                                        </div>
                                                    </div>
                                                    {salon.logo ? (
                                                        <img
                                                            src={salon.logo}
                                                            alt="Salon logo"
                                                            className="w-20 h-20 rounded-2xl object-cover border border-[var(--border-light)] shadow-sm"
                                                        />
                                                    ) : (
                                                        <div className="w-20 h-20 rounded-2xl bg-[var(--hover-bg)] flex items-center justify-center text-xs font-semibold text-[var(--gray-700)] border border-[var(--border-light)]">
                                                            Upload Logo
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
                                                <div className="rounded-2xl border border-[var(--border-light)] bg-[var(--gray-100)]/70 p-4">
                                                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--gray-700)]">Contact</p>
                                                    <div className="mt-3 space-y-3">
                                                        <div>
                                                            <p className="text-xs text-[var(--gray-700)]">Phone</p>
                                                            <p className="text-sm font-semibold text-[var(--text)]">{salon.contact || "-"}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-[var(--gray-700)]">Email</p>
                                                            <p className="text-sm font-semibold text-[var(--text)]">{salon.email || "-"}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="rounded-2xl border border-[var(--border-light)] bg-[var(--gray-100)]/70 p-4">
                                                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--gray-700)]">Owner</p>
                                                    <div className="mt-3">
                                                        <p className="text-sm font-semibold text-[var(--text)]">{salon.ownerName || "-"}</p>
                                                        <p className="mt-2 text-xs text-[var(--gray-700)]">Salon ID</p>
                                                        <p className="text-sm font-medium text-[var(--text)] break-all">{salon._id}</p>
                                                    </div>
                                                </div>

                                                <div className="rounded-2xl border border-[var(--border-light)] bg-[var(--gray-100)]/70 p-4">
                                                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--gray-700)]">Hours</p>
                                                    <div className="mt-3">
                                                        <p className="text-sm font-semibold text-[var(--text)]">
                                                            {salon.openingTime || "-"} to {salon.closingTime || "-"}
                                                        </p>
                                                        <p className="mt-2 text-xs text-[var(--gray-700)]">Last updated</p>
                                                        <p className="text-sm font-medium text-[var(--text)]">
                                                            {salon.updatedAt ? new Date(salon.updatedAt).toLocaleDateString() : "N/A"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                                                <Link
                                                    to="/salondetails"
                                                    className="text-sm font-semibold text-[var(--primary)] hover:underline"
                                                >
                                                    Edit full profile
                                                </Link>
                                                <div className="flex gap-2">
                                                    <button
                                                        type="button"
                                                        className="px-4 py-2 rounded-xl border border-[var(--border-light)] text-sm font-semibold text-[var(--text)] hover:bg-[var(--hover-bg)]"
                                                    >
                                                        Preview
                                                    </button>
                                                    <Link
                                                        to="/salondetails"
                                                        className="px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold hover:opacity-95"
                                                    >
                                                        Manage Salon
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                    <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Left / Main Column */}
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

                        {/* Right / Sidebar Column */}
                        <aside className="bg-[var(--gray-100)] p-6 rounded-lg border border-[var(--border-light)] shadow-sm">
                            <h3 className="text-lg font-semibold text-[var(--text)] mb-4">Appearance</h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-[var(--text)]">Theme</p>
                                        <p className="text-xs text-[var(--gray-700)]">Switch between light and dark mode.</p>
                                    </div>
                                    <button onClick={toggleTheme} aria-label="Toggle theme" className="px-3 py-1.5 rounded bg-[var(--primary)] text-white">{theme === 'light' ? 'Dark' : 'Light'}</button>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-[var(--text)] mb-2">Store status</p>
                                    <label className="flex items-center gap-3">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span className="text-sm text-[var(--gray-700)]">Open to public</span>
                                    </label>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-[var(--text)] mb-2">Danger Zone</p>
                                    <button className="w-full text-sm px-3 py-2 rounded bg-transparent border border-[var(--border-light)] text-[var(--danger)]">Delete store</button>
                                </div>
                            </div>
                        </aside>
                    </main>

                    <div className="mt-10">
                        <Footer />
                    </div>
                </div>
            </div>
    );
}
