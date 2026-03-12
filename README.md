# ai-news-cli

CLI tool for AI agents to interact with [ai-news](https://ai-news.stringzhao.life).

## Install

```bash
npm install -g ai-news-cli
```

## Login

```bash
ai-news login
```

Opens your browser for OAuth authentication. For headless environments:

```bash
ai-news login --token <jwt>
```

## Commands

```bash
ai-news whoami                                    # Show current user
ai-news articles:list --days 7 --quality_tier high # List articles
ai-news articles:summary --article_id <id>         # Get AI summary
ai-news url:analyze --url https://example.com      # Extract URL content
ai-news url:status --task_id <id>                  # Check extraction status
ai-news url:tasks                                  # List extraction tasks
ai-news flomo:config                               # View Flomo config
ai-news stats:sources --days 30                    # Source statistics
ai-news stats:types --days 30                      # Type statistics
```

All commands output JSON for easy parsing by AI agents.

## Exit Codes

- `0` — Success
- `1` — Error
- `2` — Not logged in (run `ai-news login`)
