#!/bin/bash

# Supabase Environment Setup Script
# This script helps you switch between local and production Supabase environments

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Supabase Environment Setup${NC}"
echo "================================"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if Supabase CLI is installed
if ! command_exists supabase; then
    echo -e "${RED}❌ Supabase CLI not found!${NC}"
    echo "Please install it first:"
    echo "  brew install supabase/tap/supabase"
    echo "  or visit: https://supabase.com/docs/guides/cli"
    exit 1
fi

# Function to setup local environment
setup_local() {
    echo -e "${YELLOW}🔧 Setting up LOCAL environment...${NC}"
    
    # Start local Supabase
    echo "Starting local Supabase instance..."
    supabase start
    
    # Get local credentials
    echo "Getting local credentials..."
    supabase status
    
    echo -e "${GREEN}✅ Local environment ready!${NC}"
    echo ""
    echo "Your local Supabase is running at:"
    echo "  Studio: http://localhost:54323"
    echo "  API: http://localhost:54321"
    echo "  Database: localhost:54322"
    echo ""
    echo "Copy env.local.example to .env.local and update with your local credentials"
}

# Function to setup production environment
setup_production() {
    echo -e "${YELLOW}🌐 Setting up PRODUCTION environment...${NC}"
    
    if [ -z "$1" ]; then
        echo -e "${RED}❌ Please provide your project reference!${NC}"
        echo "Usage: $0 production YOUR_PROJECT_REF"
        echo "Example: $0 production kzpxumcpjnwpwehaowmk"
        exit 1
    fi
    
    PROJECT_REF=$1
    
    echo "Linking to production project: $PROJECT_REF"
    supabase link --project-ref $PROJECT_REF
    
    echo "Pulling production schema..."
    supabase db pull
    
    echo -e "${GREEN}✅ Production environment linked!${NC}"
    echo ""
    echo "Your production Supabase is linked at:"
    echo "  https://$PROJECT_REF.supabase.co"
    echo ""
    echo "Copy env.production.example to .env.production and update with your production credentials"
}

# Function to show current status
show_status() {
    echo -e "${YELLOW}📊 Current Supabase Status${NC}"
    echo "================================"
    
    if supabase status >/dev/null 2>&1; then
        echo -e "${GREEN}✅ Local Supabase is running${NC}"
        supabase status
    else
        echo -e "${RED}❌ Local Supabase is not running${NC}"
    fi
    
    echo ""
    echo "Linked projects:"
    supabase projects list 2>/dev/null || echo "No projects linked"
}

# Function to reset local database
reset_local() {
    echo -e "${YELLOW}🔄 Resetting local database...${NC}"
    
    if [ "$1" = "--seed" ]; then
        echo "Resetting with seed data..."
        supabase db reset --seed
    else
        echo "Resetting database..."
        supabase db reset
    fi
    
    echo -e "${GREEN}✅ Local database reset complete!${NC}"
}

# Function to deploy to production
deploy_production() {
    echo -e "${YELLOW}🚀 Deploying to production...${NC}"
    
    echo "Pushing migrations..."
    supabase db push
    
    echo -e "${GREEN}✅ Production deployment complete!${NC}"
}

# Main script logic
case "$1" in
    "local")
        setup_local
        ;;
    "production")
        setup_production "$2"
        ;;
    "status")
        show_status
        ;;
    "reset")
        reset_local "$2"
        ;;
    "deploy")
        deploy_production
        ;;
    "help"|"--help"|"-h"|"")
        echo "Usage: $0 [COMMAND] [OPTIONS]"
        echo ""
        echo "Commands:"
        echo "  local                    Setup local Supabase environment"
        echo "  production <ref>         Link to production Supabase project"
        echo "  status                   Show current Supabase status"
        echo "  reset [--seed]           Reset local database (optionally with seed data)"
        echo "  deploy                   Deploy migrations to production"
        echo "  help                     Show this help message"
        echo ""
        echo "Examples:"
        echo "  $0 local                 # Setup local environment"
        echo "  $0 production kzpxumcpjnwpwehaowmk  # Link to production"
        echo "  $0 reset --seed          # Reset local DB with sample data"
        echo "  $0 deploy                # Deploy to production"
        ;;
    *)
        echo -e "${RED}❌ Unknown command: $1${NC}"
        echo "Use '$0 help' for usage information"
        exit 1
        ;;
esac 