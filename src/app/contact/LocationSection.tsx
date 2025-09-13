
export default function LocationSection() {
  return (
    <section className="pb-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Global Presence</h2>
            <p className="text-gray-300 text-lg">Supporting communities worldwide with local expertise</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.27991155726!2d-74.25987368715491!3d40.697670064230035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1641234567890!5m2!1sen!2s"
                  width="100%"
                  height="400"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                ></iframe>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-6 hover:bg-gray-800/70 transition-all">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="ri-building-fill text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">Headquarters</h3>
                    <p className="text-gray-300">123 Community Plaza</p>
                    <p className="text-gray-300">New York, NY 10001</p>
                    <p className="text-gray-300">United States</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-6 hover:bg-gray-800/70 transition-all">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="ri-global-fill text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">Regional Offices</h3>
                    <p className="text-gray-300">London, United Kingdom</p>
                    <p className="text-gray-300">Toronto, Canada</p>
                    <p className="text-gray-300">Sydney, Australia</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-6 hover:bg-gray-800/70 transition-all">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="ri-time-fill text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">Business Hours</h3>
                    <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                    <p className="text-gray-300">Weekend: Emergency Support Only</p>
                    <p className="text-orange-400 font-semibold mt-2">24/7 Online Platform Access</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Visit Our Community Centers</h3>
              <p className="text-gray-300 mb-6">
                Experience our donation platform in person at one of our community centers. 
                Meet our team, learn about our impact, and see how we're making a difference.
              </p>
              <button className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-500 hover:to-pink-600 transition-all cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <i className="ri-map-pin-2-fill mr-2"></i>
                Find Nearest Center
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
