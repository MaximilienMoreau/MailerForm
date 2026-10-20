export const productStatus = {
  label: 'Early access',
  description:
    'MailerForm is an early-access product preview. Access is by invitation, and no public launch date is confirmed.',
  scope:
    'The examples on this site are demonstrations. Production features, integration availability, and service terms are confirmed before activation.',
} as const

export const productStages = [
  {
    label: 'Now',
    title: 'Explore the website preview',
    description:
      'Try preset analysis reports, inspect an illustrative SDK workflow, and review preview pricing. These examples do not send or analyze your own emails.',
  },
  {
    label: 'Access',
    title: 'Request an invitation',
    description:
      'Share your email and selected plan. We will discuss availability, your sending requirements, and onboarding before any activation or payment.',
  },
  {
    label: 'Planned',
    title: 'Confirm your production scope',
    description:
      'Analysis, sending streams, event handling, and integrations are planned product areas. Confirm supported capabilities and operational limits with the team before moving production traffic.',
  },
  {
    label: 'Later',
    title: 'Public launch timing to be confirmed',
    description:
      'There is no confirmed general-availability date on this site. Confirmed product releases and availability changes will be recorded in the update log.',
  },
] as const
