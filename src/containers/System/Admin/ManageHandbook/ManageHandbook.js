import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageHandbook.scss';
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import * as actions from '../../../../store/actions';
import { CommonUtils } from '../../../../utils';
import { convertToImage } from '../../../../components/Formating/GeneralClass';
import { createHandbook, deleteHandbook, getAllHandbook, updateHandbook } from '../../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageHandbook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            image: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            selectedImage: '',
            specialtyId:'',
            specialtyArr: [],
            selectedSpecialty: '',
            handbooks: [],
            isEdit: false
        }
    }

    async componentDidMount() {
        await this.props.getGeneralSpecialtySuccess();
        this.setHandbook();
    }

    setHandbook = async () => {
        let res = await getAllHandbook();
        if(res.errCode===0) {
            this.setState({
                handbooks: res.handbooks
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.language!==this.props.language || prevProps.generalSpecialties !== this.props.generalSpecialties) {
            let specialtySelect = this.convert(this.props.generalSpecialties, 'SPECIALTY');
            this.setState({
                specialtyArr: specialtySelect
            })
        }
    }

    handleUpdate = (handbook) => {
        let imageBase64 = convertToImage(handbook.image);
        let object = {};
        object.label = handbook.specialtyHandbook?.name;
        object.value = handbook.specialtyId;
        this.setState({
            id: handbook.id,
            title: handbook.title,
            image: '',
            selectedImage: imageBase64,
            selectedSpecialty: object,
            descriptionHTML: handbook.descriptionHTML,
            descriptionMarkdown: handbook.descriptionMarkdown,
            isEdit: true
        })
    }

    convert = (itemArr, type) => {
        let newArr = [];
        if(itemArr && itemArr.length>0) {
            if(type==='SPECIALTY') {
                newArr = itemArr.map(item => ({
                    value: item.id,
                    label: item.name
                }));
            } 
        }
        return newArr
    }

    handleChangeSelect = (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = {...this.state};
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        }) 
    }

    handleDelete = async (id) => {
        let res = await deleteHandbook(id);
        if(res.errCode===0) {
            toast.success("Success!")
        } else {
            toast.warn("Fail!")
        }
        this.setHandbook();
    }

    handleChangeInput = (e) => {
        this.setState({
            title: e.target.value
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

    handleSubmit = async () => {
        if(this.state.isEdit===false) {
            let res = await createHandbook({
                title: this.state.title,
                image: this.state.image,
                specialtyId: this.state.selectedSpecialty.value, 
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown
            }); 
            if(res?.errCode===0) {
                toast.success('Success!')
            }
            if(res?.errCode===1) {
                toast.warn('Fail!')
            }
        } else {
            let res = await updateHandbook({
                id: this.state.id,
                title: this.state.title,
                image: this.state.image,
                specialtyId: this.state.selectedSpecialty.value, 
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown
            })
            if(res.errCode===0) {
                toast.success('Success!');
            } else {
                toast.warn('Fail!');
            }
        }
        
        this.setHandbook();
        
        this.setState({
            title: '',
            image: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            selectedImage: '',
            selectedSpecialty: '',
            isEdit: false
        })
    }

    render() {
        let {title, selectedImage, descriptionMarkdown, handbooks, isEdit} = this.state;
        return (
            <div className="container">
                <div className="doctor">
                    <div className="title"><FormattedMessage id="menu.handbook.title"/></div>
                    <div className="row">
                        <div className="col-6">
                            <label><FormattedMessage id="menu.handbook.choose-handbook"/></label>
                            <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Name"
                                    value={title}
                                    onChange={(e) => this.handleChangeInput(e)}
                                />
                        </div>
                        <div className="col-6">
                            <label><FormattedMessage id="menu.admin.choose-specialty"/></label>
                            <Select
                                value={this.state.selectedSpecialty}
                                name="selectedSpecialty"
                                onChange={this.handleChangeSelect}
                                options={this.state.specialtyArr}
                            />
                        </div>    
                    </div>
                    <div className='row'>
                        <div className="col-12">
                            <div><FormattedMessage id="menu.handbook.choose-image"/></div>
                            <input
                                type="file"
                                hidden
                                id="image"
                                onChange={(e) => this.handleChangeImage(e)}
                            />
                            <label 
                                className="specialty-btn"
                                htmlFor="image"
                            >
                                    <i className="specialty-btn-upload fas fa-upload"></i>
                            </label>
                            <div 
                                className="specialty-avatar"
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
                        onClick = {() => this.handleSubmit()}
                    >
                        {isEdit===true ? 'Save' : 'Create'}
                    </button>
                </div>
                <table id="customers">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Specialty</th>
                                <th>CreatedAt</th>
                                <th>UpdatedAt</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {handbooks && handbooks.length && handbooks.map(handbook => (
                                <tr key={handbook.id}>
                                    <td>{handbook.id}</td>
                                    <td>{handbook.title}</td>
                                    <td>{handbook.specialtyHandbook?.name}</td>
                                    <td>{handbook.createdAt}</td>
                                    <td>{handbook.updatedAt}</td>
                                    <td>
                                        <button 
                                                className="btn-edit"
                                                onClick={() => this.handleUpdate(handbook)}
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button 
                                                className="btn-delete"
                                                onClick={() => this.handleDelete(handbook.id)}
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
        generalSpecialties: state.admin.generalSpecialties,
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGeneralSpecialtySuccess: () => dispatch(actions.getGeneralSpecialtySuccess())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
