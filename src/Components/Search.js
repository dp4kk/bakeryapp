import React,{useContext} from 'react'
import { useStyles } from "../Styles/styles";
import { SearchInputContext } from "../Context/SearchContext";
import TextField from '@material-ui/core/TextField'

const Search = () => {
     const { query, setQuery } = useContext(SearchInputContext);
     const classes = useStyles();
    
      
    return (
      <React.Fragment>
        
        <div className={classes.searchbox}>
          <TextField
            className={classes.search}
            variant='outlined'
            size="small"
            color="primary"
            inputProps={{
              style: {
                color: "white",
              },
            }}
            placeholder='Search'
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
          />
        </div>
      </React.Fragment>
    );
}

export default Search
