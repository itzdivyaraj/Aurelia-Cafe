import { createContext, useContext } from 'react';
import { siteConfig as defaultConfig } from '../config/siteConfig';

const SiteConfigContext = createContext(defaultConfig);

export function SiteConfigProvider({ config = defaultConfig, children }) {
  return (
    <SiteConfigContext.Provider value={config}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  return useContext(SiteConfigContext);
}
