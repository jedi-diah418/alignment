// Authentication with Clerk

import { Clerk } from '@clerk/clerk-js';

// Initialize Clerk with your publishable key
// IMPORTANT: Replace with your actual Clerk publishable key from https://dashboard.clerk.com
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_YOUR_KEY_HERE';

async function initAuth() {
  try {
    // Initialize Clerk
    const clerk = new Clerk(CLERK_PUBLISHABLE_KEY);
    await clerk.load();

    // If user is already signed in, redirect to dashboard
    if (clerk.user) {
      window.location.href = '/dashboard.html';
      return;
    }

    // Mount the sign-in component
    const signInDiv = document.getElementById('clerk-signin');
    if (signInDiv) {
      clerk.mountSignIn(signInDiv, {
        appearance: {
          elements: {
            rootBox: {
              width: '100%',
            },
            card: {
              boxShadow: 'none',
              border: 'none',
            },
          },
        },
        signUpUrl: '/login.html',
        afterSignInUrl: '/dashboard.html',
        afterSignUpUrl: '/dashboard.html',
      });
    }
  } catch (error) {
    console.error('Error initializing authentication:', error);

    // Show error message to user
    const signInDiv = document.getElementById('clerk-signin');
    if (signInDiv) {
      signInDiv.innerHTML = `
        <div style="padding: 2rem; text-align: center; background: #fef2f2; border-radius: 0.5rem; border: 1px solid #fecaca;">
          <h3 style="color: #dc2626; margin-bottom: 1rem;">Authentication Setup Required</h3>
          <p style="color: #991b1b; margin-bottom: 1rem;">
            Please configure your Clerk publishable key to enable authentication.
          </p>
          <ol style="text-align: left; color: #991b1b; margin: 0 auto; max-width: 400px;">
            <li>Sign up at <a href="https://dashboard.clerk.com" target="_blank" style="color: #2563eb; text-decoration: underline;">dashboard.clerk.com</a></li>
            <li>Create a new application</li>
            <li>Copy your publishable key</li>
            <li>Create a <code>.env</code> file with:<br>
              <code style="display: block; background: white; padding: 0.5rem; margin-top: 0.5rem; border-radius: 0.25rem;">VITE_CLERK_PUBLISHABLE_KEY=your_key_here</code>
            </li>
          </ol>
        </div>
      `;
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAuth);
} else {
  initAuth();
}
