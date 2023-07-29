import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const STORAGE_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPauseVideo, 1000));

function onPauseVideo(evt) {
  const seconds = evt.seconds;
  localStorage.setItem(STORAGE_KEY, seconds);
}

if (localStorage.getItem(STORAGE_KEY)) {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const parsedData = JSON.parse(savedData);
    player.setCurrentTime(parsedData);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}
