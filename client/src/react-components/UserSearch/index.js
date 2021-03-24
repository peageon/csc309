import React from "react";
import './styles.css';
import Header from "../Header";
import SearchBar from "../SearchBar";
import UserList from "../UserList";
import UserFilters from "../UserFilters";
import { searchUsers } from "../../actions/user";

/** The user search screen. */
class UserSearch extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            searchTerm: "",
            filters: {},
            results: []
        }

        this.performSearch = this.performSearch.bind(this);
        this.handleFilterUpdate = this.handleFilterUpdate.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    componentDidMount() {
        this.performSearch()
    }

    performSearch() {
        // server call
        searchUsers(this.state.searchTerm, this.state.filters, (results) => {
            this.setState({results: results});
        })
    }

    handleFilterUpdate(newFilters) {
        this.setState({filters: newFilters}, this.performSearch)
    }

    handleSearch(term) {
        this.setState({searchTerm: term}, this.performSearch)
    }

    render() {
        
        return (
            <React.Fragment>
                <Header state={this.props.state} />
                <div>
                    <div className="usersearch__left">
                        <UserFilters onSubmit={this.handleFilterUpdate} />
                    </div>
                    <div className="usersearch__centre">
                        <SearchBar onSearch={this.handleSearch} />
                        <UserList results={this.state.results || []} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default UserSearch;