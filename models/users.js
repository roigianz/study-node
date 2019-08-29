var moment = require('moment');
module.exports = app => {
    const common = app.models.common;
    const users = app.db.models.users;
    return {
        getUsers: (callback) => {
            let jsonRes = {};
            users.findAll({ attributes: ['userName', 'userAge'] })
                .then((result) => {
                    jsonRes.error = common.setRes_ok('GET', 'users');
                    jsonRes.users = result;
                    return callback(jsonRes);
                })
                .catch((err) => {
                    jsonRes.error = common.setRes_error(0);
                    jsonRes.users = [];
                    return callback(jsonRes);
                })
        },
        postUsers: (jsonReq, callback) => {
            let jsonRes = {};
            users.bulkCreate(jsonReq.body, {validate: true})
            .then(() => {
                jsonRes.error = common.setRes_ok('POST', 'users');                     
                return callback(jsonRes);                
            })
            .catch((err) => {
                jsonRes.error = common.setRes_error();
                jsonRes.error.desc = err.message;
                return callback(jsonRes);
            })
        },        
        getUser: (userName, callback) => {
            let jsonRes = {};
            users.findOne({ where: { userName: userName }, attributes: ['userName', 'userAge']})
                .then((result) => {
                    if (result === null) {
                        jsonRes.error = common.setRes_warning(userName);
                        jsonRes.users = {};
                        return callback(jsonRes);
                    }
                    else {
                        jsonRes.error = common.setRes_ok('GET', 'users');
                        jsonRes.users = result;
                        return callback(jsonRes);
                    }
                })
                .catch(() => {
                    jsonRes.error = common.setRes_error(0);
                    jsonRes.users = {};
                    return callback(jsonRes);
                })
        },
        putUser: (jsonReq, callback) => {
            let jsonRes = {};
            users.findOne({ where: { userName: jsonReq.params.userName }, attributes: ['userName', 'userAge']})
                .then((result) => {
                    if (result === null) {
                        jsonRes.error = common.setRes_warning(jsonReq.params.userName);
                        jsonRes.users = {};
                        return callback(jsonRes);
                    }
                    else {
                        users.update(jsonReq.body, { where: { userName: jsonReq.params.userName } })
                            .then(() => {                    
                                jsonRes.error = common.setRes_ok('PUT', 'users');
                                return callback(jsonRes);                    
                            })
                            .catch((err) => {
                                jsonRes.error = common.setRes_error();
                                if (err.fields != undefined) {
                                    jsonRes.error.desc = 'Duplicate ' + err.fields[0].toString() + '.';
                                    return callback(jsonRes);
                                }
                                else {
                                    jsonRes.error.desc = err.message;
                                    return callback(jsonRes);
                                }
                            })
                    }
                })
                .catch(() => {
                    jsonRes.error = common.setRes_error(0);
                    jsonRes.users = {};
                    return callback(jsonRes);
                })            
        },
        deleteUser: (jsonReq, callback) => {
            let jsonRes = {};
            users.destroy({ where: { userName: jsonReq.params.userName } })
                .then((result) => {
                    if (result !== 0) {                        
                        jsonRes.error = common.setRes_ok('DELETE', 'users');
                        return callback(jsonRes);
                    }
                    else {
                        jsonRes.error = common.setRes_warning(jsonReq.params.userName);
                        return callback(jsonRes);
                    }
                })
                .catch(() => {
                    jsonRes.error = common.setRes_error(0);
                    return callback(jsonRes);
                })
        }
    }
}