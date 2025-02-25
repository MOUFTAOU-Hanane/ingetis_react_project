import React from 'react';
import { Search, Filter } from 'lucide-react';

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    type: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, type }) => {
    return (
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder={`Rechercher un ${type}...`}
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-white/70" size={18} />
                </div>
                <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 transition-colors">
                    <Filter size={18} />
                    <span>Filtrer</span>
                </button>
            </div>
        </div>
  );
};

export default SearchBar;
