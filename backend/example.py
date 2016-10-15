########### Python 2.7 #############
import httplib, urllib, base64, json

headers = {
    # Request headers
    # 'Content-Type': 'application/json',
    'Content-Type': 'application/octet-stream',
    'Ocp-Apim-Subscription-Key': '4f792ebda478409a80b75a1d651d168d',
}

params = urllib.urlencode({
})

try:
    conn = httplib.HTTPSConnection('api.projectoxford.ai')
    with open("computer.jpg") as f:
        bin_ = f.read()
    #body = json.dumps({"url": "http://img.pconline.com.cn/images/product/5817/581748/s5-y03.jpg"})
    body = bin_
    conn.request("POST", "/vision/v1.0/tag?%s" % params, body, headers)
    response = conn.getresponse()
    data = response.read()
    print(data)
    conn.close()
except Exception as e:
    print("[Errno {0}] {1}".format(e.errno, e.strerror))

####################################

'''
########### Python 3.2 #############
import http.client, urllib.request, urllib.parse, urllib.error, base64

headers = {
    # Request headers
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': 'eb3f8e1eda734df289a7d55027d682f9',
}

params = urllib.parse.urlencode({
})

try:
    conn = http.client.HTTPSConnection('api.projectoxford.ai')
    conn.request("POST", "/vision/v1.0/tag?%s" % params, "{body}", headers)
    response = conn.getresponse()
    data = response.read()
    print(data)
    conn.close()
except Exception as e:
    print("[Errno {0}] {1}".format(e.errno, e.strerror))

####################################
'''
