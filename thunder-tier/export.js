'use strict';
function exportLayout(snapshot,options={}){
  const width=Number(options.width)===1920?1920:3840,scale=width/1920;
  const pad=55,labelWidth=150,cellWidth=108,cardWidth=94,cardHeight=116;
  const columns=Math.floor((1920-pad*2-labelWidth-40)/cellWidth);
  const rows=['S','A','B','C','D'].map((key,i)=>({key,label:snapshot.labels[i],color:colors[i],ids:snapshot.zones[key],height:Math.max(138,Math.ceil(snapshot.zones[key].length/columns)*132+24)}));
  if(options.includeReserve&&snapshot.zones.pool.length)rows.push({key:'—',label:'РЕЗЕРВ',color:'#657558',ids:snapshot.zones.pool,height:Math.max(138,Math.ceil(snapshot.zones.pool.length/columns)*132+24)});
  const height=166+rows.reduce((sum,row)=>sum+row.height,0)+70;
  return {width,height:height*scale,baseHeight:height,scale,pad,labelWidth,cellWidth,cardWidth,cardHeight,columns,rows};
}
function refreshExportSize(){const layout=exportLayout(state,{width:$('#exportSize').value,includeReserve:$('#exportReserve').checked});$('#exportDimensions').textContent=layout.width+' × '+layout.height+' px · PNG';}
function openExport(){save();$('#exportSize').value='3840';$('#exportStatus').textContent='';refreshExportSize();$('#exportDialog').showModal()}
$('#png').onclick=openExport;$('#closeExport').onclick=()=>$('#exportDialog').close();$('#exportSize').onchange=refreshExportSize;$('#exportReserve').onchange=refreshExportSize;
function loadExportImage(person){return new Promise((resolve,reject)=>{const im=new Image(),timer=setTimeout(()=>reject(Error('Не загрузилась аватарка: '+person.name)),12000);im.onload=()=>{clearTimeout(timer);resolve(im)};im.onerror=()=>{clearTimeout(timer);reject(Error('Не удалось прочитать аватарку: '+person.name))};im.src=person.img})}
async function buildTierPng(snapshot,options){
  const layout=exportLayout(snapshot,options),{pad,labelWidth,cellWidth,cardWidth,cardHeight,columns,rows,scale}=layout;
  const people=new Map(snapshot.people.map(p=>[p.id,p])),images=new Map();
  await Promise.all(rows.flatMap(row=>row.ids).map(async id=>{const person=people.get(id);if(person.img)images.set(id,await loadExportImage(person))}));
  const canvas=document.createElement('canvas');canvas.width=layout.width;canvas.height=layout.height;const ctx=canvas.getContext('2d');if(!ctx)throw Error('Браузер не поддерживает сохранение картинки');
  ctx.scale(scale,scale);ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.fillStyle='#101510';ctx.fillRect(0,0,1920,layout.baseHeight);ctx.fillStyle='#d4eb77';ctx.font='bold 15px Segoe UI,Arial';ctx.fillText('THUNDER TIER / WAR THUNDER',pad,48);ctx.fillStyle='#edf0e7';ctx.font='900 49px Segoe UI,Arial';ctx.fillText(snapshot.title,pad,116,1920-pad*2);
  let y=166;
  for(const row of rows){
    ctx.fillStyle='#1c231b';ctx.fillRect(pad,y,1920-pad*2,row.height-2);ctx.fillStyle=row.color;ctx.fillRect(pad,y,labelWidth,row.height-2);ctx.textAlign='center';ctx.fillStyle='#24251e';ctx.font='900 54px Segoe UI,Arial';ctx.fillText(row.key,pad+labelWidth/2,y+row.height/2+8);ctx.font='bold 12px Segoe UI,Arial';ctx.fillText(row.label,pad+labelWidth/2,y+row.height/2+34,labelWidth-12);
    for(const [j,id] of row.ids.entries()){
      const person=people.get(id),x=pad+labelWidth+20+(j%columns)*cellWidth,cy=y+12+Math.floor(j/columns)*132;
      ctx.fillStyle='#303c28';ctx.fillRect(x,cy,cardWidth,cardHeight);
      const im=images.get(id);
      if(im){const size=Math.min(im.width,im.height);if(person.crop)ctx.drawImage(im,person.crop.x,person.crop.y,person.crop.size,person.crop.size,x,cy,cardWidth,cardWidth);else ctx.drawImage(im,(im.width-size)/2,(im.height-size)/2,size,size,x,cy,cardWidth,cardWidth)}
      else{ctx.fillStyle='#d4eb77';ctx.font='bold 28px Segoe UI,Arial';ctx.fillText(person.name.slice(0,2),x+cardWidth/2,cy+56)}
      ctx.fillStyle='#edf0e7';ctx.font='bold 11px Segoe UI,Arial';ctx.fillText(person.name,x+cardWidth/2,cy+109,cardWidth-6);
    }
    y+=row.height;
  }
  ctx.textAlign='left';ctx.fillStyle='#78886c';ctx.font='12px Segoe UI,Arial';ctx.fillText('БЛОГЕРЫ И СТРИМЕРЫ · МОЙ ТИР-ЛИСТ',pad,y+35);
  const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw Error('Не удалось создать PNG');return {blob,width:canvas.width,height:canvas.height};
}
$('#exportForm').onsubmit=async event=>{event.preventDefault();const button=$('#exportSubmit');button.disabled=true;$('#exportStatus').textContent='Собираю картинку…';try{const snapshot=clone(state),result=await buildTierPng(snapshot,{width:$('#exportSize').value,includeReserve:$('#exportReserve').checked});download(result.blob,fileStem()+'_'+result.width+'px.png');$('#exportStatus').textContent='PNG '+result.width+' × '+result.height+' подготовлен к скачиванию.';toast('Картинка готова')}catch(error){$('#exportStatus').textContent=error.message;toast('Не удалось сохранить картинку: '+error.message)}finally{button.disabled=false}};
