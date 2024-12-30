import { Link, Outlet } from "react-router-dom";

export const RootLayout = () => {
    return (
        <>
            <div style={{
                 position: "sticky",
                 top: "0px",
                 display: "flex",
                 justifyContent: "end",
                 alignItems: "center",
                 width: "100%",
                 zIndex: 1000,
                 padding: "12px 24px",
                 height: "64px",
                 boxShadow: "rgb(234, 234, 234) 0px -1px 0px 0px inset",
                 transform: "translateZ(0px)",
                 backdropFilter: "saturate(180%) blur(4px)",
                 background: "rgba(255, 255, 255, 0.8)",
                 gap: "31px",
                 fontSize: "16px",
                 fontWeight: "500",
                 color: "rgb(0, 0, 0)",
                 fontFamily: "Inter, sans-serif",
                    }}>
                <span><Link style={{textDecoration: "none"}} to="/">Home</Link></span>
                <span><Link style={{textDecoration: "none"}} to="/about">About</Link></span>
                <span><Link style={{textDecoration: "none"}} to="/users">Users</Link></span>
            </div>

            <div style={{padding: "20px"}}>
                <Outlet />
            </div>
        </>
    );
};