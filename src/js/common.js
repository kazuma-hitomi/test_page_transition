import lazySizes from 'lazysizes';
import { debug } from './debug';

export const common = () => {
  debug();
  lazy('loading');
};

/*
画像遅延読み込み
 */
const lazy = (effect) => {
  document.addEventListener('lazyloaded', (e) => {
    e.target.parentNode.classList.add('image-loaded');
    e.target.parentNode.classList.remove('loading');
    e.target.parentNode.classList.remove(effect);
  });
};