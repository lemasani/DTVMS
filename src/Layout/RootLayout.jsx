import PropTypes from 'prop-types';

export default function RootLayout({ children }) {
    return (
        <>
            <header className="bg-blue-800 p-5">
                <nav className="container mx-auto px-4 py-2">
                    <div className="flex items-center justify-between">
                        <a href="/" className='flex '>
                            <img src="/path/to/logo.png" alt="DTVMS" className="h-8" />
                            <h3 className='text-white'>DTVMS</h3>
                        </a>
                        <ul className="flex space-x-4">
                            <li><a href="/dashboard" className="text-white hover:text-gray-300">Dashboard</a></li>
                            <li><a href="/venues" className="text-white hover:text-gray-300">Venues</a></li>
                            <li><a href="/profile" className="text-white hover:text-gray-300">Profile</a></li>
                        </ul>
                    </div>
                </nav>
            </header>
            <main className='container mx-auto'>
                {children}
            </main>
        </>
    );
}

RootLayout.propTypes = {
    children: PropTypes.node.isRequired,
};