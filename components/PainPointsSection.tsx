'use client'

export default function PainPointsSection() {
  const painPoints = [
    {
      icon: '❌',
      text: '发帖没人投？',
      description: '岗位发布后石沉大海，简历寥寥无几'
    },
    {
      icon: '❌',
      text: '候选人质量差？',
      description: '收到的简历大多不符合要求，浪费面试时间'
    },
    {
      icon: '❌',
      text: '招聘周期太长？',
      description: '岗位空缺数月，影响业务运转'
    }
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          招聘遇到这些问题？
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-5xl mb-4">{point.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{point.text}</h3>
              <p className="text-gray-600">{point.description}</p>
            </div>
          ))}
        </div>

        {/* Transition text */}
        <div className="text-center">
          <div className="inline-block bg-primary/10 rounded-2xl px-8 py-6">
            <p className="text-2xl font-bold text-primary mb-2">
              ✅ ezjobs 帮您 3 步搞定
            </p>
            <p className="text-gray-600">
              简单、快速、精准匹配
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
