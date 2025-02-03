import { useState, useEffect } from "react";
import { TextInput, Paper, ScrollArea, Avatar, Flex, Box, Loader, Text, Center } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import axios from "axios";
import { IconFilter, IconMathFunctionY, IconSearch, IconX } from "@tabler/icons-react";
import { useLazyGetUsersByKeywordQuery } from "../store/api/UserApiSlice";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { User } from "../types/types";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  // const [searchResults, setSearchResults] = useState<User[]>([]);
  const [history, setHistory] = useState<string[]>(["trest", "trest1", "trest2", "trest3", "trest4"]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [debouncedSearch] = useDebouncedValue(search, 500);
  const [fetchSearchResults, {data: searchData, isFetching ,isSuccess}] = useLazyGetUsersByKeywordQuery();

  console.log("searchData",searchData);

  const [page, setPage] = useState<number>(1); // Track current page
  const [hasMore, setHasMore] = useState<boolean>(true); // Indicates if more data exists
  
  // useEffect(() => {
  //   if (debouncedSearch) {
  //     fetchSearchResults(debouncedSearch);
  //   }
  // }, [debouncedSearch]);


    // Handle new data and prevent duplicates
    // useEffect(() => {
    //   if (isSuccess && searchData?.users.length > 0) 
  
    //     // If fewer than the page limit (10) items are returned, stop fetching
    //     if (searchData.users.length === searchData.total) {
    //       setHasMore(false);
    //     }
    //   }, [searchData, isSuccess]);





// Fetch new data on search change
useEffect(() => {
  if (debouncedSearch) {
    setPage(1); // Reset page when search changes
    fetchSearchResults({ keyword: debouncedSearch, page: 1 });
  }
}, [debouncedSearch]);

// Handle new search results and pagination
useEffect(() => {
  if (isSuccess && searchData?.users.length > 0) {
    // if (page === 1) {
    //   setSearchResults(searchData.users); // Reset on new search
    // } else {
    //   setSearchResults((prev) => [...prev, ...searchData.users]); // Append on scroll
    // }

    setHasMore(!(searchData.users.length === searchData.total)); // Stop fetching if less than 10 items
  }
}, [searchData, isSuccess, page]);

const lastElementRef = useInfiniteScroll(hasMore, isFetching, () => {
  setPage((prevPage) => {
    const nextPage = prevPage + 1;
    fetchSearchResults({ keyword: debouncedSearch, page: nextPage });
    return nextPage;
  });
});

  
    // // Use the custom hook for infinite scrolling
    // const lastElRef = useInfiniteScroll(hasMore, isFetching, () => {
    //   console.log("Fetching more data...");
      
    //   setPage((prevPage) => prevPage + 1);
    // });

  // const fetchSearchResults = async (query: string) => {
  //   try {
  //     const response = await axios.get(`https://dummyjson.com/users/search?q=${query}`);
  //     setSearchResults(response.data.users || []);
  //     setShowDropdown(true);
  //   } catch (error) {
  //     console.error("Error fetching search results", error);
  //   }
  // };

  const handleSearch = (value: string) => {
    setSearch(value);
    setShowDropdown(true);
  };

  const handleSelect = (selected: string) => {
    setSearch(selected);
    setShowDropdown(false);
    if (!history.includes(selected)) {
      setHistory([selected, ...history].slice(0, 5)); // Store last 5 searches
    }
  };

  return (
    <div style={{ position: "relative"}}>
      <TextInput
        placeholder="Search..."

        leftSectionPointerEvents="none"
        leftSection={<IconSearch size={16} style={{ marginRight: 5 }} />}
        rightSectionPointerEvents="none"
        rightSection={
          <Box style={{ display: "flex", alignItems: "center", minWidth: "50px" }}>
            {search.length > 0 && <IconX size={16} style={{ marginRight: 5, cursor: "pointer" }} color="red" onClick={() => setSearch('')}/>}
            <IconFilter size={16} style={{ marginRight: 5 }} />
          </Box>
      }
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
      />
      
      {showDropdown && (history.length > 0 || searchData?.users.length! > 0) && (
        <Paper
          shadow="md"
          style={{
            position: "absolute",
            width: "100%",
            top: 40,
            zIndex: 100,
          }}
        >
          <ScrollArea h={300}>
            {search === "" ? (
              history.map((item, index) => (
                <div key={index} onClick={() => handleSelect(item)}>
                  {item}
                </div>
              ))
            ) : ( 
              searchData?.users.map((item, index) => (<>
                <Flex key={index} ref={index === searchData.users.length - 1 ? lastElementRef : null}  m={5} style={{ cursor: "pointer" ,borderBottom: "1px solid #ccc"}}>
                  <Avatar src={item.image} />
                  {item.firstName + " " + item.lastName}
                  <Text ms={10}>{index}</Text>
                  
                </Flex>
              
              
              </>
              ))
            )}
            {isFetching ? <Center><Loader /></Center>  : ""}  
          </ScrollArea>
        </Paper>
      )}
    </div>
  );
}