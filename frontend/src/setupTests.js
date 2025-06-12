import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
// Polyfill para TextEncoder e TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
