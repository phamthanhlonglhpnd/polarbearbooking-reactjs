import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { LANGUAGES, ACTIONS } from '../../../utils';
import './ManageDoctor.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailDoctor } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // save to Markdown
            contentHTML: '',
            contentMarkdown: '',
            selectedOption: {},
            description: '',

            //save to Doctor_Infor
            doctorArr: [],
            clinicArr: [],
            clinicId: '',
            specialtyId:'',
            specialtyArr: [],
            priceArr: [],
            paymentArr: [],
            provinceArr: [],
            selectedClinic: '',
            selectedSpecialty: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            addressClinic: '',
            nameClinic: '',
            note: '',
            hasOldData: false
        }
    }

    async componentDidMount() {
        await this.props.getAllDoctorsSuccess();
        await this.props.fetchPriceSuccess();
        await this.props.fetchPaymentSuccess();
        await this.props.fetchProvinceSuccess();
        await this.props.getGeneralSpecialtySuccess();
    }

    convertOption = (doctorArr) => {
        let newDoctorArr = [];
        let {language} = this.props;
        if(doctorArr && doctorArr.length>0) {
            newDoctorArr = doctorArr.map(item => ({
                value: item.id,
                label: language===LANGUAGES.VI ? `${item.firstName} ${item.lastName}` : `${item.lastName} ${item.firstName}`
            }));
        }
        return newDoctorArr;
    }

    convert = (itemArr, type) => {
        let newArr = [];
        let {language} = this.props;
        if(itemArr && itemArr.length>0) {
            if(type==='PROVINCE' || type==='PRICE' || type==='PAYMENT') {
                newArr = itemArr.map(item => ({
                    value: item.keyMap,
                    label: language===LANGUAGES.VI ? item.valueVi : item.valueEn
                }));
            };
            if(type==='SPECIALTY') {
                newArr = itemArr.map(item => ({
                    value: item.id,
                    label: item.name
                }));
            } 
        }
        return newArr
    }

    convertObject = (object, key1, key2, type) => {
        let newObject = {};
        let {language} = this.props;
        if(type==='PROVINCE' || type==='PRICE' || type==='PAYMENT') {
            newObject.value = object[key1];
            newObject.label = language===LANGUAGES.VI ? object[key2].valueVi : object[key2].valueEn;
        }
        if(type==='SPECIALTY') {
            newObject.value = object[key1];
            newObject.label = object[key2];
        }
        return newObject;
    }

    componentDidUpdate(prevProps) {
        if(prevProps.doctors !== this.props.doctors 
            || prevProps.language !== this.props.language 
            || prevProps.provinces !== this.props.provinces 
            || prevProps.prices !== this.props.prices 
            || prevProps.payments !== this.props.payments
            || prevProps.generalSpecialties !== this.props.generalSpecialties
        ) 
        {
            let doctorSelect = this.convertOption(this.props.doctors);
            let priceSelect = this.convert(this.props.prices, 'PRICE');
            let provinceSelect = this.convert(this.props.provinces, 'PROVINCE');
            let paymentSelect = this.convert(this.props.payments, 'PAYMENT');
            let specialtySelect = this.convert(this.props.generalSpecialties, 'SPECIALTY');
            this.setState({
                doctorArr: doctorSelect,
                priceArr: priceSelect,
                provinceArr: provinceSelect,
                paymentArr: paymentSelect,
                specialtyArr: specialtySelect
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        })
    }

    handleChange = async (selectedOption) => {
        this.setState({selectedOption});
        let res = await getDetailDoctor(selectedOption.value);
        if(res?.infor?.Markdown && res.errCode===0) {
            let data = res.infor.Markdown;
            
            if(data.contentHTML!==null 
                && data.contentMarkdown!==null 
                && data.description!==null
                ) {
                this.setState({
                contentHTML: data.contentHTML,
                description: data.description,
                contentMarkdown: data.contentMarkdown,
                hasOldData: true
            });
            } else {
                this.setState({
                    contentHTML: '',
                    contentMarkdown: '',
                    description: '',
                    hasOldData: false
                })
            }    
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }  
        
        if(res?.inforDoctor && res.errCode===0) {
            let inforDoctor = res.inforDoctor;
            let payment = this.convertObject(inforDoctor, 'paymentId', 'paymentData', 'PAYMENT');
            let price = this.convertObject(inforDoctor, 'priceId', 'priceData', 'PRICE');
            let province =  this.convertObject(inforDoctor, 'provinceId', 'provinceData', 'PROVINCE');
            let specialty = this.convertObject(inforDoctor.specialty, 'id', 'name', 'SPECIALTY');
            if(inforDoctor.priceId!==null
                && inforDoctor.provinceId!==null
                && inforDoctor.paymentId!==null
                && inforDoctor.addressClinic!==null
                && inforDoctor.nameClinic!==null
                && inforDoctor.specialty!==null
            ) {
                    this.setState({
                        addressClinic: inforDoctor.addressClinic,
                        nameClinic: inforDoctor.nameClinic,
                        note: inforDoctor.note,
                        selectedPayment: payment,
                        selectedPrice: price,
                        selectedProvince: province,
                        selectedSpecialty: specialty
                    })
                } else {
                    this.setState({
                        addressClinic: '',
                        nameClinic: '',
                        note: '',
                        selectedPayment: '',
                        selectedPrice: '',
                        selectedProvince: '',
                        selectedSpecialty: ''
                    })
                }
        } else {
            this.setState({
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedSpecialty: ''
            })
        }
    };

    handleChangeSelect = (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = {...this.state};
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        }) 
    }

    handleChangeInput = (e, key) => {
        let stateCopy = {...this.state}
        stateCopy[key] = e.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleChangeDesc = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    handleSubmit = () => {
        let{hasOldData} = this.state;
        this.props.saveInforDoctorSuccess({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            doctorId: this.state.selectedOption.value,
            specialtyId: this.state.selectedSpecialty.value,
            description: this.state.description,
            action: hasOldData === true ? ACTIONS.EDIT : ACTIONS.CREATE,
            provinceId: this.state.selectedProvince.value,
            priceId: this.state.selectedPrice.value,
            paymentId: this.state.selectedPayment.value,
            note: this.state.note,
            addressClinic: this.state.addressClinic,
            nameClinic: this.state.nameClinic
        });
        this.setState({
            contentHTML: '',
            contentMarkdown: '',
            selectedOption: '',
            description: '',
            hasOldData: false,
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            addressClinic: '',
            nameClinic: '',
            note: ''
        })
        
    }

    render() {
        return (
            <div className="doctor">
                <div className="title"><FormattedMessage id="menu.admin.doctor-infor"/></div>
                <div className="doctor-top">
                    <div className="doctor-top-left">
                        <label><FormattedMessage id="menu.admin.choose-doctor"/></label>
                        <Select
                            value={this.state.selectedOption}
                            name="selectedOption"
                            onChange={this.handleChange}
                            options={this.state.doctorArr}
                        />
                    </div>
                    <div className="doctor-top-right form-group">
                        <label><FormattedMessage id="menu.admin.information"/></label>
                        <textarea 
                            className="form-control" 
                            rows = "4"
                            value={this.state.description}
                            onChange = {(e) => this.handleChangeDesc(e)}
                        >

                        </textarea>
                    </div>    
                </div>
                <div className="doctor-bottom">
                    <div className="row form-group">
                        <div className="col-6">
                            <label><FormattedMessage id="menu.admin.choose-clinic"/></label>
                            <Select
                                value={this.state.selectedClinic}
                                name="selectedClinic"
                                onChange={this.handleChangeSelect}
                                options={this.state.clinicArr}
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
                    <div className="row form-group">
                        <div className="col-4">
                            <label><FormattedMessage id="menu.admin.name-clinic"/></label>
                            <input 
                                className="form-control"
                                value={this.state.nameClinic}
                                onChange={(e) => this.handleChangeInput(e, 'nameClinic')}
                            />
                        </div>
                        <div className="col-4">
                            <label><FormattedMessage id="menu.admin.address-clinic"/></label>
                            <input 
                                className="form-control"
                                value={this.state.addressClinic}
                                onChange={(e) => this.handleChangeInput(e, 'addressClinic')}
                            />
                        </div>
                        <div className="col-4">
                            <label><FormattedMessage id="menu.admin.city"/></label>
                            <Select
                                value={this.state.selectedProvince}
                                name="selectedProvince"
                                onChange={this.handleChangeSelect}
                                options={this.state.provinceArr}
                            />
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-4">
                            <label><FormattedMessage id="menu.admin.price"/></label>
                            <Select
                                value={this.state.selectedPrice}
                                name="selectedPrice"
                                onChange={this.handleChangeSelect}
                                options={this.state.priceArr}
                            />
                        </div>
                        <div className="col-4">
                            <label><FormattedMessage id="menu.admin.payment"/></label>
                            <Select
                                value={this.state.selectedPayment}
                                name="selectedPayment"
                                onChange={this.handleChangeSelect}
                                options={this.state.paymentArr}
                            />
                        </div>
                        <div className="col-4">
                            <label><FormattedMessage id="menu.admin.note"/></label>
                            <input 
                                className="form-control"
                                value={this.state.note}
                                onChange={(e) => this.handleChangeInput(e, 'note')}
                            />
                        </div>
                    </div>   
                </div>
                <div className="doctor-editor">
                    <MdEditor 
                        value={this.state.contentMarkdown}
                        style={{ height: '500px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange} 
                    />
                </div>
                <button 
                    className="doctor-btn"
                    onClick = {this.handleSubmit}
                >
                    {this.state.hasOldData===true ? 'Save' : 'Create'}
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        doctors: state.admin.doctors,
        prices: state.admin.prices,
        payments: state.admin.payments,
        provinces: state.admin.provinces,
        generalSpecialties: state.admin.generalSpecialties
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorsSuccess: () => dispatch(actions.getAllDoctorsSuccess()),
        saveInforDoctorSuccess: (data) => dispatch(actions.saveInforDoctorSuccess(data)),
        getDetailDoctorSuccess: (id) => dispatch(actions.getDetailDoctorSuccess(id)),
        fetchPriceSuccess: () => dispatch(actions.fetchPriceSuccess()),
        fetchProvinceSuccess: () => dispatch(actions.fetchProvinceSuccess()),
        fetchPaymentSuccess: () => dispatch(actions.fetchPaymentSuccess()),
        getGeneralSpecialtySuccess: () => dispatch(actions.getGeneralSpecialtySuccess())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);

