import { readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import GithubSlugger from 'github-slugger';
import { AuthGate } from '@/components/AuthGate';
import { ExercisePage } from '@/components/ExercisePage';
import { type TopicHeading } from '@/components/TopicNav';
import { modules } from '@/lib/modules';
import { mdxComponents } from '@/lib/mdxComponents';

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

export default async function ExerciseRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const exerciseSource = loadMarkdown(id, 'exercise.md');

  const mdxOptions = { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] };

  const exerciseContent = exerciseSource ? (
    <MDXRemote source={exerciseSource} options={{ mdxOptions }} components={mdxComponents} />
  ) : null;

  const topicHeadings = extractHeadings(exerciseSource);

  return (
    <AuthGate>
      <ExercisePage
        exerciseContent={exerciseContent}
        topicHeadings={topicHeadings}
      />
    </AuthGate>
  );
}
