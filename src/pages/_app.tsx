import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { AppProps } from 'next/app';
import { ReactNotifications } from 'react-notifications-component';
import {
  Chain,
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import 'react-notifications-component/dist/theme.css';
import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';
import '@rainbow-me/rainbowkit/styles.css';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  const fantomOpera: Chain = {
    id: 250,
    name: 'Fantom',
    network: 'Fantom',
    iconUrl: ['/fantom.png'],
    nativeCurrency: {
      name: 'Fantom',
      symbol: 'FTM',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://rpcapi.fantom.network',
    },
    // rpcUrls: ['https://rpc.ftm.tools'],
  };

  const bsc: Chain = {
    id: 56,
    name: 'BNB Smart Chain',
    network: 'BNB Smart Chain',
    iconUrl: ['/bsc.png'],
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://bsc-dataseed.binance.org/',
    },
    // rpcUrls: ['https://rpc.ftm.tools'],
  };

  const { chains, provider } = configureChains(
    [fantomOpera, chain.polygon, bsc, chain.mainnet],
    [
      alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
      publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ReactNotifications />
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
