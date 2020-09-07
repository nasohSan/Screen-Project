function carousel(type = "video", slideIndex = 0, shouldLoad = false) {

  try {
    let rotation = 5000;
    let classSelector = "video-wrap";
    if (type == 'announcement1') {
      classSelector = "announcement-wrap1";
    } else if (type == 'announcement2') {
      classSelector = "announcement-wrap2";
    }



    if (type == 'video') {
      const adsRotationParam = getSystemParam('adsRotation') || 10;
      rotation = adsRotationParam * 1000;
    } else {
      const announcementsRotationParam = getSystemParam('announcementsRotation') || 1;
      rotation = announcementsRotationParam * 1000 * 60;
    }


    let i;
    let x = [...document.getElementsByClassName(classSelector)];

    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length || x.length == 1) {
      slideIndex = 1
    }
    if (type == 'video') {
      console.log(`type ${type} slide ${slideIndex}  length ${x.length}  rotaion = ${rotation}`);
    }

    if (x.length == 0) {
      return;
    }
    if (x[slideIndex - 1]) {
      x[slideIndex - 1].style.display = "block";
    } else if (type == 'video') {
      carousel(type, slideIndex);
    }

    if (x[slideIndex - 1].tagName != 'VIDEO') {
      return setTimeout(() => carousel(type, slideIndex), rotation);
    } else {
      if (shouldLoad) {
        shouldLoad = false;
        x[slideIndex - 1].load();
      }
      x[slideIndex - 1].play();
      x[slideIndex - 1].onended = function () {
        console.log('test ');
        carousel(type, slideIndex);
      }
    }
  } catch (ex) {
    carousel(type, 0, true);
  }
}