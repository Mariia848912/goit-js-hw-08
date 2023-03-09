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

// player.setCurrentTime(localStorage.getItem(STORAGE_KEY) || 0);

if (localStorage.getItem(STORAGE_KEY)) {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const parsedData = JSON.parse(savedData);
    // const time = parsedData.seconds;
    player.setCurrentTime(parsedData);
    // player.setCurrentTime(time);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}
