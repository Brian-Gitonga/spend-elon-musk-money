import { Box, Container, Button, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { ProductGrid } from './components/ProductGrid';
import { Cart } from './components/Cart';
import { useCart } from './context/CartContext';

const MotionButton = motion.create(Button);

const AppContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }}
    >
      <Header />

      <Container maxW="container.xl" py={8} position="relative" zIndex={1}>
        <ProductGrid />
      </Container>

      {/* Floating Cart Button */}
      <MotionButton
        position="fixed"
        bottom={{ base: 4, md: 8 }}
        right={{ base: 4, md: 8 }}
        size="lg"
        colorPalette="cyan"
        borderRadius="full"
        boxShadow="0 8px 32px rgba(6, 182, 212, 0.4)"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1, boxShadow: "0 12px 48px rgba(6, 182, 212, 0.6)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        zIndex={999}
        px={6}
        py={6}
        border="2px solid"
        borderColor="cyan.400"
        bg="linear-gradient(135deg, rgba(6, 182, 212, 0.9) 0%, rgba(14, 165, 233, 0.9) 100%)"
        backdropFilter="blur(10px)"
        fontWeight="bold"
        fontSize="lg"
        _hover={{
          bg: "linear-gradient(135deg, rgba(6, 182, 212, 1) 0%, rgba(14, 165, 233, 1) 100%)"
        }}
      >
        <Text fontSize="lg" fontWeight="bold" mr={2}>CART</Text>
        {cart.length > 0 && (
          <Box
            position="absolute"
            top="-8px"
            right="-8px"
            bg="pink.500"
            color="white"
            borderRadius="full"
            w="32px"
            h="32px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontWeight="bold"
            fontSize="sm"
            border="3px solid"
            borderColor="cyan.900"
            boxShadow="0 4px 12px rgba(236, 72, 153, 0.6)"
          >
            {cart.length}
          </Box>
        )}
        Cart
      </MotionButton>

      <Cart isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Box>
  );
};

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
