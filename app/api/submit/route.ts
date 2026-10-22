import { NextRequest, NextResponse } from 'next/server'

// 行业映射：表单选项 → 飞书 Companies 表 Industry 选项
const INDUSTRY_MAP: Record<string, string> = {
  'manufacturing': 'Manufacturing & Production',
  'textile': 'Ready-Made Garments (RMG)',
  'restaurant': 'Restaurant, Hospitality & Tourism (Kitchen & Housekeeping)',
  'retail': 'Others',
  'construction': 'Construction & Real Estate',
  'it': 'Others',
  'logistics': 'Logistics, Courier & Delivery Services',
  'other': 'Others'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // 验证必填字段
    if (!body.companyName || !body.contactName || !body.phone || !body.industry) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // 验证手机号格式（孟加拉 +880）
    const phone = body.phone.replace(/\s/g, '')
    if (!/^\+880?[0-9]{10,11}$/.test(phone)) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number format' },
        { status: 400 }
      )
    }

    // 获取飞书 access token
    const accessToken = await getFeishuAccessToken()
    if (!accessToken) {
      console.error('Failed to get Feishu access token')
      return NextResponse.json(
        { success: false, message: 'Failed to connect to CRM' },
        { status: 500 }
      )
    }

    // 准备写入 Companies 表的数据
    const notes = [
      `联系人：${body.contactName}`,
      body.jobCount ? `预计招聘岗位数：${body.jobCount}` : null,
      `来源：H5 注册页面`,
      `注册时间：${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Dhaka' })}`
    ].filter(Boolean).join('\n')

    const recordData = {
      fields: {
        'Company Name': body.companyName,
        'Phone': phone,
        'Industry': INDUSTRY_MAP[body.industry] || 'Others',
        'Source': 'Other',
        'Lead Status': 'New',
        'Call Status': 'Pending',
        'Notes': notes,
      }
    }

    // 调用飞书 Base API 创建记录
    const response = await fetch(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${process.env.FEISHU_BASE_TOKEN}/tables/${process.env.FEISHU_TABLE_ID}/records`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(recordData)
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Feishu API error:', errorData)
      return NextResponse.json(
        { success: false, message: 'Failed to save registration' },
        { status: 500 }
      )
    }

    const result = await response.json()
    console.log('Registration saved to Feishu:', result.data?.record?.record_id)

    return NextResponse.json({ 
      success: true, 
      message: 'Registration submitted successfully',
      recordId: result.data?.record?.record_id
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit registration' },
      { status: 500 }
    )
  }
}

/**
 * 获取飞书 access token
 */
async function getFeishuAccessToken(): Promise<string | null> {
  try {
    const response = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app_id: process.env.FEISHU_APP_ID,
        app_secret: process.env.FEISHU_APP_SECRET,
      })
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.tenant_access_token || null
  } catch (error) {
    console.error('Failed to get access token:', error)
    return null
  }
}
