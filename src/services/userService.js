import axios from '../axios';

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', {email, password});
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

const getTopDoctorHome = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
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

export {
            handleLoginApi, getAllUsers, 
            createNewUser, editUser, 
            deleteUser, getAllcode, 
            getTopDoctorHome, getAllDoctors, 
            saveInforDoctor, getDetailDoctor, 
            fixInforDoctor, bulkCreateSchedule,
            getScheduleByDate, getGeneralClinic,
            getIntroDoctor, getMarkdownDoctor,
            getDoctorForBooking, postPatientBooking,
            postVerifyBooking, createInforSpecialty,
            getAllSpecialty, getDetailSpecialty,
            getGeneralSpecialty, getDoctorsBySpecialty,
            deleteSpecialty, updateSpecialty,
            getPatients, sendPrescription, 
            createInforClinic, getAllClinic, getDetailClinic,
            getHomeClinic, deleteClinic, updateClinic
        };

