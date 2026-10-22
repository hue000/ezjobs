'use client'

import { useState } from 'react'

interface FormData {
  companyName: string
  contactName: string
  phone: string
  industry: string
  jobCount: string
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactName: '',
    phone: '',
    industry: '',
    jobCount: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const industries = [
    { value: '', label: '请选择行业' },
    { value: 'manufacturing', label: '制造业 / প্রস্তুতকারক' },
    { value: 'textile', label: '纺织服装 / টেক্সটাইল' },
    { value: 'restaurant', label: '餐饮 / রেস্তোরাঁ' },
    { value: 'retail', label: '零售 / খুচরা' },
    { value: 'construction', label: '建筑 / নির্মাণ' },
    { value: 'it', label: 'IT/互联网 / আইটি' },
    { value: 'logistics', label: '物流 / লজিস্টিক্স' },
    { value: 'other', label: '其他 / অন্যান্য' }
  ]

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.companyName.trim()) {
      newErrors.companyName = '请输入公司名称'
    }

    if (!formData.contactName.trim()) {
      newErrors.contactName = '请输入联系人姓名'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '请输入手机号'
    } else if (!/^\+880?[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = '请输入有效的孟加拉手机号（+880开头）'
    }

    if (!formData.industry) {
      newErrors.industry = '请选择行业'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Submit to API route
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        // Track conversion
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'conversion', {
            'send_to': 'AW-CONVERSION_ID',
          })
        }
      } else {
        alert('提交失败，请稍后重试或直接联系我们')
      }
    } catch (error) {
      console.error('Submit error:', error)
      alert('提交失败，请稍后重试或直接联系我们')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  if (isSubmitted) {
    return (
      <section id="registration-form" className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-12">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-3xl font-bold text-green-700 mb-4">
              注册成功！
            </h2>
            <p className="text-gray-700 mb-6">
              我们的招聘顾问将在 24 小时内与您联系
            </p>
            <div className="bg-white rounded-xl p-6 mb-6">
              <p className="font-bold text-gray-800 mb-2">立即联系我们：</p>
              <a
                href="https://wa.me/8801XXXXXXXXX"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                <span>💬</span>
                WhatsApp 咨询
              </a>
            </div>
            <p className="text-sm text-gray-500">
              感谢您的信任，期待与您合作！
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="registration-form" className="py-16 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            立即开始免费招聘
          </h2>
          <p className="text-gray-600 text-lg">
            填写信息，1 分钟完成注册
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8 shadow-xl">
          {/* Company Name */}
          <div className="mb-6">
            <label htmlFor="companyName" className="block text-gray-700 font-medium mb-2">
              公司名称 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 ${
                errors.companyName ? 'border-red-500' : 'border-gray-300'
              } focus:border-primary focus:outline-none transition-colors`}
              placeholder="请输入公司名称"
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
            )}
          </div>

          {/* Contact Name */}
          <div className="mb-6">
            <label htmlFor="contactName" className="block text-gray-700 font-medium mb-2">
              联系人姓名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 ${
                errors.contactName ? 'border-red-500' : 'border-gray-300'
              } focus:border-primary focus:outline-none transition-colors`}
              placeholder="请输入您的姓名"
            />
            {errors.contactName && (
              <p className="text-red-500 text-sm mt-1">{errors.contactName}</p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
              手机号 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } focus:border-primary focus:outline-none transition-colors`}
              placeholder="+880"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Industry */}
          <div className="mb-6">
            <label htmlFor="industry" className="block text-gray-700 font-medium mb-2">
              行业 <span className="text-red-500">*</span>
            </label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 ${
                errors.industry ? 'border-red-500' : 'border-gray-300'
              } focus:border-primary focus:outline-none transition-colors`}
            >
              {industries.map(industry => (
                <option key={industry.value} value={industry.value}>
                  {industry.label}
                </option>
              ))}
            </select>
            {errors.industry && (
              <p className="text-red-500 text-sm mt-1">{errors.industry}</p>
            )}
          </div>

          {/* Job Count (Optional) */}
          <div className="mb-8">
            <label htmlFor="jobCount" className="block text-gray-700 font-medium mb-2">
              预计招聘岗位数 <span className="text-gray-400 text-sm">(可选)</span>
            </label>
            <input
              type="number"
              id="jobCount"
              name="jobCount"
              value={formData.jobCount}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none transition-colors"
              placeholder="例如：5"
              min="1"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none"
          >
            {isSubmitting ? '提交中...' : '免费开始招聘'}
          </button>

          {/* Privacy notice */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <span>🔒</span>
              信息仅用于招聘服务，不会泄露给第三方
            </p>
          </div>

          {/* Alternative contact */}
          <div className="mt-6 text-center border-t pt-6">
            <p className="text-gray-600 mb-3">或通过 WhatsApp 咨询：</p>
            <a
              href="https://wa.me/8801XXXXXXXXX"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              <span>💬</span>
              WhatsApp 咨询
            </a>
          </div>
        </form>
      </div>
    </section>
  )
}
