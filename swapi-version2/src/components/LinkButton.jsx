import { Link } from 'react-router-dom';

export default function LinkButton({id, name, path}) {
    return (
        <button>
            <Link to={`/${path}/${id}`}>{name}</Link>
        </button>
    )
}
