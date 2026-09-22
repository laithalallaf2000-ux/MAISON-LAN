/**
 * The four studio offerings, listed on the home page and summarised on `/about/`.
 *
 * `number` doubles as the stable React key and the displayed index.
 * `relatedType` is the matching `Project.type`, so the "related work" link lands
 * on a filter that actually exists — the offering names and the catalogue
 * facets are worded differently on purpose.
 */
export const services = [
  {
    number: '01',
    title: 'Brand Campaigns',
    relatedType: 'Brand Campaign',
    statement: 'Films built for brands that move the game forward.',
    body: 'From launch films to seasonal campaigns, we build tennis imagery with a clear cultural point of view — strategic, cinematic and made to travel.',
    image: '/images/night-rally.webp',
    items: [
      'Creative direction',
      'Campaign development',
      'Brand films',
      'Photography',
      'Casting',
      'Motion & edit'
    ]
  },
  {
    number: '02',
    title: 'Athlete Stories',
    relatedType: 'Athlete Stories',
    statement: 'Beyond the result, the person who earned it.',
    body: 'We document the discipline, doubt and character behind performance, creating athlete stories with emotional depth and editorial restraint.',
    image: '/images/recovery-portrait.webp',
    items: [
      'Athlete portraits',
      'Documentary',
      'Competition coverage',
      'Editorial photography',
      'Social series',
      'Content delivery'
    ]
  },
  {
    number: '03',
    title: 'Live & Event',
    relatedType: 'Event Coverage',
    statement: 'The point happens once. We make it last.',
    body: 'From tournaments to private activations, our crews capture the atmosphere and publish-ready moments while the energy is still alive.',
    image: '/images/crowd-flare.webp',
    items: [
      'Multi-camera',
      'Live direction',
      'Same-day edits',
      'Highlight films',
      'Event photography',
      'Social cutdowns'
    ]
  },
  {
    number: '04',
    title: 'Culture & Strategy',
    relatedType: 'Strategy',
    statement: 'Not content for content’s sake. A position worth owning.',
    body: 'We define how tennis brands show up through creative platforms, visual systems and editorial thinking rooted in the culture of the sport.',
    image: '/images/clubhouse.webp',
    items: [
      'Brand strategy',
      'Positioning',
      'Content systems',
      'Editorial direction',
      'Campaign concepts',
      'Consulting'
    ]
  }
]
