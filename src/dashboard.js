// Dashboard with protected content

import { Clerk } from '@clerk/clerk-js';

// Initialize Clerk
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_YOUR_KEY_HERE';

async function initDashboard() {
  try {
    // Initialize Clerk
    const clerk = new Clerk(CLERK_PUBLISHABLE_KEY);
    await clerk.load();

    // Check if user is authenticated
    if (!clerk.user) {
      // Redirect to login if not authenticated
      window.location.href = '/login.html';
      return;
    }

    // Display user information
    const userInfo = document.getElementById('user-info');
    if (userInfo && clerk.user) {
      const firstName = clerk.user.firstName || 'User';
      userInfo.textContent = `Welcome, ${firstName}`;
    }

    // Handle sign out
    const signOutBtn = document.getElementById('sign-out-btn');
    if (signOutBtn) {
      signOutBtn.addEventListener('click', async () => {
        await clerk.signOut();
        window.location.href = '/';
      });
    }

    // Handle resource downloads
    setupDownloadHandlers(clerk.user);

  } catch (error) {
    console.error('Error initializing dashboard:', error);

    // Show error and redirect to home
    alert('Error loading dashboard. Redirecting to home page.');
    window.location.href = '/';
  }
}

function setupDownloadHandlers(user) {
  const downloadButtons = document.querySelectorAll('.resource-download');

  downloadButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const resourceType = button.getAttribute('data-type');
      const resourceTitle = button.closest('.resource-item').querySelector('.resource-title').textContent;

      // In a real implementation, this would:
      // 1. Verify the user's access permissions
      // 2. Generate a secure download URL
      // 3. Track the download in analytics
      // 4. Serve the actual file

      // For now, show a message
      showDownloadNotification(resourceTitle, resourceType);

      // Simulate download tracking
      trackDownload(user.id, resourceTitle, resourceType);
    });
  });
}

function showDownloadNotification(title, type) {
  // Create notification
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    z-index: 1000;
    animation: slideIn 0.3s ease;
    max-width: 300px;
  `;

  notification.innerHTML = `
    <div style="display: flex; align-items: start; gap: 0.75rem;">
      <span style="font-size: 1.5rem;">✓</span>
      <div>
        <strong style="display: block; margin-bottom: 0.25rem;">Download Ready</strong>
        <span style="font-size: 0.875rem; opacity: 0.9;">${title}</span>
      </div>
    </div>
  `;

  // Add animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => notification.remove(), 300);
  }, 3000);

  // In production, you would trigger actual file download here:
  // window.location.href = `/api/download?resource=${encodeURIComponent(title)}&type=${type}`;
  console.log(`Download initiated: ${title} (${type})`);
}

function trackDownload(userId, resourceTitle, resourceType) {
  // In production, send analytics to your backend
  console.log('Download tracked:', {
    userId,
    resource: resourceTitle,
    type: resourceType,
    timestamp: new Date().toISOString()
  });

  // Example: fetch('/api/analytics/download', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ userId, resourceTitle, resourceType })
  // });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDashboard);
} else {
  initDashboard();
}
