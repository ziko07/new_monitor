/**
* This is a Checkly CLI ApiCheck construct. To learn more, visit:
* - https://www.checklyhq.com/docs/cli/
* - https://www.checklyhq.com/docs/cli/constructs-reference/#apicheck
*/

import { ApiCheck, Frequency, AssertionBuilder, RetryStrategyBuilder } from 'checkly/constructs'
import { smart_financial_com } from './smart-financial-com';  // Import the group

new ApiCheck('smart-financial', {
  name: 'SmartFinancial',
  activated: true,
  muted: false,
  shouldFail: false,
  runParallel: false,
  locations: [],
  tags: [],
  frequency: Frequency.EVERY_10M,
  environmentVariables: [],
  group: smart_financial_com,
  maxResponseTime: 20000,
  degradedResponseTime: 5000,
  request: {
    url: 'https://smartfinancial.com/?aid=60',
    method: 'GET',
    followRedirects: true,
    skipSSL: false,
    assertions: [
      AssertionBuilder.statusCode().equals(200),
    ],
    body: ``,
    bodyType: 'NONE',
    headers: [],
    queryParameters: [],
    basicAuth: {
      username: '',
      password: '',
    },
  },
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 10,
    maxRetries: 2,
    maxDurationSeconds: 600,
    sameRegion: true,
  }),
})
