import ErrorMessage from "../errorMessage/ErrorMessage";
import {Link} from "react-router-dom";

const Page404 = () => {
    return (
        <div>
            <ErrorMessage />
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>The page doesn't exist! 404</p>
            <Link style={{'display': 'block', 'textAlign': 'center','fontWeight': 'bold', 'fontSize': '24px',
            'marginTop': '30px'}} to="/">Back to main page</Link>
        </div>
    )
}

export default Page404;