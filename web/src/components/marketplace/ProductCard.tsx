"use client";

import Image from "next/image";

import { Star, MapPin, ExternalLink, ShieldCheck, ShoppingCart } from "lucide-react";
import { type Product, type LocalShop, localShops } from "@/data/products";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    // Find shops that sell this product (if local model)
    const availableShops = product.monetization === 'local_connect' && product.localShopIds
        ? localShops.filter(shop => product.localShopIds?.includes(shop.id))
        : [];

    return (
        <div className="bg-card rounded-2xl overflow-hidden border border-white/5 hover:border-emerald-500/30 transition-all hover:shadow-xl group flex flex-col h-full">
            {/* Image Container */}
            <div className="relative h-48 bg-card p-4 flex items-center justify-center overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                    {product.monetization === 'subscription' && (
                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg">
                            Suscripción
                        </span>
                    )}
                    {product.monetization === 'local_connect' && (
                        <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> Local
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{product.brand}</span>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {product.rating} ({product.reviews})
                    </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-emerald-400 transition-colors">
                    {product.name}
                </h3>

                <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
                    {product.description}
                </p>

                {/* Price & CTA Section */}
                <div className="mt-auto border-t border-white/5 pt-4">
                    {product.monetization === 'subscription' && product.subscriptionDetails ? (
                        <div className="space-y-3">
                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold text-white">{product.subscriptionDetails.monthlyPrice}€</span>
                                <span className="text-xs text-muted-foreground mb-1">/ mes</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Dispositivo desde {product.subscriptionDetails.devicePrice}€</p>
                            <button className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2">
                                <ShieldCheck className="w-4 h-4" />
                                Suscribirse
                            </button>
                        </div>
                    ) : product.monetization === 'local_connect' ? (
                        <div className="space-y-3">
                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold text-white">{product.price}€</span>
                            </div>
                            {availableShops.length > 0 ? (
                                <div className="space-y-2">
                                    <p className="text-xs text-emerald-400 flex items-center gap-1">
                                        <MapPin className="w-3 h-3" /> Disponible en {availableShops.length} tiendas cercanas:
                                    </p>
                                    <div className="flex gap-1 overflow-x-auto pb-1">
                                        {availableShops.map(shop => (
                                            <span key={shop.id} className="text-[10px] bg-card/80 border border-border px-2 py-1 rounded-full whitespace-nowrap text-muted-foreground">
                                                {shop.city}
                                            </span>
                                        ))}
                                    </div>
                                    <button className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        Ver Disponibilidad
                                    </button>
                                </div>
                            ) : (
                                <button disabled className="w-full py-2.5 rounded-xl bg-card/80 text-muted-foreground font-bold text-sm cursor-not-allowed">
                                    Agotado temporalmente
                                </button>
                            )}
                        </div>
                    ) : (
                        // Affiliate
                        <div className="space-y-3">
                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold text-white">{product.price}€</span>
                            </div>
                            <a
                                href={product.affiliateUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-2.5 rounded-xl bg-card/80 hover:bg-card/70 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Ver en Amazon
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
