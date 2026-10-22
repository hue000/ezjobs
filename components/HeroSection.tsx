'use client'

export default function HeroSection() {
  const scrollToForm = () => {
    document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative bg-gradient-to-br from-primary to-blue-700 text-white py-16 px-4 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Trust badges */}
        <div className="flex justify-center gap-4 mb-6 text-sm">
          <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            ✓ 已服务 1000+ 企业
          </span>
          <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            ✓ 5000+ 岗位成功招聘
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          আপনার পরবর্তী কর্মচারী এখানে আছেন
        </h1>
        <p className="text-xl md:text-2xl mb-2 font-medium">
          您的下一位员工在这里
        </p>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl mb-8 text-white/90">
          3 天免费发布岗位，精准匹配候选人
        </p>

        {/* CTA Button */}
        <button
          onClick={scrollToForm}
          className="cta-button bg-accent hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          এখনই শুরু করুন — বিনামূল্যে
          <span className="block text-sm font-normal mt-1">立即免费开始</span>
        </button>

        {/* Additional info */}
        <p className="mt-6 text-sm text-white/80">
          无需信用卡 · 全程免费 · 1分钟注册
        </p>
      </div>
    </section>
  )
}
