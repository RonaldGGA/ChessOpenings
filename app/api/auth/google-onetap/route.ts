// app/api/auth/google-onetap/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_ID);

export async function POST(request: NextRequest) {
  try {
    const { credential } = await request.json();

    if (!credential) {
      return NextResponse.json(
        { error: 'No credential provided' },
        { status: 400 }
      );
    }

    console.log('🔐 Verifying Google One Tap credential...');

    // Verificar el token de Google
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid credential' },
        { status: 400 }
      );
    }

    console.log('✅ Google credential verified for:', payload.email);

    // Buscar o crear usuario en la base de datos
    let user = await prisma.user.findUnique({
      where: { email: payload.email! },
    });

    if (!user) {
      console.log('👤 Creating new user for:', payload.email);
      user = await prisma.user.create({
        data: {
          email: payload.email!,
          name: payload.name!,
          image: payload.picture,
          emailVerified: new Date(),
        },
      });
    }

    // Crear cuenta vinculada si no existe
    const existingAccount = await prisma.account.findFirst({
      where: {
        userId: user.id,
        provider: 'google',
      },
    });

    if (!existingAccount) {
      await prisma.account.create({
        data: {
          userId: user.id,
          type: 'oauth',
          provider: 'google',
          providerAccountId: payload.sub!,
          token_type: 'Bearer',
          scope: 'openid email profile',
        },
      });
    }

    // Devolver éxito
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
      message: 'Authentication successful'
    });

  } catch (error) {
    console.error('❌ Google One Tap API error:', error);
    return NextResponse.json(
      { 
        error: 'Authentication failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}