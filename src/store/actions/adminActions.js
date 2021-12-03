import actionTypes from './actionTypes';
import { createNewUser, deleteUser, getAllcode, getAllUsers, editUser, getTopDoctorHome, getAllDoctors, saveInforDoctor, getDetailDoctor, getGeneralClinic, getIntroDoctor, getDoctorForBooking, postPatientBooking } from '../../services/userService';
import { toast } from 'react-toastify';

export const adminLoginSuccess = (adminInfo) => ({
    type: actionTypes.ADMIN_LOGIN_SUCCESS,
    adminInfo: adminInfo
});

export const adminLoginFail = () => ({
    type: actionTypes.ADMIN_LOGIN_FAIL
});

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
});

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllcode('GENDER');
            if(res?.data && res.errCode===0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFail());
            }
        } catch(e) {
            dispatch(fetchGenderFail());
            console.log(e);
        }
    }
};

export const fetchGenderSuccess = (data) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: data
});

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
});

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_POSITION_START
            })
            let res = await getAllcode('POSITION');
            if(res?.data && res.errCode===0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFail());
            }
        } catch(e) {
            dispatch(fetchPositionFail());
            console.log(e);
        }
    }
};

export const fetchPositionSuccess = (data) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: data
});

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
});

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_ROLE_START
            })
            let res = await getAllcode('ROLE');
            if(res?.data && res.errCode===0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFail());
            }
        } catch(e) {
            dispatch(fetchRoleFail());
            console.log(e);
        }
    }
};

export const fetchRoleSuccess = (data) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: data
});

export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
});

// export const fetchTimeStart = () => {
//     return async (dispatch, getState) => {
//         try {
//             dispatch({
//                 type: actionTypes.FETCH_TIME_START
//             })
//             let res = await getAllcode('TIME');
//             if(res?.data && res.errCode===0) {
//                 dispatch(fetchTimeSuccess(res.data));
//             } else {
//                 dispatch(fetchTimeFail());
//             }
//         } catch(e) {
//             dispatch(fetchTimeFail());
//             console.log(e);
//         }
//     }
// };

// export const fetchTimeSuccess = (data) => ({
//     type: actionTypes.FETCH_TIME_SUCCESS,
//     data: data
// });

// export const fetchTimeFail = () => ({
//     type: actionTypes.FETCH_TIME_FAIL
// });

export const addNewUserSuccess = (userInfo) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUser(userInfo);
            if(res?.data) {
                if(res.data.errCode!==0) {
                    dispatch(addNewUserFail());
                    toast.warn(res.data.errMessage);
                } else {
                    await dispatch({
                        type: actionTypes.ADD_NEW_USER_SUCCESS,
                        data: res.data
                    });
                    await dispatch(getAllUsersSuccess());
                    toast.success('Create success!');
                }
            } else {
                dispatch(addNewUserFail());
                toast.warn('Create fail!')
            }
        } catch(e) {
            dispatch(addNewUserFail());
            toast.warn('Create fail!')
        }
    }
};

export const addNewUserFail = () => ({
    type: actionTypes.ADD_NEW_USER_FAIL
});

export const getAllUsersSuccess = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('ALL');
            if(res) {
                if(res.errCode!==0) {
                    dispatch(getAllUsersFail());
                    toast.warn(res.errMessage);
                } else {
                    dispatch({
                        type: actionTypes.GET_ALL_USERS_SUCCESS,
                        data: res.users.reverse()
                    })
                }
            }
        } catch(e) {
            dispatch(getAllUsersFail());
            toast.warn('Get all users fail!');
        }
    }
};

export const getAllUsersFail = () => ({
    type: actionTypes.GET_ALL_USERS_FAIL
});

export const deleteUserSuccess = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUser(id);
            if(res) {
                if(res.errCode!==0) {
                    dispatch(delelteUserFail());
                    toast.warn('Delete fail!');
                } else {
                    dispatch({
                        type: actionTypes.DELETE_USER_SUCCESS,
                    });
                    dispatch(getAllUsersSuccess());
                    toast.success('Delete success!')
                }
            }
        } catch(e) {
            dispatch(delelteUserFail());
            toast.warn('Delete fail!');
        }
    }
};

export const delelteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL
});

export const updateUserSuccess = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUser(data);
            if(res) {
                if(res.errCode!==0) {
                    dispatch(updateUserFail());
                    toast.warn('Update fail!');
                } else {
                    dispatch({
                        type: actionTypes.UPDATE_USER_SUCCESS,
                        data: data
                    });
                    dispatch(getAllUsersSuccess());
                    toast.success('Update success!')
                }
            }
        } catch(e) {
            dispatch(updateUserFail());
            toast.warn('Update fail!');
        }
    }
};

export const updateUserFail = () => ({
    type: actionTypes.UPDATE_USER_SUCCESS
});

export const getTopDoctorHomeSuccess = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHome(10);
            if(res.errCode!==0) {
                dispatch(getTopDoctorHomeFail());
                toast.warn('Get top doctor fail!');
            } else {
                dispatch({
                    type: actionTypes.GET_TOP_DOCTOR_HOME_SUCCESS,
                    data: res.doctors
                });
            }
        } catch(e) {
            dispatch(getTopDoctorHomeFail());
            toast.warn('Get top doctor home fail!');
        }
    }
};

export const getTopDoctorHomeFail = () => ({
    type: actionTypes.GET_TOP_DOCTOR_HOME_FAIL
});

export const getAllDoctorsSuccess = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if(res.errCode!==0) {
                dispatch(getAllDoctorsFail());
                toast.warn('Get all doctors fail!');
            } else {
                dispatch({
                    type: actionTypes.GET_ALL_DOCTORS_SUCCESS,
                    data: res.doctors
                });
            }
        } catch(e) {
            dispatch(getAllDoctorsFail());
            toast.warn('Get all doctors fail!');
        }
    }
};

export const getAllDoctorsFail = () => ({
    type: actionTypes.GET_ALL_DOCTORS_FAIL
});

export const saveInforDoctorSuccess = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveInforDoctor(data);
            if(res && res.errCode===0) {
                dispatch({
                    type: actionTypes.SAVE_INFOR_DOCTOR_SUCCESS,
                });
                toast.success('Save infor doctor success!');
            } else {
                dispatch(getAllDoctorsFail());
                toast.warn('Save infor doctor fail!');    
            }
        } catch(e) {
            dispatch(getAllDoctorsFail());
            toast.warn('Save infor doctor fail!');
        }
    }
};

export const saveInforDoctorFail = () => ({
    type: actionTypes.SAVE_INFOR_DOCTOR_FAIL
});

export const getDetailDoctorSuccess = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getDetailDoctor(id);
            if(res.errCode!==0) {
                dispatch(getDetailDoctorFail());
                toast.warn('Get detail doctor fail!');
            } else {
                dispatch({
                    type: actionTypes.GET_DETAIL_DOCTOR_SUCCESS,
                    data: res.infor
                });
            }
        } catch(e) {
            dispatch(getDetailDoctorFail());
            toast.warn('Get detail doctor fail!');
        }
    }
}

export const getDetailDoctorFail = () => ({
    type: actionTypes.GET_DETAIL_DOCTOR_FAIL
})

export const getScheduleHoursSuccess = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcode('TIME');
            if(res.errCode!==0) {
                dispatch(getScheduleHoursFail());
                toast.warn('Get schedule hours fail!');
            } else {
                dispatch({
                    type: actionTypes.GET_SCHEDULE_TIME_SUCCESS,
                    data: res.data
                });
            }
        } catch(e) {
            dispatch(getScheduleHoursFail());
            toast.warn('Get schedule hours fail!');
        }
    }
}

export const getScheduleHoursFail = () => ({
    type: actionTypes.GET_SCHEDULE_TIME_FAIL
})

export const fetchPriceSuccess = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcode('PRICE');
            if(res.errCode!==0) {
                dispatch(fetchPriceFail());
                toast.warn('Get price fail!');
            } else {

                dispatch({
                    type: actionTypes.FETCH_PRICE_SUCCESS,
                    data: res.data
                });
            }
        } catch(e) {
            dispatch(fetchPriceFail());
            toast.warn('Get price fail!');
        }
    }
}

export const fetchPriceFail = () => ({
    type: actionTypes.FETCH_PRICE_FAIL
})

export const fetchProvinceSuccess = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcode('PROVINCE');
            if(res.errCode!==0) {
                dispatch(fetchProvinceFail());
                toast.warn('Get province fail!');
            } else {

                dispatch({
                    type: actionTypes.FETCH_PROVINCE_SUCCESS,
                    data: res.data
                });
            }
        } catch(e) {
            dispatch(fetchProvinceFail());
            toast.warn('Get province fail!');
        }
    }
}

export const fetchProvinceFail = () => ({
    type: actionTypes.FETCH_PROVINCE_FAIL
})

export const fetchPaymentSuccess = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcode('PAYMENT');
            if(res.errCode!==0) {
                dispatch(fetchPaymentFail());
                toast.warn('Get payment fail!');
            } else {

                dispatch({
                    type: actionTypes.FETCH_PAYMENT_SUCCESS,
                    data: res.data
                });
            }
        } catch(e) {
            dispatch(fetchPaymentFail());
            toast.warn('Get payment fail!');
        }
    }
}

export const fetchPaymentFail = () => ({
    type: actionTypes.FETCH_PAYMENT_FAIL
})

export const getGeneralClinicSuccess = (doctorId) => {
    return async (dispatch, getState) => {
        try {
            let res = await getGeneralClinic(doctorId);
            if(res && res.errCode!==0) {
                dispatch(getGeneralClinicFail());
                toast.warn('Get general clinic fail');
            } else {
                dispatch({
                    type: actionTypes.GET_GENERAL_CLINIC_SUCCESS,
                    data: res.clinic
                })
            }
        } catch(e) {
            dispatch(getGeneralClinicFail());
            toast.warn('Get general clinic fail')
        }
    }
}

export const getGeneralClinicFail = ({
    type: actionTypes.GET_GENERAL_CLINIC_FAIL
});

export const getIntroDoctorSuccess = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getIntroDoctor(id);
            if(res && res.errCode!==0) {
                dispatch(getIntroDoctorFail());
                toast.warn('Get general clinic fail');
            } else {
                dispatch({
                    type: actionTypes.GET_INTRO_DOCTOR_SUCCESS,
                    data: res.intro
                })
            }
        } catch(e) {
            dispatch(getIntroDoctorFail());
            toast.warn('Get general clinic fail')
        }
    }
}

export const getIntroDoctorFail = ({
    type: actionTypes.GET_INTRO_DOCTOR_FAIL
})

export const getDoctorForBookingSuccess = (doctorId, date) => {
    return async (dispatch, getState) => {
        try {
            let res = await getDoctorForBooking(doctorId, date);
            if(res && res.errCode!==0) {
                dispatch(getDoctorForBookingFail());
            } else {
                dispatch({
                    type: actionTypes.GET_DOCTOR_FOR_BOOKING_SUCCESS,
                    data: res.data
                })
            }
        } catch(e) {
            dispatch(getDoctorForBookingFail());
        }
    }
}

export const getDoctorForBookingFail = ({
    type: actionTypes.GET_DOCTOR_FOR_BOOKING_FAIL
})

export const postPatientBookingSuccess = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await postPatientBooking(data);
            if(res && res.errCode===0) {
                dispatch({
                    type: actionTypes.POST_PATIENT_BOOKING_SUCCESS,
                });
                toast.success('Đặt lịch thành công. Vui lòng check email và xác nhận!');
            } else {
                dispatch(postPatientBookingFail());
                toast.warn('Bạn đã đặt lịch hẹn này!');    
            }
        } catch(e) {
            dispatch(postPatientBookingFail());
            toast.warn('Bạn đã đặt lịch hẹn này!');
        }
    }
};

export const postPatientBookingFail = () => ({
    type: actionTypes.POST_PATIENT_BOOKING_FAIL
});