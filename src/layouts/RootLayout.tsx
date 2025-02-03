import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { selectTotalTodos } from "../store/selectors/toDoSelector";

export const RootLayout = () => {

    const totalTodos = useSelector(selectTotalTodos);

    // const postCount = 0;
    return (
        <>
            <div className="navbar">
                <span>Todo Count:{totalTodos}</span>
                <span><Link className="nav-header-link" to="/test">Test</Link></span>
                <span><Link className="nav-header-link" to="/video">Videos</Link></span>
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