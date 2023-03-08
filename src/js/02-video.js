import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const STORAGE_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPauseVideo, 1000));

function onPauseVideo(evt) {
  const seconds = evt.seconds;
  //   console.log(seconds);
  localStorage.setItem(STORAGE_KEY, seconds);
}
// зачем мне эта фукция
// player.getVideoTitle().then(function (title) {
//   console.log('title:', title);
// });

// ???????????????then вместо try?
player
  .setCurrentTime(localStorage.getItem(STORAGE_KEY))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
