/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module '*.json' {
  const src: string;
  export default src;
}

/* Markdown */
declare module '*.md';
