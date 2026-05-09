#!/bin/bash

# Trigger Padrinho Marketing Agents via Vercel API
# Usage: ./trigger-api.sh [agent-name|all]

VERCEL_URL="${VERCEL_URL:-https://padrinho-marketing.vercel.app}"
AGENT="${1:-all}"

# Check if CRON_SECRET is set
if [ -z "$CRON_SECRET" ]; then
  # Try to load from .env.local
  if [ -f ".env.local" ]; then
    export $(grep CRON_SECRET .env.local | xargs)
  fi
fi

# If still not set, try to get from Vercel
if [ -z "$CRON_SECRET" ]; then
  echo "⚠️  CRON_SECRET not found. Trying to fetch from Vercel..."
  if command -v vercel &> /dev/null; then
    CRON_SECRET=$(vercel env list | grep CRON_SECRET | head -1 | awk '{print $1}')
    if [ -z "$CRON_SECRET" ]; then
      echo "❌ Could not get CRON_SECRET from Vercel"
      echo ""
      echo "Options:"
      echo "  1. Set it manually: export CRON_SECRET='your-secret'"
      echo "  2. Add to .env.local: echo 'CRON_SECRET=...' >> .env.local"
      echo "  3. Get from Vercel: https://vercel.com/padrinho/padrinho-marketing/settings/environment-variables"
      exit 1
    fi
  fi
fi

AGENTS=("insights" "market" "user-insights" "strategy" "tactic" "operational" "figma")

trigger_agent() {
  local name=$1
  local url="${VERCEL_URL}/api/agents/agent-${name}?secret=${CRON_SECRET}"
  
  echo ""
  echo "═══════════════════════════════════════════════════════════"
  echo "🚀 Triggering $name agent..."
  echo "   $url"
  echo "═══════════════════════════════════════════════════════════"
  
  response=$(curl -s -X POST "$url" -H "Content-Type: application/json")
  
  # Check if response contains error
  if echo "$response" | grep -q '"ok":true'; then
    echo "✅ $name agent triggered successfully"
    echo "$response" | grep -o '"message":"[^"]*' | cut -d'"' -f4
  elif echo "$response" | grep -q "Unauthorized"; then
    echo "❌ Authentication failed - invalid CRON_SECRET"
    exit 1
  else
    echo "⚠️  Response: $response"
  fi
}

trigger_all() {
  echo ""
  echo "🎯 Starting full workflow via Vercel API..."
  echo "   Base URL: $VERCEL_URL"
  echo "   CRON_SECRET: ${CRON_SECRET:0:8}..."
  
  for agent in "${AGENTS[@]}"; do
    trigger_agent "$agent"
    
    # Skip wait for last agent
    if [ "$agent" != "${AGENTS[-1]}" ]; then
      if [ "$agent" = "strategy" ]; then
        echo ""
        echo "📱 Strategy agent sent Telegram message with approval button"
        echo "   Click ✅ in Telegram to continue"
        echo "   Remaining agents will auto-trigger on approval"
        echo ""
        read -p "Press Enter once you've approved in Telegram..."
      else
        echo ""
        read -p "Press Enter to continue..." || true
      fi
    fi
  done
  
  echo ""
  echo "═══════════════════════════════════════════════════════════"
  echo "🎉 Workflow completed!"
  echo "═══════════════════════════════════════════════════════════"
}

# Check if agent name is valid
if [ "$AGENT" = "all" ]; then
  trigger_all
elif [[ " ${AGENTS[@]} " =~ " ${AGENT} " ]]; then
  trigger_agent "$AGENT"
else
  echo "❌ Unknown agent: $AGENT"
  echo ""
  echo "Available agents:"
  echo "  $0 all"
  for a in "${AGENTS[@]}"; do
    echo "  $0 $a"
  done
  exit 1
fi
