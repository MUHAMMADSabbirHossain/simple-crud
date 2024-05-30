import { createBrowserRouter } from 'react-router-dom';
import Root from '../Root/Root';
import Users from '../components/Users';
import User from '../components/User';

const roots = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/users",
                element: <Users></Users>,
                loader: () => fetch("http://localhost:5000/users")
            },
            {
                path: "/user/:id",
                element: <User></User>,
                loader: ({ params }) => fetch(`http://localhost:5000/user/${params.id}`)
            }
        ]
    },

]);

export default roots;