declare module "scrollreveal" {
  export interface ScrollRevealOptions {
    delay?: number;
    distance?: string;
    duration?: number;
    easing?: string;
    interval?: number;
    opacity?: number;
    origin?: "top" | "right" | "bottom" | "left";
    rotate?: { x?: number; y?: number; z?: number };
    scale?: number;
    cleanup?: boolean;
    container?: Element;
    desktop?: boolean;
    mobile?: boolean;
    reset?: boolean;
    useDelay?: "always" | "once" | "onload";
    viewFactor?: number;
    viewOffset?: { top?: number; right?: number; bottom?: number; left?: number };
    beforeReveal?: (el: Element) => void;
    afterReveal?: (el: Element) => void;
    beforeReset?: (el: Element) => void;
    afterReset?: (el: Element) => void;
  }

  export interface ScrollRevealObject {
    reveal(target: Element | string, options?: ScrollRevealOptions): ScrollRevealObject;
    sync(): ScrollRevealObject;
    clean(target: Element | string): ScrollRevealObject;
    destroy(): void;
    readonly noop: boolean;
  }

  export default function ScrollReveal(options?: ScrollRevealOptions): ScrollRevealObject;
}
