/**
 * Retry a promise-returning function with configurable attempts, delay, and backoff.
 *
 * @param {Function} fn - The async function to retry.
 * @param {Object} options - Retry options.
 * @param {number} [options.retries=3] - Number of retries.
 * @param {number} [options.delay=1000] - Base delay between retries in ms.
 * @param {boolean} [options.backoff=false] - Whether to use exponential backoff.
 * @returns {Promise<any>}
 */
export default function retry(fn, options = {}) {
  const retries = options.retries ?? 3;
  const baseDelay = options.delay ?? 1000;
  const backoff = options.backoff ?? false;

  return new Promise((resolve, reject) => {
    let attempts = 0;

    const run = () => {
      attempts++;
      fn()
        .then(resolve)
        .catch((err) => {
          if (attempts > retries) {
            reject(err);
          } else {
            const delay = backoff ? baseDelay * 2 ** (attempts - 1) : baseDelay;
            setTimeout(run, delay);
          }
        });
    };

    run();
  });
}
