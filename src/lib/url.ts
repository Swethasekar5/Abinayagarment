/**
 * Prefix a site-root path with the deploy base path.
 * Locally the base is "/", on GitHub Pages it's "/<repo>" (set by BASE_PATH in the deploy workflow).
 *   url('/products') → '/Abinayagarment/products'
 * Leaves external links, protocol-relative URLs and in-page anchors ("#quote") untouched.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

export const url = (path: string) => (path.startsWith('/') && !path.startsWith('//') ? `${BASE}${path}` : path);
