/**
 * Brand landing-page content (drives /brands/[slug]).
 *
 * This is authored marketing copy, kept in the repo (not Firebase) so it's
 * versioned and reviewed like code. Firebase remains the source for logos
 * only, joined via `logoAltMatch` against P_BRANDS.manufacturerAltText.
 *
 * DRAFT STATUS: all copy below is a first draft awaiting client review.
 * Factual claims about what's on the showroom floor must be confirmed by
 * the client before launch. `authorizedDealer` stays false until the client
 * confirms authorization for that line — it gates the words
 * "Authorized Dealer", which are a per-manufacturer legal claim.
 */

export type BrandCategory =
  | 'Speakers'
  | 'Electronics'
  | 'Televisions'
  | 'Turntables'
  | 'Streaming'
  | 'Automation'
  | 'Furniture';

export type BrandSection = {
  title: string;
  paragraphs: string[];
};

export type Brand = {
  /** URL segment: /brands/[slug]. Lowercase, hyphenated, stable. */
  slug: string;
  name: string;
  /** Exact P_BRANDS.manufacturerAltText value for this brand's logo. */
  logoAltMatch: string;
  /** Official manufacturer site — used as Brand.sameAs in structured data. */
  manufacturerUrl: string;
  categories: BrandCategory[];
  serviceLinks: { label: string; href: string }[];
  /** Gates "Authorized Dealer" wording. Only set true per client confirmation. */
  authorizedDealer: boolean;
  intro: string;
  sections: BrandSection[];
  /** Demo-room/Huntington-specific paragraph — required, keeps pages local and substantive. */
  localAngle: string;
  relatedSlugs: string[];
  /** Hand-written, ≤160 chars, mentions Huntington/Long Island. */
  metaDescription: string;
};

export const BRANDS: Brand[] = [
  {
    slug: 'kef',
    name: 'KEF',
    logoAltMatch: 'Kef logo',
    manufacturerUrl: 'https://us.kef.com',
    categories: ['Speakers'],
    serviceLinks: [
      { label: 'Home audio design & installation', href: '/services/audio' },
      { label: 'Home theater & video', href: '/services/video' }
    ],
    authorizedDealer: false,
    intro:
      'KEF has been engineering loudspeakers in Maidstone, England since 1961, and its Uni-Q driver — the tweeter mounted at the acoustic center of the midrange cone — remains one of the few genuinely different ideas in speaker design. The result is imaging that stays locked in place even when you’re not sitting dead center, which matters in real living rooms far more than it does on a spec sheet.',
    sections: [
      {
        title: 'Why we carry KEF',
        paragraphs: [
          'Every brand on our floor earns its place by winning listening comparisons, and KEF wins them often. From the compact bookshelf models that punch far above their size to the flagship floorstanders, the family sound is consistent: precise, uncolored, and easy to listen to for hours.',
          'KEF’s range also solves real-world problems. Wireless powered models deliver serious two-channel sound without a rack of separates, and the architectural line lets us put that same voicing inside walls and ceilings for cinema and whole-home systems where floor space is spoken for.'
        ]
      },
      {
        title: 'KEF for stereo and home theater alike',
        paragraphs: [
          'Because the Uni-Q point source behaves so predictably off-axis, KEF is one of our go-to recommendations for home theater as well as two-channel listening — dialogue stays anchored to the screen across the whole couch, not just the center seat. We design, install, and calibrate complete KEF-based systems, from a simple stereo pair to a full surround layout.'
        ]
      }
    ],
    localAngle:
      'The best way to understand what KEF does differently is to hear it against its competition, level-matched, in a treated room. Our Huntington showroom at 382 New York Ave has dedicated stereo and home-cinema demo rooms — bring your own music and sit anywhere on the couch, not just the middle seat. We serve Huntington and all of Long Island, from Nassau to the North Fork.',
    relatedSlugs: ['paradigm', 'marantz', 'sonos'],
    metaDescription:
      'Hear KEF speakers in person at Sound Insight in Huntington, NY. Stereo and home theater demos, design, installation, and calibration across Long Island.'
  },
  {
    slug: 'paradigm',
    name: 'Paradigm',
    logoAltMatch: 'Paradigm logo',
    manufacturerUrl: 'https://www.paradigm.com',
    categories: ['Speakers'],
    serviceLinks: [
      { label: 'Home audio design & installation', href: '/services/audio' },
      { label: 'Home theater & video', href: '/services/video' }
    ],
    authorizedDealer: false,
    intro:
      'Paradigm builds its speakers in Canada and designs them the unglamorous way: blind listening panels, anechoic measurement, and driver materials developed in-house. That discipline shows up as something simple — speakers that sound bigger and cleaner than their price suggests, year after year.',
    sections: [
      {
        title: 'Why we carry Paradigm',
        paragraphs: [
          'Value is the hardest thing to find in high-end audio, and Paradigm is where we often send people who want the most performance per dollar without a boutique price tag. The lineup scales honestly: entry-level models share real engineering DNA with the flagships rather than just the badge.',
          'For home theater, Paradigm’s dynamics and matched voicing across front, center, surround, and in-ceiling models make it easy to build a system that sounds like one instrument instead of a collection of boxes.'
        ]
      },
      {
        title: 'From first system to reference room',
        paragraphs: [
          'We’ve installed Paradigm in first apartments and in dedicated theaters, and the upgrade path is part of the appeal — start with a capable pair and grow into a full system without abandoning the sound you chose. Paired with matching subwoofers and proper room calibration, the results embarrass plenty of systems costing multiples more.'
        ]
      }
    ],
    localAngle:
      'Specs don’t tell you how a speaker loads your room. Our demo rooms in Huntington village let you compare Paradigm directly against other lines we carry — same electronics, same music, level-matched. If you’re anywhere on Long Island, it’s worth the drive before you spend anything online.',
    relatedSlugs: ['kef', 'marantz', 'sonos'],
    metaDescription:
      'Paradigm speakers at Sound Insight, Huntington NY. Compare them in our Long Island demo rooms — home theater and stereo design, installation, calibration.'
  },
  {
    slug: 'marantz',
    name: 'Marantz',
    logoAltMatch: 'Marantz logo',
    manufacturerUrl: 'https://www.marantz.com',
    categories: ['Electronics', 'Turntables'],
    serviceLinks: [
      { label: 'Home audio design & installation', href: '/services/audio' },
      { label: 'Home theater & video', href: '/services/video' }
    ],
    authorizedDealer: false,
    intro:
      'Marantz has been synonymous with musical amplification since Saul Marantz started the company in 1953 — in New York, as it happens. Seventy years on, the house sound is still unmistakable: warm, dimensional, and forgiving of real-world recordings, in everything from stereo integrateds to flagship AV separates.',
    sections: [
      {
        title: 'Why we carry Marantz',
        paragraphs: [
          'Plenty of electronics measure well; fewer are a pleasure to live with. Marantz voices its components by ear as well as by instrument, and the difference is audible on the music people actually play — not just on test tracks.',
          'The range covers the whole journey: network receivers that stream everything and disappear into a cabinet, AV receivers and processors for serious theaters, and two-channel separates for dedicated listening rooms. That breadth lets us match the component to the system instead of forcing the system around the component.'
        ]
      },
      {
        title: 'The heart of a system we can stand behind',
        paragraphs: [
          'A receiver or amplifier is the piece you’ll touch every day, so reliability and support matter as much as sound. We handle the design, installation, network setup, and calibration, and we service what we sell — when firmware or room correction needs attention years later, you call us, not a call center.'
        ]
      }
    ],
    localAngle:
      'Hear Marantz driving the speakers you’re actually considering — that pairing is the whole game, and it’s exactly what our Huntington demo rooms are set up to do. We’ve been matching electronics to speakers for Long Island listening rooms and theaters since 2002.',
    relatedSlugs: ['kef', 'paradigm', 'sonos'],
    metaDescription:
      'Marantz receivers, amplifiers & separates at Sound Insight in Huntington, NY. Hear them with your speakers — Long Island design, install, and calibration.'
  },
  {
    slug: 'sonos',
    name: 'Sonos',
    logoAltMatch: 'Sonos logo',
    manufacturerUrl: 'https://www.sonos.com',
    categories: ['Streaming', 'Speakers'],
    serviceLinks: [
      { label: 'Whole-home audio', href: '/services/audio' },
      { label: 'Home automation', href: '/services/automation' }
    ],
    authorizedDealer: false,
    intro:
      'Sonos made whole-home audio something normal people actually use: every room, every streaming service, one app that the whole family understands. It’s the system we recommend when ease of use matters as much as sound quality — and the one we most often expand, repair, and integrate into larger systems.',
    sections: [
      {
        title: 'Why we carry Sonos',
        paragraphs: [
          'You can buy a Sonos speaker anywhere. What you can’t buy off a shelf is a house where it works flawlessly: solid Wi-Fi in every zone, TV audio that never lip-syncs late, in-ceiling speakers powered by Sonos amps in rooms where a countertop speaker doesn’t belong, and everything tied into lighting and control systems.',
          'That last part is our specialty. Sonos plays well with the automation platforms we install, so music becomes part of scenes — dinner, movie night, morning — instead of another app to fumble with.'
        ]
      },
      {
        title: 'From one speaker to every room',
        paragraphs: [
          'The right Sonos system is designed, not accumulated. We plan zones around how you actually live, mix visible speakers with architectural ones, and set up the streaming services, alarms, and TV integration before we leave. When Sonos releases new hardware or the app changes, we’re a local phone call, not a forum thread.'
        ]
      }
    ],
    localAngle:
      'Our Huntington showroom runs Sonos throughout, alongside the control systems it integrates with — come hear the difference between a speaker on a shelf and a system designed for the house. We design and install Sonos across Long Island, and we untangle plenty of DIY systems too.',
    relatedSlugs: ['control4', 'kef', 'marantz'],
    metaDescription:
      'Sonos whole-home audio, designed and installed by Sound Insight in Huntington, NY. Zones, TV audio, and automation integration across Long Island.'
  },
  {
    slug: 'control4',
    name: 'Control4',
    logoAltMatch: 'Control 4 logo',
    manufacturerUrl: 'https://www.control4.com',
    categories: ['Automation'],
    serviceLinks: [
      { label: 'Home automation', href: '/services/automation' },
      { label: 'Security & surveillance', href: '/services/security' },
      { label: 'Whole-home audio', href: '/services/audio' }
    ],
    authorizedDealer: false,
    intro:
      'Control4 is the operating system for the whole house: lighting, climate, audio, video, shades, security — one interface, one set of scenes, thousands of compatible devices. It’s professionally designed and installed by dealers rather than sold in a box, because a system that runs your home has to be engineered around it.',
    sections: [
      {
        title: 'Why we carry Control4',
        paragraphs: [
          'Smart-home gadgets multiply apps; Control4 subtracts them. One remote runs the theater, one keypad scene turns the house off at night, and the same system watches the cameras, locks the doors, and fills the patio with music. It’s the difference between a house full of smart devices and a smart house.',
          'Control4 is also refreshingly agnostic — it drives the TVs, receivers, speakers, and security hardware we already trust, so you’re never locked into one manufacturer for everything.'
        ]
      },
      {
        title: 'Designed, programmed, and supported locally',
        paragraphs: [
          'A Control4 system is only as good as its programming. We design the system around how your household actually moves through a day, program the scenes and interfaces, and remain your support contact afterward — adjustments, additions, and new-device integration are a call away, from people who know your project by name.'
        ]
      }
    ],
    localAngle:
      'Automation is impossible to judge from a spec sheet — you have to touch it. Our Huntington showroom is a working Control4 environment: press the buttons, pull up the cameras, watch a room change with one tap. We design and install Control4 throughout Nassau and Suffolk.',
    relatedSlugs: ['sonos', 'marantz', 'kef'],
    metaDescription:
      'Control4 home automation designed & installed by Sound Insight, Huntington NY. Lighting, AV, security & audio in one system — serving all of Long Island.'
  }
];

export const getBrandBySlug = (slug: string): Brand | undefined => BRANDS.find((brand) => brand.slug === slug);

/**
 * Normalize a logo alt text / display name for matching: lowercase,
 * strip a trailing "logo", drop everything non-alphanumeric.
 * 'Control 4 logo' → 'control4', 'KEF logo' → 'kef'.
 */
const normalizeBrandKey = (value: string): string => value
  .toLowerCase()
  .replace(/\s*logo\s*$/i, '')
  .replace(/[^a-z0-9]/g, '');

/**
 * Find the brand page for a CMS logo item, matching either its exact
 * `logoAltMatch` join key or its display name. Deterministic, not fuzzy —
 * dirty CMS entries ('Anthema logo') simply won't match until given a page
 * with the exact `logoAltMatch`.
 */
export const findBrandForAltText = (altOrName: string): Brand | undefined => {
  const key = normalizeBrandKey(altOrName);
  if (!key) {
    return undefined;
  }
  return BRANDS.find(
    (brand) => normalizeBrandKey(brand.logoAltMatch) === key || normalizeBrandKey(brand.name) === key
  );
};

/** Attach /brands/[slug] hrefs to logo items whose alt/name matches a brand page. */
export const withBrandHrefs = <T extends { name: string; alt?: string }>(items: T[]): (T & { href?: string })[] => items.map((item) => {
  const brand = findBrandForAltText(item.alt || item.name);
  return brand ? { ...item, href: `/brands/${brand.slug}` } : item;
});
