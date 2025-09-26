// Change only the text node inside selectors, ignore <span> for screen readers
document.querySelectorAll('sale-price, compare-at-price').forEach(function(el) {
  el.childNodes.forEach(function(node) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      let price = node.textContent.trim();
      let number = price.replace('$', '').replace(/,/g, '').trim();
      let [dollars, cents] = number.split('.');
      let formattedPrice = parseInt(dollars, 10).toLocaleString('fr-CA') + (cents ? ',' + cents : '');
      node.textContent = formattedPrice + '\u00A0$';
    }
  });
});