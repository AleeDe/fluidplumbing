/**
 * REAL COMPLETED WORK.
 * ====================
 *
 * Unlike src/data/showcase.ts and src/data/comparisons.ts, these ARE
 * photographs of jobs Fluid Plumbing Solutions actually carried out, supplied
 * by the client. So the usual restrictions do not apply here:
 *
 *   - They MAY be presented as this business's own work
 *   - Headings MAY say "Our work", "Recent jobs", "Completed work"
 *   - They MAY be marked up in ImageGallery / ImageObject schema
 *   - No "illustrative" badge is needed
 *
 * The one rule that still holds: **no invented locations**. The client has
 * not confirmed which towns these jobs were in, so `location` is null
 * throughout. A wrong town name is worse than none, and it would also
 * poison the local SEO it is meant to help.
 *
 * TO ADD LOCATIONS LATER: set `location` per job once confirmed. The
 * captions, alt text and schema all pick it up automatically.
 */

/**
 * Image key. Typed as a plain string rather than `OptimisedImageName`
 * because that union is generated from the images currently on disk, and
 * these photographs are supplied by the client separately.
 *
 * The components look each key up in `optimisedImages` at render time and
 * skip anything missing, so a key with no matching file degrades to nothing
 * rather than crashing the build.
 */
type JobImageKey = string;

export type JobPhoto = {
  name: JobImageKey;
  /** Describes what is visible. Factual, since this is real work. */
  alt: string;
};

export type Job = {
  id: string;
  /** Short title for the job. No location unless confirmed. */
  title: string;
  /** One line on what the work involved. */
  summary: string;
  service: 'Bathroom fitting' | 'Maintenance and repairs';
  /** Town, once the client confirms it. Null means omit from all copy. */
  location: string | null;
  before: JobPhoto[];
  after: JobPhoto[];
};

export const jobs: Job[] = [
  {
    id: 'job-a',
    title: 'Victorian bathroom, stripped back and rebuilt',
    summary:
      'Taken back to brick and joists, then rebuilt with panelling, a freestanding bath and an arched tiled shower recess.',
    service: 'Bathroom fitting',
    location: null,
    before: [
      {
        name: 'jobA-before-1',
        alt: 'A bathroom stripped to bare brick with the floorboards lifted and the original toilet still in place',
      },
      {
        name: 'jobA-before-2',
        alt: 'The same room from the opposite corner, showing two sash windows and exposed lath and plaster',
      },
      {
        name: 'jobA-before-3',
        alt: 'Lath and plaster removed from a partition wall, exposing the timber studwork',
      },
    ],
    after: [
      {
        name: 'jobA-after-1',
        alt: 'A freestanding bath against sage green panelling with a brass bath shower mixer and octagonal floor tiling',
      },
      {
        name: 'jobA-after-2',
        alt: 'The finished bathroom showing the low level toilet, freestanding bath and full height panelling',
      },
      {
        name: 'jobA-after-3',
        alt: 'An arched shower recess tiled in dark green metro tile beside a vanity unit and brass heated towel rail',
      },
    ],
  },
  {
    id: 'job-e',
    title: 'Dated suite replaced with a full refit',
    summary:
      'Old cream suite and tiling removed, walls opened up for new pipework, then finished with large format tile, herringbone flooring and copper fittings.',
    service: 'Bathroom fitting',
    location: null,
    before: [
      {
        name: 'jobE-before-1',
        alt: 'A bathroom part way through strip-out with tiling removed and brickwork exposed around the doorway',
      },
      {
        name: 'jobE-before-2',
        alt: 'The original cream tiled bathroom with a curved shower bath and dated vanity unit',
      },
      {
        name: 'detail-stopcock',
        alt: 'A corroded brass stopcock on old copper pipe, of the kind that seizes and needs replacing',
      },
    ],
    after: [
      {
        name: 'jobE-after-1',
        alt: 'A refitted bathroom with wood effect wall tile, a green bath panel and a copper rainfall shower',
      },
      {
        name: 'jobE-after-2',
        alt: 'The finished bath and copper shower set against large format tiling with herringbone flooring',
      },
      {
        name: 'jobE-after-3',
        alt: 'A green vanity unit with copper tap and a black vertical radiator on herringbone flooring',
      },
    ],
  },
  {
    id: 'job-b',
    title: 'Navy metro tile with a roll top bath',
    summary:
      'Half height navy metro tiling, a roll top bath on claw feet, brass fittings and a black and white checkerboard floor.',
    service: 'Bathroom fitting',
    location: null,
    before: [],
    after: [
      {
        name: 'jobB-after-1',
        alt: 'A roll top bath on claw feet against navy metro tiling with a black and white checkerboard floor',
      },
      {
        name: 'jobB-after-2',
        alt: 'A basin on brass legs beneath two sash windows, with navy tiling and a brass ceiling light',
      },
    ],
  },
  {
    id: 'job-c',
    title: 'Pink zellige and a black roll top bath',
    summary:
      'Handmade pink zellige tiling floor to ceiling, a black roll top bath with brass feet and a patterned star tile floor.',
    service: 'Bathroom fitting',
    location: null,
    before: [],
    after: [
      {
        name: 'jobC-after-1',
        alt: 'A black roll top bath with brass feet against pink zellige tiling, with a star patterned tile floor',
      },
    ],
  },
  {
    id: 'job-d',
    title: 'Rustic bathroom with a timber vanity',
    summary:
      'A roll top bath, reclaimed timber vanity, rope pendant lighting and a feature stone panel behind the bath.',
    service: 'Bathroom fitting',
    location: null,
    before: [],
    after: [
      {
        name: 'jobD-after-1',
        alt: 'A roll top bath beside a reclaimed timber vanity, with rope pendant lights and a stone effect feature panel',
      },
    ],
  },
];

/**
 * Jobs whose before and after shots genuinely align well enough for a
 * compare slider: same room, similar camera position, same crop ratio.
 *
 * Job A qualifies. Job E does not: its "before" shots were taken at a
 * different distance and one is a narrow landscape band, so a slider would
 * reveal two differently framed rooms. Job E's before and after therefore
 * appear side by side in the gallery instead, which is honest about what
 * the photographs actually show.
 */
export const SLIDER_JOB_IDS = ['job-a'] as const;

export const jobsWithPairs = jobs.filter(
  (j) =>
    (SLIDER_JOB_IDS as readonly string[]).includes(j.id) &&
    j.before.length > 0 &&
    j.after.length > 0,
);

/** Every photo across every job, for the gallery grid. */
export const allJobPhotos = jobs.flatMap((j) =>
  [...j.before.map((p) => ({ ...p, job: j, stage: 'before' as const })),
   ...j.after.map((p) => ({ ...p, job: j, stage: 'after' as const }))],
);

/**
 * Standalone detail shots that do not belong to a specific job.
 *
 * Empty at the client's request: the stopcock shot now sits among job E's
 * "before" photos instead, so it reads as part of that strip-out rather
 * than as a section of its own.
 *
 * Worth knowing if this is revisited: that photo is not actually from job
 * E. It was supplied as a standalone detail. Presenting it under a job
 * attributes it to work it may not belong to, and the gallery's
 * ImageObject schema picks up that attribution too. Moving it back here
 * restores the separate "The sort of thing we find" section, which renders
 * automatically whenever this array is non-empty.
 */
export const detailPhotos: JobPhoto[] = [];
