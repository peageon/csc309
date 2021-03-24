import React from "react";
import '../../App.css';
import './styles.css';

/** A reusable search bar component.
 * Props: onSearch: function with argument of search text
*/
class SearchBar extends React.Component {

    render() {

        const performSearch = (event) => {
            if ((event.keyCode === 13) || (event.keyCode === 9)) { // Enter was pressed
                const value = event.target.value;
                this.props.onSearch(value);
            }
        }

        return (
            <div className="searchbar">
                <input type="text" name="search" placeholder="Search..." onKeyDown={performSearch} />
            </div>
        );
    }
}

export default SearchBar;
