'use client'

export default function SolutionSection() {
  const steps = [
    {
      number: '1',
      title: '发布岗位',
      titleBn: 'পোস্ট করুন',
      description: '1 分钟填写岗位信息',
      icon: '📝',
      color: 'from-blue-500 to-blue-600'
    },
    {
      number: '2',
      title: '收到匹配推荐',
      titleBn: 'প্রার্থী পান',
      description: '系统精准推荐候选人',
      icon: '🎯',
      color: 'from-purple-500 to-purple-600'
    },
    {
      number: '3',
      title: '面试录用',
      titleBn: 'নিয়োগ দিন',
      description: '快速面试，完成招聘',
      icon: '✅',
      color: 'from-green-500 to-green-600'
    }
  ]

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
          3 步完成招聘
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          简单高效，全程免费
        </p>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection lines (desktop only) */}
          <div className="hidden md:block absolute top-24 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300"></div>
          <div className="hidden md:block absolute top-24 left-2/3 w-1/3 h-0.5 bg-gradient-to-r from-purple-300 to-green-300"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Step number */}
                <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4 mx-auto shadow-lg`}>
                  {step.number}
                </div>

                {/* Icon */}
                <div className="text-6xl mb-4 text-center">{step.icon}</div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-2 text-center text-gray-800">
                  {step.title}
                </h3>
                <p className="text-sm text-center text-primary font-medium mb-2">
                  {step.titleBn}
                </p>

                {/* Description */}
                <p className="text-gray-600 text-center">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            💡 全程免费，无隐藏费用
          </p>
        </div>
      </div>
    </section>
  )
}
