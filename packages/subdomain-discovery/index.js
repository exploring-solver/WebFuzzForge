const dns = require('dns');

class SubdomainDiscovery {
  async discoverSubdomains(domain, wordlist) {
    const results = [];
    for (const word of wordlist) {
      const subdomain = `${word}.${domain}`;
      try {
        await new Promise((resolve, reject) => {
          dns.resolve4(subdomain, (err, addresses) => {
            if (err) reject(err);
            else resolve(addresses);
          });
        });
        results.push(subdomain);
      } catch (error) {
        // Subdomain doesn't exist, continue to next
      }
    }
    return results;
  }
}

module.exports = SubdomainDiscovery;