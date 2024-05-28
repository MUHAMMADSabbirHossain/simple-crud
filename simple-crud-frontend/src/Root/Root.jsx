import { Outlet } from "react-router-dom";
import App from "../App";

const Root = () => {
    return (
        <div>
            <h1>Simple CRUD</h1>
            <App></App>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;