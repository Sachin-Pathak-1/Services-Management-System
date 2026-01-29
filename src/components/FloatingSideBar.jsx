export function FloatingSideBar() {
    return (
        <div className="fixed left-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-4 rounded-r-lg shadow-lg z-50">
            <ul className="flex flex-col gap-4">
                <li>
                    <a href="#home" className="block py-2 px-3 rounded hover:bg-gray-700 transition-colors duration-200">Profile</a>
                </li>
                <li>
                    <a href="#services" className="block py-2 px-3 rounded hover:bg-gray-700 transition-colors duration-200">Services</a>
                </li>
                <li>
                    <a href="#about" className="block py-2 px-3 rounded hover:bg-gray-700 transition-colors duration-200">Clients</a>
                </li>
                <li>
                    <a href="#contact" className="block py-2 px-3 rounded hover:bg-gray-700 transition-colors duration-200">Appointments</a>
                </li>
            </ul>
        </div>
    );
}