function applyPlytixSwatches(){        
  document.querySelectorAll('[data-plytix-swatch]').forEach(function(el){
    const hex1 = el.dataset.plytixHex1;
    const hex2 = el.dataset.plytixHex2;
    const img = el.dataset.plytixImg;

    if(hex1){
      el.style.backgroundColor = hex1;
    }
    if(hex2){
      el.style.background = `linear-gradient(-45deg, ${hex2} 50%, ${hex1} 50%)`;
    }
    if(img){
      el.style.backgroundImage = `url(${img})`;
      el.style.backgroundSize = 'cover';
    }
  });
}
        
// Global: Quick search
const quickSearch = document.querySelectorAll('#search-drawer-input');
if(quickSearch && quickSearch.length){
  quickSearch.forEach(function(el){ 
    el.addEventListener('input', function(){
      setTimeout(function(){
        applyPlytixSwatches();
      }, 750);
    });
  });
}

// Collection: Elements being added
const tagsToWatch = ['quick-buy-modal', 'product-render'];

const bodyObserver = new MutationObserver(function(mutationsList){
  for(const mutation of mutationsList){
    if(mutation.type === 'childList'){
      mutation.addedNodes.forEach(function(node){
        if(
          node.nodeType === 1 &&
          tagsToWatch.includes(node.tagName.toLowerCase())
        ){
          const tagObserver = new MutationObserver(function(tagMutations){
            for(const m of tagMutations){
              if(
                m.type === 'childList' &&
                (m.addedNodes.length > 0 || m.removedNodes.length > 0)
              ){
                applyPlytixSwatches();
                console.log('mnhttn: rerendering swatches =>', node.tagName.toLowerCase());
              }
            }
          });
          tagObserver.observe(node, { childList: true, subtree: true });
          applyPlytixSwatches();
        }
      });
    }
  }
});
bodyObserver.observe(document.body, { childList: true, subtree: true });

// Product: Recommendations
const recommendations = document.querySelector('product-recommendations');

if(recommendations){
  const tagObserver = new MutationObserver(function(tagMutations){
    for(const m of tagMutations){
      if(m.type === 'childList' && (m.addedNodes.length > 0)){
        applyPlytixSwatches();
      }
    }
  });
  tagObserver.observe(recommendations, { childList: true, subtree: true });
  applyPlytixSwatches();
}

// Utils: Event listeners
document.addEventListener('DOMContentLoaded', applyPlytixSwatches);
document.addEventListener('variant:change', applyPlytixSwatches);