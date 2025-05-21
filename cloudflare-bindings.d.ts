// Define the Cloudflare Worker environment and bindings
interface Env {
  // KV Namespace binding
  ASSETS: KVNamespace;
  
  // Durable Object bindings
  CACHE: DurableObjectNamespace;
  IMAGE_OPTIMIZER: DurableObjectNamespace;
  
  // Add your environment variables here
  // Example: API_KEY: string;
}

// Make the bindings available in your Next.js app
declare global {
  interface ProcessEnv extends Env {}
}

export {};
