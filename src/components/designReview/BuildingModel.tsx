type Props = { selected?: boolean; previous?: boolean; overlay?: boolean; onSelect?: () => void }

/** Shared isometric model keeps the selected wall consistent across products. */
export function BuildingModel({ selected=false, previous=false, overlay=false, onSelect }: Props) {
  const point=(x:number,y:number,z:number)=>[350+(x-y)*.86,370+(x+y)*.46-z]
  const points=(coords:number[][])=>coords.map(([x,y,z])=>point(x,y,z).join(',')).join(' ')
  const face=(coords:number[][],fill:string,key?:string)=><polygon key={key} points={points(coords)} fill={fill} stroke="#99a7b6" strokeWidth="1.4" strokeLinejoin="round"/>
  const box=(x:number,y:number,z:number,w:number,d:number,h:number,color='#c2ccd7',key?:string)=><g key={key}>
    {face([[x,y+d,z],[x+w,y+d,z],[x+w,y+d,z+h],[x,y+d,z+h]],'#a5b1be')}
    {face([[x+w,y,z],[x+w,y+d,z],[x+w,y+d,z+h],[x+w,y,z+h]],color)}
    {face([[x,y,z+h],[x+w,y,z+h],[x+w,y+d,z+h],[x,y+d,z+h]],color==='#c2ccd7'?'#e3e8ee':color)}
  </g>
  const east=previous?163:190
  return <svg className="building-model" viewBox="0 -125 700 790" aria-label="North Ridge three-storey structural model">
    {[0,112,224].map((z)=><g key={z}>
      {z>0&&[[-190,-140],[-190,10],[-190,160],[0,-140],[0,160],[190,-140],[190,160]].map(([x,y],i)=>box(x,y,z-104,18,18,104,'#bac5d0',String(i)))}
      {box(-210,-165,z,440,350,12)}
    </g>)}
    <polygon points={points([[-210,-165,355],[230,-165,355],[230,185,355],[-210,185,355]])} fill="none" stroke="#b4c1ce" strokeDasharray="5 4"/>
    {box(5,-135,236,12,155,108)}
    {box(5,-135,236,east-5,12,108)}
    {box(55,-28,236,54,58,53)}
    {overlay&&<polygon points={points([[163,-135,236],[163,20,236],[163,20,344],[163,-135,344]])} fill="#7fa0c0" opacity=".35" stroke="#367ab8" strokeDasharray="5 4"/>}
    <g role={onSelect?'button':undefined} tabIndex={onSelect?0:undefined} aria-label={onSelect?'Mechanical Room East Wall':undefined} onClick={onSelect} onKeyDown={e=>{if(onSelect&&(e.key==='Enter'||e.key===' ')){e.preventDefault();onSelect()}}} style={{cursor:onSelect?'pointer':undefined}}>
      {face([[east,-135,236],[east,20,236],[east,20,344],[east,-135,344]],selected?'#317bbb':'#b7c2ce')}
      <polyline points={points([[east,-135,332],[east,20,332]])} fill="none" stroke="#d8e5f0" strokeDasharray="5 4"/>
    </g>
    {box(50,-105,314,100,28,30,'#e8d49b')}
  </svg>
}
