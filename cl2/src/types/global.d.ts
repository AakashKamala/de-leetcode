
interface Window {
    solana?: {
      isPhantom?: boolean;
      connect: (params?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString: () => string } }>;
      disconnect: () => Promise<void>;
      signTransaction: (transaction: any) => Promise<{ signature: string }>;
      request: (params: { method: string; params?: any }) => Promise<any>;
    };
  }