// Which edition of the deck is shown: none (the Capitole du Libre talk), or the name of a file in
// docs/contenu/editions/. The browser reads `?edition=devfest`; Remotion (Studio, renders) and the Node scripts read
// the REMOTION_EDITION environment variable, the only kind Remotion lets into its bundle.
declare const process: { env: Record<string, string | undefined> };

const fromUrl = () => (typeof window === 'undefined' ? null : new URLSearchParams(window.location.search).get('edition'));

const fromEnvironment = () => {
  try {
    return process.env.REMOTION_EDITION;
  } catch {
    return undefined; // No `process` in the browser
  }
};

export const EDITION: string | undefined = fromUrl() || fromEnvironment() || undefined;
