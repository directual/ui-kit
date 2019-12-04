class Color {
  className: string;

  title: string;

  rgb: string;

  hex: string;

  constructor(className: string, title: string, rgb: string, hex: string) {
    this.className = className;
    this.title = title;
    this.rgb = rgb;
    this.hex = hex;
  }
}

export default Color;
