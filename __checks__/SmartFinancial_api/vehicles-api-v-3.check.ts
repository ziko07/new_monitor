/**
* This is a Checkly CLI MultiStepCheck construct. To learn more, visit:
* - https://www.checklyhq.com/docs/cli/
* - https://www.checklyhq.com/docs/cli/constructs-reference/#multistepcheck
*/

import { MultiStepCheck, Frequency } from 'checkly/constructs'
import { smart_financial_api } from './smart-financial-api';  // Import the group

new MultiStepCheck('vehicles-api-v-3', {
  name: 'Vehicles API V3',
  activated: true,
  muted: false,
  shouldFail: false,
  runParallel: false,
  locations: [],
  tags: [],
  frequency: Frequency.EVERY_10M,
  environmentVariables: [],
  group: smart_financial_api,
  code: {
    entrypoint: './vehicles-api-v-3.spec.ts',
  },
})
