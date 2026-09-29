import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectDetailView } from '@/components/project/ProjectDetailView';
import { ServicePageView } from '@/components/service/ServicePageView';
import { TextPageView } from '@/components/TextPageView';
import { client } from '@/sanity/client';
import { sanityFetch } from '@/sanity/fetch';
import { pageMetadata } from '@/sanity/metadata';
import { ROOT_PAGE_QUERY, ROOT_SLUGS_QUERY } from '@/sanity/queries';

type PageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Everything that lived at the WordPress root renders here — services, local
 * pages, projects and text pages — so the old URLs keep working. Which
 * template a slug gets is decided by its document type in Sanity; a slug
 * nobody published is a 404. New slugs work without a rebuild.
 */
export async function generateStaticParams() {
  const slugs = await client.fetch(ROOT_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

const getPage = async (params: PageProps['params']) =>
  sanityFetch(ROOT_PAGE_QUERY, { slug: decodeURIComponent((await params).slug) });

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPage(params);
  if (!page) return {};
  return pageMetadata(page.seo, page.title);
}

export default async function RootSlugPage({ params }: PageProps) {
  const page = await getPage(params);

  switch (page?._type) {
    case 'servicePage':
      return <ServicePageView page={page} />;
    case 'project':
      return <ProjectDetailView project={page} />;
    case 'textPage':
      return <TextPageView page={page} />;
    default:
      notFound();
  }
}
