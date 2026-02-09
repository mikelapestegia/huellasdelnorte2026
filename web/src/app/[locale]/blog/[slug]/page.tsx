import { notFound } from "next/navigation";
import { getPostBySlug } from "@/data/blog";
import { Link } from "@/navigation";
import Image from "next/image";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

type Props = {
    params: Promise<{ slug: string; locale: string }>;
};

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-background pb-20">
            {/* Hero Header */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/30" />

                <div className="absolute inset-0 top-16 container max-w-4xl mx-auto px-4 flex flex-col justify-end pb-12">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Volver al Blog
                    </Link>

                    <span className="inline-block self-start px-3 py-1 bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg mb-6 shadow-lg shadow-emerald-900/20">
                        {post.category}
                    </span>

                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                        <div className="flex items-center gap-3 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                            <Image
                                src={post.author.avatar}
                                alt={`Avatar de ${post.author.name}`}
                                width={32}
                                height={32}
                                className="rounded-full"
                            />
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white leading-none">{post.author.name}</span>
                                <span className="text-[10px] text-emerald-400 uppercase tracking-wide">{post.author.role}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{post.date}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Structured data */}
            <script
                type="application/ld+json"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        headline: post.title,
                        description: post.excerpt,
                        image: post.coverImage,
                        datePublished: post.date,
                        author: {
                            "@type": "Person",
                            name: post.author.name,
                        },
                        publisher: {
                            "@type": "Organization",
                            name: SITE_NAME,
                            url: SITE_URL,
                        },
                    }),
                }}
            />

            {/* Content Body */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 -mt-10">
                <div className="bg-card rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl">
                    <div className="prose prose-invert prose-emerald max-w-none prose-lg prose-headings:font-serif prose-headings:font-bold prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-white prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-white/5 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic">
                        {/* 
                            Simple rendering for the demo. 
                            In a real app with 'react-markdown', we would use: <ReactMarkdown>{post.content}</ReactMarkdown>
                            Here we simulate it by splitting newlines for basic paragraph support
                        */}
                        {post.content.split('\n').map((line, i) => {
                            if (line.startsWith('## ')) return <h2 key={i} className="text-3xl text-white mt-12 mb-6">{line.replace('## ', '')}</h2>;
                            if (line.startsWith('### ')) return <h3 key={i} className="text-2xl text-emerald-100 mt-8 mb-4">{line.replace('### ', '')}</h3>;
                            if (line.startsWith('* ')) return <li key={i} className="ml-4 list-disc marker:text-emerald-500">{line.replace('* ', '')}</li>;
                            if (line.startsWith('> ')) return <blockquote key={i} className="my-8 text-xl font-serif text-emerald-200">{line.replace('> ', '')}</blockquote>;
                            if (line.trim() === '') return <br key={i} />;
                            return <p key={i} className="mb-4 leading-relaxed">{line}</p>;
                        })}
                    </div>

                    {/* Footer Tags */}
                    <div className="mt-16 pt-8 border-t border-white/10">
                        <div className="flex flex-wrap gap-2 mb-8">
                            {post.tags.map(tag => (
                                <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-medium">
                                    <Tag className="w-3 h-3" /> {tag}
                                </span>
                            ))}
                        </div>

                        {/* Share section could go here */}
                    </div>
                </div>
            </div>
        </article>
    );
}
