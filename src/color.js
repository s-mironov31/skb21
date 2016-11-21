import {color} from 'kewler';

export default function hexColor(reqColor) {
  if(!reqColor) return 'Invalid color';
  console.log(reqColor);
  const re = /(?:\s*(?:%20)*(rgb|hsl)(?:\()\s*(?:%20)*(\d{1,3})\s*(?:%20)*,\s*(?:%20)*(\d{1,3})(%)?\s*(?:%20)*,\s*(?:%20)*(\d{1,3})(%)?\s*(?:%20)*(?:\)))?(?:^\s*#?([a-f,\d]{6}|[a-f,\d]{3})?(?:\s*)?$)?/i;
  console.log(reqColor.match(re));
  // rgb(0, 255, 64)
  // hsl(195, 100%, 50%)

  let hexcolor;
  const reHexColor = reqColor.match(re);
  if(reHexColor[2]) {
    if(reHexColor[1] == "rgb") {
      let r = (reHexColor[2] * 1);
      let g = (reHexColor[3] * 1);
      let b = (reHexColor[5] * 1);
      if((r < 0 || r > 255) || (g < 0 || g > 255) || (b < 0 || b > 255))
        return 'Invalid color';

      r = r.toString(16);
      g = g.toString(16);
      b = b.toString(16);


      hexcolor = (r.length == 1 ? r + r : r) + (g.length == 1 ? g + g : g) + (b.length == 1 ? b + b : b);
    } else {
      if(!reHexColor[4] || !reHexColor[6])
        return 'Invalid color';
      const hsl = [+reHexColor[2], +reHexColor[3], +reHexColor[5]]
      if((hsl[1] < 0 || hsl[1] > 100) || (hsl[2] < 0 || hsl[2] > 100))
        return 'Invalid color';

      const blueFromHSLArray = color(hsl);
      hexcolor = blueFromHSLArray().slice(1);
    }
  } else  if(reHexColor[7]) {
    hexcolor = reHexColor[7];
  }

  if(!hexcolor) return 'Invalid color';

  if(hexcolor.length == 3)
    hexcolor = hexcolor[0] + hexcolor[0] + hexcolor[1] + hexcolor[1] + hexcolor[2] + hexcolor[2];

  return `#${hexcolor.toLowerCase()}`;
}
