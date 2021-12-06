import moment from "moment";
import {LANGUAGES} from '../../utils';

export const formatPrice = (price) => {
    
}

export const formatImage = (image) => {
    let imageBase64 = '';
        if(image) {
            imageBase64 = new Buffer(image, 'base64').toString('binary');
        }
        return imageBase64;
}

export const setDate = (language) => {
    let arrDate = [];
    for(let i=0; i<7; i++) {
        let object = {};
        let dateVi = i>0 ? moment(new Date()).add(i, 'days').locale('vi').format('dddd - DD/MM') : 'Hôm nay - ' + moment(new Date()).add(0, 'days').locale('vi').format('DD/MM');
        let dateEn = i>0 ? moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM') : 'Today - ' + moment(new Date()).add(i, 'days').locale('en').format('DD/MM');
        object.lable = language === LANGUAGES.VI ? dateVi.charAt(0).toUpperCase() + dateVi.slice(1) : dateEn;
        object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
        arrDate.push(object);
    }
    return arrDate;
}

export const checkObject = (object) => {
    
}

export const convertSelectedOption = (itemArr, language) => {
    let newArr = [];
    
    if(itemArr && itemArr.length>0) {
        newArr = itemArr.map(item => ({
            value: item.keyMap,
            label: language===LANGUAGES.VI ? item.valueVi : item.valueEn
        }));
    }
    return newArr
}

export const convertToImage = (item) => {
    let imageBase64 = '';
    if(item) {
        imageBase64 = new Buffer(item, 'base64').toString('binary');
    }
    return imageBase64;
}

export const convertObject = (object, key1, key2, type, language) => {
    let newObject = {};
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

export const convert = (itemArr, type, language) => {
    let newArr = [];
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
