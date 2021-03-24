import React from "react";
import './styles.css';
import {v4 as uid} from 'uuid';
import Header from "../Header";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { getUserProfile, updateUserInfo } from "../../actions/user";
import { getAvailableSkills } from '../../actions/domainData';
import { Checkbox, Select, MenuItem } from "@material-ui/core";

/** The user search screen. */
class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          username: this.props.state.username,
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          year: 0,
          skills: [],
          pey: false
        }
        this.updateUserInfo = this.updateUserInfo.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    componentDidMount() {
      getUserProfile(this.props.state.username).then((user) => {
        this.setState({
          email: user.email,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          year: user.year,
          skills: user.skills,
          pey: user.pey
        });
      });
    }

    updateUserInfo() {
      updateUserInfo(this.state);
    }

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

    render() {
        const userdata = this.state;
        const availableSkills = getAvailableSkills();
        return (
            <React.Fragment>
                <Header state={this.props.state} />
                <div className="profileform">
                    Profile
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            disabled
                            id="userName"
                            label="User Name"
                            value={userdata.username}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            value={userdata.firstName}
                            variant="outlined"
                            onChange={this.handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            value={userdata.lastName}
                            variant="outlined"
                            onChange={this.handleChange}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                        </Grid>

                        <Grid item xs={12}>
                            Skills: <span>&nbsp;&nbsp;</span>
                          <Select name="skills" multiple value={userdata.skills} onChange={this.handleChange}>
                            {availableSkills.map(skill => <MenuItem key={uid()} value={skill}>{skill}</MenuItem>)}
                          </ Select>
                        </Grid>
                        <Grid item xs={12}>
                        </Grid>
                        <Grid item xs={12}>
                            PEY:
                          <Checkbox
                            id="pey"
                            label="PEY"
                            name="pey"
                            checked={this.state.pey}
                            onChange={this.handleChange}
                          />
                        </Grid>
                      </Grid>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className="save-button"
                        onClick={this.updateUserInfo} >
                        Save
                      </Button>
                </div>
            </React.Fragment>
        );
    }
}
export default UserProfile;