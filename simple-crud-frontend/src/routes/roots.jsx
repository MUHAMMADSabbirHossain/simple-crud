import { createBrowserRouter } from 'react-router-dom';
import Root from '../Root/Root';
import Users from '../components/Users';

const roots = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
    },
    {
        path: "/users",
        element: <Users></Users>
    }
]);

export default roots;