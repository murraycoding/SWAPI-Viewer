import { Link } from 'react-router-dom';

export default function LinkButton({ path, text, id}) {
    return (
        <button>
            <Link to={`/${path}/${id}`}>{text}</Link>
        </button>
    )
}
