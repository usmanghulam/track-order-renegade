import { createContext } from 'react';
import { Context } from '../types/context';

const trackOrderContext = createContext<Context | null>(null);

export default trackOrderContext;