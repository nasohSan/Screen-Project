window.onload = onLoad;
window.onresize = resizePostItems;
const ajax = new Ajax();
const baseHost = 'https://api.hoodsign.com/';
const baseUrl = `${baseHost}api/`;
let accessToken = '';
let latestPostDate = null;
let latestAdDate = null;
let latestNoticeDate = null;
let systemParams = {};
let smallIconsArray = [];
let twoDaysAgo = new Date();
const oneMinute = 60 * 1000;
const fiveMinute = 5 * oneMinute;
const thirtyMinutes = 30 * oneMinute;
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
let postsUserList = [];
let postsIds = [];
let adsIds = [];
let noticesIdsArr = [];
const userDefaultImage = chrome.runtime.getURL('assets/img/default_image.jpg');
const postsListObject = $('#posts')
let owlCarouselObject;
let postsListCarouselLoaded = false
let itemLength = 0;
const displayedItems = 6;
const itemMargin = 10;
let postIterationInterval;
let disconnected = false;

function onLoad() {
  chrome.power.requestKeepAwake('display');
  ScreenAuth();

  // var t = new Date();
  // t.setHours(4);
  // t.setMinutes(0);
  // t.setSeconds(0);
  // t.setMilliseconds(0);

  // var timeToReload = new Date().getTime() - t.getTime();
  // if (timeToReload >= 0) {
  //   setTimeout(() => {
  //     chrome.runtime.reload();
  //   }, timeToReload);
  // }

}

function generateQRCode() {
  let QRC = qrcodegen.QrCode;
  // Simple operationqrCode
  let qr0 = QRC.encodeText(accessToken.user.qrCode, QRC.Ecc.MEDIUM);
  let svg = qr0.toSvgString(4);
  $('#qrcode').html(`${svg} <span class="qrcods"> Activation QR code</span> `);
}

function getPosts(response, latestPostsIds) {

  if (response.posts.length == 0) {
    fetchLatestPostsIds(latestPostsIds);

    clearInterval(postIterationInterval);
    const postsRotationParam = getSystemParam('postsRotation') || 5;
    const postsRotation = postsRotationParam * 1000;
    postIterationInterval = setInterval(function () {
      if ($('.owl-item').length < 7) {
        return;
      }
      const addedTransformOffset = itemLength + itemMargin;
      const containerElemant = $('.owl-stage');
      const transformOffset = extractTrasformValue(containerElemant);
      const originalPosts = $('.owl-item:not(.item-copy)').length;
      const newTransformOffset = transformOffset - addedTransformOffset;
      if ($('.owl-item.active').length == 0) {
        $(`.owl-item:lt(${displayedItems})`).addClass('active');
      } else {
        $('.owl-item.active:lt(1)').removeClass('active');
        $('.owl-item.active').last().next().addClass('active');

      }

      if ($('.owl-item').last()[0] == $('.owl-item.active').last()[0]) {
        setTimeout(function () {
          resetPostsItemCarousel();
        }, 2000);
      }

      $('.owl-stage').css('transition', 'all 2s ease 0s');
      $('.owl-stage').css('transform', `translate3d(${newTransformOffset}px, 0px, 0px)`);

    }, postsRotation);
    return;
  }


  let content = '';
  let itemsCount = $('.owl-item').length + response.posts.length;
  response.posts.map(post => {
    const momentUpdatedDate = moment(post.updated);
    const momentToday = moment().startOf('day');
    const updatedDaysAgo = Math.round(moment.duration(momentToday - momentUpdatedDate).asDays());
    if (!postsIds.includes(post.id)) {
      postsIds.push(post.id);
    }

    postsUserList[post.owner.id] = postsUserList[post.owner.id] || [];
    postsUserList[post.owner.id] = postsUserList[post.owner.id].concat([post.id]);
    const postInfo = parseCategoryAttributes(post);
    if (post.category.catId == 4) {
      post.title = post.destination;
    }
    let item = '';
    item += `<div class="owl-item " style="margin-right: 10px;margin-left:0;"><div class="col-md-121 item test2 post_${post.id} " updated-date="${post.updated}" id="post_${post.id}" date="${post.expiryDate}" >
        <div class="box2H allCat ${post.category.name.toLowerCase().replace(/ /g, '_')}" style="background-color:${post.category.bgColor}">
          <span class="headcat">
          <i class="categorySmallImage_${post.category.id}" class="dollaricon" ></i>
          ${post.title}</span> <span class="timeAds">${moment(post.updated ).fromNow()}</span>`;
    if (updatedDaysAgo < 2) {
      item += `<span class="latest-post">48</span>`;
    }

    item += `<div class="imgbounds"> <img class="postImage_${post.id}" >`;
    if (post.price && post.price > 0) {
      item += `<span class="price"> AED ${post.price.toString().replace(/(.)(?=(.{3})+$)/g,"$1,")} </span>`;
    }
    item += ` </div>
            <div class="descripion">
            <p>${post.description ? post.description.replace(/\n/g, '<br/>') : ''} </p>`;
    let className = 'drivers';
    for (name in postInfo) {
      switch (name) {
        case 'From':
          className = 'fromX';
          break;
        case 'To':
          className = 'ToX';
          break;
        case 'Age':
          className = 'ageX';
          break;
      }
      item += `<span class="${className}">  ${name.split(/(?=[A-Z])/).join(' ')} : ${postInfo[ name ]} </span>`;
    };
    item += `
          </div>
          <div class="footerAds">
            <span  id="post_owner_${post.id}" class="imgUser">
            <span class="imgcrvs"> 
              <img style="display:${post.owner.hideProfile ? 'none' : 'inline-block' }" src="${userDefaultImage}"  class="userImage_${post.owner.id}" > </span>
              <span style="display:${post.owner.hideProfile ? 'none' : 'inline-block' }" class="nmUser userName_${post.owner.id}"> ${post.owner.fullName} </span>
              ${post.contactNumber ? `<span class="mobileNo">${post.contactNumber}</span>` : ''}
            </span>
          </div>
        </div>
      </div></div>`;
    if (!latestPostDate || post.updated > latestPostDate) {
      latestPostDate = post.updated;
    }

    if (!smallIconsArray[post.category.id]) {
      smallIconsArray[post.category.id] = post.category.smallIcon;
    }
    console.log(` postsListCarouselLoaded ${postsListCarouselLoaded}`);
    if (postsListCarouselLoaded) {
      // deletePostItem(post.id);
      addPostItem(item);
    } else {
      content += item;
    }

  });


  itemLength = ($(document).width() - (itemMargin * (displayedItems + 2))) / displayedItems;
  const postsRotationParam = getSystemParam('postsRotation') || 5;
  const postsRotation = postsRotationParam * 1000;

  if (!postsListCarouselLoaded) {
    postsListCarouselLoaded = true;
    const postRotaion = 10000;
    document.getElementById("posts").innerHTML = `<div class="owl-stage" style="transition:all 2s ease 0s;">${content}</div>`;
    if ($('.owl-item').length > displayedItems) {
      createPostsClone();
    }

    $('.owl-item').css('width', itemLength);
    if ($('.owl-item.active').length == 0) {
      $(`.owl-item:lt(${displayedItems})`).addClass('active');
    } else {
      $('.owl-item.active:lt(1)').removeClass('active');
      $('.owl-item.active').last().next().addClass('active');

    }

    postIterationInterval = setInterval(function () {
      if ($('.owl-item').length < 7) {
        return;
      }
      const addedTransformOffset = itemLength + itemMargin;
      const containerElemant = $('.owl-stage');
      const transformOffset = extractTrasformValue(containerElemant);
      const originalPosts = $('.owl-item:not(.item-copy)').length;
      const newTransformOffset = transformOffset - addedTransformOffset;
      if ($('.owl-item.active').length == 0) {
        $(`.owl-item:lt(${displayedItems})`).addClass('active');
      } else {
        $('.owl-item.active:lt(1)').removeClass('active');
        $('.owl-item.active').last().next().addClass('active');

      }

      if ($('.owl-item').last()[0] == $('.owl-item.active').last()[0]) {
        setTimeout(function () {
          resetPostsItemCarousel();
        }, 2000);
      }

      $('.owl-stage').css('transition', 'all 2s ease 0s');
      $('.owl-stage').css('transform', `translate3d(${newTransformOffset}px, 0px, 0px)`);

    }, postsRotation);

  }

  fetchLatestPostsIds(latestPostsIds);
  setTimeout(function () {
    let loopFlag = false;
    if (itemsCount > 6) {
      loopFlag = true;
    }

    response.posts.map(post => {
      let postImage = post.primaryImage;
      if (!postImage) {
        postImage = post.category.image;
      }
      // if (post.owner.profilePhoto) {
      //   fetchProfilePhotoAngle(post.owner.id, post.owner.profilePhoto);
      // }
      setTimeout(() => {
        embedImages('postImage', postImage, post.id);
        embedImages('userImage', post.owner.profilePhoto, post.owner.id);

      }, 700);

    });


    for (let index in smallIconsArray) {
      if (smallIconsArray[index].includes('hoodsign.s3.amazonaws.com')) {
        embedImages('categorySmallImage', smallIconsArray[index], index, true);
      }

    };

  }, 100);

}


function resizePostItems() {
  itemLength = ($(document).width() - (itemMargin * (displayedItems + 2))) / displayedItems;
  $('.owl-item').css('width', itemLength);
  const index = $(".owl-item").index($('.owl-item.active:lt(1)'));
  const newTransformOffset = -1 * (itemLength + itemMargin) * index;
  $('.owl-stage').css('transform', `translate3d(${newTransformOffset}px, 0px, 0px)`);
}

function extractTrasformValue(element) {

  const values = element.css('transform').split(/\w+\(|\);?/);
  if (!values[1] || !values[1].length) {
    return [];
  }
  return values[1].split(/,\s?/g)[4]
}

function addPostItem(item) {
  console.log(item);
  if ($('.owl-item').length == 0) {
    $('#posts .owl-stage').append(item);
  } else {
    $(".owl-item:not(.item-copy)").last().after(item);
  }

  $('.owl-item').css('width', itemLength);
  console.log(`owl ${$( ".owl-item" ).length}`);
  console.log(`displayedItems ${displayedItems}`);


  if (($('.item-copy').length == 0) && $(".owl-item").length == (displayedItems + 1)) {
    createPostsClone();
  }
  setActiveTabs();
}

function createPostsClone() {
  $(`.owl-item:lt(${displayedItems})`).each(function () {
    $('#posts .owl-stage').append($("<div />").append($(this).clone()).html());
  });
  $(`.owl-item`).slice(-1 * displayedItems).addClass('item-copy');
}

function deletePostItem(id, index) {
  console.log('length ' + $(`.post_${id}`).length);
  const postItemsCount = $(`.post_${id}`).length;
  postsIds.splice(index, 1);
  console.log(postsIds);
  if (postItemsCount == 0) {
    return;
  }
  $(`.post_${id}`).parent().remove();
  setActiveTabs();
  if ($('.owl-item:not(.item-copy)').length <= displayedItems) {
    resetPostsItemCarousel();
    $('.item-copy').remove();
  }

}

function resetPostsItemCarousel() {
  $('.owl-stage').css('transform', `translate3d(0px, 0px, 0px)`);
  $('.owl-stage').css('transition', 'all 0s ease 0s');
  $('.owl-item').removeClass('active');
  $(`.owl-item:lt(${displayedItems})`).addClass('active');
}

function setActiveTabs() {
  const firstActiveItem = $(".owl-item.active:lt(1)");
  $('.owl-item.active').removeClass('active');
  firstActiveItem.nextAll(`*:lt(${displayedItems - 1})`).addClass('active');
}

function fetchLatestPostsIds(latestIds) {
  // const ids = response.posts;
  const latestPostsIds = latestIds.length > 0 ? latestIds.map(x => x.id) : [];

  postsIds.forEach(function (postId, index) {
    if (!latestPostsIds.includes(postId)) {
      deletePostItem(postId, index);
      console.log(`delete ${postId}`);
    }
  });
}

function removeSlide(postId, index) {
  console.log(` before id: ${postsIds}`);
  console.log($(`.post_${postId}`).length);
  $(`.post_${postId}`).each(function () {
    const oldPost = $(this);
    offset = $("div.item").index(oldPost);
    console.log(` post offset  ${offset} posts count ${postsIds.length}`);
    if (offset > -1 && postsIds.length > offset) {
      $('.owl-carousel').owlCarousel('remove', index)
        .owlCarousel('update');
    }
  });
  postsIds.splice(index, 1);
  if (postsIds.length < 6) {
    console.log('stopppp');
    postsListObject.trigger('stop.owl.autoplay');
  }
}


function embedImages(title, image, postId, background = false) {
  if (!image) {
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.open('GET', image, true);
  xhr.responseType = 'blob';
  xhr.onload = function (e) {
    if (background) {
      $(`.${title}_${postId}`).css('background-image', `url('${window.URL.createObjectURL(this.response)}')`);
    } else {
      $(`.${title}_${postId}`).attr('src', window.URL.createObjectURL(this.response));
    }

  };
  xhr.send();

}

function fetchProfilePhotoAngle(id, url) {
  ajax.get(`${baseHost}getExifData?url=${url}`, function (response) {
    if (response.image && response.image.Orientation) {
      const rotateAngle = response.image.Orientation > 0 ? 'rotate(90deg)' : 'rotate(0deg)';
      $(`.userImage_${id}`).css('-webkit-transform', rotateAngle);
    }
  });
}


function parseCategoryAttributes(post) {
  const categoriesToBeParsed = [4, 1, 3];
  let postInfoList = [];
  if (!categoriesToBeParsed.includes(post.category.catId)) {
    return [];
  }
  let mappingHash = []
  if (post.category.catId == 4) {
    mappingHash['gender'] = 'genderId';
    mappingHash['daysFrom'] = 'fromDaysId';
    mappingHash['daysTo'] = 'toDaysId';
  } else if (post.category.catId == 1) {
    mappingHash['_conditionList'] = 'categoryConditionId';
    mappingHash['_usageList'] = 'usageId';
  } else if (post.category.catId == 3) {
    mappingHash['_rentTypes'] = 'rentId';
  }

  for (let key in post.category) {
    if (mappingHash[key]) {
      const value = post.category[key];
      const attributeName = mappingHash[key];
      const attributeValue = post[attributeName];
      for (let optionKey in post.category[key]) {
        if (attributeValue == post.category[key][optionKey].id) {
          let fieldName = key;
          switch (fieldName) {
            case '_conditionList':
              fieldName = 'Condition';
              break;
            case '_usageList':
              fieldName = 'Age';
              break;
            case '_rentTypes':
              fieldName = 'Paid';
              break;
            case 'gender':
              fieldName = 'Driver\'s gender';
              break;
            case 'daysFrom':
              fieldName = 'From';
              break;
            case 'daysTo':
              fieldName = 'To';
              break;
          }

          postInfoList[fieldName] = post.category[key][optionKey].name;
          if (fieldName == 'Driver\'s gender') {
            postInfoList['Destination'] = post.destination;
          }
        }

      }
    }
  }

  if (postInfoList['Age']) {
    let ageFirstList = [];
    ageFirstList['Age'] = postInfoList['Age'];
    delete postInfoList['Age'];
    ageFirstList = Object.assign({}, ageFirstList, postInfoList);
    return ageFirstList;
  }

  return postInfoList;
}

function getAds(ads, advsIds) {
  const updatedDateParam = latestAdDate ? `?updatedDate=${latestAdDate}` : '';

  if (ads.length == 0) {
    fetchLatestAdsIds(advsIds);
    return;
  }
  const firstLoad = ($('.video-wrap').length == 0);
  console.log($('.video-wrap').html());
  let content = '';
  let isPlayingId = false;
  ads.map(ad => {
    if(adsIds.includes(ad.id)){
      return;
    }
    adsIds.push(ad.id);
    ajax.loadAdvFiles(ad, function(response){

    });
    // if ($(`#ad_${ad.id}:visible`).is(':visible')) {
    //   isPlayingId = ad.id
    // }
    // if (ad.isVideo) {
    //   content += `  <video date="${ad.expiryDate}" id="ad_${ad.id}" style="display:${isPlayingId == ad.id ? 'none' : 'block' }" class="video-wrap" muted="" >
    //     <source src="${getAdvsUrl(ad.content)}"   >
    //     Your browser does not support HTML5 video.
    //     </video>`;
    // } else {
    //   content += `<img id="ad_${ad.id}" date="${ad.expiryDate}" class="video-wrap adImage_${ad.id}" >`;
    // }
    if (!latestAdDate || latestAdDate < ad.updated) {
      latestAdDate = ad.updated;
    }

    $(`#ad_${ad.id}`).remove();
  });

  fetchLatestAdsIds(advsIds);

  // $("#video-slider").append(content);
  ads.map(ad => {
    if (!ad.isVideo) {
      embedImages('adImage', ad.content, ad.id);
    }
  });
  latestAdDate = latestAdDate || new Date();
  // console.log(` first load ${firstLoad}`);
  // if (firstLoad) {
  //   carousel('video');
  // }
}


function fetchLatestAdsIds(advsIds) {
  let isDeleted = false;
  const latestAdsIds = advsIds.length > 0 ? advsIds.map(x => x.id) : [];
  adsIds.forEach(function (adId, index) {
    if (!latestAdsIds.includes(adId)) {
      if ($(`#ad_${adId}`).hasClass(`adImage_${adId}`) || $(`#ad_${adId}`).hasClass('video-wrap') || !$(`#ad_${adId}:visible`).is(':visible')) {
        removeAdv(adId);
        $(`#ad_${adId}`).remove();
        isDeleted = true;
      }
    }
  });
  for(let x = 0; x < adsIds.length; x++){
    if (!latestAdsIds.includes(adsIds[x])) {
      adsIds.splice(x, 1);
      x--;
    }
  }
  if(isDeleted){
    carousel('video');
  }
}

function fetchLatestAnnouncements(ids){
  const latestNoticesIds = ids.length > 0 ? ids.map(x => x.id) : [];
  noticesIdsArr.forEach(function(noticeId, index){
    if(!latestNoticesIds.includes(noticeId)){
      $(`#notice_${noticeId}`).remove();
    }
  });
}

function getAnnouncements(notices, noticesIds) {
  const updatedDateParam = latestNoticeDate ? `?updatedDate=${latestNoticeDate}` : '';
  if (notices.length == 0) {
    fetchLatestAnnouncements(noticesIds);
    return;
  }
  let content1 = '';
  let content2 = '';
  let condition = true;
  const firstLoad1 = ($('.announcement-wrap1').length == 0);
  const firstLoad2 = ($('.announcement-wrap2').length == 0);
  notices.map((notice, index) => {
    noticesIdsArr.push(notice.id);
    $(`#notice_${notice.id}`).remove();
    const content1Count = $('.announcement-wrap1').length;
    const content2Count = $('.announcement-wrap2').length;
    const firstTime = (content1Count == 0);
    const wrapNumber = (content2Count >= content1Count) ? 1 : 2;
    const noticeHtml = `<div id="notice_${notice.id}" class="boxH mangmentpst announcement-wrap${wrapNumber} ">
          <span class="mangmentpsticon"></span>
          <h1> ${notice.title}</h1>
          <span class="smallAgo">${moment(notice.created).format('DD MMMM YYYY')}</span>
          <p> ${notice.description.replace(/\n/g, '<br/>')}</p>
          <span class="imgS"> <img class="announcementImage_${notice.id}" > </span>
          <span class="buildingNam">  ${notice.building.name} </span>
      </div>`;

    if (wrapNumber == 1) {
      content1 += noticeHtml;
      $('#announcementSlider1').append(noticeHtml);
    } else {
      $('#announcementSlider2').append(noticeHtml);
      content2 += noticeHtml;
    }

    if (!latestNoticeDate || latestNoticeDate < notice.updated) {
      latestNoticeDate = notice.updated;
    }

    if (notice.image) {
      embedImages('announcementImage', notice.image, notice.id);
    }



  });

  latestNoticeDate = latestNoticeDate || new Date();
  if (firstLoad1) {
    carousel('announcement1');
  }
  if (firstLoad2) {
    carousel('announcement2');
  }



  ajax.get(`${baseUrl}Notices/screenNoticesIds`, function (response, index) {
    const ids = response.ids.map(x => `notice_${x.id}`);
    $('.mangmentpst').each(function (index) {
      if (!ids.includes($(this).attr('id'))) {
        $(this).remove();
      }
    });
  });

}

chrome.runtime.onInstalled.addListener(function () {
  $("#testSection").html('reached here too \n');

  var keys = '';
  chrome.storage.managed.get(function (policy) {
    Object.keys(policy).forEach(key => {
      keys += key + ':' + policy[key];
    });
    $("#testSection").html($("#testSection").html() + keys);
  });


  chrome.storage.managed.get('authentication', function (data) {
    $("#testSection").html($("#testSection").html() + `testing data v0.7 \n ${JSON.stringify(data)}`);
    const credentials = {
      username: data.username,
      password: data.password
    };
    if (data.username && data.password) {
      ajax.post(`${baseUrl}Screens/login?include=user`, credentials, function (response) {
        chrome.storage.sync.set({
          "accessToken": response
        });
        accessToken = response;
        loadSystemParam();
        generateQRCode();
      });
    }
  });


});

// Start observing policy changes. The tree is reloaded since this may be
// called back while the page was inactive.
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (namespace !== 'managed')
    return;
  const credentials = {
    username: changes.username,
    password: changes.password
  };
  ajax.post(`${baseUrl}Screens/login?include=user`, credentials, function (response) {
    chrome.storage.sync.set({
      "accessToken": response
    });
    accessToken = response;
    loadSystemParam();
    generateQRCode();
  });
});

function ScreenAuth() {

  var keys = '';
  var idb = window.indexedDB;
  idb.deleteDatabase('hoodDb');
  chrome.storage.managed.get(function (data) {
    const credentials = {
      username: 'testdemoscreen',
      password: 'demopass'
    };
    // const credentials = {
    //  username: data.username,
    //  password: data.password
    // };
    // Object.keys(policy).forEach(key => {
    //   if (key === 'username')
    //     keys += key + ':' + policy[key];
    // });
    ajax.post(`${baseUrl}Screens/login?include=user`, credentials, function (response) {
      chrome.storage.sync.set({
        "accessToken": response
      });
      accessToken = response;
      loadSystemParam();
      generateQRCode();
    });
  });

}

function pullAllData() {
  try {
    const noticeDate = latestNoticeDate ? `${latestNoticeDate}` : '';
    const postDate = latestPostDate ? `${latestPostDate}` : '';
    const adDate = latestAdDate ? `${latestAdDate}` : '';

    ajax.get(`${baseUrl}getAllScreenData?latestNoticeDate=${noticeDate}&latestPostDate=${postDate}&latestAdDate=${adDate}`,
      function (response) {
        if (response) {
          systemParams = response.systemParams;
          getPosts(response, response.postsIds);
          if (disconnected) {
            carousel('video', 0, true);
          }
          getAds(response.advs, response.latestAdsIds);
          // checkActiveVideo();
          getAnnouncements(response.notices, response.noticesId);
          const refreshIntervalParam = getSystemParam('refreshInterval') || 0.01;
          const refreshInterval = refreshIntervalParam * 1000 * 60 * 60;
          const currentDate = new Date();
          var currentHour = currentDate.getHours();
          setTimeout(function () {
            if (currentHour >=  6 || currentHour < 2) {
              $('#Sleep').hide();

            } else {
              $('#Sleep').show();
            }
            cleanLatestPostTag()
            pullAllData();
          }, refreshInterval);
          disconnected = false;
        } else {
          disconnected = true;
          setTimeout(function () {
            pullAllData();
          }, 18000);
        }
      });

  } catch (ex) {
    setTimeout(function () {
      $('#Sleep').hide();
      cleanLatestPostTag()
      pullAllData();
    }, 18000);
  }
}

function checkActiveVideo() {
  var activeVideo = $('video:visible');
  if ($(`.video-wrap`).length === 1 && $(`.video-wrap`).prop('tagName') === 'VIDEO' &&
    $(`.video-wrap`).is(':hidden')) {
    $(`.video-wrap:hidden`).show();
    $(`.video-wrap`)[0].load();
    $(`.video-wrap`)[0].play();
  } else if (activeVideo.length === 1 && activeVideo[0].paused) {
    activeVideo[0].load();
    activeVideo[0].play();
  } else {
    if (activeVideo.length > 0 && disconnected) {
      activeVideo[0].load();
      activeVideo[0].play();
    }
    disconnected = false;
  }
}

function pullData() {
  const refreshIntervalParam = getSystemParam('refreshInterval') || 0.01;
  const refreshInterval = refreshIntervalParam * 1000 * 60 * 60;
  const currentDate = new Date();
  var currentHour = currentDate.getHours();
  setTimeout(function () {
    if (currentHour > 6 || currentHour < 2) {
      $('#Sleep').hide();
      getPosts();
      getAds();
      getAnnouncements();
      loadSystemParam();
      cleanLatestPostTag()
    } else {

      $('#Sleep').show();

    }
    pullData();
  }, refreshInterval);
}

setInterval(function () {
  updatePostsTimeStamp();
}, oneMinute);

setInterval(function () {
  fetchUsersInfo();
}, thirtyMinutes);

function fetchUsersInfo() {
  let query = {
    'where': {
      'or': []
    }
  };
  query.fields = {
    id: true,
    profilePhoto: true,
    hideProfile: true
  };
  const idsArray = Object.keys(postsUserList);
  query.where.or = idsArray.map(id => ({
    'id': id
  }));
  if (postsUserList.length > 0) {
    ajax.get(`${baseUrl}UserModels?filter=${JSON.stringify( query )}`, function (users) {
      users.forEach(user => {
        const userPosts = postsUserList[user.id];
        if (user.hideProfile) {
          $(`.userImage_${user.id}`).hide();
          $(`.userName_${user.id}`).hide();
        } else {
          // fetchProfilePhotoAngle(user.id, user.profilePhoto);
          embedImages('userImage', user.profilePhoto, user.id);
          $(`.userImage_${user.id}`).show();
          $(`.userName_${user.id}`).show();
        }
      });
    });
  }
}


function cleanLatestPostTag() {
  $("div.test2").each(function (index, post) {
    const updatedDate = $(this).attr('updated-date');
    const momentUpdatedDate = moment(updatedDate);
    const momentToday = moment();
    const updatedDaysAgo = moment.duration(momentToday.diff(momentUpdatedDate)).asHours();
    if (updatedDaysAgo > 48) {
      $(this).find('.latest-post').remove();
    }

  });
}

function loadSystemParam(callback = null) {
  ajax.get(`${baseUrl}parameters`, function (repspone) {
    systemParams = repspone[0];
    pullAllData();
    if (callback)
      callback();
  });

}


function updatePostsTimeStamp() {
  $("div.test2").each(function (index) {
    const updatedDate = $(this).attr('updated-date');
    $(this).find('.timeAds').text(moment(updatedDate).fromNow());
  });
}

var clock;

$(document).ready(function () {
  clock = $('.clock').FlipClock({
    clockFace: 'TwentyFourHourClock'
  });
});


function getSystemParam(name) {
  return systemParams[name];
}