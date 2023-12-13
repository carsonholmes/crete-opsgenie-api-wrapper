var XMLHttpRequest = require('xhr2');
let userName = "GenieKey"
let token="c8032ff6-e648-413e-aea3-91032adc394e"

module.exports = {
    getJiraJSON(url, callback) {
      //console.log("getJira", url)
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.setRequestHeader('Authorization', userName + ' ' + token)
      xhr.setRequestHeader('Accept', 'application/json')
      xhr.responseType = 'json';
      xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
          callback(null, xhr.response);
        } else {
          callback(status, xhr.response);
        }
      };
      xhr.onerror = function() {
        console.log('Can not communicate with service!!');
      };
      xhr.send();
    }
}        