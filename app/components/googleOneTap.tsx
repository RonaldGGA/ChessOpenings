// components/GoogleOneTap.tsx
"use client";

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
  }
}

export default function GoogleOneTap() {
  const router = useRouter();
  const initialized = useRef(false);

  useEffect(() => {
    // Prevent double-initialization in development with Strict Mode
    if (initialized.current) return;
    initialized.current = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleCredentialResponse = async (response: any) => {
      console.log('🔐 Google One Tap response received');
      // Send the credential to your NextAuth backend
      const result = await signIn('google-onetap', {
        credential: response.credential,
        redirect: false,
      });

      if (result?.error) {
        console.error('❌ Google One Tap authentication failed:', result.error);
      } else {
        // Sign-in was successful, redirect to the callback URL or home page
        router.push(result?.url || '/');
      }
    };

    const initializeGoogleOneTap = () => {
      if (!window.google) {
        console.error('Google Identity Services not loaded');
        return;
      }

      try {
        window.google.accounts.id.initialize({
          client_id: process.env.GOOGLE_ID! || "376731606079-2bqu6ocdosha8450d186qss894sl4l3n.apps.googleusercontent.com",
          callback: handleCredentialResponse,
          // Opt-in to FedCM
          use_fedcm_for_prompt: true,
          // It's recommended to keep this 'false' for a better UX
          cancel_on_tap_outside: false,
        });

        // Display the prompt
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.google.accounts.id.prompt((notification: any) => {
          // --- FEDCM UPDATE: Simplified Notification Handling ---
          // With FedCM, you can only check if the prompt was skipped.
          if (notification.isSkippedMoment()) {
            console.log('ℹ️ One Tap was skipped.');
            // You can trigger an alternative login method here if desired.
          }
          // Methods like isNotDisplayed() and getSkippedReason() are removed[citation:10].
        });
      } catch (error) {
        console.error('❌ Error initializing Google One Tap:', error);
      }
    };

    const loadGoogleScript = () => {
      // Check if the script is already loaded
      if (document.querySelector('script[src*="accounts.google.com/gsi/client"]')) {
        // If Google's object is already available, initialize directly
        if (window.google) {
          initializeGoogleOneTap();
        }
        return;
      }

      // Otherwise, load the script
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('✅ Google Identity Services script loaded');
        initializeGoogleOneTap();
      };
      script.onerror = () => {
        console.error('❌ Failed to load Google Identity Services script');
      };
      document.head.appendChild(script);
    };

    // Slight delay to improve page load perception
    const timer = setTimeout(loadGoogleScript, 1000);
    return () => clearTimeout(timer);

  }, [router]);

  return null;
}