import { slideDown } from './slideDown.js';
import { slideUp } from './slideUp.js';

export function slideToggle(elm, duration = 300) {
  if (window.getComputedStyle(elm).display === 'none') {
    slideDown(elm, duration);
  } else {
    slideUp(elm, duration);
  }
}
