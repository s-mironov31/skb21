export default function canonize(fullname) {
  // const re = /(?:([a-zA-Z0-9а-яА-ЯёЁ]*)\s+)?(?:([a-zA-Z0-9а-яА-ЯёЁ]*)\s+)?([a-zA-Z0-9а-яА-ЯёЁ]*)/;
  const re = /(?:([^\d\s]*)\s+)?(?:([^\d\s]*)\s+)?([^\d\s]*)(?:\s+)?(\S*)?/;
  const nameRe = fullname.match(re);
  console.log(nameRe);
  const surname = nameRe[3];
  const name = nameRe[1] ? (` ${nameRe[1].slice(0,1)}.`) : ``;
  const patronymic = nameRe[2] ? (` ${nameRe[2].slice(0,1)}.`) : ``;

  if(!nameRe[0] || nameRe[4])
    return 'Invalid fullname';

  const canonizeName = `${surname}${name}${patronymic}`;
  return canonizeName;
}
