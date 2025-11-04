// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar campos requeridos
    const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: 'Missing required fields', 
          missingFields 
        },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Aquí puedes:
    // 1. Guardar en tu base de datos
    // 2. Enviar un email de notificación
    // 3. Integrar con un servicio como SendGrid, Mailchimp, etc.
    
    console.log('Contact form submission:', body);
    
    // Simular procesamiento
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully',
        id: Math.random().toString(36).substr(2, 9) // ID de referencia
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to process contact form'
      },
      { status: 500 }
    );
  }
}

/** EXAMPLE REQUEST PAYLOAD
 * {
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "subject": "support",
  "message": "I need help with the practice board functionality...",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "source": "chessmaster-website"
}
 */