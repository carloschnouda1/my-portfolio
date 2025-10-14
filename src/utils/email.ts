// Email utility functions

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactResponse {
  success: boolean
  message: string
  data?: {
    id: string
    emailId: string
  }
  error?: string
}

export async function submitContactForm(data: ContactFormData): Promise<ContactResponse> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to send message')
    }
    
    return result
  } catch (error) {
    console.error('Contact form submission error:', error)
    return {
      success: false,
      message: 'Failed to send message',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateFormData(data: ContactFormData): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!data.name.trim()) {
    errors.push('Name is required')
  }
  
  if (!data.email.trim()) {
    errors.push('Email is required')
  } else if (!validateEmail(data.email)) {
    errors.push('Please enter a valid email address')
  }
  
  if (!data.subject.trim()) {
    errors.push('Subject is required')
  }
  
  if (!data.message.trim()) {
    errors.push('Message is required')
  } else if (data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}
