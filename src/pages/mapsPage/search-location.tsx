import { useState } from 'react';
import { useMap } from 'react-leaflet';
import { OpenStreetMapProvider } from "leaflet-geosearch";
import './index.scss'

export default function SearchControl() {
    
    const map = useMap();
  
    const provider = new OpenStreetMapProvider();
  
    const handleSearch = async (query: any) => {
      const results = await provider.search({ query });
      if (results.length > 0) {
        const { x, y } = results[0];
        map.flyTo([y, x], 19);
      }
    };

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchQueryChange = (event: any) => {
      setSearchQuery(event.target.value);
    };
  
    return (
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-[1000] flex justify-center items-center w-full max-w-sm px-4">
        <input
          type="text"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-800"
          placeholder="Search"
          value={searchQuery}
          onChange={(event: any) => {
            setSearchQuery(event.target.value);
          }}
          id="search-location"
        />
        <button
          type="button"
          className="px-4 py-2 bg-green-600 text-white rounded-r-md shadow-sm hover:bg-green-700 transition font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
          id="search-button"
          onClick={() => handleSearch(searchQuery)}
        >
          Search
        </button>
      </div>
    );
  }