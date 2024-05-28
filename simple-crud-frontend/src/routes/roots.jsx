import { createBrowserRouter } from 'react-router-dom';
import Root from '../Root/Root';
import Users from '../components/Users';

const roots = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/users",
                element: <Users></Users>,
                loader: () => fetch("http://localhost:5000/users")
            }
        ]
    },

]);

export default roots;