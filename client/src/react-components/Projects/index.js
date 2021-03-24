import React from "react";
import './styles.css';
import Header from "../Header";
import SearchBar from "../SearchBar";
import ProjectList from "../ProjectList";
import ProjectFilters from "../ProjectFilters";
import { searchProjects } from "../../actions/project";
import {Link} from 'react-router-dom';

/** The Project search screen. */
class Projects extends React.Component {

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
        searchProjects(this.state.searchTerm, this.state.filters, (results) => {
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
                    <div className="projectsearch__left">
                        <ProjectFilters onSubmit={this.handleFilterUpdate} />
                    </div>
                    <div className="projectsearch__centre">
                        <SearchBar onSearch={this.handleSearch} />
                        <ProjectList results={this.state.results || []} />
                    </div>
                </div>
                <Link to="/create-project"><div className="projectsearch__new">+</div></Link>
            </React.Fragment>
        );
    }
}

export default Projects;