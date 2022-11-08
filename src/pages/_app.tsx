import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { AppProps } from 'next/app';
import {
  Chain,
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

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

  const connector = new InjectedConnector({
    chains: [fantomOpera],
  });

  const { chains, provider } = configureChains(
    [fantomOpera, chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
    [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
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
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
