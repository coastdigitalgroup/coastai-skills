// svgo.config.js
module.exports = {
  multipass: true, // Optimize repeatedly until smallest size reached
  js2svg: {
    indent: 2, // Re-indent for readability in templates
    pretty: true,
  },
  plugins: [
    // Use the default preset
    {
      name: 'preset-default',
      params: {
        overrides: {
          // IMPORTANT: Do not remove the viewBox, or scaling will break
          removeViewBox: false,
          // Cleanup IDs to prevent collisions
          cleanupIds: true,
        },
      },
    },
    // Custom: Convert all fills/strokes to currentColor for CSS styling
    {
      name: 'convertColors',
      params: {
        currentColor: true,
      },
    },
    // Custom: Add accessibility attributes to the root <svg>
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [
          { focusable: 'false' },
          { 'aria-hidden': 'true' },
        ],
      },
    },
    'removeXMLNS',
    'removeDimensions', // Use viewBox + CSS for sizing instead of hardcoded width/height
  ],
};
