var moment = require('moment');
module.exports = app => {
    const common = app.models.common;
    const products = app.db.models.products;
    return {
        getProducts: (callback) => {
            let jsonRes = {};
            products.findAll({ attributes: ['productName', 'productPrice'] })
                .then((result) => {
                    jsonRes.error = common.setRes_ok('GET', 'products');
                    jsonRes.products = result;
                    return callback(jsonRes);
                })
                .catch((err) => {
                    jsonRes.error = common.setRes_error(0);
                    jsonRes.products = [];
                    return callback(jsonRes);
                })
        },
        postProducts: (jsonReq, callback) => {
            let jsonRes = {};
            products.bulkCreate(jsonReq.body, {validate: true})
            .then(() => {
                jsonRes.error = common.setRes_ok('POST', 'products');
                return callback(jsonRes);
            })
            .catch((err) => {
                jsonRes.error = common.setRes_error();
                jsonRes.error.desc = err.message;
                return callback(jsonRes);
            })
        },
        getProduct: (productName, callback) => {
            let jsonRes = {};
            products.findOne({ where: { productName: productName }, attributes: ['productName', 'productPrice']})
                .then((result) => {
                    if (result === null) {
                        jsonRes.error = common.setRes_warning(productName);
                        jsonRes.products = {};
                        return callback(jsonRes);
                    }
                    else {
                        jsonRes.error = common.setRes_ok('GET', 'products');
                        jsonRes.products = result;
                        return callback(jsonRes);
                    }
                })
                .catch(() => {
                    jsonRes.error = common.setRes_error(0);
                    jsonRes.products = {};
                    return callback(jsonRes);
                })
        },
        putProduct: (jsonReq, callback) => {
            let jsonRes = {};
            products.findOne({ where: { productName: jsonReq.params.productName }, attributes: ['productName', 'productPrice']})
                .then((result) => {
                    if (result === null) {
                        jsonRes.error = common.setRes_warning(jsonReq.params.productName);
                        jsonRes.products = {};
                        return callback(jsonRes);
                    }
                    else {
                        products.update(jsonReq.body, { where: { productName: jsonReq.params.productName } })
                            .then(() => {                    
                                jsonRes.error = common.setRes_ok('PUT', 'products');
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
                    jsonRes.products = {};
                    return callback(jsonRes);
                })            
        },        
        deleteProduct: (jsonReq, callback) => {
            let jsonRes = {};
            products.destroy({ where: { productName: jsonReq.params.productName } })
                .then((result) => {
                    if (result !== 0) {                        
                        jsonRes.error = common.setRes_ok('DELETE', 'products');
                        return callback(jsonRes);                        
                    }
                    else {
                        jsonRes.error = common.setRes_warning(jsonReq.params.productName);
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