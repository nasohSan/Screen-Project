// Save the blob in the DB
function saveAdvBlob(blob, advInfo) {
    var db_name = "hoodDb";
    var store_name = "advMedia";
    var fileName = getFileNameFromUrl(advInfo.content);
    if (!('indexedDB' in window)) {
        console.log('This browser doesn\'t support IndexedDB');
        return;
    }
    // Open the DB
    var idb = window.indexedDB;
    var openreq = idb.open(db_name, 1);

    openreq.onupgradeneeded = function (event) {
        console.log('running onupgradeneeded');

        var db = event.target.result;
        var params = {
            keyPath: "id"
        };
        var store = db.createObjectStore(store_name, params);
    };
    openreq.onsuccess = function (event) {
        console.log('running onsuccess');

        var db = event.target.result;
        var tx = db.transaction([store_name], "readwrite");
        var store = tx.objectStore(store_name);
        var putreq = store.put({
            "id": advInfo.id,
            "filename": fileName,
            "data": blob
        });
        putreq.onsuccess = function () {
            // Get the blob from the DB
            getAdvsUrl(advInfo);
        };
    };
}

function getFileNameFromUrl(url) {
    var startIndex = url.lastIndexOf('_') + 1;
    return url.substring(startIndex, url.length);
}

// Get the blob from the DB
function getAdvsUrl(advInfo) {
    var db_name = "hoodDb";
    var store_name = "advMedia";
    var url = getFileNameFromUrl(advInfo.content);
    if (!('indexedDB' in window)) {
        console.log('This browser doesn\'t support IndexedDB');
        return;
    }
    // Open the DB
    var idb = window.indexedDB;
    var openreq = idb.open(db_name, 1);
    // Get the blob object
    openreq.onsuccess = function (event) {
        var db = event.target.result;
        var transaction = db.transaction([store_name], "readonly");
        var store = transaction.objectStore(store_name);
        var getreq = store.get(advInfo.id);
        // Create a blob URL and play the video
        getreq.onsuccess = function (event) {
            var rec = event.target.result;
            var blob_url = window.URL.createObjectURL(rec["data"]);
            if (advInfo.isVideo) {
                playVideoIdb(blob_url, advInfo);
            } else {
                advImage(advInfo);
            }
        };
    };
}

let isPlayingId = false;
let content = '';
let firstLoad = ($('.video-wrap').length == 0);
// Play the video
function playVideoIdb(url, advInfo) {
    if ($(`#ad_${advInfo.id}:visible`).is(':visible')) {
        isPlayingId = advInfo.id;
    }
    firstLoad = ($('.video-wrap').length == 0);
    // Create a video element
    var el = document.createElement("video");
    el.src = url;
    el.className = 'video-wrap';
    el.date = advInfo.expiryDate;
    el.id = `ad_${advInfo.id}`;
    el.muted = true;
    el.style.display = isPlayingId === advInfo.id ? 'none' : 'block';
    $("#video-slider").append(el);
    // Play the video
    el.play();
    
    if (firstLoad) {
        firstLoad = false;
        carousel('video');
    }

    // When the playback ends, remove the video element
    // el.addEventListener("ended", removeVideoElementIdb, false);
}

function advImage(adv) {
    // missing file
    var content = `<img id="ad_${adv.id}" date="${adv.expiryDate}" class="video-wrap adImage_${adv.id}" >`;
    $("#video-slider").append(content);
    embedImages('adImage', adv.content, adv.id);
    if (firstLoad) {
        firstLoad = false;
        carousel('video');
    }
}

function removeAdv(key) {
    var db_name = "hoodDb";
    var store_name = "advMedia";
    if (!('indexedDB' in window)) {
        console.log('This browser doesn\'t support IndexedDB');
        return;
    }
    // Open the DB
    var idb = window.indexedDB;
    var openreq = idb.open(db_name, 1);
    openreq.onsuccess = function (event) {
        var db = event.target.result;
        var tx = db.transaction(store_name, 'readwrite');
        var store = tx.objectStore(store_name);
        store.delete(key);
        return tx.complete;
    };
}


// Remove the video element
function removeVideoElementIdb(event) {
    var el = event.target;
    // Remove the event listener
    el.removeEventListener("ended", removeVideoElementIdb, false);
    // Release the blob URL
    window.URL.revokeObjectURL(el.src);
    // Remove the video element
    el.parentNode.removeChild(el);
}