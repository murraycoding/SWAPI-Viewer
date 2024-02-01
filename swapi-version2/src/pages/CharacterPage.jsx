import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LinkButton from "../components/LinkButton";

export default function CharacterPage() {
    const params = useParams();
    let id = params.id;

    // state variables for the data to be loaded into from the API
    const [characterInfo, setCharacterInfo] = useState([])
    const [characterHomeworld, setCharacterHomeworld] = useState([])
    const [filmComponents, setFilmComponents] = useState([])
    const [vehicleComponents, setVehicleComponents] = useState([])
    const [starshipComponents, setStarshipComponents] = useState([])


    // gets the information from the API

    function get_id_from_url(url) {
        const regex = /\d+/;
        return url.match(regex)
    }
    
    useEffect(
        () => {
            const base_url = 'https://swapi.dev/api/'
            fetch(`${base_url}/people/${id}`).then(response => response.json()).then(
                // character_info = {Object}
                (character_info) => {
                    setCharacterInfo(character_info);

                    /* Homeworld of Character */
                    fetch(character_info.homeworld).then(response => response.json()).then(
                        (homeworld_info) => {
                            setCharacterHomeworld(homeworld_info)
                        }
                    )
            
                    /* Films */
                    const filmArray = character_info.films; // contains links to other api calls for the films
                    filmArray.map(
                        (film_link) => {
                            fetch(film_link).then(response => response.json())
                            .then(film_info => {
                                const id = get_id_from_url(film_info.url)
                                console.log(`Film ID = ${id}`)
                                const new_film = <LinkButton key={id} text={film_info.title} id={id} path={'films'}/>
                                setFilmComponents( previous_films => previous_films ? [...previous_films, new_film] : [new_film])
                            })
                        }
                    )
                    
                    /* Vehicles */
                    const vehiclesArray = character_info.vehicles;
                    vehiclesArray.map(
                        (vehicle_link) => {
                            fetch(vehicle_link).then(response => response.json())
                            .then(vehicle_info => {
                                const id = get_id_from_url(vehicle_info.url)
                                const new_vehicle = <LinkButton key={id} text={vehicle_info.name} id={id} path={'vehicles'} />
                                setVehicleComponents( previous_vehicles => previous_vehicles ? [...previous_vehicles, new_vehicle] : [new_vehicle])
                            })
                        }
                    )
                    
                    /* Starships */
                    const starShipsArray = character_info.starships;
                    starShipsArray.map(
                        (starship_link) => {
                            fetch(starship_link).then(response => response.json())
                            .then(starship_info => {
                                const id = get_id_from_url(starship_info.url)
                                const new_starship = <LinkButton key={id} text={starship_info.name} id={id} path={'starships'} />
                                setStarshipComponents( previous_starships => previous_starships ? [...previous_starships, new_starship] : [new_starship])
                            })
                        }
                    )
                }
            )
        },
    [])

    // return component
    return (
        <>
            <p>This is the character page.</p>
            <p>Height = {characterInfo.height}</p>
            <p>Homeworld = {characterHomeworld.name}</p>
            <h2>Films</h2>
            {filmComponents}
            <h2>Vehicles</h2>
            {vehicleComponents}
            <h2>Starships</h2>
            {starshipComponents}
        </>
    )
}