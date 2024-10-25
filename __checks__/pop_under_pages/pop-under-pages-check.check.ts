/**
* This is a Checkly CLI BrowserCheck construct. To learn more, visit:
* - https://www.checklyhq.com/docs/cli/
* - https://www.checklyhq.com/docs/cli/constructs-reference/#browsercheck
*/

import { BrowserCheck, Frequency, RetryStrategyBuilder } from 'checkly/constructs'
import { pop_under_pages_group } from './pop-under-pages'
new BrowserCheck('pop-under-pages-check', {
  name: 'pop under pages check',
  activated: true,
  muted: false,
  shouldFail: false,
  runParallel: true,
  locations: [],
  tags: [],
  sslCheckDomain: '',
  frequency: Frequency.EVERY_10M,
  environmentVariables: [],
  group: pop_under_pages_group,
  code: {
    entrypoint: './pop-under-pages-check.spec.ts',
  },
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 60,
    maxRetries: 2,
    maxDurationSeconds: 600,
    sameRegion: true,
  }),
})
