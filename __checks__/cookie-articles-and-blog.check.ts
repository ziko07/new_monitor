/**
* This is a Checkly CLI BrowserCheck construct. To learn more, visit:
* - https://www.checklyhq.com/docs/cli/
* - https://www.checklyhq.com/docs/cli/constructs-reference/#browsercheck
*/

import { BrowserCheck, Frequency, RetryStrategyBuilder } from 'checkly/constructs'

new BrowserCheck('cookie-articles-and-blog', {
  name: 'Cookie, Articles and Blog',
  activated: true,
  muted: false,
  shouldFail: false,
  runParallel: false,
  locations: ['us-west-1'],
  tags: [],
  sslCheckDomain: '',
  frequency: Frequency.EVERY_10M,
  environmentVariables: [],
  code: {
    entrypoint: './cookie-articles-and-blog.spec.ts',
  },
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 60,
    maxRetries: 2,
    maxDurationSeconds: 600,
    sameRegion: true,
  }),
})
