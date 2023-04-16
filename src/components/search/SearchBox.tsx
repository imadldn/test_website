import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";


const SearchBar : React.FC = () => {
    const [postcode, setPostcode]  = useState('');
    const navigate = useNavigate();
    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        var url = postcode.replace(' ','').replace('-',''); 
        console.log("searchbar submit");
        navigate(`/${url}`);
    }
    return (
        <div>
            <form onSubmit={submitForm}>
                <input
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                type="text"
                placeholder="Postcode..."
                className="input"
                />
                <IconButton type='submit' aria-label="send">
                    <SearchIcon />
                </IconButton>
            </form>
        </div>
        );
    };

export default SearchBar;