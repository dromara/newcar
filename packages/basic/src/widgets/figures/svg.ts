const svg2Blob = (xml: string): Blob =>
  new Blob([xml], { type: "image/svg+xml" });

const wrappedSvg = (svg: string, width?: number, height?: number): string =>
  `<${[
    "svg",
    `xmlns="http://www.w3.org/2000/svg"`,
    width && `width="${width}"`,
    height && `height="${height}"`,
  ]
    .filter(Boolean) // If the width or height is zero, discard it.
    .join(" ")}>${svg}</svg>`;

const solve = (svg: string, width?: number, height?: number): string =>
  window.URL.createObjectURL(svg2Blob(wrappedSvg(svg, width, height)));
