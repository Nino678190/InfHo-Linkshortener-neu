// AutoClosingNotification.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Notification, Progress, Transition } from '@mantine/core';
import {X as CloseIcon} from 'lucide-react';

const AutoClosingNotification = () => {
  const [notificationState, setNotificationState] = useState({
    visible: false,
    title: '',
    message: '',
    color: '',
    duration: 0,
  });
  const [progress, setProgress] = useState(100);
  const progressInterval = useRef<any>(null);
  const startTime = useRef<any>(null);
  const ref = useRef<any>(null);

  const showNotification = ({
    title = 'Notification',
    message = 'This is a notification',
    color = 'blue',
    duration = 5000,
  }) => {
    startTime.current = Date.now();
    setNotificationState({
      visible: true,
      title,
      message,
      color,
      duration,
    });
    
    setProgress(100);
  };

  const hideNotification = () => {
    setNotificationState(prev => ({ ...prev, visible: false }));
    setProgress(0);
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  };

  useEffect(() => {
    if (notificationState.visible) {
      const timer = setTimeout(() => {
        hideNotification();
      }, notificationState.duration);

      progressInterval.current = setInterval(() => {
        const elapsed = Date.now() - startTime.current;
        const remaining = Math.max(0, 100 - (elapsed / notificationState.duration) * 100);
        setProgress(remaining);
      }, 10);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval.current);
      };
    }
  }, [notificationState.visible, notificationState.duration]);

  // Expose the showNotification function
  React.useImperativeHandle(
    ref,
    () => ({
      showNotification,
    }),
    []
  );

  return (
    <Transition
      mounted={notificationState.visible}
      transition="slide-left"
      duration={400}
      timingFunction="ease"
    >
      {(styles) => (
        <div style={styles} className="fixed top-4 right-4 z-50 min-w-[300px] max-w-[400px]">
          <Notification
            icon={<CloseIcon />}
            color={notificationState.color}
            title={notificationState.title}
            onClose={hideNotification}
            className="mb-2"
          >
            <div className="space-y-2">
              <p>{notificationState.message}</p>
              <Progress 
                value={progress} 
                color={notificationState.color}
                size="xs"
                className="mt-2"
                
              />
            </div>
          </Notification>
        </div>
      )}
    </Transition>
  );
};

export default React.forwardRef(AutoClosingNotification);