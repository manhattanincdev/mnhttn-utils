# Manhattan Custom Plytix Swatch Implementation

A reusable swatch system for surfacing Plytix subvariant data as `data-attributes` across multiple themes.

## 1. Global snippet

Place the following snippet before the closing `</body>` tag for every brand:

```
{% comment %}Manhattan Custom; DO NOT DELETE{% endcomment %}
<script>
    let plytixColorCache = {};

    {% assign variants = product.variants %}
    {% for variant in variants %}
        var row = ['{{ variant.metafields.plytix.hex_1 }}', '{{ variant.metafields.plytix.hex_2 }}', '{{ variant.metafields.plytix.swatch }}'];
        plytixColorCache['{{ variant.option1 }}'] = row;
    {% endfor %}
</script>
<script id="plytix-gather" src="https://cdn.jsdelivr.net/gh/manhattanincdev/mnhttn-utils@latest/js/plytix-swatches.min.js"></script>
{% comment %}END Manhattan Custom; DO NOT DELETE{% endcomment %}
```

For versioning, the `main` branch is equal to `@latest` version which auto-updates, and may break. Stable versions being stored in `releases/vX`:
```
<script id="plytix-gather" src="https://cdn.jsdelivr.net/gh/manhattanincdev/mnhttn-utils@releases/v1/js/plytix-swatches.min.js"></script>
```

## 2. Theme specific snippets

## Kyodan

Theme: Stretch by Maestrooo

`Line 200` of `snippets/option-value.liquid`

```
data-plytix-swatch="{{ label }}" {% if variant.metafields.plytix.hex_1 %}data-plytix-hex1="{{ variant.metafields.plytix.hex_1 }}"{% endif %} {% if variant.metafields.plytix.hex_2 %}data-plytix-hex2="{{ variant.metafields.plytix.hex_2 }}"{% endif %} {% if variant.metafields.plytix.swatch %}data-plytix-img="{{ variant.metafields.plytix.swatch }}"{% endif %}
```

## Pure & Simple

Theme: Release by DigiFist

`Line 145` of `snippets/product-option.liquid`

Note: Pure & Simple is not currently using swatches on the product page.

```
{% comment %}Manhattan Custom; DO NOT DELETE{% endcomment %}
{% else %}
    {% if option.position == 1 or id contains 'option-1' %}
        {% assign label_hidden = true %}
        <span class="swatch product-option__swatch product-option__swatch--{{ swatch_shape }}" data-plytix-swatch="{{ value }}" {% if value.variant.metafields.plytix.hex_1 %}data-plytix-hex1="{{ value.variant.metafields.plytix.hex_1 }}"{% endif %} {% if value.variant.metafields.plytix.hex_2 %}data-plytix-hex2="{{ value.variant.metafields.plytix.hex_2 }}"{% endif %} {% if value.variant.metafields.plytix.swatch %}data-plytix-img="{{ value.variant.metafields.plytix.swatch }}"{% endif %}></span>
    {% endif %}
{% comment %}END Manhattan Custom; DO NOT DELETE{% endcomment %}
```