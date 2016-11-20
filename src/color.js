export default function hexColor(color) {
  if(!color) return 'Invalid color';
  // const re = /(?:([a-zA-Z0-9а-яА-ЯёЁ]*)\s+)?(?:([a-zA-Z0-9а-яА-ЯёЁ]*)\s+)?([a-zA-Z0-9а-яА-ЯёЁ]*)/;
  const re = /(?:^(?:\s*)?#?([a,b,c,d,e,f,\d]{6}|[a,b,c,d,e,f,\d]{3})?(?:\s*)?$)?/i;
  console.log(color.match(re));

  let hexcolor = color.match(re)[1];
  if(!hexcolor) return 'Invalid color';

  if(hexcolor.length == 3)
    hexcolor = hexcolor[0] + hexcolor[0] + hexcolor[1] + hexcolor[1] + hexcolor[2] + hexcolor[2];

  return `#${hexcolor.toLowerCase()}`;
}
