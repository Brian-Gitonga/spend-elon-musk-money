import { Box, Text, HStack } from '@chakra-ui/react';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export const Toast = ({ message, type = 'success', duration = 3000, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show toast
    setIsVisible(true);
    
    // Auto hide after duration
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'linear-gradient(135deg, rgba(34, 197, 94, 0.9) 0%, rgba(22, 163, 74, 0.9) 100%)',
          borderColor: 'green.400',
          icon: '✓'
        };
      case 'error':
        return {
          bg: 'linear-gradient(135deg, rgba(239, 68, 68, 0.9) 0%, rgba(220, 38, 38, 0.9) 100%)',
          borderColor: 'red.400',
          icon: '✕'
        };
      case 'info':
      default:
        return {
          bg: 'linear-gradient(135deg, rgba(6, 182, 212, 0.9) 0%, rgba(14, 165, 233, 0.9) 100%)',
          borderColor: 'cyan.400',
          icon: 'ℹ'
        };
    }
  };

  const styles = getToastStyles();

  return createPortal(
    <Box
      position="fixed"
      top={4}
      right={4}
      zIndex={3000}
      transform={isVisible ? 'translateX(0) scale(1)' : 'translateX(100%) scale(0.8)'}
      opacity={isVisible ? 1 : 0}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    >
      <Box
        bg={styles.bg}
        backdropFilter="blur(10px)"
        borderRadius="xl"
        border="1px solid"
        borderColor={styles.borderColor}
        p={4}
        minW="300px"
        maxW="400px"
        boxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
      >
        <HStack gap={3} align="center">
          <Box
            w="32px"
            h="32px"
            borderRadius="full"
            bg="whiteAlpha.200"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
          >
            <Text fontSize="lg" fontWeight="bold" color="white">
              {styles.icon}
            </Text>
          </Box>
          <Text fontSize="sm" fontWeight="medium" color="white" flex={1}>
            {message}
          </Text>
        </HStack>
      </Box>
    </Box>,
    document.body
  );
};

// Toast Manager Hook
export const useToast = () => {
  const [toasts, setToasts] = useState<Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
    duration?: number;
  }>>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success', duration = 3000) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const ToastContainer = () => (
    <>
      {toasts.map((toast, index) => (
        <Box key={toast.id} style={{ zIndex: 3000 + index }}>
          <Toast
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        </Box>
      ))}
    </>
  );

  return { showToast, ToastContainer };
};
