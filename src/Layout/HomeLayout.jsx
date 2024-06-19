import PropTypes from 'prop-types';

// import { Link } from 'react-router-dom';

const HomeLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* <header className="p-5 bg-blue-500">
                <div className="container mx-auto flex justify-between items-center">
                    <div>
                        <img src="/path/to/logo.png" alt="Logo" className="h-8" />
                    </div>
                    <nav>
                        <ul className="flex space-x-4">
                            <li><Link to="/" className="text-white">Login</Link></li>
                            <li><Link to="/register" className="text-white">Register</Link></li>
                        </ul>
                    </nav>
                </div>
            </header> */}
            <main className="flex-grow">
                {children}
            </main>
        </div>
    );
};


HomeLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default HomeLayout;