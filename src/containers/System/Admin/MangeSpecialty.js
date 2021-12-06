import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSpecilaty.scss';
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import * as actions from '../../../store/actions';
import { LANGUAGES, ACTIONS } from '../../../utils';
import { CommonUtils } from '../../../utils';
import { convertToImage } from '../../../components/Formating/GeneralClass';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            image: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            selectedImage: '',
            specialties: [],
            isEdit: false
        }
    }

    async componentDidMount() {
        await this.props.getAllSpecialtySuccess();
    }

    componentDidUpdate(preProps) {
        if(preProps.language!==this.props.language || preProps.specialties!==this.props.specialties) {
            this.setState({
                specialties: this.props.specialties
            })
        }
    }

    handleUpdate = (specialty) => {
        let imageBase64 = convertToImage(specialty.image);
        this.setState({
            id: specialty.id,
            name: specialty.name,
            image: '',
            selectedImage: imageBase64,
            descriptionHTML: specialty.descriptionHTML,
            descriptionMarkdown: specialty.descriptionMarkdown,
            isEdit: true
        })
    }

    handleDelete = async (id) => {
        await this.props.deleteSpecialtySuccess(id);
    }

    handleChangeInput = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleChangeImage = async (e) => {
        let file = e.target.files[0];
        if(file) {
            let image = URL.createObjectURL(file);
            let imageBase64 = await CommonUtils.convertBase64(file);
            this.setState({
                selectedImage: image,
                image: imageBase64
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }

    handleSubmit = () => {
        if(this.state.isEdit===false) {
            this.props.createInforSpecialtySuccess({
                name: this.state.name,
                image: this.state.image,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown
            });
        } else {
            this.props.updateSpecialtySuccess({
                id: this.state.id,
                name: this.state.name,
                image: this.state.image,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown
            })
        }
        
        this.setState({
            name: '',
            image: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            selectedImage: ''
        })
    }

    render() {
        let {name, selectedImage, descriptionMarkdown, specialties, isEdit} = this.state;
        return (
            <div className="container">
                <div className="doctor">
                    <div className="title"><FormattedMessage id="menu.specialty.title"/></div>
                    <div className="doctor-top">
                        <div className="doctor-top-left">
                            <label><FormattedMessage id="menu.specialty.choose-specialty"/></label>
                            <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => this.handleChangeInput(e)}
                                />
                        </div>
                        <div className="doctor-top-right form-group">
                            <div><FormattedMessage id="menu.specialty.choose-image"/></div>
                            <input
                                type="file"
                                hidden
                                id="image"
                                onChange={(e) => this.handleChangeImage(e)}
                            />
                            <label 
                                className="preview-btn"
                                htmlFor="image"
                            >
                                    <FormattedMessage id="menu.specialty.choose-image"/> <i className="fas fa-upload"></i>
                            </label>
                            <div 
                                className="preview-container"
                                style={{backgroundImage: `url(${selectedImage})`}}
                            >
                            </div>
                        </div>    
                    </div>
                    
                    <div className="doctor-editor">
                        <label><FormattedMessage id="menu.specialty.description"/></label>
                        <MdEditor 
                            value={descriptionMarkdown}
                            style={{ height: '500px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange} 
                        />
                    </div>
                    <button 
                        className="doctor-btn"
                        onClick = {this.handleSubmit}
                    >
                        {isEdit===true ? 'Save' : 'Create'}
                    </button>
                </div>
                <table id="customers">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>CreatedAt</th>
                                <th>UpdatedAt</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {specialties && specialties.length && specialties.map(specialty => (
                                <tr key={specialty.id}>
                                    <td>{specialty.id}</td>
                                    <td>{specialty.name}</td>
                                    <td>{specialty.createdAt}</td>
                                    <td>{specialty.updatedAt}</td>
                                    <td>
                                        <button 
                                                className="btn-edit"
                                                onClick={() => this.handleUpdate(specialty)}
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button 
                                                className="btn-delete"
                                                onClick={() => this.handleDelete(specialty.id)}
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                </table>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language, 
        specialties: state.admin.specialties
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createInforSpecialtySuccess: (data) => dispatch(actions.createInforSpecialtySuccess(data)),
        deleteSpecialtySuccess: (id) => dispatch(actions.deleteSpecialtySuccess(id)),
        getAllSpecialtySuccess: () => dispatch(actions.getAllSpecialtySuccess()),
        updateSpecialtySuccess: (data) => dispatch(actions.updateSpecialtySuccess(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
