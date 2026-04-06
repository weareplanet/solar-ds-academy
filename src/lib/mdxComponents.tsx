import type { MDXComponents } from 'mdx/types';

const basePath = process.env.__NEXT_ROUTER_BASEPATH || '';

export const mdxComponents: MDXComponents = {
  img: (props) => {
    const src =
      props.src && props.src.startsWith('/') ? `${basePath}${props.src}` : props.src;
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} src={src} alt={props.alt || ''} />;
  },
};
