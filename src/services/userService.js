import axios from '../axios';

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', {email, password});
}

const handleSignUp = (data) => {
    return axios.post('/api/sign-up', data);
}

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`);
}

const createNewUser = (data) => {
    return axios.post('/api/create-new-user', data);
}

const editUser = (data) => {
    return axios.put('/api/edit-user', data)
}

const deleteUser = (id) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: id
        }
    })
}

const getAllcode = (type) => {
    return axios.get(`/api/allcode?type=${type}`);
}

const getTopDoctorHome = () => {
    return axios.get(`/api/top-doctor-home`);
}

const getAllDoctors = () => {
    return axios.get('/api/get-all-doctors');
}

const saveInforDoctor = (data) => {
    return axios.post('/api/save-infor-doctor', data);
}

const getDetailDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
}

const fixInforDoctor = (data) => {
    return axios.put('/api/fix-infor-doctor', data);
}

const bulkCreateSchedule = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
}

const getScheduleByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`);
}

const deleteScheduleByDate = (doctorId, date, timeType) => {
    return axios.delete('/api/delete-schedule-by-date', {
        data: { doctorId, date, timeType }
        }
    );
}

const getGeneralClinic = (doctorId) => {
    return axios.get(`api/get-general-clinic?doctorId=${doctorId}`);
}

const getIntroDoctor = (id) => {
    return axios.get(`api/get-intro-doctor?id=${id}`);
}

const getMarkdownDoctor = (id) => {
    return axios.get(`api/get-markdown-doctor?id=${id}`);
}

const getDoctorForBooking = (doctorId, date) => {
    return axios.get(`api/get-doctor-for-booking?doctorId=${doctorId}&date=${date}`); 
}

const postPatientBooking = (data) => {
    return axios.post('api/patient-booking', data);
}

const postVerifyBooking = (data) => {
    return axios.post('api/post-verify-booking', data);
}

const createInforSpecialty = (data) => {
    return axios.post('api/create-infor-specialty', data);
}

const getAllSpecialty = () => {
    return axios.get('api/get-all-specialty');
}

const getGeneralSpecialty = () => {
    return axios.get('api/get-general-specialty');
}

const getDetailSpecialty = (id, location) => {
    return axios.get(`api/get-detail-specialty?id=${id}&location=${location}`);
}

const getDoctorsBySpecialty = (specialtyId) => {
    return axios.get(`api/get-doctors-by-specialty?specialtyId=${specialtyId}`);
}

const deleteSpecialty = (id) => {
    return axios.delete('api/delete-specialty', {
        data: {
            id: id
        }
    })
}

const updateSpecialty = (data) => {
    return axios.put('api/update-specialty', data);
}

const getPatients = (doctorId, date) => {
    return axios.get(`api/get-patients?doctorId=${doctorId}&date=${date}`)
}

const sendPrescription = (data) => {
    return axios.post('api/send-prescription', data)
}

const createInforClinic = (data) => {
    return axios.post('api/create-infor-clinic', data);
}

const getAllClinic = () => {
    return axios.get('api/get-all-clinic');
}

const getHomeClinic = () => {
    return axios.get('api/get-home-clinic');
}

const deleteClinic = (id) => {
    return axios.delete('api/delete-clinic', {
        data: {
            id: id
        }
    })
}

const updateClinic = (data) => {
    return axios.put('api/update-clinic', data);
}

const getDetailClinic = (id) => {
    return axios.get(`api/get-detail-clinic?id=${id}`);
}

const searchInformationDoctor = (keyword) => {
    return axios.get(`api/search-information-doctor?keyword=${keyword}`);
}

const searchInformationSpecialty = (keyword) => {
    return axios.get(`api/search-information-specialty?keyword=${keyword}`);
}

const searchInformationClinic = (keyword) => {
    return axios.get(`api/search-information-clinic?keyword=${keyword}`);
}

const getMedicalHistory = (id) => {
    return axios.get(`api/get-medical-history?id=${id}`);
}

const getMedicalBooking = (id) => {
    return axios.get(`api/get-medical-booking?id=${id}`);
}

const cancelBooking = (data) => {
    return axios.put('api/cancel-booking', data);
}

const getPatientInformation = (id) => {
    return axios.get(`api/get-patient-information?id=${id}`);
}

const updateInformation = (data) => {
    return axios.put('api/update-information', data);
}

const getAllBooking = (date) => {
    return axios.get(`api/get-all-booking?date=${date}`);
}

const createHandbook = (data) => {
    return axios.post('api/create-infor-handbook', data)
}

const getAllHandbook = () => {
    return axios.get('api/get-all-handbook');
}

const deleteHandbook = (id) => {
    return axios.delete('api/delete-handbook', {
        data: {
            id: id
        }
    })
}

const updateHandbook = (data) => {
    return axios.put('api/update-handbook', data);
}

const getDetailHandbook = (id) => {
    return axios.get(`api/get-detail-handbook?id=${id}`);
}

const getHomeHandbook = () => {
    return axios.get('api/get-home-handbook');
}


export {
            handleLoginApi, getAllUsers, handleSignUp,
            createNewUser, editUser, 
            deleteUser, getAllcode, 
            getTopDoctorHome, getAllDoctors, 
            saveInforDoctor, getDetailDoctor, 
            fixInforDoctor, bulkCreateSchedule,
            getScheduleByDate, getGeneralClinic, deleteScheduleByDate,
            getIntroDoctor, getMarkdownDoctor,
            getDoctorForBooking, postPatientBooking,
            postVerifyBooking, createInforSpecialty,
            getAllSpecialty, getDetailSpecialty,
            getGeneralSpecialty, getDoctorsBySpecialty,
            deleteSpecialty, updateSpecialty,
            getPatients, sendPrescription, 
            createInforClinic, getAllClinic, getDetailClinic,
            getHomeClinic, deleteClinic, updateClinic,
            searchInformationDoctor, getAllBooking,
            searchInformationSpecialty, updateInformation,
            searchInformationClinic, getMedicalHistory,
            getMedicalBooking, cancelBooking, getPatientInformation,
            createHandbook, getAllHandbook, deleteHandbook, updateHandbook,
            getDetailHandbook, getHomeHandbook
        };

