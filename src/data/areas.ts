export type Area = {
  slug: string;
  name: string;
  /** Postal town / district descriptor used in copy and schema. */
  county: string;
  postcodes: string[];
  /** Rough centre, used for LocalBusiness areaServed geo hints. */
  geo: { latitude: number; longitude: number };
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** Two hand-written paragraphs. Must reference a genuine local landmark. */
  intro: string[];
  /** Housing stock / plumbing reality specific to this place. */
  localNote: string;
};

export const areas: Area[] = [
  {
    slug: 'hull-city-centre',
    name: 'Hull City Centre',
    county: 'Kingston upon Hull',
    postcodes: ['HU1', 'HU2'],
    geo: { latitude: 53.7446, longitude: -0.3352 },
    metaTitle: 'Plumber in Hull City Centre',
    metaDescription:
      'Plumber covering Hull city centre, HU1 and HU2. Emergency callouts, leaks, bathrooms and repairs. Message on WhatsApp for a fast answer.',
    h1: 'Plumber in Hull city centre',
    intro: [
      'The city centre is a mix of converted warehouses around the Fruit Market and Humber Street, flats above shops in the Old Town, and newer apartment blocks near the Marina. Each one brings its own plumbing quirks, and very little of it is standard.',
      'We work across HU1 and HU2 daily. If you are in a flat where the stopcock is somewhere communal and nobody seems to know where, send us a message and we will talk you through finding it before anything gets worse.',
    ],
    localNote:
      'Warehouse conversions near Humber Street often run long horizontal pipe routes above ceilings, so a leak showing in one flat frequently starts in another. We trace it properly rather than opening the nearest ceiling.',
  },
  {
    slug: 'beverley',
    name: 'Beverley',
    county: 'East Riding of Yorkshire',
    postcodes: ['HU17'],
    geo: { latitude: 53.8425, longitude: -0.4291 },
    metaTitle: 'Plumber in Beverley',
    metaDescription:
      'Plumber covering Beverley and HU17. Emergency callouts, bathroom fitting, leak detection and repairs. No call-out fee, fully insured.',
    h1: 'Plumber in Beverley',
    intro: [
      'Beverley runs from Georgian townhouses in the shadow of the Minster through to large modern estates out towards Molescroft. The plumbing varies just as much, and a job in a period property on North Bar Within is a very different afternoon to one on a new build.',
      'We cover the whole of HU17, including Molescroft, Woodmansey and the villages just outside the town.',
    ],
    localNote:
      'The older properties inside the Bars often still have lead supply pipe running in from the main. If yours does, it is worth knowing about before it becomes urgent, and we will tell you plainly what it would take to replace.',
  },
  {
    slug: 'cottingham',
    name: 'Cottingham',
    county: 'East Riding of Yorkshire',
    postcodes: ['HU16'],
    geo: { latitude: 53.7822, longitude: -0.4133 },
    metaTitle: 'Plumber in Cottingham',
    metaDescription:
      'Plumber covering Cottingham and HU16. Emergency plumbing, bathrooms, leak detection and repairs. Message on WhatsApp for a fast response.',
    h1: 'Plumber in Cottingham',
    intro: [
      'Cottingham claims to be one of the largest villages in England, and the housing reflects that. Big Victorian and Edwardian semis along Hallgate and Northgate, interwar housing spreading out from the centre, and a substantial student population in shared houses near the university halls.',
      'We work across HU16 for homeowners, landlords and letting agents.',
    ],
    localNote:
      'Shared student houses take a lot of punishment through the year, particularly showers and waste. If you let property here, we are happy to work directly with tenants on access so you are not stuck relaying messages.',
  },
  {
    slug: 'hessle',
    name: 'Hessle',
    county: 'East Riding of Yorkshire',
    postcodes: ['HU13'],
    geo: { latitude: 53.7226, longitude: -0.4344 },
    metaTitle: 'Plumber in Hessle',
    metaDescription:
      'Plumber covering Hessle and HU13, in the shadow of the Humber Bridge. Emergency callouts, bathrooms, leaks and repairs. Fully insured.',
    h1: 'Plumber in Hessle',
    intro: [
      'Hessle sits right under the Humber Bridge, and the housing runs from the older streets around The Square down towards the foreshore, out to the larger properties on Swanland Road.',
      'We cover HU13 including Hessle foreshore, Anlaby Common edge and the streets around Hessle Square.',
    ],
    localNote:
      'Properties closer to the foreshore sit on low ground, and we see more than the usual number of issues with external waste and gully drainage after heavy rain. Worth clearing before winter rather than during it.',
  },
  {
    slug: 'willerby',
    name: 'Willerby',
    county: 'East Riding of Yorkshire',
    postcodes: ['HU10'],
    geo: { latitude: 53.7594, longitude: -0.4472 },
    metaTitle: 'Plumber in Willerby',
    metaDescription:
      'Plumber covering Willerby and HU10. Bathroom fitting, emergency callouts, leak detection and repairs across the East Riding.',
    h1: 'Plumber in Willerby',
    intro: [
      'Willerby is mostly comfortable postwar and later housing, with a good deal of it built from the sixties onwards around Kingston Road and out towards the Willerby Shopping Park.',
      'A lot of our work here is bathroom replacement. Original suites from the seventies and eighties are reaching the end of their lives, and the pipework behind them usually needs attention at the same time.',
    ],
    localNote:
      'Houses of this era often have the bath waste run at a marginal fall. When we replace a suite we correct it, which is why the new one drains properly rather than gurgling.',
  },
  {
    slug: 'anlaby',
    name: 'Anlaby',
    county: 'East Riding of Yorkshire',
    postcodes: ['HU10'],
    geo: { latitude: 53.7452, longitude: -0.4419 },
    metaTitle: 'Plumber in Anlaby',
    metaDescription:
      'Plumber covering Anlaby and Anlaby Common, HU10. Emergency plumbing, bathroom fitting, leaks and repairs. No call-out fee.',
    h1: 'Plumber in Anlaby',
    intro: [
      'Anlaby runs along the old road out of Hull towards the west, from Anlaby Common at the city edge through to the village centre near Anlaby Park Road.',
      'It is a mixed patch. Interwar semis, sixties estates and a fair number of properties that have been extended over the years, which usually means pipework has been added to more than once.',
    ],
    localNote:
      'Extensions built in stages tend to leave long, cold runs of pipe in unheated spaces. Those are the pipes that burst first in a hard frost, and lagging them is a cheap afternoon compared with the alternative.',
  },
  {
    slug: 'kirk-ella',
    name: 'Kirk Ella',
    county: 'East Riding of Yorkshire',
    postcodes: ['HU10'],
    geo: { latitude: 53.7539, longitude: -0.4708 },
    metaTitle: 'Plumber in Kirk Ella',
    metaDescription:
      'Plumber covering Kirk Ella and West Ella, HU10. Bathroom installations, emergency callouts, leak detection and repairs. Fully insured.',
    h1: 'Plumber in Kirk Ella',
    intro: [
      'Kirk Ella and neighbouring West Ella hold some of the larger detached properties on this side of the city, many of them set back off Beech Avenue and Packman Lane with generous plots.',
      'Bigger houses mean longer pipe runs, more bathrooms and more that can quietly go wrong out of sight.',
    ],
    localNote:
      'Where a property has an outbuilding, garage or annexe on its own supply, we often find the isolation valve for it seized. We free those off as a matter of course, because you want that valve to work on the day you actually need it.',
  },
  {
    slug: 'brough',
    name: 'Brough',
    county: 'East Riding of Yorkshire',
    postcodes: ['HU15'],
    geo: { latitude: 53.7269, longitude: -0.5758 },
    metaTitle: 'Plumber in Brough',
    metaDescription:
      'Plumber covering Brough and Elloughton, HU15. Emergency plumbing, bathrooms, leak detection and repairs across the East Riding.',
    h1: 'Plumber in Brough',
    intro: [
      'Brough has grown considerably, with large new developments spreading north of the railway line alongside the older village core near Elloughton.',
      'That gives us two quite different sorts of job here: modern properties still within their build warranty period, and older houses that have been worked on repeatedly over decades.',
    ],
    localNote:
      'On newer estates the most common call is a pushfit joint that was never fully pushed home. It can sit for a year holding pressure before it lets go, and it usually lets go inside a ceiling.',
  },
  {
    slug: 'hedon',
    name: 'Hedon',
    county: 'East Riding of Yorkshire',
    postcodes: ['HU12'],
    geo: { latitude: 53.7397, longitude: -0.1969 },
    metaTitle: 'Plumber in Hedon',
    metaDescription:
      'Plumber covering Hedon and HU12, east of Hull. Emergency callouts, bathroom fitting, leaks and repairs. Message on WhatsApp.',
    h1: 'Plumber in Hedon',
    intro: [
      'Hedon is an old town, and it looks it in the best way, with St Augustine’s church tower visible for miles across the flat land east of Hull.',
      'The housing around the market place and Souttergate is genuinely old in places, and the estates out towards Preston Road are considerably newer. We cover the lot across HU12.',
    ],
    localNote:
      'In the older parts of town, solid floors with pipework buried in screed are common. When one of those leaks, thermal tracing beats lifting the floor, and we would rather find it than break it.',
  },
  {
    slug: 'hornsea',
    name: 'Hornsea',
    county: 'East Riding of Yorkshire',
    postcodes: ['HU18'],
    geo: { latitude: 53.9114, longitude: -0.1664 },
    metaTitle: 'Plumber in Hornsea',
    metaDescription:
      'Plumber covering Hornsea and HU18 on the East Yorkshire coast. Emergency plumbing, bathrooms, leak detection and repairs.',
    h1: 'Plumber in Hornsea',
    intro: [
      'Hornsea sits between the mere and the sea, which makes it a pleasant place to live and a demanding one for plumbing and heating.',
      'There is a lot of older housing near the promenade and Newbegin, plus a substantial number of holiday lets and second homes that stand empty for stretches of the year.',
    ],
    localNote:
      'An empty property in winter is the classic burst pipe. If you let a place here, draining down or leaving heating on a frost setting costs far less than the repair and the ceiling that comes with it.',
  },
  {
    slug: 'withernsea',
    name: 'Withernsea',
    county: 'East Riding of Yorkshire',
    postcodes: ['HU19'],
    geo: { latitude: 53.7304, longitude: 0.0339 },
    metaTitle: 'Plumber in Withernsea',
    metaDescription:
      'Plumber covering Withernsea and HU19. Emergency callouts, bathroom fitting, leak detection and repairs on the Holderness coast.',
    h1: 'Plumber in Withernsea',
    intro: [
      'Withernsea is the far end of Holderness, marked by the old lighthouse standing inland from the seafront, which always surprises people who expect it on the cliff.',
      'We travel out here regularly. It is a long way from the city for a lot of trades, which is exactly why it is worth us covering properly.',
    ],
    localNote:
      'Coastal exposure is hard on external pipework and outside taps. Salt air accelerates corrosion on anything unprotected, and an outside tap that has seized is usually the first sign.',
  },
  {
    slug: 'driffield',
    name: 'Driffield',
    county: 'East Riding of Yorkshire',
    postcodes: ['YO25'],
    geo: { latitude: 54.0064, longitude: -0.4394 },
    metaTitle: 'Plumber in Driffield',
    metaDescription:
      'Plumber covering Driffield and YO25. Emergency plumbing, bathroom installations, leak detection and repairs in the Wolds.',
    h1: 'Plumber in Driffield',
    intro: [
      'Great Driffield calls itself the capital of the Wolds, and the town centre around Middle Street still has the feel of a proper market town.',
      'Beyond the centre the properties spread into the surrounding villages, and a good number sit on private supplies or older infrastructure.',
    ],
    localNote:
      'Wolds properties on hard water see far more scale in cylinders, valves and shower cartridges than houses closer to the coast. If your shower flow has quietly dropped over a couple of years, that is usually why.',
  },
  {
    slug: 'bridlington',
    name: 'Bridlington',
    county: 'East Riding of Yorkshire',
    postcodes: ['YO15', 'YO16'],
    geo: { latitude: 54.0836, longitude: -0.1922 },
    metaTitle: 'Plumber in Bridlington',
    metaDescription:
      'Plumber covering Bridlington, YO15 and YO16. Emergency callouts, bathrooms, leak detection and repairs on the East Yorkshire coast.',
    h1: 'Plumber in Bridlington',
    intro: [
      'Bridlington splits between the harbour and Old Town up the hill, with a large stock of Victorian and Edwardian terraces that were built for a very different era of seaside holiday.',
      'Many of those have since been divided into flats or run as guest houses, which means multiple bathrooms sharing pipework never designed for the load.',
    ],
    localNote:
      'In converted guest houses the usual problem is pressure rather than leaks. Several showers on one inadequate supply run will always disappoint, and the fix is upstream of the shower itself.',
  },
  {
    slug: 'howden',
    name: 'Howden',
    county: 'East Riding of Yorkshire',
    postcodes: ['DN14'],
    geo: { latitude: 53.7455, longitude: -0.8672 },
    metaTitle: 'Plumber in Howden',
    metaDescription:
      'Plumber covering Howden and DN14. Emergency plumbing, bathroom fitting, leak detection and repairs in the East Riding.',
    h1: 'Plumber in Howden',
    intro: [
      'Howden is dominated by the ruined choir of Howden Minster, and the streets around the market place hold some genuinely old buildings, a number of them listed.',
      'Newer housing has filled in around the edges of the town, so the work here ranges from careful jobs in period property to straightforward modern installations.',
    ],
    localNote:
      'In listed and conservation-area property, how a pipe is routed matters as much as whether it works. We plan runs to stay out of sight rather than surface-clipping across original features.',
  },
  {
    slug: 'market-weighton',
    name: 'Market Weighton',
    county: 'East Riding of Yorkshire',
    postcodes: ['YO43'],
    geo: { latitude: 53.8617, longitude: -0.6664 },
    metaTitle: 'Plumber in Market Weighton',
    metaDescription:
      'Plumber covering Market Weighton and YO43. Emergency callouts, bathrooms, leak detection and repairs at the foot of the Wolds.',
    h1: 'Plumber in Market Weighton',
    intro: [
      'Market Weighton sits where the Wolds meet the vale, a small town best known locally for William Bradley, the giant, whose height is still marked in the town.',
      'The housing is a steady mix of older stone and brick property near the centre and modern estates around it.',
    ],
    localNote:
      'Several properties on the outskirts here are off the mains drainage network and run to septic tanks. That changes what can safely go down a waste, and it changes how a bathroom is best configured.',
  },
  {
    slug: 'sutton-on-hull',
    name: 'Sutton-on-Hull',
    county: 'Kingston upon Hull',
    postcodes: ['HU7', 'HU8'],
    geo: { latitude: 53.7869, longitude: -0.3086 },
    metaTitle: 'Plumber in Sutton-on-Hull',
    metaDescription:
      'Plumber covering Sutton-on-Hull, HU7 and HU8. Emergency plumbing, bathroom fitting, leaks and repairs. No call-out fee.',
    h1: 'Plumber in Sutton-on-Hull',
    intro: [
      'Sutton village keeps a distinctly separate feel from the rest of the city, with the old church and the green at its centre and considerably newer housing pressing in around it.',
      'We cover the village and the surrounding HU7 and HU8 streets.',
    ],
    localNote:
      'The village core has a number of properties with original cast iron soil stacks still in place. They can last a long time, but when they fail they do it messily, and it is better to plan the replacement than react to it.',
  },
  {
    slug: 'bransholme',
    name: 'Bransholme',
    county: 'Kingston upon Hull',
    postcodes: ['HU7'],
    geo: { latitude: 53.7936, longitude: -0.3186 },
    metaTitle: 'Plumber in Bransholme',
    metaDescription:
      'Plumber covering Bransholme and HU7. Emergency callouts, repairs, leak detection and bathroom fitting. Message on WhatsApp.',
    h1: 'Plumber in Bransholme',
    intro: [
      'Bransholme is one of the largest estates of its kind in the country, built out from the late sixties, with North Point at its centre.',
      'The housing is consistent in age, which means the plumbing problems are consistent too. That is genuinely useful, because it means we usually arrive already carrying the part.',
    ],
    localNote:
      'Properties of this age and type commonly have original gate valves that no longer shut off fully. Replacing them with quarter-turn valves is a small job that makes every future repair quicker and cheaper.',
  },
  {
    slug: 'kingswood',
    name: 'Kingswood',
    county: 'Kingston upon Hull',
    postcodes: ['HU7'],
    geo: { latitude: 53.8025, longitude: -0.3494 },
    metaTitle: 'Plumber in Kingswood',
    metaDescription:
      'Plumber covering Kingswood and HU7. Emergency plumbing, bathroom installations, leak detection and repairs. Fully insured.',
    h1: 'Plumber in Kingswood',
    intro: [
      'Kingswood is the newest part of the city, built out steadily around the retail park and the lakes, and still growing.',
      'Almost everything here is modern construction, which brings a specific set of issues rather than fewer of them.',
    ],
    localNote:
      'Modern timber-frame and block builds run most pipework through voids and under floating floors. A small leak can travel a long way before it shows, so we locate it before lifting anything.',
  },
];

export const getArea = (slug: string) => areas.find((a) => a.slug === slug);
export const areaSlugs = areas.map((a) => a.slug);
