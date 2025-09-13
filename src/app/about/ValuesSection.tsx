
'use client';

export default function ValuesSection() {
  const values = [
    {
      icon: "ri-heart-3-fill",
      title: "Community First",
      description: "We believe in the power of community collaboration and mutual support to achieve financial goals together."
    },
    {
      icon: "ri-shield-check-fill",
      title: "Trust & Transparency",
      description: "Building lasting relationships through honest communication and transparent financial processes."
    },
    {
      icon: "ri-lightbulb-flash-fill",
      title: "Innovation",
      description: "Continuously evolving our platform with cutting-edge technology to serve our members better."
    },
    {
      icon: "ri-equalizer-fill",
      title: "Financial Equality",
      description: "Creating equal opportunities for financial growth regardless of background or starting point."
    },
    {
      icon: "ri-team-fill",
      title: "Empowerment",
      description: "Providing tools, knowledge, and support systems that enable our members to take control of their financial future."
    },
    {
      icon: "ri-global-fill",
      title: "Global Impact",
      description: "Making a positive difference in communities worldwide through collaborative financial empowerment."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-400/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-full px-6 py-3 mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-gray-300 text-sm font-medium">Our Values</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            What Drives Us
            <span className="block bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              Every Single Day
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our core values shape everything we do, from platform development to community building and member support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="group bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-8 hover:bg-gray-800/70 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className={`${value.icon} text-white text-2xl`}></i>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">
                {value.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to Join Our
              <span className="block bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                Financial Revolution?
              </span>
            </h3>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Be part of a community that believes in mutual success and collaborative financial growth.
            </p>
            <button className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-10 py-4 rounded-full font-semibold hover:from-orange-500 hover:to-pink-600 transition-all cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg">
              <i className="ri-rocket-2-fill mr-2"></i>
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}