import React from 'react';
import type { MDXComponents } from 'mdx/types';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

function prefixed(src?: string) {
  return src && src.startsWith('/') ? `${basePath}${src}` : src;
}

export const mdxComponents: MDXComponents = {
  img: (props) => {
    const src = prefixed(props.src as string | undefined);
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} src={src} alt={props.alt || ''} />;
  },
  source: (props) => {
    const src = prefixed(props.src as string | undefined);
    return <source {...props} src={src} />;
  },
  video: (props) => {
    const children = React.Children.map(props.children, (child) => {
      if (!React.isValidElement(child)) return child;
      // adjust any <source src="/..."> children to include basePath
      if (child.type === 'source' && child.props && typeof (child.props as any).src === 'string') {
        const newSrc = prefixed((child.props as any).src);
        return React.cloneElement(child, { ...(child.props as any), src: newSrc });
      }
      return child;
    });

    return <video {...props}>{children}</video>;
  },
};
