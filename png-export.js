(function(){
  if(window.__lilyPngExportInstalled)return;
  window.__lilyPngExportInstalled=true;
  function load(){
    if(window.html2canvas)return Promise.resolve(window.html2canvas);
    return new Promise(function(resolve,reject){
      var s=document.createElement('script');
      s.src='https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
      s.onload=function(){resolve(window.html2canvas)};
      s.onerror=reject;
      document.head.appendChild(s);
    });
  }
  function fileName(){
    var a=document.querySelector('[data-field="themeTitle"]');
    var b=document.querySelector('[data-field="charName"]');
    var n=((a?a.value:'')+'_'+(b?b.value:'')).replace(/[^a-zA-Zа-яА-ЯёЁ0-9_-]+/g,'_').replace(/_+/g,'_').replace(/^_|_$/g,'').slice(0,120);
    return (n||'Lily_Dale_Aesthetic')+'.png';
  }
  function addButton(){
    var result=document.getElementById('aestheticResult');
    if(!result||document.getElementById('aestheticPngButton'))return;
    var b=document.createElement('button');
    b.id='aestheticPngButton';b.type='button';b.textContent='↓ Скачать эстетику как PNG';
    b.style.cssText='display:block;width:100%;margin-top:10px;padding:13px;color:#f0ead6;background:#394936;border:1px solid rgba(220,214,180,.35);cursor:pointer;font:13px Georgia,serif';
    b.onclick=function(){
      var target=document.querySelector('#aestheticPreview .lily-aesthetic')||document.querySelector('.lily-aesthetic');
      if(!target){alert('Сначала сгенерируйте эстетику.');return;}
      b.disabled=true;b.textContent='⌛ Подготавливаем изображение…';
      load().then(function(h){return h(target,{backgroundColor:null,scale:2,useCORS:true,allowTaint:false,logging:false,imageTimeout:15000})})
      .then(function(canvas){var a=document.createElement('a');a.download=fileName();a.href=canvas.toDataURL('image/png');document.body.appendChild(a);a.click();a.remove()})
      .catch(function(e){console.error(e);alert('Не удалось сохранить PNG. Проверьте прямые ссылки на изображения.')})
      .finally(function(){b.disabled=false;b.textContent='↓ Скачать эстетику как PNG'});
    };
    result.appendChild(b);
  }
  var observer=new MutationObserver(addButton);
  observer.observe(document.body,{childList:true,subtree:true});
  addButton();
})();
