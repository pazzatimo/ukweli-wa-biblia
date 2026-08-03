import { createClient, type ClientConfig } from '@sanity/client'

const config: ClientConfig = {
  projectId: '9wif6gxk',
  dataset: 'production',
  apiVersion: '2024-03-25',
  useCdn: process.env.NODE_ENV === 'production',
}

export const client = createClient(config)

export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
})

export function getClient(preview: boolean = false) {
  return preview ? previewClient : client
}