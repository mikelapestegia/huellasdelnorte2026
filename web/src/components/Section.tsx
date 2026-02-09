

interface SectionProps {
    children: React.ReactNode;
    className?: string; // Allow passing custom classes (e.g., bg colors)
    id?: string;
}

export default function Section({ children, className = "", id }: SectionProps) {
    return (
        <section id={id} className={`w-full py-24 px-6 md:px-12 lg:px-24 ${className}`}>
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
        </section>
    );
}
