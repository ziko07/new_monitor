/**
* This is a Checkly CLI CheckGroup construct. To learn more, visit:
* - https://www.checklyhq.com/docs/cli/
* - https://www.checklyhq.com/docs/cli/constructs-reference/#checkgroup
*/

import { CheckGroup, RetryStrategyBuilder } from 'checkly/constructs'

export const smart_financial_api =  new CheckGroup('smart-financial-api', {
  name: 'SmartFinancial_api',
  activated: true,
  muted: false,
  runParallel: false,
  locations: ['us-east-1', 'us-east-2', 'us-west-1', 'us-west-2'],
  tags: [],
  concurrency: 1,
  environmentVariables: [],
  apiCheckDefaults: {
    url: '',
    headers: [],
    queryParameters: [],
   
  },
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 60,
    maxRetries: 2,
    maxDurationSeconds: 600,
    sameRegion: true,
  }),
})
