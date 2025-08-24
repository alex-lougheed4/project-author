// Environment configuration for Supabase
// This file automatically detects the environment and uses appropriate settings

export const config = {
  // Environment detection
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT || "development",

  // Supabase configuration
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  },

  // App configuration
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  },

  // Feature flags based on environment
  features: {
    // Enable debugging in development
    debug: process.env.NEXT_PUBLIC_ENVIRONMENT === "development",

    // Enable analytics in production
    analytics: process.env.NEXT_PUBLIC_ENVIRONMENT === "production",

    // Enable detailed logging in development
    detailedLogging: process.env.NEXT_PUBLIC_ENVIRONMENT === "development",
  },

  // Validation
  validate() {
    if (!this.supabase.url) {
      throw new Error("NEXT_PUBLIC_SUPABASE_URL is required");
    }
    if (!this.supabase.anonKey) {
      throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is required");
    }
  },

  // Helper to check if we're in development
  isDevelopment() {
    return this.environment === "development";
  },

  // Helper to check if we're in production
  isProduction() {
    return this.environment === "production";
  },

  // Helper to get environment info
  getEnvironmentInfo() {
    return {
      environment: this.environment,
      supabaseUrl: this.supabase.url,
      appUrl: this.app.url,
      isLocal: this.supabase.url.includes("localhost"),
      isRemote: !this.supabase.url.includes("localhost"),
    };
  },
};

// Validate configuration on import
config.validate();

export default config;
