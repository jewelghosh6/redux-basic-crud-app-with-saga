import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
// import { useEffect } from "react";
import UserCard from "../components/UserCard";
// import { fetchUsersRequest } from "../store/reducers/UserSlice";
import { Button, Container, Group } from "@mantine/core";
import { useFetchUsersQuery, usersApi } from "../store/api/UserApiSlice";
 const UsersList = () => {
    const dispatch = useDispatch<AppDispatch>();
    // const { users, loading, error } = useSelector((state: RootState) => state.users);
    const { data, isLoading, isError } = useFetchUsersQuery();
    const users = data?.users;
    
    console.log('users', users);


    const handleRefetch = () => {
        dispatch(usersApi.util.invalidateTags(['Users'])); // Manually invalidate cache
    };
    
    // useEffect(() => {
    //     dispatch(fetchUsersRequest());
    // }, [dispatch]);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: </p>;
    
    return (
        <Container  p={20} className="container-basic">
            <Group display={"flex"} justify={"flex-end"} mb={20}>
                <Button onClick={handleRefetch} >Refetch</Button>
            </Group>
            {
                users &&
                users.map((user:any) => (
                    <UserCard key={user.id} user={user}/>
                ))
            }
        </Container>
    );
};

export default UsersList;