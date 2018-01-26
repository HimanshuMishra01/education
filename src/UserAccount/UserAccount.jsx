import React from "react";
import { render } from "react-dom";
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { Link } from 'react-router-dom';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class UserAccount extends React.Component {
  constructor() {
    super();
    this.renderEditable = this.renderEditable.bind(this);
    this.renderUpdateButton = this.renderUpdateButton.bind(this);
  }

  componentDidMount() {
      this.props.dispatch(userActions.getAllUsers());
  }

  handleClick(event) {
    console.log(" " + JSON.stringify(event));
  }

  renderUpdateButton(cellInfo) {
    return(
      <button className="btn btn-primary" onClick={e => {
        console.log("clicked^^^^^^ " + JSON.stringify(cellInfo));
        console.log("lastusername " + cellInfo.row.username + " username " + cellInfo.original.username
                  + " id " + cellInfo.column.id + " " + cellInfo.index);
        const updatedUserObject = {"standard":cellInfo.original.standard,
                          "username":cellInfo.original.username,"password":null,
                          "firstName":cellInfo.original.firstName,
                          "lastName":cellInfo.original.lastName,
                          "email":cellInfo.original.email,
                          "mobileNumber":cellInfo.original.mobileNumber,
                          "roles":cellInfo.original.roles,
                          "accountNonExpired":cellInfo.original.accountNonExpired,
                          "accountNonLocked":cellInfo.original.accountNonLocked,
                          "credentialsNonExpired":cellInfo.original.credentialsNonExpired,
                          "enabled":cellInfo.original.enabled,
                          "authorities":null};
        console.log("updatedUserObject " + JSON.stringify(updatedUserObject));
        this.props.dispatch(userActions.updateUser(cellInfo.row.username, updatedUserObject));
      }}
      >
        Update
      </button>
    )
  }

  renderEditable(cellInfo) {
    //console.log("cellInfo " + JSON.stringify(cellInfo.index) + " id " + cellInfo.column.id)
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.props.list];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          console.log("blurred data " + data[cellInfo.index][cellInfo.column.id]);
          //this.setState({ data });
        }}

        dangerouslySetInnerHTML={{
          __html: this.props.list[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }
  render() {
    //const { data, userList } = this.state;
    const {list} = this.props;
    return (
      <div>
        <p>
            <Link to="/register">Register User</Link>
        </p>
        <ReactTable
          data={list}
          columns={[
            {
              Header: "Username",
              accessor: "username",
              Cell: this.renderEditable
            },
            {
              Header: "First Name",
              accessor: "firstName",
              Cell: this.renderEditable
            },
            {
              Header: "Last Name",
              accessor: "lastName",
              Cell: this.renderEditable
            },
            {
              Header: "Email",
              accessor: "email",
              Cell: this.renderEditable
            },
            {
              Header: "mobileNumber",
              accessor: "mobileNumber",
              Cell: this.renderEditable
            },
            {
              Header: "roles",
              accessor: "roles",
              Cell: this.renderEditable
            },
            {
              Header: "enabled",
              accessor: "enabled",
              Cell: this.renderEditable
            },
            {
              Header: "accountNonExpired",
              accessor: "accountNonExpired",
              Cell: this.renderEditable
            },
            {
              Header: "accountNonLocked",
              accessor: "accountNonLocked",
              Cell: this.renderEditable
            },
            {
              Header: "credentialsNonExpired",
              accessor: "credentialsNonExpired",
              Cell: this.renderEditable
            },
            {
              Header: "Update",
              id: "update_user",
              Cell: this.renderUpdateButton
            },
            {
              Header: "Full Name",
              id: "full",
              accessor: d =>
                <div
                  dangerouslySetInnerHTML={{
                    __html: d.firstName + " " + d.lastName
                  }}
                />
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <p>
            <Link to="/login">Logout</Link>
        </p>
      </div>
    );
  }
}
function mapStateToProps(state) {
    const { userList } = state;
    const { list } = userList;
    return {
        list
    };
}

const connectedUserAccount = connect(mapStateToProps)(UserAccount);
export { connectedUserAccount as UserAccount };
