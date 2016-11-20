export default function canonize(fullname) {
  // const re = /(?:([a-zA-Z0-9а-яА-ЯёЁ]*)\s+)?(?:([a-zA-Z0-9а-яА-ЯёЁ]*)\s+)?([a-zA-Z0-9а-яА-ЯёЁ]*)/;
  const re = /(?:\s*)?(?:([^\d\s_\/]*)\s+)?(?:([^\d\s_\/]*)\s+)?([^\d\s_\/]*)(?:\s+)?(\S*)?/;
  const nameRe = fullname.match(re);
  console.log(nameRe);
  const surname = nameRe[3] ? (nameRe[3][0].toUpperCase() + nameRe[3].slice(1).toLowerCase()) : nameRe[3];
  const name = nameRe[1] ? (` ${nameRe[1].slice(0,1).toUpperCase()}.`) : ``;
  const patronymic = nameRe[2] ? (` ${nameRe[2].slice(0,1).toUpperCase()}.`) : ``;

  if(!nameRe[0] || nameRe[4])
    return 'Invalid fullname';

  const canonizeName = `${surname}${name}${patronymic}`;
  return canonizeName;
}
