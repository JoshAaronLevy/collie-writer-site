// Website copy mirrors the desktop edition rights. Checkout remains service-owned.
export const offers = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    cadence: 'No timed trial',
    summary:
      'One editable personal project at a time. Switch whenever you want.',
    detail:
      'Every project stays readable, individually exportable, backed up and recoverable. Use existing export recipes for one format at a time.',
  },
  {
    id: 'monthly',
    name: 'Monthly',
    price: '$9.99',
    cadence: 'USD / month',
    summary:
      'Unlimited editable projects, saved export recipes and multiple export formats in one operation.',
    detail:
      'Recurring billing. Paid access covers the verified paid period, with up to 14 days of signed offline grace. Go online and refresh purchase access for renewals or changes.',
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: '$199',
    cadence: 'USD once',
    summary:
      'The same paid conveniences, with all future updates to the purchased nonfiction edition.',
    detail:
      'No major-version ceiling. Separate future editions or products are not included. Buying lifetime does not cancel an existing monthly subscription.',
  },
] as const

export const purchaseAvailability = {
  status: 'unavailable',
  heading: 'Planned pricing',
  notice:
    'Purchases are not yet available. Initial sales are planned for the United States, in USD.',
} as const
