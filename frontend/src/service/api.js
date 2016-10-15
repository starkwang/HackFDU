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
    }).then(res => res.body);
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
    getAll: () => fakeRequest({
        data: {
            points: [
                {
                    lat: 31.3084892,
                    lng: 121.5019383
                }, {
                    lat: 31.301500,
                    lng: 121.51238143
                }, {
                    lat: 31.227357,
                    lng: 121.498243
                }, {
                    lat: 31.227457,
                    lng: 121.488343
                }
            ]
        }
    }, 2000),
    check: (data) => {
        // return fakeRequest({
        //     staus: 1
        // }, 15000)
        return POST('/check_event', {
            lon: data.lng,
            lat: data.lat,
            pic: data.base64
        })
    }
}

var mission = {
    create: () => {},
    get: () => {},
    getList: () => {
        return Promise.resolve({})
    }
}

export default {
    mission,
    point
}