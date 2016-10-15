import ajax from "superagent";

function POST(url, data) {
    return new Promise((resolve, reject) => {
        ajax
            .post(url)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(data))
            .end(function (err, res) {
                if (err || !res.ok) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    }).then(res => res.xhr.response);
}

function GET(url, params) {
    return new Promise((resolve, reject) => {
        ajax
            .get(url)
            .query(params)
            .end(function (err, res) {
                if (err || !res.ok) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    }).then(res => res.body);
}

function fakeRequest(data, timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(_ => {
            resolve(data);
        }, timeout);
    })
}

var point = {
    create: (data) => {
        return POST('/new_event', {
            lon: data.lng,
            lat: data.lat,
            intro: data.intro,
            pic: data.base64
        })
    },
    get: () => {},
    getAll: () => {
        return POST('/view_event', {}).then(result => {
            return {
                data: {
                    points: JSON
                        .parse(result)
                        .map(point => ({id: point._id, info: point.intro, lat: point.lat, lon: point.lon}))
                }
            }
        });
    },
    check: (data) => {
        // return fakeRequest({     staus: 1 }, 15000)
        return POST('/check_event', {
            lon: data.lng,
            lat: data.lat,
            pic: data.base64
        })
    }
}

var mission = {
    get: () => {},
    getList: () => {
        return POST('/view_mission').resolve({})
    }
}

export default {
    mission,
    point
}