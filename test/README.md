# Tests

This directory contains unit tests for the project.

## Running Tests

- `npm test` - Run tests in watch mode (interactive)
- `npm run test:run` - Run tests once and exit
- `npm run test:watch` - Run tests in watch mode (explicit)

## Test Structure

- `wikilinks.test.js` - Tests for the remark-wikilinks plugin functionality

The tests use [Vitest](https://vitest.dev/) as the testing framework, which provides:

- Fast execution with hot module reloading
- Native ES modules support
- Jest-compatible API
- Great TypeScript support

## Writing Tests

Tests follow the standard structure:

```javascript
import { describe, it, expect } from 'vitest';

describe('Feature Name', () => {
  it('should do something specific', async () => {
    // Test implementation
    expect(result).toBe(expected);
  });
});
```
