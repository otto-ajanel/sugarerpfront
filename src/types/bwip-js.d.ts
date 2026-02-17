declare module 'bwip-js' {
  interface BWIPOptions {
    bcid: string;
    text: string;
    scale?: number;
    height?: number;
    includetext?: boolean;
    textxalign?: 'center' | 'left' | 'right';
    textsize?: number;
    padding?: number;
  }

  export function toSVG(
    element: SVGElement,
    options: BWIPOptions
  ): void;

  export function toCanvas(
    canvas: HTMLCanvasElement,
    options: BWIPOptions
  ): void;
}
