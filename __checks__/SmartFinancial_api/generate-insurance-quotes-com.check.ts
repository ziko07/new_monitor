/**
* This is a Checkly CLI BrowserCheck construct. To learn more, visit:
* - https://www.checklyhq.com/docs/cli/
* - https://www.checklyhq.com/docs/cli/constructs-reference/#browsercheck
*/

import { BrowserCheck, Frequency, RetryStrategyBuilder } from 'checkly/constructs'
import { smart_financial_api } from './smart-financial-api';  // Import the group

new BrowserCheck('generate-insurance-quotes-com', {
  name: 'GenerateInsuranceQuotes.com',
  activated: true,
  muted: false,
  shouldFail: false,
  runParallel: false,
  locations: [],
  tags: [],
  sslCheckDomain: '',
  frequency: Frequency.EVERY_10M,
  environmentVariables: [
    { key: 'BASE_URL', value: 'https://generateinsurancequotes.com', locked: false, secret: false },
  ],
  group: smart_financial_api,
  code: {
    entrypoint: './generate-insurance-quotes-com.spec.ts',
  },
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 60,
    maxRetries: 2,
    maxDurationSeconds: 600,
    sameRegion: true,
  }),
})
