export default function getUsername(url) {
  // const re = /(?:([a-zA-Z0-9а-яА-ЯёЁ]*)\s+)?(?:([a-zA-Z0-9а-яА-ЯёЁ]*)\s+)?([a-zA-Z0-9а-яА-ЯёЁ]*)/;
  const re = /@?(?:http)?s?:?(?:\/\/)?(?:[\wа-яё]*[^\/]*\/)?@?([\wа-яё]*(?:\.[\wа-яё]*)?)/i;
  const username = url.match(re);
//   https://vk.com/igor.suvorov
// https://twitter.com/suvorovigor
// https://telegram.me/skillbranch
// @skillbranch
// https://vk.com/skillbranch?w=wall-117903599_1076
  return `@${username[1]}`;
}
