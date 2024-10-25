/**
* This is a Checkly CLI CheckGroup construct. To learn more, visit:
* - https://www.checklyhq.com/docs/cli/
* - https://www.checklyhq.com/docs/cli/constructs-reference/#checkgroup
*/

import { CheckGroup, RetryStrategyBuilder } from 'checkly/constructs'

export const contactabilityGroup = new CheckGroup('contactability', {
  name: 'Contactability',
  activated: true,
  muted: false,
  runParallel: false,
  locations: ['us-west-1', 'us-west-2', 'us-east-1', 'us-east-2'],
  tags: [],
  concurrency: 1,
  environmentVariables: [],
  apiCheckDefaults: {
    url: '',
    headers: [],
    queryParameters: [],
    
  },
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 10,
    maxRetries: 1,
    maxDurationSeconds: 600,
    sameRegion: true,
  }),
})
