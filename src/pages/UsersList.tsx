import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
// import { fetchPostsRequest } from "../store/slice(reducers)/PostSlice";
import UserCard from "../components/UserCard";
import { fetchUsersRequest } from "../store/reducers/UserSlice";
import { Container } from "@mantine/core";


export const UsersList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, error } = useSelector((state: RootState) => state.users);
    

    useEffect(() => {
        dispatch(fetchUsersRequest());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    
    return (
        <Container mt={"md"} p={20} style={{boxShadow: "0px 10px 15px 7px rgba(0,0,0,0.1)"}}>
            {
                users.map(user => (
                    <UserCard key={user.id} user={user}/>
                ))
            }
        </Container>
    );
};