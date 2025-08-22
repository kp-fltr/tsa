'use client';

import React from 'react';
import { 
  getMockProfileDistribution, 
  getMockAppetiteDistribution, 
  MOCK_KPIS,
  MOCK_DATA_SUMMARY
} from '../lib/mockData';

// Safe demo mode check that never accesses process
const getDemoModeStatus = () => {
  try {
    // Try to get from window object if available
    if (typeof window !== 'undefined') {
      // In production builds, Next.js will replace NEXT_PUBLIC_ vars at build time
      return '1' === '1'; // This will be replaced by Next.js
    }
    return true; // Default to true
  } catch (error) {
    return true; // Default to true if any error
  }
};

const getEnvironmentInfo = () => {
  try {
    // Safe environment detection without process access
    const isDev = typeof window !== 'undefined' && window.location.hostname === 'localhost';
    return {
      isDevelopment: isDev,
      environment: isDev ? 'development' : 'production'
    };
  } catch (error) {
    return {
      isDevelopment: true,
      environment: 'development'
    };
  }
};

export function DebugMockData() {
  const profileData = getMockProfileDistribution();
  const appetiteData = getMockAppetiteDistribution();
  const demoMode = getDemoModeStatus();
  const envInfo = getEnvironmentInfo();

  // Log debug info on component mount (development only)
  React.useEffect(() => {
    if (envInfo.isDevelopment) {
      console.log('📊 Mock Data Summary:', MOCK_DATA_SUMMARY);
    }
  }, [envInfo.isDevelopment]);

  return (
    <div className="p-4 bg-card rounded-lg border space-y-4">
      <h3 className="text-h4">Mock Data Debug</h3>
      
      <div className="space-y-2">
        <p><strong>Demo Mode:</strong> {demoMode ? 'Enabled' : 'Disabled'}</p>
        <p><strong>Environment:</strong> {envInfo.environment}</p>
        <p><strong>Is Development:</strong> {envInfo.isDevelopment ? 'Yes' : 'No'}</p>
      </div>

      <div className="space-y-2">
        <h4 className="text-h5">KPIs:</h4>
        <pre className="bg-muted p-2 rounded text-sm overflow-auto">
          {JSON.stringify(MOCK_KPIS, null, 2)}
        </pre>
      </div>

      <div className="space-y-2">
        <h4 className="text-h5">Profile Distribution:</h4>
        <pre className="bg-muted p-2 rounded text-sm overflow-auto">
          {JSON.stringify(profileData, null, 2)}
        </pre>
      </div>

      <div className="space-y-2">
        <h4 className="text-h5">Appetite Distribution:</h4>
        <pre className="bg-muted p-2 rounded text-sm overflow-auto">
          {JSON.stringify(appetiteData, null, 2)}
        </pre>
      </div>

      <div className="space-y-2">
        <h4 className="text-h5">Data Summary:</h4>
        <pre className="bg-muted p-2 rounded text-sm overflow-auto">
          {JSON.stringify(MOCK_DATA_SUMMARY, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default DebugMockData;