import React from 'react';
import '../../App.css';
import './styles.css';
import {v4 as uid} from 'uuid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FilterListIcon from '@material-ui/icons/FilterList';
import { MenuItem, Input, Checkbox} from '@material-ui/core';
import { getAvailableSkills, getAvailableInterests, getAvailableCourses } from '../../actions/domainData';

/** The filters component for the user search screen.
 * props: onSubmit: a function to be called when the user applies their filters,
 *        which takes the new filter values as an argument
 */
class UserFilters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            year: 1,
            pey: false,
            skills: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Source: React website tutorial.
     */
    handleChange(event) {
        const target = event.target;
        // const value = target.type === 'checkbox' ? target.checked : target.value;
        let value;
        if (target.type === 'checkbox') {
            value = target.checked;
        } else if (target.type === 'select-multiple') {
            value = Array.from(target.selectedOptions).map(option => option.value);
        } else {
            value = target.value;
        }
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state);
        console.log("Filters updated.")
    }

    render() {

        const availableSkills = getAvailableSkills();

        return (
            <div className="userfilters">
                <h2>Filters</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="userfilters__filter">
                        <label>
                            <span className="userfilters__filterTitle" >Year</span>
                            <Select name="year" onChange={this.handleChange} value={this.state.year}>
                                <MenuItem value={1}>1+</MenuItem>
                                <MenuItem value={2}>2+</MenuItem>
                                <MenuItem value={3}>3+</MenuItem>
                                <MenuItem value={4}>4+</MenuItem>
                            </Select>
                        </label>
                    </div>
                    <div className="userfilters__filter">
                        <label>
                            <span className="userfilters__filterTitle" >PEY</span>
                            <Checkbox name="pey" onChange={this.handleChange} checked={this.state.pey} />
                        </label>
                    </div>
                    <div className="userfilters__filter">
                        <label>
                            <span className="userfilters__filterTitle" >Skills</span>
                            <Select name="skills" size={3} multiple onChange={this.handleChange} value={this.state.skills}>
                                {availableSkills.map(skill => <MenuItem key={uid()} value={skill}>{skill}</MenuItem>)}
                            </Select>
                        </label>
                    </div>
                    {/* <div className="userfilters__filter">
                        <label>
                            <span className="userfilters__filterTitle" >Interests</span>
                            <Select name="interests" size={3} multiple onChange={this.handleChange} value={this.state.interests} >
                                {availableInterests.map(interest => <MenuItem key={uid()} value={interest} >{interest}</MenuItem>)}
                            </Select>
                        </label>
                    </div> */}
                    {/* <div className="userfilters__filter">
                        <label>
                            <span className="userfilters__filterTitle" >Courses</span>
                            <Select name="courses" size={3} multiple onChange={this.handleChange} value={this.state.courses} >
                                {availableCourses.map(course => <MenuItem key={uid()} value={course}>{course}</MenuItem>)}
                            </Select>
                        </label>
                    </div> */}
                    <div className="userfilters__filter__button">
                        <Button 
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<FilterListIcon />}
                            >
                            Apply Filters
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default UserFilters;