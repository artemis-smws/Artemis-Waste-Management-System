import { useState } from 'react';
import { useMap } from 'react-leaflet';
import { OpenStreetMapProvider } from "leaflet-geosearch";

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
  
    return (
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] flex items-center w-full max-w-md shadow-md rounded-md overflow-hidden bg-white">
        <input
          type="text"
          className="flex-1 px-4 py-2.5 text-sm font-medium border-none focus:outline-none focus:ring-0 bg-white text-gray-800"
          placeholder="Search locations..."
          value={searchQuery}
          onChange={(event: any) => {
            setSearchQuery(event.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch(searchQuery);
          }}
          id="search-location"
        />
        <button
          type="button"
          className="px-5 py-2.5 bg-[#216604] text-white hover:bg-[#62A944] transition-colors font-medium text-sm border-l border-[#426E2D]"
          id="search-button"
          onClick={() => handleSearch(searchQuery)}
        >
          Search
        </button>
      </div>
    );
  }