"use client";

import { Link } from "@/navigation";
import Image from "next/image";
import { BlogPost, blogPosts } from "@/data/blog";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";

export default function BlogListingPage() {
    // Separate featured post from the rest
    const featuredPost = blogPosts.find(p => p.featured) || blogPosts[0];
    const otherPosts = blogPosts.filter(p => p.id !== featuredPost.id);

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <header className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-emerald-950/50 to-background border-b border-white/5">
                <div className="max-w-[1920px] mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                        El Diario de Huellas
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
                        Guías, consejos y noticias para aventureros de cuatro patas.
                    </p>
                </div>
            </header>

            <main className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 mt-12">

                {/* Featured Post Hero */}
                {featuredPost && (
                    <section className="mb-20">
                        <div className="relative rounded-3xl overflow-hidden group aspect-[21/9] md:aspect-[21/8] border border-white/10">
                            <Image
                                src={featuredPost.coverImage}
                                alt={featuredPost.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 100vw"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                            <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-4xl">
                                <span className="inline-block px-3 py-1 bg-emerald-500/90 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4 backdrop-blur-md">
                                    {featuredPost.category}
                                </span>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-serif leading-tight">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-lg text-foreground mb-6 line-clamp-2 md:line-clamp-none max-w-2xl">
                                    {featuredPost.excerpt}
                                </p>

                                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={featuredPost.author.avatar}
                                            alt={`Avatar de ${featuredPost.author.name}`}
                                            width={32}
                                            height={32}
                                            className="rounded-full border border-white/20"
                                        />
                                        <span>{featuredPost.author.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{featuredPost.date}</span>
                                    </div>
                                </div>

                                <Link
                                    href={`/blog/${featuredPost.slug}`}
                                    className="inline-flex items-center gap-2 px-8 py-3 bg-foreground text-background rounded-full font-bold hover:bg-foreground/90 transition-colors"
                                >
                                    Leer Artículo <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherPosts.map((post) => (
                        <article key={post.id} className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-white/5 hover:border-emerald-500/30 transition-all hover:shadow-xl hover:shadow-emerald-900/10">
                            <Link href={`/blog/${post.slug}`} className="relative aspect-video overflow-hidden">
                                <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-black/60 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider rounded-lg border border-white/10">
                                        {post.category}
                                    </span>
                                </div>
                            </Link>

                            <div className="flex-1 p-6 flex flex-col">
                                <div className="flex items-center gap-3 text-xs text-emerald-400 mb-3 font-medium">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {post.date}
                                    </div>
                                    <span>•</span>
                                    <span>{post.author.name}</span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 font-serif group-hover:text-emerald-400 transition-colors">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h3>

                                <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                                    {post.excerpt}
                                </p>

                                <div className="border-t border-white/5 pt-4 flex flex-wrap gap-2">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="inline-flex items-center gap-1 text-[10px] bg-white/5 text-muted-foreground px-2 py-1 rounded hover:bg-white/10 transition-colors">
                                            <Tag className="w-3 h-3" /> {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

            </main>
        </div>
    );
}
