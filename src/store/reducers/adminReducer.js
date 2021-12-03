import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    isLoadingPosition: false,
    isLoadingRole: false,
    isLoadingTime: false,
    isAdd: false,
    isDelete: false,
    isUpdate: false,
    isSaveInforDoctor: false,
    isLoadingDetailDoctor: false,
    isLoadingPrice: false,
    isLoadingPayment: false,
    isLoadingProvince: false,
    positions: [],
    genders: [],
    roles: [],
    prices: [],
    payments: [], 
    provinces: [],
    timeSchedule: [],
    times: [],
    datas: [],
    usersArr: [],
    topDoctorHome: [],
    doctors: [],
    detailDoctor: {},
    generalClinic: {},
    introDoctor: {},
    doctorForBooking: {}
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAIL:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_START:
            state.isLoadingPosition = true;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            state.isLoadingPosition = false;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAIL:
            state.isLoadingPosition = false;
            state.positions = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_START:
            state.isLoadingRole = true;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.isLoadingRole = false;
            state.roles = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAIL:
            state.isLoadingRole = false;
            state.roles = [];
            return {
                ...state
            }
        case actionTypes.FETCH_PRICE_SUCCESS:
            state.prices = action.data;
            state.isLoadingPrice = true;
            return {
                ...state
            }
        case actionTypes.FETCH_PRICE_FAIL:
            state.isLoadingPrice = false;
            state.prices = [];
            return {
                ...state
            }
        case actionTypes.FETCH_PROVINCE_SUCCESS:
            state.provinces = action.data;
            state.isLoadingProvince = true
            return {
                ...state
            }
        case actionTypes.FETCH_PROVINCE_FAIL:
            state.isLoadingProvince = false;
            state.provinces = [];
            return {
                ...state
            }
        case actionTypes.FETCH_PAYMENT_SUCCESS:
            state.payments = action.data;
            state.isLoadingPayment = true;
            return {
                ...state
            }
        case actionTypes.FETCH_PAYMENT_FAIL:
            state.isLoadingPayment =false
            state.payments = [];
            return {
                ...state
            }
        // case actionTypes.FETCH_TIME_START:
        //     state.isLoadingTime = true;
        //     return {
        //         ...state
        //     }
        // case actionTypes.FETCH_TIME_SUCCESS:
        //     state.isLoadingTime = false;
        //     state.timeSchedule = action.data;
        //     return {
        //         ...state
        //     }
        // case actionTypes.FETCH_TIME_FAIL:
        //     state.isLoadingTime = false;
        //     state.timeSchedule = [];
        //     return {
        //         ...state
        //     }
        case actionTypes.ADD_NEW_USER_SUCCESS:
            state.datas = action.data;
            state.isAdd = true;
            return {
                ...state,
            }
        case actionTypes.ADD_NEW_USER_FAIL:
            state.datas = [];
            state.isAdd = false
            return {
                ...state,
            }
        case actionTypes.GET_ALL_USERS_SUCCESS:
            state.usersArr = action.data;
            return {
                    ...state,
            }
        case actionTypes.GET_ALL_USERS_FAIL:
            state.usersArr = [];
            return {
                ...state,
            }
        case actionTypes.DELETE_USER_SUCCESS:
            state.isDelete = true;
            return {
                ...state,
            }
        case actionTypes.DELETE_USER_FAIL:
            state.isDelete = false
            return {
                ...state,
            }
        case actionTypes.UPDATE_USER_SUCCESS:
            state.isUpdate = true;
            return {
                ...state,
            }
        case actionTypes.UPDATE_USER_FAIL:
            state.isUpdate = false
            return {
                ...state,
            }
        case actionTypes.GET_TOP_DOCTOR_HOME_SUCCESS:
            state.topDoctorHome = action.data;
            return {
                ...state,
            }
        case actionTypes.GET_TOP_DOCTOR_HOME_FAIL:
            state.topDoctorHome = [];
            return {
                ...state,
            }
        case actionTypes.GET_ALL_DOCTORS_SUCCESS:
            state.doctors = action.data;
            return {
                ...state,
            }
        case actionTypes.GET_ALL_DOCTORS_FAIL:
            state.doctors = [];
            return {
                ...state,
            }
        case actionTypes.SAVE_INFOR_DOCTOR_SUCCESS:
            state.isSaveInforDoctor = true;
            return {
                ...state,
            }
        case actionTypes.SAVE_INFOR_DOCTOR_FAIL:
            state.isSaveInforDoctor = false;
            return {
                ...state,
            }
        case actionTypes.GET_DETAIL_DOCTOR_SUCCESS:
            state.isLoadingDetailDoctor = true;
            state.detailDoctor = action.data;
            return {
                ...state,
            }
        case actionTypes.GET_DETAIL_DOCTOR_FAIL:
            state.isLoadingDetailDoctor = false;
            state.detailDoctor = {};
            return {
                ...state,
            }
        case actionTypes.GET_SCHEDULE_TIME_SUCCESS:
            state.times = action.data;
            return {
                ...state,
            }
        case actionTypes.GET_SCHEDULE_TIME_FAIL:
            state.times = [];
            return {
                ...state,
            }
        case actionTypes.GET_GENERAL_CLINIC_SUCCESS:
            state.generalClinic = action.data;
            return {
                ...state,
            }
        case actionTypes.GET_GENERAL_CLINIC_FAIL:
            state.generalClinic = {};
            return {
                ...state,
            }
            case actionTypes.GET_INTRO_DOCTOR_SUCCESS:
            state.introDoctor = action.data;
            return {
                ...state,
            }
        case actionTypes.GET_INTRO_DOCTOR_FAIL:
            state.introDoctor = {};
            return {
                ...state,
            }
        case actionTypes.GET_DOCTOR_FOR_BOOKING_SUCCESS:
            state.doctorForBooking = action.data;
            return {
                ...state,
            }
        case actionTypes.GET_DOCTOR_FOR_BOOKING_FAIL:
            state.doctorForBooking = {};
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;