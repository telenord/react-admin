import React,{Component} from 'react';
import { jsonServerRestClient, Admin, Resource, Delete } from 'admin-on-rest';
import { PostList, PostEdit, PostCreate } from './components/Posts/Posts';
import { UserList } from './components/Users/Users';
import { RestClient } from 'aor-firebase-client';

import PostIcon from 'material-ui/svg-icons/action/book';
import UserIcon from 'material-ui/svg-icons/social/group';
import Dashboard from './components/Dashboard/Dashboard';
import authClient from './authClient';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions';


const firebaseConfig = {
  apiKey: "AIzaSyBuBohQTro3UtkMfDdG4l7ZqGXxf2TghXw",
  authDomain: "aor-test.firebaseapp.com",
  databaseURL: "https://aor-test.firebaseio.com",
  projectId: "aor-test",
  storageBucket: "aor-test.appspot.com",
  messagingSenderId: "139481925957"
};

const trackedResources = ['posts'];


class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignIn();
  }
  render() {
    const {isAuthenticated} = this.props;
    return (
      <Admin
        title="My Dashboard"
        authClient={authClient}
        dashboard={Dashboard}

        restClient={RestClient(trackedResources, firebaseConfig)}>
        <Resource
          name="posts"
          list={PostList}
          edit={isAuthenticated ? PostEdit : null}
          create={isAuthenticated ? PostCreate : null}
          remove={Delete}
          icon={PostIcon}
        />
        <Resource name="users" list={UserList} icon={UserIcon}/>
      </Admin>
    )
  }

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null,
  }
};
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));