import { createBrowserRouter } from 'react-router-dom';
import Root from '../Root/Root';

const roots = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
    },
]);

export default roots;