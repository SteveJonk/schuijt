import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServicePageView } from '@/components/service/ServicePageView';
import { client } from '@/sanity/client';
import { sanityFetch } from '@/sanity/fetch';
import { pageMetadata } from '@/sanity/metadata';
import { ZAKELIJK_SERVICE_QUERY, ZAKELIJK_SLUGS_QUERY } from '@/sanity/queries';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await client.fetch(ZAKELIJK_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

const getPage = async (params: PageProps['params']) =>
  sanityFetch(ZAKELIJK_SERVICE_QUERY, { slug: (await params).slug });

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPage(params);
  return page ? pageMetadata(page.seo, page.title) : {};
}

export default async function ZakelijkAudiencePage({ params }: PageProps) {
  const page = await getPage(params);
  if (!page) notFound();
  return <ServicePageView page={page} />;
}
