// outputs: <p>Restaurants query: query</p> where query is a value that we will retrieve by using
// the "useLocation" hook
import React from 'react';
import { useLocation } from 'react-router-dom';

function Restaurants() {
    let query = useLocation();  // location

    // useEffect(() => {
    //     console.log(query);
    // }, [location]);

    return <p>Restaurants query: {query}</p>;   //TODO:
}

export default Restaurants;