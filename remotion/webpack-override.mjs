// Lets the Remotion bundler import the slide content (docs/contenu/*.md) as raw text with `?raw`, like Vite does.
// Used by remotion.config.ts (Studio, CLI renders) and scripts/build-pptx.mjs (bundle()).

/** @param {import('webpack').Configuration} config */
export const webpackOverride = (config) => ({
  ...config,
  module: {
    ...config.module,
    rules: [{ resourceQuery: /raw/, type: 'asset/source' }, ...(config.module?.rules ?? [])],
  },
});
