import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import VoidUniverse from '@/components/void/VoidUniverse';
import { PORTFOLIO_PROJECTS } from '@/lib/portfolio-data';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug || p.id === slug);
  if (!project) {
    return {
      title: 'Project Dimension | Quadri Adekunle',
    };
  }
  return {
    title: `${project.title} | Quadri Adekunle Portfolio`,
    description: project.summary,
    openGraph: {
      title: `${project.title} - ${project.badge}`,
      description: project.summary,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  return (
    <main className="w-full h-full min-h-screen bg-[#040408]">
      <Suspense
        fallback={
          <div className="fixed inset-0 bg-[#040408] flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
          </div>
        }
      >
        <VoidUniverse initialRealm="projects" initialProjectId={slug} />
      </Suspense>
    </main>
  );
}
