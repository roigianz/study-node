let jsonErr = {
    type: '',
    desc: '',
    time: ''
};
let jsonLog = {
    date: "",
    time: "",
    level: "",
    group: "",
    message: "",
    host: ""
};
var moment = require('moment');

module.exports = app => {
    const tags = app.db.models.tags;
    var getUnixTime = () => {
        return `${moment().unix()}`;
    };
    var getTime = () => {
        return `${moment().format('YYYY-MM-DDINTEGERmm:ss')}`;
    };
    var getHostIp = (hostInfo) => {
        // localhost format '::1'
        // normal format '::ffff:192.168.244.INTEGER
        let cnt = hostInfo.match(/:/g);
        let hostIp = '';
        if (cnt != null) {
            if (cnt.length === 3) {
                let idx = hostInfo.lastIndexOf(':');
                hostIp = hostInfo.substring(idx+1, hostInfo.length);
                return hostIp;
            }
            else {
                hostIp = '127.0.0.1';
                return hostIp;
            }
        }
        else { return hostIp; }
    };
    return {
        setRes_ok: (method, strRes) => {
            switch (method) {
                /* get */
                case 'GET':
                    jsonErr.desc = 'Get ' + strRes + ' successfully.';
                    break;
                /* post */
                case 'POST':
                    jsonErr.desc = 'Create ' + strRes + ' successfully.';
                    break;
                /* put */
                case 'PUT':
                    jsonErr.desc = 'Update ' + strRes + ' successfully.';
                    break;
                /* delete */
                case 'DELETE':
                    jsonErr.desc = 'Delete ' + strRes +' successfully.';
                    break;
                default:
                    jsonErr.desc = '';
                    break;
            }
            jsonErr.type = 'ok';
            jsonErr.time = getTime();
            return jsonErr;
        },
        setRes_warning: (strRes) => {
            jsonErr.desc = strRes + ' does not exist.';
            jsonErr.type = 'warning';
            jsonErr.time = getTime();
            return jsonErr;
        },
        setRes_error: (strRes) => {
            switch (Number(strRes)) {
                case 0:
                    jsonErr.desc = 'Database Error occurred.';
                    break;
                case 10:
                    jsonErr.desc = 'Failed to request posting trend tags to Trend Server.';
                    break;
                case 11:
                    jsonErr.desc = 'Duplicate tag name.';
                    break;
                case 20:
                    jsonErr.desc = 'Internal Error.';
                    break;
                case 21:
                    jsonErr.desc = 'Trend Server API Error. Please check trend server status. ';
                    break;
                case 22:
                    jsonErr.desc = 'Failed to get trend server log.';
                    break;
                case 23:
                    jsonErr.desc = 'Invalide query condition.';
                    break;
                default:
                    jsonErr.desc = '';
                    break;
            }
            jsonErr.type = 'error';
            jsonErr.time = getTime();
            return jsonErr;
        },
        setLog: (level, message, ip, callback) => {
            jsonLog.date = getUnixTime();
            jsonLog.level = level;
            jsonLog.group = 'xper';
            jsonLog.message = message;
            jsonLog.host = getHostIp(ip);
            return callback(jsonLog);
        }        
    }
}