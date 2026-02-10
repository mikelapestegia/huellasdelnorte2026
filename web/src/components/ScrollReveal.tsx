"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

/**
 * Wraps children in an element that fades in + slides up
 * when it enters the viewport via IntersectionObserver.
 */
export default function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Apply delay then reveal
                    setTimeout(() => {
                        el.classList.add("visible");
                    }, delay);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [delay]);

    return (
        <div ref={ref} className={`reveal ${className}`}>
            {children}
        </div>
    );
}
