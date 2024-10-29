/**
* This is a Checkly CLI BrowserCheck construct. To learn more, visit:
* - https://www.checklyhq.com/docs/cli/
* - https://www.checklyhq.com/docs/cli/constructs-reference/#browsercheck
*/

import { BrowserCheck, Frequency } from 'checkly/constructs'
import { pop_under_pages_group } from './pop-under-pages'
new BrowserCheck('zip-check', {
  name: 'Zip Checks',
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
    entrypoint: './zip.spec.ts',
  },
})
