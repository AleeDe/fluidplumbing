# Getting Fluid Plumbing found on Google

The website is built and indexed-ready. This is what still has to happen
outside the website, in the order that matters.

**The honest position:** a website alone does not put a plumber in the three
local results with the map that appear for "plumber near me". That block is
the *map pack*, and it is driven by a Google Business Profile, not by a site.
The website supports it, ranks for longer searches like "emergency plumber
Beverley", and gives people something to look at once they find you. Both
parts are needed.

---

## 1. Google Business Profile (free, about 20 minutes)

This is the highest-impact action available and it costs nothing.

Go to **google.com/business** and create a profile.

Use **exactly** these details. Google cross-checks them against the website,
and a mismatch weakens both.

| Field | Value |
|---|---|
| Business name | `Fluid Plumbing Solutions` |
| Phone | `07581 213828` |
| Website | the live site address |
| Category | Plumber |
| Service area | Kingston upon Hull, plus the East Riding towns on `/areas/` |
| Hours | Monday to Saturday, 8am to 6pm |
| Emergency | 24 hours |

Do not invent an address if the business runs from home. Choose the
**service-area business** option and hide the address. Google supports this
and it is the correct setting for a mobile trade.

Google will verify by postcard, phone or video. Verification can take a
couple of weeks, so start it early.

**Once verified**, add the profile URL to `src/data/site.ts`:

```ts
sameAs: ['https://www.google.com/maps/place/...'],
googleReviewUrl: 'https://g.page/r/.../review',
```

A "Reviews on Google" button then appears on the homepage automatically, and
the profile is emitted in the site's structured data.

---

## 2. Reviews

Reviews are the largest ranking factor in the map pack after proximity, and
the site currently says plainly that there are none yet.

The practical method: after finishing a job, while still on site, send the
review link by WhatsApp. Asking in person and following up by message
converts far better than asking by email later.

Ten genuine reviews would move this business further than any change to the
website.

**Never buy reviews or write them yourself.** Fake reviews carry direct
penalties under the Digital Markets, Competition and Consumers Act 2024, and
the liability falls on the business.

---

## 3. Job photographs

Covered in [SWAP-IN-REAL-PHOTOS.md](SWAP-IN-REAL-PHOTOS.md). Photographs help
twice: on the website, and posted to the Google Business Profile, where
regular photo uploads are a documented ranking signal.

---

## 4. Free UK directories

Consistent listings across directories reinforce the business to Google. The
name, address and phone number must match the website **character for
character** in each one.

Worth doing, all free:

- Bing Places
- Apple Business Connect
- Yell.com basic listing
- Checkatrade or Rated People (paid, but they generate leads directly)

---

## 5. Social media

Zack has no social presence. That is fine, and it is not urgent.

If one channel is worth starting, it is **Facebook**, because that is where
most Hull trade business already happens and where local recommendation posts
appear. An Instagram account without regular before-and-after photographs is
not worth the effort.

When a page exists, add it to `sameAs` in `src/data/site.ts`.

---

## What the website already does

So it is clear what is and is not covered:

- 32 indexable pages, including 18 town pages targeting local searches
- Full `LocalBusiness` schema: hours, geo, service area, price range, contact
- Sitemap and robots.txt, ready to submit to Google Search Console
- Unique title and meta description on every page
- One-tap call and WhatsApp from every page
- Fast on mobile, accessible, zero layout shift

## What it cannot do on its own

- Put the business in the map pack. Only a Business Profile does that.
- Generate reviews.
- Show real work. That needs the client's photographs.

---

## Order of work

1. Create the Google Business Profile today and start verification
2. Submit the sitemap in Google Search Console
3. Collect the first reviews from recent customers
4. Send the job photographs so the site can show real work
5. Add free directory listings
6. Consider a Facebook page

Steps 1 and 3 matter more than everything else combined.
