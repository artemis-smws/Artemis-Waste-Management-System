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
      <div className="input-group position-absolute sticky-top d-flex justify-content-center align-items-center" style={{top: "20px"}}>
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={searchQuery}
          onChange={(event: any) => {
            setSearchQuery(event.target.value);
          }}
          id="search-location"
        />
        <button
          type="button"
          className="btn align-items-center"
          id="search-button"
          onClick={() => handleSearch(searchQuery)}
        >
          Search
        </button>
      </div>
    );
  }