'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function AboutPage() {
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
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/pexels-vlada-karpovich-4668379-600x400.jpg"
            alt="UTH Candles Workshop"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto animate-fade-in-delay">
            Crafting unforgettable moments, one candle at a time
          </p>
        </div>
      </section>

      {/* About Introduction */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              id="about-intro"
              data-animate
              className={`transition-all duration-1000 ${
                isVisible['about-intro']
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-10'
              }`}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                My Journey
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                During 2019, I faced the challenges of divorce and financial struggles, but through
                perseverance, I gained financial success in the tax industry. I found the opportunity
                to tap into my creative side and pursue my passion for candle making.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Welcome to Under The Heavens Collection, where passion, creativity and nostalgia blend
                together to illuminate lives through candles and our candle making classes! My journey
                into the world of candle making began with a realization as crisp as the scent of a
                freshly lit candle: San Diego was lacking in the cozy charm of candle bars.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Fueled by a desire to fill this void and share my love for handcrafted candles, I
                embarked on a mission to bring the magic of candle making experience to our vibrant
                community.
              </p>
            </div>
            <div
              id="about-image-1"
              data-animate
              className={`transition-all duration-1000 delay-300 ${
                isVisible['about-image-1']
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/tempImageM5DH1B-600x450.jpg"
                  alt="Candle Making Process"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Special */}
      <section className="py-20 bg-rose-100">
        <div className="container mx-auto px-6">
          <div
            id="special-heading"
            data-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible['special-heading']
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              What Makes Us Special
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              We're not just selling candles – we're offering an experience that engages all your senses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                id: 'special-1',
                title: 'Unique Luxury Blend',
                description: 'Our candles feature a unique blend of beeswax, coconut, and apricot. We\'re the sole provider of this exceptional blend in San Diego.',
                image: '/images/pexels-shvetsa-5760870-600x400.jpg',
                delay: 'delay-100'
              },
              {
                id: 'special-2',
                title: 'Premium Quality',
                description: 'High-grade fragrance oils infused with essential oils, and high-grade cotton wicks ensure a clean, luxurious burn.',
                image: '/images/pexels-vlada-karpovich-4668379-600x400.jpg',
                delay: 'delay-300'
              },
              {
                id: 'special-3',
                title: '100% Eco-Friendly',
                description: 'All our products are eco-friendly and we use all natural products with a 100% money back guarantee.',
                image: '/images/tempImageM5DH1B-600x450.jpg',
                delay: 'delay-500'
              }
            ].map((feature) => (
              <div
                key={feature.id}
                id={feature.id}
                data-animate
                className={`bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 ${feature.delay} ${
                  isVisible[feature.id]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="relative h-64">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-semibold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Experience */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              id="experience-image"
              data-animate
              className={`order-2 md:order-1 transition-all duration-1000 ${
                isVisible['experience-image']
                  ? 'opacity-100 -translate-x-0'
                  : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/pexels-vlada-karpovich-4668379-600x400.jpg"
                  alt="Candle Making Experience"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div
              id="experience-text"
              data-animate
              className={`order-1 md:order-2 transition-all duration-1000 delay-300 ${
                isVisible['experience-text']
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-10'
              }`}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                The Candle Making Experience
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                When you join us for one of our candle making classes, you embark on a sensory journey.
                Guided by our expert instructors, you'll discover the artistry behind scent selection,
                wax pouring techniques, and personalized candle creation.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our goal is not only to teach you the craft but also create an experience filled with
                laughter, creativity, and fond memories.
              </p>
              <div className="space-y-4">
                {[
                  'Choose from over 40 premium candles and fragrances',
                  'Learn from expert instructors in a fun, creative environment',
                  'Create your personalized candle with our unique beeswax, coconut & apricot blend',
                  'Experience our high-grade fragrance oils infused with essential oils',
                  'Instant payment for all purchases and classes'
                ].map((step, index) => (
                  <div key={index} className="flex items-start">
                    <svg
                      className="w-6 h-6 text-rose-600 mr-3 mt-1 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div
              id="commitment-heading"
              data-animate
              className={`text-center mb-12 transition-all duration-1000 ${
                isVisible['commitment-heading']
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95'
              }`}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Our Commitment to You
              </h2>
            </div>

            <div
              id="commitment-content"
              data-animate
              className={`space-y-6 transition-all duration-1000 delay-300 ${
                isVisible['commitment-content']
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  At Under The Heavens Collection, <span className="font-semibold text-gray-900">integrity and excellence are at the core of everything we do</span>.
                  We're committed to providing our customers with not only exceptional products but also outstanding customer experiences.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Because we understand firsthand <span className="font-semibold text-gray-900">the power of resilience and determination</span>,
                  we bring that same passion and dedication to every candle we craft and every experience we create.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-rose-50 rounded-lg p-6 border-l-4 border-rose-600">
                  <div className="flex items-center mb-4">
                    <div className="bg-rose-600 rounded-full p-2 mr-3">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-gray-900">Integrity</h3>
                  </div>
                  <p className="text-gray-700">
                    Honesty and transparency in every interaction, ensuring you receive authentic, quality products
                  </p>
                </div>

                <div className="bg-rose-50 rounded-lg p-6 border-l-4 border-rose-600">
                  <div className="flex items-center mb-4">
                    <div className="bg-rose-600 rounded-full p-2 mr-3">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-gray-900">Excellence</h3>
                  </div>
                  <p className="text-gray-700">
                    Meticulous attention to detail in crafting premium candles and memorable experiences
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gratitude Section */}
      <section className="py-20 bg-gradient-to-b from-rose-50 to-white">
        <div className="container mx-auto px-6">
          <div
            id="gratitude-section"
            data-animate
            className={`max-w-4xl mx-auto transition-all duration-1000 ${
              isVisible['gratitude-section']
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95'
            }`}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-t-4 border-rose-600">
              <div className="text-center mb-8">
                <div className="inline-block bg-rose-100 rounded-full p-4 mb-4">
                  <svg className="w-8 h-8 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  From Our Hearts
                </h2>
              </div>

              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed text-center">
                  I'd like to thank my <span className="font-semibold text-gray-900">children, family, my Church Tsidkenu Revival Hub</span> and
                  my <span className="font-semibold text-gray-900">Lord and Savior Jesus Christ</span> for making this all possible.
                </p>

                <div className="border-t border-rose-200 pt-6">
                  <p className="text-xl text-gray-800 leading-relaxed text-center font-medium">
                    Thank you for choosing Under The Heavens Collection to illuminate your world and create cherished memories.
                  </p>
                </div>

                <div className="text-center pt-4">
                  <p className="text-lg text-rose-600 font-serif italic">
                    We look forward to lighting up your life, one candle at a time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Ready to Create Your Signature Scent?
          </h2>
          <p className="text-xl mb-8 text-gray-700 max-w-2xl mx-auto">
            Join us for an unforgettable candle-making experience in National City, CA
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="inline-block bg-gray-900 text-white px-8 py-4 rounded-sm hover:bg-gray-800 transition-colors text-sm uppercase tracking-wider font-medium"
            >
              Book Your Experience
            </Link>
            <Link
              href="/products"
              className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-sm hover:bg-gray-900 hover:text-white transition-colors text-sm uppercase tracking-wider font-medium"
            >
              Shop Our Collection
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }
      `}</style>
    </div>
  );
}
