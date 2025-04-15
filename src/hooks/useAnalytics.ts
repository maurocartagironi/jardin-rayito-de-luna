// useAnalyticsEvent.ts
import { analytics, logEvent } from '@/firebase';

export const useAnalytics = () => {
    const sendEvent = (eventName: string, params: Record<string, any> = {}) => {
        if (analytics) {
            logEvent(analytics, eventName, {
                ...params,
                pathname: window.location.pathname,
            });
        } else {
            console.warn('Analytics no disponible');
        }
    };

    return { sendEvent };
};
