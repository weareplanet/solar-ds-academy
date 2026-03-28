import { readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import GithubSlugger from 'github-slugger';
import { AuthGate } from '@/components/AuthGate';
import { ModulePage } from '@/components/ModulePage';
import { type TopicHeading } from '@/components/TopicNav';
import { modules } from '@/lib/modules';

export function generateStaticParams() {
  return modules.map((m) => ({ id: m.id }));
}

function loadMarkdown(moduleId: string, file: string): string {
  try {
    const filePath = join(process.cwd(), 'content', `module-${moduleId}`, file);
    const raw = readFileSync(filePath, 'utf-8');
    return matter(raw).content;
  } catch {
    return '';
  }
}

/** Extract heading text and level from markdown source */
function extractHeadings(md: string): TopicHeading[] {
  const headings: TopicHeading[] = [];
  const slugger = new GithubSlugger();
  const regex = /^(#{1,3})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(md)) !== null) {
    const text = match[2].replace(/\*\*/g, '').trim();
    const slug = slugger.slug(text);
    headings.push({ level: match[1].length, text, slug });
  }
  return headings;
}

export default async function ModuleRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const slidesSource = loadMarkdown(id, 'slides.md');

  const mdxOptions = { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] };

  const slidesContent = slidesSource ? (
    <MDXRemote source={slidesSource} options={{ mdxOptions }} />
  ) : null;

  const topicHeadings = extractHeadings(slidesSource);

  return (
    <AuthGate>
      <ModulePage
        slidesContent={slidesContent}
        topicHeadings={topicHeadings}
      />
    </AuthGate>
  );
}
