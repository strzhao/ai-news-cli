---
name: ai-news
description: Use ai-news-cli to query AI News articles, analyze URLs, manage Flomo, and view stats. Invoke explicitly via /ai-news command.
---

# AI News CLI

Use `ai-news-cli` to interact with [AI News](https://ai-news.stringzhao.life) from the terminal. All commands output JSON for easy parsing.

## Prerequisites

1. Check if installed:

```bash
ai-news --version
```

If not found, install globally:

```bash
npm install -g ai-news-cli
```

2. Check login status:

```bash
ai-news whoami
```

- Exit code `0` → logged in, proceed with commands
- Exit code `2` → not logged in, run `ai-news login` to open browser OAuth
- For headless environments: `ai-news login --token <jwt>`

## Output Format

All commands return JSON:

```json
{ "success": true, "data": { ... } }
```

On error:

```json
{ "error": "error message" }
```

Exit codes: `0` success, `1` error, `2` needs login.

## Commands

Commands are dynamically loaded from the server. Run `ai-news --help` for the latest full list.

### Articles

```bash
# List archived articles (default: 30 days, 10 per day)
ai-news articles:list [--days <1-180>] [--limit_per_day <1-200>] [--quality_tier <high|general|all>]

# Get AI-generated summary for a specific article
ai-news articles:summary --article_id <id>
```

### URL Analysis

```bash
# Submit a URL for content extraction and analysis (returns task_id)
ai-news url:analyze --url <url>

# Check status of a URL analysis task
ai-news url:status --task_id <id>

# List all your URL analysis tasks
ai-news url:tasks
```

### Flomo Integration

```bash
# View current Flomo webhook configuration
ai-news flomo:config

# Set Flomo webhook URL (must be HTTPS)
ai-news flomo:set-webhook --webhook_url <url>

# View Flomo push history
ai-news flomo:push-log [--limit <1-50>]

# View Flomo article click statistics
ai-news flomo:click-stats [--days <1-120>]
```

### Statistics

```bash
# Click statistics by news source
ai-news stats:sources [--days <1-120>]

# Click statistics by article type
ai-news stats:types [--days <1-120>]
```

## Common Workflows

### Browse recent high-quality articles

```bash
# 1. Fetch recent high-quality articles
ai-news articles:list --days 3 --quality_tier high

# 2. Pick an article_id from the results, get its summary
ai-news articles:summary --article_id <id>
```

### Analyze a URL

```bash
# 1. Submit the URL
ai-news url:analyze --url https://example.com/article
# Response includes task_id

# 2. Poll status until completed (every 2-3 seconds, timeout 60s)
ai-news url:status --task_id <task_id>
# Repeat until status is "completed" or "failed"
```

### Configure Flomo integration

```bash
# 1. Check current config
ai-news flomo:config

# 2. Set webhook if not configured
ai-news flomo:set-webhook --webhook_url https://flomoapp.com/...

# 3. Verify push history
ai-news flomo:push-log --limit 5
```

## Error Handling

- Exit code `2`: User is not logged in. Run `ai-news login` and retry.
- Exit code `1`: Parse the JSON `error` field and show it to the user.
- If `ai-news` command is not found: install with `npm install -g ai-news-cli`.

## Notes

- Business commands are dynamically loaded from the server — new commands appear without CLI updates.
- Set `AI_NEWS_API_URL` environment variable to override the server endpoint.
