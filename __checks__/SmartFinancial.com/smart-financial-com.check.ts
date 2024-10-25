import { BrowserCheck, Frequency, RetryStrategyBuilder } from 'checkly/constructs';
import { smart_financial_com } from './smart-financial-com';  // Import the group

// Define checks for each test file
const checks = [
  { name: 'auto_rapidfire', entrypoint: './auto-rapidfire.spec.ts' },
  { name: 'auto_rapidfire_prefill', entrypoint: './auto-rapidfire-prefill.spec.ts' },
  { name: 'commercial_rapidfire', entrypoint: './commercial-rapidfire.spec.ts' },
  { name: 'commercial_rapidfire_prefill', entrypoint: './commercial-rapidfire-prefill.spec.ts' },
  { name: 'health_rapidfire', entrypoint: './health-rapidfire.spec.ts' },
  { name: 'health_rapidfire_prefill', entrypoint: './health-rapidfire-prefill.spec.ts' },
  { name: 'home_rapidfire', entrypoint: './home-rapidfire.spec.ts' },
  { name: 'home_rapidfire_prefill', entrypoint: './home-rapidfire-prefill.spec.ts' },
  { name: 'life_rapidfire', entrypoint: './life-rapidfire.spec.ts' },
  { name: 'life_rapidfire_prefill', entrypoint: './life-rapidfire-prefill.spec.ts' },
  { name: 'medicare_rapidfire', entrypoint: './medicare-rapidfire.spec.ts' },
  { name: 'medicare_rapidfire_prefill', entrypoint: './medicare-rapidfire-prefill.spec.ts' },
  { name: 'motorcycle_rapidfire', entrypoint: './motorcycle-rapidfire.spec.ts' },
  { name: 'renters_rapidfire', entrypoint: './renters-rapidfire.spec.ts' },
  { name: 'renters_rapidfire_prefill', entrypoint: './renters-rapidfire-prefill.spec.ts' },
 
];

// Create BrowserChecks for each test
checks.forEach((check) => {
  new BrowserCheck(check.name, {
    name: check.name,
    activated: true,
    muted: false,
    shouldFail: false,
    runParallel: false,
    locations: ['us-west-1', 'us-west-2', 'us-east-1', 'us-east-2'],
    group: smart_financial_com,  // Associate all with the same group
    tags: [],
    sslCheckDomain: '',
    frequency: Frequency.EVERY_10M,  // Adjust the frequency as needed
    environmentVariables: [],
    code: {
      entrypoint: check.entrypoint,  // Set the entry point for each check
    },
    retryStrategy: RetryStrategyBuilder.linearStrategy({
      baseBackoffSeconds: 60,
      maxRetries: 2,
      maxDurationSeconds: 600,
      sameRegion: true,
    }),
  });
});
