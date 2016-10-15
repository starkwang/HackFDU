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
                    id: '18020a220bfe51bde1561445',
                    lat: 31.3084892,
                    lon: 121.5019383,
                    info: 'info0'
                }, {
                    id: '28020a220bfe51bde1562445',
                    lat: 31.301500,
                    lon: 121.51238143,
                    info: 'info1'
                }, {
                    id: '38020a220bfe56bde1561445',
                    lat: 31.227357,
                    lon: 121.498243,
                    info: 'info2'
                }, {
                    id: '48020a220bfe515de1561445',
                    lat: 31.227457,
                    lon: 121.488343,
                    info: 'info3'
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