'use client'

export default function SocialProofSection() {
  const stats = [
    { number: '1000+', label: '已入驻企业', labelBn: 'কোম্পানি' },
    { number: '5000+', label: '活跃求职者', labelBn: 'প্রার্থী' },
    { number: '3天', label: '平均招聘天数', labelBn: 'গড় সময়' },
    { number: '95%', label: '雇主满意度', labelBn: 'সন্তুষ্টি' }
  ]

  const testimonials = [
    {
      name: 'Ahmed Rahman',
      company: 'BD Textiles Ltd.',
      position: 'HR Manager',
      content: '通过 ezjobs，我们一周内招到了 5 名熟练工人，效率提升了 3 倍！',
      avatar: '👨‍💼'
    },
    {
      name: 'Fatima Khan',
      company: 'Dhaka Restaurant',
      position: 'Owner',
      content: '以前招聘要等一个月，现在 3 天就搞定。平台上的候选人质量很高。',
      avatar: '👩‍💼'
    },
    {
      name: 'Mohammad Hasan',
      company: 'Chittagong Trading',
      position: 'CEO',
      content: '免费服务，没有任何隐藏费用。强烈推荐给所有需要招聘的企业。',
      avatar: '👨‍💻'
    }
  ]

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          他们都在用 ezjobs
        </h2>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-gray-800 font-medium">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.labelBn}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
          雇主评价
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Avatar */}
              <div className="text-5xl mb-4">{testimonial.avatar}</div>

              {/* Content */}
              <p className="text-gray-700 mb-4 italic">
                "{testimonial.content}"
              </p>

              {/* Author info */}
              <div className="border-t pt-4">
                <div className="font-bold text-gray-800">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.position}</div>
                <div className="text-sm text-primary font-medium">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-4">
            受到孟加拉各行业企业信赖
          </p>
          <div className="flex justify-center gap-8 text-3xl opacity-50">
            <span>🏭</span>
            <span>🍽️</span>
            <span>🏪</span>
            <span>🏢</span>
            <span>🏗️</span>
          </div>
        </div>
      </div>
    </section>
  )
}
