// outputs: <p>Restaurant id: id</p> where id is a value that we will retrieve by using the
// "useParams" hook

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import {useState, useEffect} from 'react';
import {Card, CardGroup} from 'react-bootstrap';
import moment from 'moment';
import { useParams } from 'react-router-dom';

export default function Restaurant(props) {
    const restaurantAPI = "https://web422-as-1.herokuapp.com/api/restaurants";

    const [ restaurant, setRestaurant] = useState(null);
    const [ loading, setLoading ] = useState(true);

    const param = useParams();
    const id_ = param.id.substring(3) ;

    useEffect(()=>{
        setLoading(true);

        fetch(`${restaurantAPI}/${id_}`)
        .then(res => res.json())
        .then(data => {
            setLoading(false);
            if(data.hasOwnProperty("_id")){
                setRestaurant(data);
            }else {
                setRestaurant(null);
            }
        });
    },[param.id]);

    if(!loading) {
        if(!restaurant) {
            return (
                <Card className="mt-4">                
                    <Card.Body>                    
                        <Card.Text>
                            Cannot find Restaurant with id: {id_}
                        </Card.Text>                                        
                    </Card.Body>
                 </Card>
            );
        } else {
            return (
                <>
                    <Card className="mt-4">                
                        <Card.Body className="p-2">
                            <Card.Title>{restaurant.name}</Card.Title>
                            <Card.Text>
                                {restaurant.address.building} {restaurant.address.street}
                            </Card.Text>                                        
                        </Card.Body>
                    </Card>
    
                    <MapContainer
                        className="mt-4"
                        style={{"height": "400px"}} 
                        center={[restaurant.address.coord[1], restaurant.address.coord[0]]}
                        zoom={13} 
                        scrollWheelZoom={false}> 
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[restaurant.address.coord[1], restaurant.address.coord[0]]}></Marker> 
                    </MapContainer>
    
                    <h4 className="mt-2">Ratings</h4>
                    <hr/>
    
                    <CardGroup>
                        {
                            restaurant.grades.map(grade =>(
                                <Card>                        
                                    <Card.Body className="p-2">                        
                                        <Card.Text>
                                            Grade: {grade.grade}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="p-2">
                                    Completed: {moment(grade.date).format('MM/DD/YYYY')}                  
                                    </Card.Footer>
                                </Card>
                            ))                    
                                
                        }                    
                    </CardGroup>
                </> 
            );
        }
    } else {
        return (
            <Card className="mt-4">                
                <Card.Body>                    
                    <Card.Text>
                        Loading Restaurant Data...
                    </Card.Text>                                        
                </Card.Body>
             </Card>
        );
    }        
}