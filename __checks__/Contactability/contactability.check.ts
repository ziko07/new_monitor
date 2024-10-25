/**
* This is a Checkly CLI MultiStepCheck construct. To learn more, visit:
* - https://www.checklyhq.com/docs/cli/
* - https://www.checklyhq.com/docs/cli/constructs-reference/#multistepcheck
*/

import { MultiStepCheck, Frequency, RetryStrategyBuilder } from 'checkly/constructs'
import { contactabilityGroup } from './contactability';  // Import the group

new MultiStepCheck('contactability', {
  name: 'Contactability',
  activated: true,
  muted: false,
  shouldFail: false,
  runParallel: false,
  locations: ['us-west-1', 'us-west-2', 'us-east-1', 'us-east-2'],
  group: contactabilityGroup, 
  tags: [],
  frequency: Frequency.EVERY_10M,
  environmentVariables: [],
 // group: your check belongs to group 'Contactability',
  code: {
    entrypoint: './contactability.spec.ts',
  },
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 60,
    maxRetries: 2,
    maxDurationSeconds: 600,
    sameRegion: true,
  }),
})
