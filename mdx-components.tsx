import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
      // Allows customizing built-in components, e.g. to add styling.
      h3: ({ children }) => (
        <h3 id={children.toLowerCase().replace(/\s+/g, '-')}>{children}</h3>
      ),
    ...components,
  }
}
