import React from 'react';

const About = () => {
  return (
    <div className="bg-white">
      {/* Brand Story */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 rounded-3xl mt-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Our Story</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            About Mebratu Shop
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            At Mebratu Shop, we make online shopping simple, affordable, and trustworthy — shop with confidence every time.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-16 bg-white overflow-hidden lg:py-24">
        <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
          <div className="relative">
            <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Us?
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
              We are dedicated to providing the best shopping experience possible.
            </p>
          </div>

          <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
             <div className="relative">
                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                  Built on Trust
                </h3>
                <p className="mt-3 text-lg text-gray-500">
                  Every product is verified for quality. We work directly with manufacturers to ensure you get authentic items at fair prices.
                </p>
                <dl className="mt-10 space-y-10">
                   <div className="relative">
                      <dt>
                         <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                           <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                         </div>
                         <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Fast Delivery</p>
                      </dt>
                      <dd className="mt-2 ml-16 text-base text-gray-500">
                        Get your orders delivered to your doorstep in record time with our optimized logistics network.
                      </dd>
                   </div>
                   <div className="relative">
                      <dt>
                         <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                           <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                         </div>
                         <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Secure Payments</p>
                      </dt>
                      <dd className="mt-2 ml-16 text-base text-gray-500">
                        Your security is our priority. We use industry-standard encryption for all transactions.
                      </dd>
                   </div>
                </dl>
             </div>
             
             <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
                <img className="relative mx-auto rounded-3xl shadow-xl" width="490" src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Team working" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
