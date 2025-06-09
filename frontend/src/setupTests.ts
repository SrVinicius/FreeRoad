import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill para TextEncoder e TextDecoder
global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;