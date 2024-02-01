import { useEffect, useState } from "react";
import LinkButton from "../components/LinkButton";
// import LinkButton from "../components/LinkButton";

export default function HomePage() {

    // state variables for the data to be loaded into from the API
    const [character_components, set_character_components] = useState([])

    function get_id_from_url(url) {
        const regex = /\d+/;
        return url.match(regex)
    }

    // gets the information from the API
    useEffect(
        () => {
            const base_url = 'https://swapi.dev/api/'
            fetch(`${base_url}/people`).then(response => response.json()).then(
                (character_info) => {
                    let results = character_info.results

                    for (let result of results) {
                        const id = get_id_from_url(result.url)
                        const new_character = <LinkButton key={id} text={result.name} id={id} path={'characters'} />
                        set_character_components(previous_characters => previous_characters ? [...previous_characters, new_character] : [new_character]) 
                    }

                    

                }
            )
        }, []
    )


    // return component
    return (
        <>
            <p>This is the home page.</p>
            {character_components}
        </>
    )
}