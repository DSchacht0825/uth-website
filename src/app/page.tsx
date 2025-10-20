'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import VideoBackground from '@/components/layout/VideoBackground';
import { getAllProducts } from '@/lib/products';

export default function Home() {
  const products = getAllProducts();
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <VideoBackground videoId="7Iuezo2gf1I">
        <div className="container mx-auto px-4 sm:px-6 text-center text-white w-full">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            Welcome to the<br />
            <span className="italic">Candle Experience</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Under The Heavens Collection
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 max-w-md sm:max-w-none mx-auto">
            <Link
              href="/products"
              className="bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-sm hover:bg-gray-100 transition-colors text-xs sm:text-sm uppercase tracking-wider font-medium w-full sm:w-auto"
            >
              Shop Collection
            </Link>
            <Link
              href="/booking"
              className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-sm hover:bg-white hover:text-gray-900 transition-colors text-xs sm:text-sm uppercase tracking-wider font-medium w-full sm:w-auto"
            >
              Book Experience
            </Link>
          </div>
        </div>
      </VideoBackground>

      {/* Introduction Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            {[
              {
                id: 'intro-1',
                image: '/images/pexels-vlada-karpovich-4668379-600x400.jpg',
                title: 'Candles',
                description: 'Craft the perfect blend with our hands-on, interactive experience.',
                delay: ''
              },
              {
                id: 'intro-2',
                image: '/images/tempImageM5DH1B-600x450.jpg',
                title: 'Shop Online',
                description: 'Browse our online collection of Beeswax, coconut and apricot candles.',
                delay: 'delay-200'
              },
              {
                id: 'intro-3',
                image: '/images/pexels-shvetsa-5760870-600x400.jpg',
                title: 'Scents',
                description: 'Check out the 70 scents we carry. Every scent combination is unique.',
                delay: 'delay-400'
              }
            ].map((item) => (
              <div
                key={item.id}
                id={item.id}
                data-animate
                className={`text-center group transition-all duration-1000 ${item.delay} ${
                  isVisible[item.id]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="mb-6 flex justify-center">
                  <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-4 text-gray-900">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-rose-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div
            id="vessel-section"
            data-animate
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              isVisible['vessel-section']
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Select Your Vessel
            </h2>
            <p className="text-lg text-gray-700 mb-8 font-medium">
              CANDLES TAKE ABOUT 90 MINUTES TO CURATE
            </p>
            <p className="text-gray-700 leading-relaxed">
              Create your own signature scent with our interactive candle-making experience.
              Choose from 70 premium fragrances and select your perfect vessel. Each candle
              is hand-poured with love, using premium soy wax and cotton wicks for a clean,
              long-lasting burn.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div
            id="products-heading"
            data-animate
            className={`transition-all duration-1000 ${
              isVisible['products-heading']
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-serif text-4xl font-bold text-center mb-12 text-gray-900">
              Weekly Best Sellers
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-md sm:max-w-none mx-auto">
            {products.map((product, index) => (
              <div
                key={product.id}
                id={`product-${index}`}
                data-animate
                className={`transition-all duration-1000 delay-${index * 200} ${
                  isVisible[`product-${index}`]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="group w-full block"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-square relative w-full">
                      <Image
                        src={product.images.main}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-semibold mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">{product.scent}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                        <span className="text-sm text-gray-500">{product.specs?.weight}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block bg-gray-900 text-white px-8 py-4 rounded-sm hover:bg-gray-800 transition-colors text-sm uppercase tracking-wider font-medium"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Ready to Create Your Perfect Scent?
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            Book your candle-making experience today
          </p>
          <Link
            href="/booking"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-sm hover:bg-gray-800 transition-colors text-sm uppercase tracking-wider font-medium"
          >
            Reserve Your Spot
          </Link>
        </div>
      </section>
    </div>
  );
}
