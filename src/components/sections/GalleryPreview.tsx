import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { workImages } from '@/data/gallery';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';

/** HAND-BUILT masonry. Not from any registry. */
export function GalleryPreview() {
  // Nothing to preview until real photos exist. The BeforeAfterSection below
  // already carries the 'ask us for photos' call, so render nothing here
  // rather than showing two empty states on one page.
  if (workImages.length === 0) return null;

  return (
    <Section tone="darker">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Eyebrow number="04">Recent work</Eyebrow>
            <h2 className="text-white">Jobs finished across Hull and the East Riding.</h2>
          </div>
          <Link
            href="/gallery/"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-fps-aqua-400 transition-colors hover:text-fps-aqua-300"
          >
            See all work
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-250 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>

        <RevealGroup className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {workImages.map((img) => (
            <RevealItem key={img.id} className="break-inside-avoid">
              <figure className="group relative overflow-hidden rounded-fps border border-fps-navy-700 bg-fps-navy-900">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-fps-navy-950 via-fps-navy-950/85 to-transparent px-5 pb-4 pt-12 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="block font-sora text-sm font-semibold text-white">
                    {img.caption}
                  </span>
                  <span className="mt-0.5 block text-xs text-fps-aqua-400">
                    {img.service}
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
