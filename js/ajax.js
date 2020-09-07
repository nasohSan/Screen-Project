class Ajax {
  get(url, callback) {
    const accessTokenHeader = (accessToken && accessToken.id) || '';
    try {
      let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
      xhr.open('GET', url);
      xhr.onreadystatechange = () => {
        if (xhr.readyState > 3 && xhr.status === 200) {
          callback(JSON.parse(xhr.responseText));
          xhr = null;
        } else {
          if (xhr.readyState > 3 && (xhr.status === 502 || xhr.status === 401)) {
            callback(null);
          }
        }
      };
      xhr.onerror = function () {
        console.log("** An error occurred during the transaction");
        callback(null);
      };
      xhr.setRequestHeader('Authorization', accessTokenHeader);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.send();

      return xhr;
    } catch (ex) {
      console.log(ex);
    }
  }

  post(url, data, callback) {
    let params = typeof data == 'string' ? data : Object.keys(data).map((k) => {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
    }).join('&');

    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function () {
      if (xhr.readyState > 3 && xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
        xhr = null;
      } else {
        if (xhr.readyState > 3 && (xhr.status === 502 || xhr.status === 401)) {
          callback(null);
        }
      }
    };
    xhr.onerror = function () {
      console.log("** An error occurred during the transaction");
      callback(null);
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);

    return xhr;
  }

  loadAdvFiles(advInfo, callback) {
    try {
      let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
      xhr.open('GET', advInfo.content);
      xhr.responseType = "blob";
      xhr.onload = function () {
        if (xhr.status === 200) {
          var blob = xhr.response;
          // Save the blob to the storage
          if (window.indexedDB) {
            saveAdvBlob(blob, advInfo);
            callback(null);
          }
        }
      };
      xhr.send();
    } catch (ex) {

    }
  }
}