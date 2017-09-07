module.exports = {
  extends: 'stylelint-config-standard',
  processors: [
    '@mapbox/stylelint-processor-arbitrary-tags'
  ],
  plugins: [
    'stylelint-order',
    'stylelint-scss'
  ],
  rules: {
    // 最大嵌套深度
    'max-nesting-depth': 3,
    'no-empty-source': null,
    'selector-pseudo-element-colon-notation': 'single',
    'order/order': [
      'dollar-variables',
      'at-variables',
      'less-mixins',
      'declarations',
      'custom-properties',
      'rules',
      'at-rules'
    ],
    'order/properties-order': [
      // classification
      {
        order: 'flexible',
        properties: [
          'clear',
          'content',
          'display',
          'float',
          'isolation',
          'position',
          'visibility',
        ]
      },
      // positioning
      {
        order: 'flexible',
        properties: [
          'align-content',
          'align-items',
          'align-self',
          'bottom',
          'clip',
          'flex',
          'grid',
          'justify-content',
          'left',
          'offset',
          'order',
          'overflow',
          'position',
          'right',
          'text-overflow',
          'top',
          'vertical-align',
          'z-index',
        ]
      },
      // dimensions
      {
        order: 'flexible',
        properties: [
          'block-size',
          'box-sizing',
          'height',
          'inline-size',
          'max-height',
          'max-width',
          'min-height',
          'min-width',
          'object',
          'width',
        ]
      },
      // margins
      {
        order: 'flexible',
        properties: [
          'margin',
        ]
      },
      // border
      {
        order: 'flexible',
        properties: [
          'border-color',
          'border-style',
          'border-width',
          'border',
        ]
      },
      // padding
      {
        order: 'flexible',
        properties: [
          'padding',
        ]
      },
      // list
      {
        order: 'flexible',
        properties: [
          'list-style',
          'marker-offset',
        ]
      },
      // tables
      {
        order: 'flexible',
        properties: [
          'border-collapse',
          'border-spacing',
          'caption-side',
          'empty-cells',
          'speak-header',
          'table-layout',
        ],
      },
      // font
      {
        order: 'flexible',
        properties: [
          'font',
        ],
      },
      // text
      {
        order: 'flexible',
        properties: [
          'break',
          'column',
          'columns',
          'hyphens',
          'letter-spacing',
          'line-height',
          'tab-size',
          'text',
          'white-space',
          'word-spacing',
          'word-wrap',
        ],
      },
      // color
      {
        order: 'flexible',
        properties: [
          'background',
          'box-decoration-break',
          'box-shadow',
          'color',
          'filter',
          'layer',
          'mask',
          'mix-blend-mode',
          'opacity',
        ],
      },
      // outline
      {
        order: 'flexible',
        properties: [
          'outline',
        ],
      },
      // transform
      {
        order: 'flexible',
        properties: [
          'transform',
          'backface-visibility',
          'perspective',
        ],
      },
      // animation
      {
        order: 'flexible',
        properties: [
          'animation',
          'transition',
          'will-change',
        ],
      },
      // dynamic
      {
        order: 'flexible',
        properties: [
          'accelerator',
          'behavior',
          'caret-color',
          'cursor',
          'filter',
          'pointer-events',
          'resize',
          'touch-action',
          'zoom',
        ],
      },
      // generated
      {
        order: 'flexible',
        properties: [
          'counter',
          'fallback',
          'include',
          'quotes',
        ],
      },
      // international
      {
        order: 'flexible',
        properties: [
          'direction',
          'ime-mode',
          'layout',
          'line-break',
          'ruby',
          'spacing',
          'text-autospace',
          'text-justify',
          'text-kashida-space',
          'unicode-bidi',
          'word-break',
          'writing-mode',
        ],
      },
      // print
      {
        order: 'flexible',
        properties: [
          'marks',
          'orphans',
          'page-break',
          'page',
          'size',
          'widows',
        ],
      },
      // aural
      {
        order: 'flexible',
        properties: [
          'azimut',
          'cue',
          'elevation',
          'pause',
          'pitch-range',
          'play-during',
          'richness',
          'speak',
          'speech',
          'stress',
          'voice-family',
          'volume',
        ]
      },
      // scrollbar
      {
        order: 'flexible',
        properties: [
          'scrollbar',
        ],
      }
    ]
  }
};
