import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './UserTableManage.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersArr: []
        }
    }

    async componentDidMount() {
        this.props.getAllUsersSuccess();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.usersArr!==this.props.usersArr) {
            this.setState({
                usersArr: this.props.usersArr
            })
        }
    }

    handleDelete = (id) => {
        this.props.deleteUserSuccess(id);
    }

    handleUpdate = (userInfo) => {
        this.props.handleUpdateFromParent(userInfo);
    }

    render() {
        return (
            <div className="users-container">
                <div className="users-table mt-4 mx-3">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.usersArr.length>0 && this.state.usersArr.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>{item.phonenumber}</td>
                                    <td>
                                        <button 
                                            className="btn-edit"
                                            onClick={() => this.handleUpdate(item)}
                                        >
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button 
                                            className="btn-delete"
                                            onClick={() => this.handleDelete(item.id)}
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        usersArr: state.admin.usersArr
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUsersSuccess: () => dispatch(actions.getAllUsersSuccess()),
        deleteUserSuccess: (id) => dispatch(actions.deleteUserSuccess(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
