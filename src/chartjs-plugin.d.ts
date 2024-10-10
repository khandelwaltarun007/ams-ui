import 'chart.js';

declare module 'chart.js' {
  interface ChartOptions {
    plugins?: {
      centerText?: {
        display?: boolean;
        text?: string;
        color?: string;
        fontSize?: number;
        fontStyle?: string;
      };
    };
  }
}
