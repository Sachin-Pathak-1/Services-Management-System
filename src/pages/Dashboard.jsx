const Views = [
    { page: "Service A", views: 2150 },
    { page: "Service B", views: 120 },
    { page: "Service C", views: 90 },
    { page: "Service D", views: 80 },
    { page: "Service E", views: 70 },
]

const Recent = [
    { profile: "/image.png", name: "John Doe", activity: "Viewed Service A", time: "2 hours ago" },
    { profile: "/image.png", name: "Jane Smith", activity: "Booked Service B", time: "3 hours ago" },
    { profile: "/image.png", name: "Alice Johnson", activity: "Left a review on Service C", time: "5 hours ago" },
    { profile: "/image.png", name: "Bob Brown", activity: "Updated profile information", time: "1 day ago" },
]

import { Footer } from "../components/Footer";
import { Layout } from "./Layout";

export function Dashboard() {
    return (
        <Layout>
            <div className="flex flex-col h-screen gap-10 bg-gray-100">
                <div className="mx-auto mt-10 bg-white p-8 flex flex-col w-3/4 gap-5">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-3xl font-bold text-gray-600 mb-4">Welcome to Services Management Dashboard!</h2>
                        <div className="flex flex-col gap-2">
                            <span className="text-xl font-semibold text-gray-500">Get Started</span>
                            <p className="text-base text-gray-400">You can customize your dashboard here.</p>
                        </div>
                        <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3 w-fit">Customize Dashboard</button>
                    </div>
                    <div className="flex justify-between gap-6 mt-5">
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-600 mb-6">Next Steps</h3>
                            <div className="flex flex-col gap-4">
                                <div className="text-sm font-semibold text-gray-500 hover:text-blue-500 cursor-pointer">Write a blog</div>
                                <div className="text-sm font-semibold text-gray-500 hover:text-blue-500 cursor-pointer">Add an about page</div>
                                <div className="text-sm font-semibold text-gray-500 hover:text-blue-500 cursor-pointer">View your site</div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-600 mb-6">At a Glance</h3>
                            <div className="flex flex-col gap-4">
                                <div className="text-sm font-semibold text-gray-500 hover:text-blue-500 cursor-pointer">35 Posts</div>
                                <div className="text-sm font-semibold text-gray-500 hover:text-blue-500 cursor-pointer">21 Pages</div>
                                <div className="text-sm font-semibold text-gray-500 hover:text-blue-500 cursor-pointer">18 Comments</div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-600 mb-6">More Actions</h3>
                            <div className="flex flex-col gap-4">
                                <div className="text-sm font-semibold text-gray-500 hover:text-blue-500 cursor-pointer">Manage Widgets or Menu</div>
                                <div className="text-sm font-semibold text-gray-500 hover:text-blue-500 cursor-pointer">Turn comments on or off</div>
                                <div className="text-sm font-semibold text-gray-500 hover:text-blue-500 cursor-pointer">More about getting started</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto bg-white p-8 flex flex-col w-3/4">
                    <h3 className="text-2xl font-semibold text-gray-600 mb-6">Quick Draft</h3>
                    <form className="flex flex-col gap-4">
                        <input type="text" placeholder="Title" className="border border-gray-300 rounded p-2" />
                        <textarea placeholder="What's on your mind?" className="border border-gray-300 rounded p-2 h-24"></textarea>
                        <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3 w-fit">Save Draft</button>
                    </form>
                </div>

                <div className="mx-auto flex gap-6 w-3/4">
                    <div className="bg-white p-8 flex flex-col w-1/2">
                        <h3 className="text-xl font-semibold text-gray-600 mb-6">Viewed services by users</h3>
                        <div className="flex justify-between mb-4 font-semibold text-gray-500">
                            <span>Page</span>
                            <span>Page Views</span>
                        </div>
                        {Views.map((item, index) => (
                            <div key={index} className="flex justify-between border-t border-gray-200 py-2 text-sm">
                                <span className="text-gray-500">{item.page}</span>
                                <span className="text-gray-500">{item.views}</span>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white p-8 flex flex-col w-1/2">
                        <h3 className="text-xl font-semibold text-gray-600 mb-6">Recent Activities</h3>
                        <div className="flex justify-between mb-4 font-semibold text-gray-500">
                            <span>Name</span>
                            <span>Time</span>
                        </div>
                        {Recent.map((item, index) => (
                            <div key={index} className="flex justify-between border-t border-gray-200 py-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <img src={item.profile} alt="profile" className="w-6 h-6 rounded-full" />
                                    <div className="text-gray-500 flex flex-col">
                                        <div>{item.name}</div>
                                        <div className="text-xs">{item.activity}</div>
                                    </div>
                                </div>
                                <div className="text-gray-500">{item.time}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <Footer />
            </div>
        </Layout>
    )
}