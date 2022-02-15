declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.png" {
  const content: any;
  export default content;
}

declare global {
  interface Window {
    _wq: any;
  }
  interface Window {
    Wistia: any;
  }
}

window._wq = window._wq || {};
window.Wistia = window.Wistia || {};
