# Manhattan Custom Plytix Swatch Implementation

A reusable swatch system for surfacing Plytix subvariant data as `data-attributes` across multiple themes.

## 1. Global snippet

Place the following snippet before the closing `</body>` tag for every brand:

```
{% comment %}Manhattan Custom; DO NOT DELETE{% endcomment %}
<script id="plytix-gather" src="https://cdn.jsdelivr.net/gh/manhattanincdev/mnhttn-utils/js/plytix-swatches.js"></script>
{% comment %}END Manhattan Custom; DO NOT DELETE{% endcomment %}
```

## 2. Theme specific snippets

## Kyodan

Theme: Stretch by Maestrooo

`Line 200` of `snippets/option-value.liquid`

```
data-plytix-swatch="{{ label }}" {% if variant.metafields.ky_custom.hex_1 %}data-plytix-hex1="{{ variant.metafields.ky_custom.hex_1 }}"{% endif %} {% if variant.metafields.ky_custom.hex_2 %}data-plytix-hex2="{{ variant.metafields.ky_custom.hex_2 }}"{% endif %} {% if variant.metafields.ky_custom.swatch %}data-plytix-img="{{ variant.metafields.ky_custom.swatch }}"{% endif %}
```

## Pure & Simple

Theme: Release by DigiFist

`Line 145` of `snippets/product-option.liquid`

Note: Pure & Simple is not currently using swatches on the product page.

```
{% comment %}Manhattan Custom; DO NOT DELETE{% endcomment %}
{% else %}
    {% if option.position == 1 %}
        {% assign label_hidden = true %}
        <span class="swatch product-option__swatch product-option__swatch--{{ swatch_shape }}" data-plytix-swatch="{{ value }}" data-plytix-hex1="{{ value.variant.metafields.plytix.hex_1 }}" data-plytix-hex2="{{ value.variant.metafields.plytix.hex_2 }}" data-plytix-img="{{ value.variant.metafields.plytix.swatch }}"></span>
    {% endif %}
{% comment %}END Manhattan Custom; DO NOT DELETE{% endcomment %}
```