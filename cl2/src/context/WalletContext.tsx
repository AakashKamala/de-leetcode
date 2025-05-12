
import { createContext } from 'react';

export const WalletContext = createContext<{
  connected: boolean;
  publicKey: string | null;
  connect: () => void;
}>({
  connected: false,
  publicKey: null,
  connect: () => {},
});
