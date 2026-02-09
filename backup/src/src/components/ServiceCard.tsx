import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
    title: string;
    description: string;
    image: string;
    link?: string;
    delay?: number;
}

export default function ServiceCard({ title, description, image, link = "#", delay = 0 }: ServiceCardProps) {
    return (
        <div
            className="group relative h-[400px] w-full overflow-hidden rounded-2xl cursor-pointer animate-fade-in-up"
            style={{ animationDelay: `${delay}ms` }}
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${image})` }}
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                    <h3 className="font-serif text-3xl font-bold text-white mb-2">{title}</h3>
                    <p className="text-white/80 mb-6 line-clamp-2 max-w-[90%]">
                        {description}
                    </p>

                    <div className="inline-flex items-center text-sm font-semibold text-accent uppercase tracking-wider opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                        Más Información <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                </div>

                {/* Glass Blur Effect at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-[2px]" />
            </div>
        </div>
    );
}
