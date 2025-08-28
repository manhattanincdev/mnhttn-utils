function applyPlytixSwatches(){        
  document.querySelectorAll('[data-plytix-swatch]').forEach(function(el){
    const hex1 = el.dataset.plytixHex1;
    const hex2 = el.dataset.plytixHex2;
    const img = el.dataset.plytixImg;

    if(!hex1 && typeof plytixColorCache !== 'undefined' && plytixColorCache && plytixColorCache[el.dataset.plytixSwatch]){
      hex1 = plytixColorCache[el.dataset.plytixSwatch][0];
      hex2 = plytixColorCache[el.dataset.plytixSwatch][1];
      img = plytixColorCache[el.dataset.plytixSwatch][2];
    }

    if(img){
      if(hex1 && hex2){
        el.style.background = `url(${img}) no-repeat center/cover, linear-gradient(-45deg, ${hex2} 50%, ${hex1} 50%)`;
      } else if(hex1){
        el.style.background = `${hex1} url(${img}) no-repeat center/cover`;
      } else {
        el.style.background = `url(${img}) no-repeat center/cover`;
      }
    } else if(hex1 && hex2){
      el.style.background = `linear-gradient(-45deg, ${hex2} 50%, ${hex1} 50%)`;
    } else if(hex1){
      el.style.background = hex1;
    }
  });
}
        
// Global: Quick search
const quickSearch = document.querySelectorAll('#search-drawer-input, predictive-search');
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

// Shared observer callback for childList mutations
const swatchMutationCallback = function(tagMutations){
  for(const m of tagMutations){
    if(m.type === 'childList' && (m.addedNodes.length > 0)){
      applyPlytixSwatches();
    }
  }
};

// Helper function for observing swatch mutations
function observeSwatchMutations(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(function(el){
    const tagObserver = new MutationObserver(swatchMutationCallback);
    tagObserver.observe(el, { childList: true, subtree: true });
  });
}

// Product: Recommendations and complementary products
observeSwatchMutations('product-recommendations, complementary-products, card-product-slider');

// Search: Full search results at /search
observeSwatchMutations('search-result-panel');

// Inline: Quick Add to Cart
observeSwatchMutations('quick-cart-drawer');

// Collections: Pagination
observeSwatchMutations('.shopify-section--main-collection');

// Utils: Event listeners
document.addEventListener('DOMContentLoaded', applyPlytixSwatches);
document.addEventListener('variant:change', applyPlytixSwatches);