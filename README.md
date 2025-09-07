# retry-promise-lite 🚀

A tiny and lightweight JavaScript utility to **retry async functions** (like API calls, DB queries, or file operations) with configurable attempts, delay, and optional exponential backoff.  

---

## Features

- Retry any async function that returns a Promise.
- Configurable number of retries.
- Configurable delay between retries.
- Optional **exponential backoff** for smarter retry strategies.
- Works in **Node.js** and **React/ESM** projects.
- Tiny and simple — no dependencies.

---

## Installation

```bash
npm install retry-promise-lite
```

---

## Usage

### Basic Example

```js
import retry from "retry-promise-lite";

let count = 0;

async function unstableTask() {
  count++;
  if (count < 3) throw new Error("Failed attempt " + count);
  return "Success on attempt " + count;
}

retry(unstableTask, { retries: 5, delay: 500 })
  .then(console.log)
  .catch(console.error);
```

**Output:**
```
Success on attempt 3
```

---

### With Exponential Backoff

```js
retry(unstableTask, { retries: 5, delay: 500, backoff: true })
  .then(console.log)
  .catch(console.error);
```

**Backoff behavior:**

- 1st retry → 500ms  
- 2nd retry → 1000ms  
- 3rd retry → 2000ms  
- 4th retry → 4000ms  

---

## API

### `retry(fn, options)`

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `fn`      | Function | — | The async function (returns a Promise) to retry. |
| `options` | Object   | `{}` | Configuration object. |
| `options.retries` | Number | `3` | Maximum number of retries. |
| `options.delay`   | Number | `1000` | Base delay between retries (in ms). |
| `options.backoff` | Boolean | `false` | If true, enables exponential backoff. |

**Returns:** `Promise<any>` — resolves if the function succeeds, rejects if all retries fail.

---

## Example Use Cases

- Retrying network requests that may fail due to temporary issues.
- Retrying database queries when the connection is unstable.
- Any async operation where transient failures are possible.

---

## Installation & Usage Notes

- Works in **Node.js** (CommonJS/ESM) and modern **React** projects.  
- For Node.js ESM projects:  
  ```js
  import retry from "retry-promise-lite";
  ```  
- For CommonJS (if you later support it):  
  ```js
  const retry = require("retry-promise-lite");
  ```

---

## License

MIT © [Asad Rehman](https://github.com/asadrehman1)
