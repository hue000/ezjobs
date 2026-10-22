import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('New registration:', body)

    // TODO: Integrate with Feishu/Lark Base API
    // For now, just log the submission
    // In production, this should:
    // 1. Validate the data
    // 2. Call Feishu Base API to create a record in Companies table
    // 3. Return success/failure response

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json({ 
      success: true, 
      message: 'Registration submitted successfully' 
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit registration' },
      { status: 500 }
    )
  }
}
