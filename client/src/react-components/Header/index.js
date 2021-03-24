import React from "react";
import '../../App.css';
import {getProfilePic} from "../../actions/user";
import {Link, withRouter} from 'react-router-dom';

/**
 * Props: global state: user
 */
class Header extends React.Component {

  render() {
    const profilePicPath = getProfilePic(this.props.state.username); // this method makes a server call
    const path = this.props.location.pathname;

    return (
      <div className="header" >
        <Link to="/projects">
          <button className={"header__main" + (path === '/projects' ? " header__main--selected" : "")}>
            Projects
          </button>
        </Link>
        <Link to="/user-search">
          <button className={"header__main" + (path === '/user-search' ? " header__main--selected" : "")}>
            User Search
          </button>
        </Link>
        <Link to="/chat">
          <button className={"header__main" + (path === '/chat' ? " header__main--selected" : "")}>
            Chat
          </button>
        </Link>
        {this.props.state.username && <Link to="/user-profile">}
          <span className="header__user">
            <img src={profilePicPath} className="header__userimage" alt="profile-pic" />
            <span className="header__username">{this.props.state.username}</span>
          </span>
        </Link>}
        {this.props.state.username && <Link to={"/logout"}><span className="header__logout">Log Out</span></Link>}
      </div>
    );
  }
}

export default withRouter(Header); // withRouter lets me use this.props.location.pathname
