import React from 'react';

const makePallete = transforms => {

  const colors = [];

  const toHex = n => {
    n = (n).toString(16);
    if(n.length === 1){
      return `0${n}`;
    } else {
      return n;
    }
  }

  const max = 255;
  const step = 5;

  const calc = (t,i) => {
    if(t === 0){
      return '00';
    } else if(t > 0){
      return toHex(i);
    } else {
      return toHex(max-i);
    }
  }

  for(let i=0; i<=max; i+=step ){
    const r = calc(transforms[0],i);
    const g = calc(transforms[1],i);
    const b = calc(transforms[2],i);
    colors.push(`${r}${g}${b}`);
  }

  return colors;
}

export default props => {

  const permutation = [
    [ 1, 0, 0 ]
    , [ 0, 1, 0 ]
    , [ 0, 0, 1 ]
    , [ 1, 1, 0 ]
    , [ 0, 1, 1 ]
    , [ 1, 0, 1 ]
    , [ 1, 1, 1 ]
  ];

  return <div style={{display:'flex',flexWrap:'wrap'}}>
    {
      permutation.map((x,i) =>
        <div key={i} style={{display:'flex',flexWrap:'wrap'}}>
        {
          makePallete(x).map((y,j) =>
            <div
              key={j} style={{
                backgroundColor:`#${y}`
                , height:'24px'
                , width:'24px'
              }}></div>
          )
        }
        </div>
      )
    }
  </div>;

}
