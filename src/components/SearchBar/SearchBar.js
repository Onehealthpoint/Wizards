const SearchBar = () => {
    return (
        <div className="flex justify-center">
            <input type="text" className="border-2 border-gray-300 bg-white h-10 w-30 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                placeholder="Search..." />
            <button className="bg-purple-800 text-white rounded-lg px-4 ml-2">🔎</button>
        </div>
    );
};

export default SearchBar