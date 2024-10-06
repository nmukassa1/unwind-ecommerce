import {createStorefrontApiClient} from '@shopify/storefront-api-client';

 const client = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_URL,
  apiVersion: '2025-01',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS,
});

export default client;