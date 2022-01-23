import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageClinic.scss';
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import * as actions from '../../../../store/actions';
import { CommonUtils } from '../../../../utils';
import { convertToImage } from '../../../../components/Formating/GeneralClass';
import { createInforClinic, deleteClinic, getAllClinic, updateClinic } from '../../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            image: '',
            address: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            professionalStrengthsHTML: '',
            professionalStrengthsMarkdown: '',
            equipmentsHTML: '',
            equipmentsMarkdown: '',
            selectedImage: '',
            clinics: [],
            isEdit: false
        }
    }

    async componentDidMount() {
        await this.getClinics();
    }

    getClinics = async () => {
        let res = await getAllClinic();
        if(res && res.errCode===0) {
            this.setState({
                clinics: res.clinics
            })
        }
    }

    componentDidUpdate(preProps) {
        if(preProps.language!==this.props.language || preProps.specialties!==this.props.specialties) {
            this.setState({
                specialties: this.props.specialties
            })
        }
    }

    handleUpdate = (clinic) => {
        let imageBase64 = convertToImage(clinic.image);
        this.setState({
            id: clinic.id,
            name: clinic.name,
            image: '',
            address: clinic.address,
            selectedImage: imageBase64,
            descriptionHTML: clinic.descriptionHTML,
            descriptionMarkdown: clinic.descriptionMarkdown,
            professionalStrengthsHTML: clinic.professionalStrengthsHTML,
            professionalStrengthsMarkdown: clinic.professionalStrengthsMarkdown,
            equipmentsHTML: clinic.equipmentsHTML,
            equipmentsMarkdown: clinic.equipmentsMarkdown,
            isEdit: true
        })
    }

    handleDelete = async (id) => {
        await deleteClinic(id);
        toast.success('success!');
        await this.getClinics();
    }

    handleChangeInput = (e, key) => {
        let newState = {...this.state};
        newState[key] = e.target.value;
        this.setState({
            ...newState
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

    handleChangeDescription = ({html, text}) => {
        
            this.setState({
                descriptionHTML: html,
                descriptionMarkdown: text
            })
    }

    handleChangeProfessionalStrength = ({html, text}) => {
        this.setState({
            professionalStrengthsHTML: html,
            professionalStrengthsMarkdown: text
        })
    }

    handleChangeEquipment = ({html, text}) => {
        this.setState({
            equipmentsHTML: html,
            equipmentsMarkdown: text
        })
    }

    handleSubmit = async () => {
        if(this.state.isEdit===false) {
            let res = await createInforClinic({
                name: this.state.name,
                image: this.state.image,
                address: this.state.address,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
                professionalStrengthsHTML: this.state.professionalStrengthsHTML,
                professionalStrengthsMarkdown: this.state.professionalStrengthsMarkdown,
                equipmentsHTML: this.state.equipmentsHTML,
                equipmentsMarkdown: this.state.equipmentsMarkdown
            });
            if (res && res.errCode===0) {
                toast.success('success!');
            } else {
                toast.warn('Fail!');
            }
            await this.getClinics();
        } else {
            let res = await updateClinic({
                id: this.state.id,
                name: this.state.name,
                image: this.state.image,
                address: this.state.address,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
                professionalStrengthsHTML: this.state.professionalStrengthsHTML,
                professionalStrengthsMarkdown: this.state.professionalStrengthsMarkdown,
                equipmentsHTML: this.state.equipmentsHTML,
                equipmentsMarkdown: this.state.equipmentsMarkdown
            });
            if (res && res.errCode===0) {
                toast.success('success!');
            } else {
                toast.warn('Fail!');
            }
            await this.getClinics();
        }
        
        this.setState({
            name: '',
            image: '',
            address: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            professionalStrengthsHTML: '',
            professionalStrengthsMarkdown: '',
            equipmentsHTML: '',
            equipmentsMarkdown: '',
            selectedImage: ''
        })
    }

    render() {
        let {name, address, selectedImage, descriptionMarkdown, professionalStrengthsMarkdown, equipmentsMarkdown, clinics, isEdit} = this.state;
        return (
            <div className="container">
                <div className="doctor">
                    <div className="title"><FormattedMessage id="menu.clinic.title"/></div>
                    
                        <div className="row">
                            <div className="col-6">
                                <label className="choose-title"><FormattedMessage id="menu.clinic.choose-clinic"/></label>
                                <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => this.handleChangeInput(e, 'name')}
                                />
                            </div>
                            <div className="col-6">
                                <label className="choose-title"><FormattedMessage id="menu.clinic.address"/></label>
                                <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Address"
                                        value={address}
                                        onChange={(e) => this.handleChangeInput(e, 'address')}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="choose-title"><FormattedMessage id="menu.clinic.choose-image"/></div>
                            <input
                                type="file"
                                hidden
                                id="image"
                                onChange={(e) => this.handleChangeImage(e)}
                            />
                            <label 
                                className="clinic-btn"
                                htmlFor="image"
                            >
                                <i className="clinic-btn-upload fas fa-upload"></i>
                            </label>
                            <div 
                                className="clinic-avatar container"
                                style={{backgroundImage: `url(${selectedImage})`}}
                            >
                            </div>
                        </div>    
                    
                    <div className="editor">
                        <div className="editor-item">
                            <label className="choose-title"><FormattedMessage id="menu.clinic.description"/></label>
                            <MdEditor 
                                value={descriptionMarkdown}
                                style={{ height: '300px' }} 
                                renderHTML={text => mdParser.render(text)} 
                                onChange={this.handleChangeDescription} 
                            />
                        </div>
                        <div className="editor-item">
                            <label className="choose-title"><FormattedMessage id="menu.clinic.professionalStrengths"/></label>
                            <MdEditor 
                                value={professionalStrengthsMarkdown}
                                style={{ height: '300px' }} 
                                renderHTML={text => mdParser.render(text)} 
                                onChange={this.handleChangeProfessionalStrength} 
                            />
                        </div>
                        <div className="editor-item">
                            <label className="choose-title"><FormattedMessage id="menu.clinic.equipments"/></label>
                            <MdEditor 
                                value={equipmentsMarkdown}
                                style={{ height: '300px' }} 
                                renderHTML={text => mdParser.render(text)} 
                                onChange={this.handleChangeEquipment} 
                            />
                        </div>
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
                                <th>Name</th>
                                <th>Address</th>
                                <th>CreatedAt</th>
                                <th>UpdatedAt</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(clinics && clinics.length>0) ? clinics.map(clinic => (
                                <tr key={clinic.id}>
                                    <td>{clinic.id}</td>
                                    <td>{clinic.name}</td>
                                    <td>{clinic.address}</td>
                                    <td>{clinic.createdAt}</td>
                                    <td>{clinic.updatedAt}</td>
                                    <td>
                                        <button 
                                                className="btn-edit"
                                                onClick={() => this.handleUpdate(clinic)}
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button 
                                                className="btn-delete"
                                                onClick={() => this.handleDelete(clinic.id)}
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                    </td>
                                </tr>
                            )) : <tr>
                                    <td colSpan="8" style={{textAlign: 'center'}}>No data</td>
                                </tr>}
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createInforClinicSuccess: (data) => dispatch(actions.createInforClinicSuccess(data)),
        deleteSpecialtySuccess: (id) => dispatch(actions.deleteSpecialtySuccess(id)),
        getAllSpecialtySuccess: () => dispatch(actions.getAllSpecialtySuccess()),
        updateSpecialtySuccess: (data) => dispatch(actions.updateSpecialtySuccess(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
