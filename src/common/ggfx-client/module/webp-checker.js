'use strict';
//Check_webp_feature based on browser
import {isBrowser} from '../utility';

const CheckWebpFeature = () => {
  let kTestImages = {
    lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
    lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
    alpha: 'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
    animation: 'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA'
  };
  let img = new Image();
  img.onload = function () {
    let isNotWebP = !(img.width > 0) && (img.height > 0);
    if (isNotWebP && (isNotWebP != localStorage.getItem('GGFX-NOTWEBP')) && isBrowser()) {
      localStorage.setItem('GGFX-NOTWEBP', isNotWebP);
      window.reload();
    }
  };
  img.onerror = function () {
    if (isBrowser()) {
      localStorage.setItem('GGFX-NOTWEBP', true);
      window.reload();
    }
  };
  //Feature as parameterized
  img.src = `data:image/webp;base64,${kTestImages['lossless']}`;
  return 0;
}

export default CheckWebpFeature;
