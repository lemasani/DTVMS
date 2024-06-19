import courtofarm from './../assets/court of arm.jpeg'


const Home = () => {
    return (
        <div className="container mx-auto p-4 h-screen">
            <div className="container flex flex-row gap-10 items-center h-full">
                <div className='w-full items-center shadow'>
                    <img src={courtofarm} alt="Image" width="500px" />
                </div>
                <div className='w-full text-center shadow p-10'>
                    <h1 className="text-2xl mb-4">Welcome back!</h1>
                    <form className="w-full max-w-sm mx-auto text-left ">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Phone">
                                Phone Number
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="Phone"
                                type="text"
                                placeholder="Phone"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="******************"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Home;