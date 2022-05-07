// // outputs: <p>Restaurants query: query</p> where query is a value that we will retrieve by using
// // the "useLocation" hook

import { useLocation } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {Card, Table, Pagination} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

export default function Restaurants() {

    const [ restaurants, setRestaurants ] = useState(null);
    const [ page, setPage ] = useState(1);  
    const [ borough, setBorough ] = useState(null);    

    const restaurantAPI = "https://web422-as-1.herokuapp.com/api/restaurants";

    let navigate = useNavigate();    
    let location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    // const perPage = 10; 
    
    let uri = borough ? `${restaurantAPI}?page=${page}&perPage=10&borough=${borough}` : `${restaurantAPI}?page=${page}&perPage=10`;
    const previousPage = ()=> {if (page > 1) setPage(page-1)};
    const nextPage = () => setPage(page+1); 

    useEffect(()=>{               
        fetch(uri)
        .then(res => res.json())
        .then((result)=>{       
            setRestaurants(result);      
            setPage(page);
            setBorough(urlParams.get("borough"));
            
        });
    },[location, page, borough]);

    if (restaurants && restaurants.length > 0) {
        return (
            <>
            <Card className="mt-2">                
                <Card.Body className="p-2">
                    <Card.Title>Restaurant List</Card.Title>
                    <Card.Text>
                        Full list of restaurants. Optional sorted by borough
                    </Card.Text>                                       
                </Card.Body>
            </Card>

            <Table striped bordered hover className="mt-2">
                <thead>
                    <tr>                        
                        <th>Name</th>
                        <th>Address</th>
                        <th>Borough</th>
                        <th>Cuisine</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        restaurants.map(restaurant=>(
                            <tr key={restaurant._id} onClick={()=>{ navigate(`/restaurant/id=${restaurant._id}`)}}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.address.building} {restaurant.address.street}</td>
                                <td>{restaurant.borough}</td>
                                <td>{restaurant.cuisine}</td>
                            </tr>                            
                        ))                            
                    }
                </tbody>
            </Table>

            <Pagination>
                <Pagination.Prev onClick={previousPage}/>
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage}/>
            </Pagination>

        </>
        );
    }
    
    if (restaurants === null || restaurants.length === 0) {
        return(
            <Card className="mt-3">                
                <Card.Body>                        
                    <Card.Text>
                        No Restaurants Found
                    </Card.Text>                                       
                </Card.Body>
            </Card>
            ); 
    } 
        
    return(
        <Card className="mt-3">                
            <Card.Body>                        
                <Card.Text>
                    Loading Restaurants...
                </Card.Text>                                       
            </Card.Body>
        </Card>
    );  
    
}