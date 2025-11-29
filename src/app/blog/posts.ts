export type BlogSection = "all" | "learning" | "code" | "updates" | "other";

export interface Post {
  id: string;
  slug: string;
  title: string;
  date: string;
  section: Exclude<BlogSection, "all">;
  summary: string;
  content?: string;
}

export const posts: Post[] = [
  {
    id: "1",
    slug: "getting-started-with-nextjs-15",
    title: "Getting Started with Next.js 15",
    date: "2024-01-15",
    section: "learning",
    summary: "Exploring the new features in Next.js 15, including server components, improved routing, and performance optimizations.",
    content: `Next.js 15 has been a game-changer for our development workflow. After spending the past few weeks diving deep into the new features, I wanted to share what I've learned and how it's improved our projects.

## Server Components by Default

One of the biggest changes is that Server Components are now the default. This means better performance out of the box since components render on the server, reducing the JavaScript bundle sent to clients. The mental model shift took a bit of getting used to, but the benefits are clear:

- Reduced client-side JavaScript
- Faster initial page loads
- Better SEO capabilities
- Direct database access without API routes

## Improved Routing

The App Router has become even more powerful. The new parallel routes and intercepting routes features allow for some really creative UI patterns. We've been using them to create modals that don't break the back button and loading states that feel more integrated.

## Performance Optimizations

Next.js 15 includes several performance improvements:

- Automatic static optimization for more routes
- Better caching strategies
- Improved image optimization
- Enhanced font loading

The partial prerendering feature is particularly interesting - it allows you to have dynamic content while still benefiting from static generation for the rest of the page.

## What We're Building

We're currently rebuilding parts of our site to take advantage of these features. The blog you're reading right now is actually one of our first projects using Next.js 15's new capabilities!

The learning curve has been worth it. The developer experience is smoother, and our pages are loading faster. If you're still on Next.js 14, I'd definitely recommend making the jump.`,
  },
  {
    id: "2",
    slug: "building-responsive-sidebar-component",
    title: "Building a Responsive Sidebar Component",
    date: "2024-01-12",
    section: "code",
    summary: "A deep dive into creating a responsive sidebar menu with React and Tailwind CSS, including mobile-first design patterns.",
    content: `Building a responsive sidebar that works seamlessly across all devices is one of those tasks that seems simple but has many edge cases. Here's how we approached it for this blog.

## The Challenge

We needed a sidebar that:
- Stays fixed on desktop (left side)
- Collapses into a mobile menu on smaller screens
- Maintains state when switching between views
- Provides smooth transitions
- Is accessible

## Implementation Strategy

We went with a mobile-first approach using Tailwind's responsive utilities. The key was using \`lg:\` breakpoints to show/hide different layouts:

\`\`\`tsx
// Desktop: Fixed sidebar
<aside className="hidden lg:block w-64">
  {/* Sidebar content */}
</aside>

// Mobile: Toggleable menu
{isMobileMenuOpen && (
  <div className="lg:hidden">
    {/* Mobile menu */}
  </div>
)}
\`\`\`

## State Management

We used React's \`useState\` to manage the mobile menu state. The key insight was to close the menu automatically when a selection is made, improving UX on mobile devices.

## Styling with Tailwind

Tailwind made the responsive design straightforward. We used:
- \`flex-col lg:flex-row\` for layout direction
- \`hidden lg:block\` for conditional visibility
- \`sticky top-24\` for the desktop sidebar positioning
- Smooth transitions with \`transition-all duration-300\`

## Accessibility Considerations

We added proper ARIA labels and keyboard navigation support. The menu button includes \`aria-label\` and the menu items are properly focusable.

## Lessons Learned

1. Always test on real devices, not just browser dev tools
2. Consider the "sticky" positioning carefully - it can cause issues with certain layouts
3. Mobile menu animations should be subtle - too much motion can be jarring
4. Remember to handle the escape key for closing menus

The final implementation is clean, performant, and works great across all screen sizes. The code is maintainable and follows React best practices.`,
  },
  {
    id: "3",
    slug: "new-blog-feature-launch",
    title: "New Blog Feature Launch",
    date: "2024-01-10",
    section: "updates",
    summary: "We've launched a new blog section to document our learning journey, code insights, and project updates.",
    content: `We're excited to announce the launch of our new blog feature! This has been something we've wanted to build for a while, and it's finally here.

## Why a Blog?

As developers, we're constantly learning new things, solving interesting problems, and making architectural decisions. We realized we should document this journey - both for ourselves and for others who might find it useful.

The blog serves multiple purposes:
- **Learning Log**: Track our progress as we learn new technologies
- **Code Deep Dives**: Share technical insights and solutions
- **Project Updates**: Document major changes and refactors
- **Community**: Share thoughts and engage with the developer community

## What We Built

The blog is built with Next.js 15 and features:
- Clean, responsive design that matches our site aesthetic
- Category filtering for easy navigation
- Individual post pages with full content
- Mobile-friendly sidebar navigation
- Fast page loads with static generation

## The Tech Stack

- **Next.js 15**: For the framework and routing
- **React**: Component architecture
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Static Data**: Posts stored as TypeScript for now (easy to migrate later)

## Future Plans

We're planning to add:
- Search functionality
- Tag system
- RSS feed
- Comments (maybe?)
- More post categories as we grow

## Getting Started

We've already written a few posts covering topics like Next.js 15, React performance, and TypeScript. More content is coming soon!

If you have suggestions for topics you'd like us to cover, feel free to reach out. We're always looking for new ideas and ways to share knowledge with the community.

Thanks for reading, and stay tuned for more updates!`,
  },
  {
    id: "4",
    slug: "understanding-typescript-generics",
    title: "Understanding TypeScript Generics",
    date: "2024-01-08",
    section: "learning",
    summary: "Learning how to use TypeScript generics to write more flexible and reusable code in our projects.",
    content: `TypeScript generics were one of those concepts that took me a while to fully grasp. Once I understood them, they became an essential tool in my TypeScript toolkit. Let me share what I've learned.

## What Are Generics?

Generics allow you to create reusable components that work with multiple types. Instead of writing separate functions for strings, numbers, and objects, you write one function that works with any type.

Think of generics as type variables - placeholders for types that will be specified later.

## Basic Example

Here's a simple example that helped me understand:

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

// Usage
const stringResult = identity<string>("hello"); // Type: string
const numberResult = identity<number>(42); // Type: number
\`\`\`

The \`<T>\` is the generic type parameter. You can use any letter, but \`T\` is conventional.

## Real-World Use Case

We use generics extensively in our React components. For example, when creating reusable form components:

\`\`\`typescript
interface FormFieldProps<T> {
  value: T;
  onChange: (value: T) => void;
  label: string;
}

function FormField<T>({ value, onChange, label }: FormFieldProps<T>) {
  // Component implementation
}
\`\`\`

This allows us to create form fields that work with strings, numbers, dates, or any other type while maintaining type safety.

## Constraints

Sometimes you want to limit what types can be used. That's where constraints come in:

\`\`\`typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
\`\`\`

Now \`T\` must have a \`length\` property, which means strings and arrays work, but numbers don't.

## Multiple Type Parameters

You can use multiple generics:

\`\`\`typescript
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}
\`\`\`

## Common Patterns

1. **Generic Functions**: Functions that work with multiple types
2. **Generic Interfaces**: Interfaces that can be parameterized
3. **Generic Classes**: Classes that work with multiple types
4. **Generic Utility Types**: Like \`Partial<T>\`, \`Pick<T, K>\`, etc.

## Why Use Generics?

- **Type Safety**: Catch errors at compile time
- **Code Reuse**: Write once, use with many types
- **Better IntelliSense**: Your IDE can provide better autocomplete
- **Self-Documenting**: The types tell you what the code expects

## Common Mistakes

1. Overusing generics when a union type would work
2. Making generics too complex - keep them simple
3. Not providing default types when appropriate

## Learning Resources

The TypeScript handbook has excellent documentation on generics. I also found practicing with real examples in our codebase helped solidify the concepts.

Generics are powerful, but like any tool, they should be used appropriately. Start simple and add complexity only when needed.`,
  },
  {
    id: "5",
    slug: "optimizing-react-performance",
    title: "Optimizing React Performance",
    date: "2024-01-05",
    section: "code",
    summary: "Techniques for optimizing React applications, including memoization, code splitting, and lazy loading.",
    content: `Performance optimization in React is an ongoing journey. As our applications grow, we need to be mindful of how we're rendering components and managing state. Here are the techniques we've been using.

## React.memo for Component Memoization

\`React.memo\` prevents unnecessary re-renders by memoizing components:

\`\`\`tsx
const ExpensiveComponent = React.memo(({ data }) => {
  // Expensive rendering logic
  return <div>{/* ... */}</div>;
});
\`\`\`

The component only re-renders if its props change. This is especially useful for:
- Lists with many items
- Components that receive stable props
- Components with expensive render logic

## useMemo for Expensive Calculations

When you have expensive calculations that don't need to run on every render:

\`\`\`tsx
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);
\`\`\`

The calculation only runs when \`data\` changes. Use this for:
- Filtering/sorting large arrays
- Complex computations
- Derived state that's expensive to calculate

## useCallback for Function Stability

\`useCallback\` memoizes functions, preventing them from being recreated on every render:

\`\`\`tsx
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
\`\`\`

This is crucial when passing functions as props to memoized components, as it prevents unnecessary re-renders.

## Code Splitting with React.lazy

Split your bundle into smaller chunks that load on demand:

\`\`\`tsx
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

This reduces initial bundle size and improves time to interactive.

## Virtualization for Long Lists

For lists with hundreds or thousands of items, use virtualization:

\`\`\`tsx
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={items.length}
  itemSize={50}
>
  {Row}
</FixedSizeList>
\`\`\`

Only visible items are rendered, dramatically improving performance.

## Profiling with React DevTools

The React DevTools Profiler is invaluable for identifying performance bottlenecks:

1. Record a session
2. Interact with your app
3. Stop recording
4. Analyze which components took longest to render

## Best Practices

1. **Measure First**: Don't optimize prematurely - use the profiler
2. **Start with the Biggest Wins**: Focus on components that render most often
3. **Avoid Over-Memoization**: Not everything needs to be memoized
4. **Keep Dependencies Accurate**: Incorrect dependency arrays can cause bugs
5. **Consider Context**: Context updates cause all consumers to re-render

## What We've Learned

Performance optimization is a balance. Too much memoization can actually hurt performance due to the overhead. The key is to:
- Profile your app to find real bottlenecks
- Optimize strategically, not everywhere
- Test on real devices, not just development machines
- Monitor bundle sizes and loading times

Our blog sidebar uses memoization for the filter buttons, and we're using code splitting for the post detail pages. The results have been noticeable - faster initial loads and smoother interactions.

Remember: the best optimization is often the one you don't need to do. Write clean, simple code first, then optimize where profiling shows it's needed.`,
  },
  {
    id: "6",
    slug: "project-architecture-refactor",
    title: "Project Architecture Refactor",
    date: "2024-01-03",
    section: "updates",
    summary: "Major refactoring of our project structure to improve maintainability and developer experience.",
    content: `We just completed a major refactor of our project architecture. It was a big undertaking, but the improvements to maintainability and developer experience have been worth it.

## Why Refactor?

Our codebase had grown organically, and we started noticing:
- Components scattered across different locations
- Inconsistent naming conventions
- Duplicated logic in multiple places
- Hard to find where things lived
- New developers struggled to understand the structure

It was time for a more intentional architecture.

## The New Structure

We reorganized into a clearer folder structure:

\`\`\`
src/
├── app/              # Next.js app router pages
├── components/       # Shared components
│   ├── ui/          # Reusable UI components
│   └── ...          # Feature components
├── lib/             # Utilities and helpers
├── types/           # TypeScript type definitions
└── hooks/           # Custom React hooks
\`\`\`

## Key Changes

### 1. Component Organization

We separated UI components (buttons, cards, inputs) from feature components (blog posts, game components). This makes it easier to:
- Find reusable components
- Understand component dependencies
- Maintain consistent styling

### 2. Shared Utilities

Moved common utilities to a \`lib\` folder:
- Utility functions
- API helpers
- Constants
- Configuration

### 3. Type Definitions

Centralized TypeScript types in a \`types\` folder. This prevents:
- Duplicate type definitions
- Import confusion
- Type inconsistencies

### 4. Custom Hooks

Extracted reusable logic into custom hooks:
- \`useLocalStorage\`
- \`useDebounce\`
- \`useMediaQuery\`

## Migration Process

The refactor happened incrementally:

1. **Planning**: Mapped out the new structure
2. **Gradual Migration**: Moved files one feature at a time
3. **Update Imports**: Fixed all import paths
4. **Testing**: Ensured nothing broke
5. **Documentation**: Updated README and docs

## Challenges

- **Import Path Updates**: Had to update hundreds of import statements
- **Circular Dependencies**: Discovered and resolved several
- **Git History**: Wanted to preserve file history where possible
- **Team Coordination**: Making sure everyone was on the same page

## Results

The new structure has already paid off:
- **Faster Onboarding**: New developers understand the codebase quicker
- **Easier Maintenance**: Finding and updating code is simpler
- **Better Code Reuse**: Shared components are more discoverable
- **Cleaner Imports**: More consistent import paths

## Lessons Learned

1. **Plan Before Moving**: Don't just reorganize randomly
2. **Do It Incrementally**: Big bang refactors are risky
3. **Update Documentation**: Keep docs in sync with structure
4. **Get Team Buy-in**: Make sure everyone understands the changes
5. **Use Tools**: Tools like ESLint can help catch import issues

## What's Next

We're planning to:
- Add more shared components to the UI library
- Create more custom hooks for common patterns
- Improve type definitions
- Add more documentation

The refactor was a lot of work, but it's made our codebase much more maintainable. Future changes will be easier, and new team members will have a better experience getting started.

If you're considering a similar refactor, my advice is: do it sooner rather than later. The longer you wait, the harder it gets.`,
  },
  {
    id: "7",
    slug: "thoughts-on-modern-web-development",
    title: "Thoughts on Modern Web Development",
    date: "2024-01-01",
    section: "other",
    summary: "Reflections on the current state of web development and where we see the industry heading.",
    content: `As we start a new year, I've been reflecting on the state of web development and where things seem to be heading. It's an exciting time to be a developer, but also a time of rapid change.

## The Framework Landscape

The JavaScript framework ecosystem continues to evolve rapidly. React, Vue, and Svelte all have their strengths, and Next.js, Nuxt, and SvelteKit are making full-stack development more accessible.

What's interesting is how these frameworks are converging on similar ideas:
- Server-side rendering by default
- File-based routing
- Component-based architecture
- TypeScript support

It feels like we're reaching a consensus on what good web development looks like.

## The Rise of TypeScript

TypeScript has gone from "nice to have" to "essential" in most projects. The type safety it provides catches bugs early and makes refactoring safer. The developer experience with TypeScript in modern editors is excellent.

I'm seeing fewer and fewer new projects starting without TypeScript. It's become the default for serious web development.

## Performance as a Feature

Performance is no longer an afterthought - it's a core feature. Tools like Lighthouse, Web Vitals, and Core Web Vitals are making performance measurable and important for SEO and user experience.

Frameworks are optimizing by default:
- Automatic code splitting
- Image optimization
- Font optimization
- Minimal JavaScript bundles

## Developer Experience Matters

There's been a huge focus on developer experience:
- Better error messages
- Faster build times
- Hot module replacement
- Better debugging tools
- Improved documentation

This makes development more enjoyable and productive.

## The Tooling Explosion

The number of tools available is both a blessing and a curse. On one hand, we have amazing tools for every need. On the other, it can be overwhelming to choose.

The trend seems to be toward:
- Opinionated frameworks that include everything
- Better defaults
- Less configuration required
- Tools that work well together

## Where We're Heading

Looking ahead, I see a few trends:

**Server Components**: More rendering on the server, less JavaScript on the client. This improves performance and reduces complexity.

**Edge Computing**: Running code closer to users for better performance. Vercel, Cloudflare, and others are making this accessible.

**AI-Assisted Development**: Tools like GitHub Copilot are becoming standard. They're not replacing developers, but they're changing how we work.

**Web Standards**: More native browser APIs reducing the need for libraries. Things like native dialog elements, CSS container queries, and native file system access.

## Challenges

With all this progress come challenges:

- **Complexity**: Keeping up with changes can be overwhelming
- **Choice Paralysis**: Too many options can make decisions hard
- **Breaking Changes**: Rapid evolution means things break
- **Learning Curve**: New developers have more to learn

## My Take

Despite the challenges, I'm optimistic. The tools are getting better, the community is supportive, and the web platform is more powerful than ever.

The key is to:
- Focus on fundamentals (HTML, CSS, JavaScript)
- Learn one framework deeply before jumping around
- Stay curious but don't chase every new thing
- Build things that matter
- Share knowledge with others

Web development is in a great place. The future looks bright, and I'm excited to see where we go next.

What are your thoughts on the current state of web development? What trends are you most excited about?`,
  },
];

