class RateLimiter {
  constructor(maxRequests, intervalMs) {
    this.maxRequests = maxRequests;
    this.intervalMs = intervalMs;
    this.timestamps = [];
  }

  async waitForAvailableSlot() {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(ts => now - ts < this.intervalMs);

    if (this.timestamps.length < this.maxRequests) {
      this.timestamps.push(now);
      return;
    }

    const waitTime = this.intervalMs - (now - this.timestamps[0]);
    await new Promise(resolve => setTimeout(resolve, waitTime + 10));
    return this.waitForAvailableSlot();
  }

  async execute(fn) {
    await this.waitForAvailableSlot();
    return fn();
  }
}

module.exports = RateLimiter; 