import { Link, Outlet } from "react-router-dom";

export const RootLayout = () => {
    return (
        <>
            <div className="navbar">
                <span><Link className="nav-header-link" to="/home">Home</Link></span>
                <span><Link className="nav-header-link" to="/feed">Feed</Link></span>
                <span><Link className="nav-header-link" to="/about">About</Link></span>
                <span><Link className="nav-header-link" to="/users">Users</Link></span>
            </div>

            <div style={{padding: "20px"}}>
                <Outlet />
            </div>
        </>
    );
};