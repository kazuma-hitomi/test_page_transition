/**
 * デッバグ用出力
 * @param text
 */
const cL = (text) => {
  if(text === undefined) {
    text = 'ヾ(｡>﹏<｡)ﾉ';
  }
  console.log(text);
};

export const debug = (text) => {
  cL(text);
};