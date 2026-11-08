# LiquidGlassUI

**A real-time glass material experiment for the web.** Not just a translucent card with backdrop blur: this demo uses a WebGL shader pipeline for refraction, chromatic aberration, Fresnel reflections, specular highlights, edge lighting and soft shadows.

## Live demo

Deploy this repository with GitHub Pages. The included workflow publishes the root folder automatically when changes are pushed to main.

## What powers it

The demo uses [@ybouane/liquidglass](https://github.com/ybouane/liquidglass), an MIT-licensed WebGL liquid-glass library. Its renderer captures the page content behind each surface, then samples and distorts that image through a shader. The foreground text remains crisp.

- Refraction and optical distortion
- Chromatic edge separation
- Fresnel rim reflections and specular highlights
- Adjustable blur, refraction and light intensity
- Responsive layout and reduced-motion support
- No local build step; the renderer is loaded as an ES module from jsDelivr

## Run locally

Because the browser loads JavaScript modules, serve the folder through a local HTTP server instead of opening index.html as a file.

\`\`\`bash
python3 -m http.server 8080
\`\`\`

Then open http://localhost:8080.

## Performance notes

WebGL and DOM capture have a real GPU/CPU cost. This demo keeps the number of glass surfaces small and does not mark static content as continuously animated, allowing the renderer to stay idle when the page does not change. For lower-end phones, reduce the number and size of glass panels before increasing optical quality.

## Browser requirements

A modern browser with WebGL 1, Canvas 2D and SVG foreignObject support. Cross-origin images used in the captured scene must permit CORS.

## License

The original demo code in this repository is MIT. The rendering engine is a separate MIT-licensed dependency; see its repository for its license and notices. LiquidGlassUI is an independent project and is not affiliated with Apple.
