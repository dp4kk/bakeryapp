import React, { createContext,useState,useCallback} from 'react'
import data from '../datas.json'
import Fuse from 'fuse.js'
export const SearchInputContext = createContext();
        


const SearchContext = ({children}) => {

    const [query,setQuery]=useState('')
    const [displayData,setDisplayData]=useState([])
    

      
        // memoization of search input 
      // const searchProduct = useCallback(() => {
      //       const search = () => {
      //         dispatch({ type: SEARCH, payload: query });
      //       };
      //    search()
      // }, [query]);


      const searchProduct = useCallback(() => {
        const search = () => {
           const fuse = new Fuse(data, {
             shouldSort: true,
             minMatchCharLength: 1,
             includeScore: true,
             keys: ["name"],
           });
           const results = fuse.search(query);
           const ItemSearch = query
             ? results.map((result) => result.item)
             : data;
           setDisplayData(ItemSearch)
           console.log(results);
           return {
             data: ItemSearch,
           };   
        };
        search();
      }, [query]);
      
       
   const contexts={query,setQuery,searchProduct,displayData}
    return (
        <SearchInputContext.Provider value={contexts}>
            {children}
        </SearchInputContext.Provider>
    )
}

export default SearchContext
