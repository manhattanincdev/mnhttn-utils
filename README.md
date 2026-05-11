# Manhattan Custom Plytix Swatch Implementation

A reusable swatch system for surfacing Plytix subvariant data as `data-attributes` across multiple themes.

## 1. Common snippet

Place the `mnhttn-plytix-swatch-script.liquid` snippet before the closing `</body>` tag for every brand. The contents of the snippets are as follows:

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

### jsDelivr Cache
When updating a given branch, you can force jsDelivr to purge the cache by entering the urls here: [Purge jsDelivr CDN cache](https://www.jsdelivr.com/tools/purge)

## 2. Theme specific snippets

## Kyodan

Theme: Stretch by Maestrooo

`Line 176` of `snippets/option-value.liquid` add `{% render 'mnhttn-plytix-swatch-data' label: label, variant: variant %}`. The contents of the snippet are as follows:

```
data-plytix-swatch="{{ label }}" {% if variant.metafields.plytix.hex_1 %}data-plytix-hex1="{{ variant.metafields.plytix.hex_1 }}"{% endif %} {% if variant.metafields.plytix.hex_2 %}data-plytix-hex2="{{ variant.metafields.plytix.hex_2 }}"{% endif %} {% if variant.metafields.plytix.swatch %}data-plytix-img="{{ variant.metafields.plytix.swatch }}"{% endif %}
```

## Pure & Simple

Theme: Release by DigiFist

`Line 148` of `snippets/product-option.liquid`

Note: Pure & Simple is not currently using swatches on the product page.

```
{% comment %}Manhattan Custom; DO NOT DELETE{% endcomment %}
{% else %}
    {% if option.position == 1 or id contains 'option-1' or id contains 'Color' %}
        {% assign label_hidden = true %}
        <span class="swatch product-option__swatch product-option__swatch--{{ swatch_shape }}" data-plytix-swatch="{{ value }}" {% if value.variant.metafields.plytix.hex_1 %}data-plytix-hex1="{{ value.variant.metafields.plytix.hex_1 }}"{% endif %} {% if value.variant.metafields.plytix.hex_2 %}data-plytix-hex2="{{ value.variant.metafields.plytix.hex_2 }}"{% endif %} {% if value.variant.metafields.plytix.swatch %}data-plytix-img="{{ value.variant.metafields.plytix.swatch }}"{% endif %}></span>
    {% endif %}
{% comment %}END Manhattan Custom; DO NOT DELETE{% endcomment %}
```

## Golf Linx 18

Theme: Monochrome by Superfine

Note: This theme uses CSS :after to apply the swatches, therefore the usual JS script must be ommited from `theme.liquid`. The upgrade from v1.0.6 to v1.1.0 broke the custom swatch functions, below is the is updated instructions:

Add the `data-plytix-swatch="{{ value }}"` attribute to `Line 263` of `snippets/product-variant-options.liquid`

Followed by the following block for each:
```
{% comment %}Manhattan Custom; DO NOT DELETE{% endcomment %}
{%- assign current_variant = product.variants | where: "option1", value | first -%}
<style>
    {%- assign hex1 = current_variant.metafields.plytix.hex_1 -%}
    {%- assign hex2 = current_variant.metafields.plytix.hex_2 -%}
    {%- assign img = current_variant.metafields.plytix.swatch -%}

    .product-form__controls-group label[data-plytix-swatch="{{ value }}"].color-swatch:after {
        {%- if img -%}
            {%- if hex1 and hex2 -%}
                background: url({{ img }}) no-repeat center/cover, linear-gradient(-45deg, {{ hex2 }} 50%, {{ hex1 }} 50%) !important;
            {%- elsif hex1 -%}
                background: {{ hex1 }} url({{ img }}) no-repeat center/cover !important;
            {%- else -%}
                background: url({{ img }}) no-repeat center/cover !important;
            {%- endif -%}
        {%- elsif hex1 and hex2 -%}
            background: linear-gradient(-45deg, {{ hex2 }} 50%, {{ hex1 }} 50%) !important;
        {%- elsif hex1 -%}
            background: {{ hex1 }} !important;
        {%- endif -%} 
    }
</style>
{% comment %}END Manhattan Custom; DO NOT DELETE{% endcomment %}
```