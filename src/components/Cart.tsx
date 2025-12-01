import {
  Button,
  Stack,
  HStack,
  Text,
  IconButton,
  Badge,
  Box,
  Image,
} from '@chakra-ui/react';
import { useCart } from '../context/CartContext';
import { createPortal } from 'react-dom';
import { useState } from 'react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart = ({ isOpen, onClose }: CartProps) => {
  const { cart, totalSpent, clearCart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleClearCart = () => {
    setShowConfirmModal(true);
  };

  const confirmClearCart = () => {
    clearCart();
    setShowConfirmModal(false);
  };

  const cancelClearCart = () => {
    setShowConfirmModal(false);
  };

  if (!isOpen) return null;

  return createPortal(
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={1000}
      bg="blackAlpha.700"
      backdropFilter="blur(4px)"
      onClick={onClose}
    >
      <Box
        position="fixed"
        top={0}
        right={0}
        bottom={0}
        width={{ base: "100%", md: "400px" }}
        bg="#1a1a2e"
        borderLeft="1px solid"
        borderColor="whiteAlpha.200"
        transform={isOpen ? "translateX(0)" : "translateX(100%)"}
        transition="transform 0.3s ease-in-out"
        onClick={(e) => e.stopPropagation()}
        overflowY="auto"
        display="flex"
        flexDirection="column"
      >
        <Box
          borderBottomWidth="1px"
          borderColor="whiteAlpha.200"
          pb={4}
          pt={6}
          px={6}
          position="relative"
          flexShrink={0}
        >
          <IconButton
            position="absolute"
            top={4}
            right={4}
            color="white"
            variant="ghost"
            onClick={onClose}
            _hover={{ bg: 'whiteAlpha.200' }}
          >
            <Text fontSize="lg" fontWeight="bold">×</Text>
          </IconButton>

          <Stack gap={2}>
            <Text fontSize="2xl" fontWeight="bold" color="white">
              Shopping Cart
            </Text>
            <HStack gap={2}>
              <Badge colorPalette="cyan" fontSize="sm" px={3} py={1} borderRadius="full">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </Badge>
              <Badge colorPalette="pink" fontSize="sm" px={3} py={1} borderRadius="full">
                {formatMoney(totalSpent)}
              </Badge>
            </HStack>
          </Stack>
        </Box>

        <Box py={4} px={6} flex={1} overflowY="auto">
          {cart.length === 0 ? (
            <Stack gap={4} py={20} align="center">
              <Box
                w="80px"
                h="80px"
                borderRadius="full"
                bg="whiteAlpha.100"
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="2px dashed"
                borderColor="whiteAlpha.300"
              >
                <Text fontSize="2xl" color="gray.400" fontWeight="bold">
                  CART
                </Text>
              </Box>
              <Text fontSize="xl" fontWeight="bold" color="gray.300">
                Your cart is empty
              </Text>
              <Text fontSize="sm" color="gray.500" textAlign="center">
                Start spending Elon's money!
              </Text>
            </Stack>
          ) : (
            <Stack gap={3} align="stretch">
              {cart.map((item) => (
                <Box
                  key={item.product.id}
                  p={3}
                  bg="whiteAlpha.100"
                  backdropFilter="blur(10px)"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  _hover={{
                    bg: 'whiteAlpha.150',
                    borderColor: 'cyan.500'
                  }}
                  transition="all 0.2s"
                >
                  <HStack gap={3} mb={3} align="start">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      boxSize="60px"
                      objectFit="cover"
                      borderRadius="lg"
                    />
                    <Stack gap={1} flex={1}>
                      <Text
                        fontWeight="bold"
                        color="white"
                        fontSize="sm"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                      >
                        {item.product.name}
                      </Text>
                      <Text fontSize="xs" color="cyan.400" fontFamily="mono">
                        {formatMoney(item.product.price)}
                      </Text>
                    </Stack>
                    <IconButton
                      size="xs"
                      colorPalette="red"
                      variant="ghost"
                      onClick={() => removeFromCart(item.product.id)}
                      _hover={{ bg: 'red.900' }}
                    >
                      <Text fontSize="sm" fontWeight="bold">×</Text>
                    </IconButton>
                  </HStack>

                  <HStack justify="space-between" align="center">
                    <HStack gap={2}>
                      <IconButton
                        size="xs"
                        onClick={() => decreaseQuantity(item.product.id)}
                        disabled={item.quantity <= 1}
                        bg="whiteAlpha.200"
                        _hover={{ bg: 'whiteAlpha.300' }}
                        borderRadius="md"
                      >
                        <Text fontWeight="bold" fontSize="sm">−</Text>
                      </IconButton>
                      <Badge
                        colorPalette="cyan"
                        fontSize="sm"
                        px={3}
                        py={1}
                        fontFamily="mono"
                        minW="40px"
                        textAlign="center"
                      >
                        {item.quantity}
                      </Badge>
                      <IconButton
                        size="xs"
                        onClick={() => increaseQuantity(item.product.id)}
                        bg="whiteAlpha.200"
                        _hover={{ bg: 'whiteAlpha.300' }}
                        borderRadius="md"
                      >
                        <Text fontWeight="bold" fontSize="sm">+</Text>
                      </IconButton>
                    </HStack>
                    <Text fontWeight="bold" color="pink.400" fontSize="sm" fontFamily="mono">
                      {formatMoney(item.product.price * item.quantity)}
                    </Text>
                  </HStack>
                </Box>
              ))}
            </Stack>
          )}
        </Box>

        {cart.length > 0 && (
          <Box
            borderTopWidth="1px"
            borderColor="whiteAlpha.200"
            pt={4}
            pb={6}
            px={6}
            flexShrink={0}
          >
            <Stack gap={4} width="full">
              <Box
                p={4}
                bg="whiteAlpha.100"
                borderRadius="xl"
                border="1px solid"
                borderColor="whiteAlpha.200"
              >
                <HStack justify="space-between" width="full">
                  <Text fontSize="lg" fontWeight="bold" color="gray.300">
                    Total Spent:
                  </Text>
                  <Text fontSize="2xl" fontWeight="black" color="cyan.400" fontFamily="mono">
                    {formatMoney(totalSpent)}
                  </Text>
                </HStack>
              </Box>
              <Button
                colorPalette="red"
                width="full"
                onClick={handleClearCart}
                size="lg"
                borderRadius="xl"
                fontWeight="bold"
                _hover={{ transform: 'scale(1.02)' }}
                transition="all 0.2s"
              >
                Clear Cart
              </Button>
            </Stack>
          </Box>
        )}
      </Box>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={2000}
          bg="blackAlpha.800"
          backdropFilter="blur(8px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={cancelClearCart}
        >
          <Box
            bg="#1a1a2e"
            borderRadius="2xl"
            border="1px solid"
            borderColor="whiteAlpha.300"
            p={8}
            maxW="400px"
            mx={4}
            onClick={(e) => e.stopPropagation()}
            boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.8)"
            transform="scale(1)"
            transition="all 0.3s ease-in-out"
          >
            <Stack gap={6} align="center" textAlign="center">
              <Box
                w="80px"
                h="80px"
                borderRadius="full"
                bg="linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%)"
                border="2px solid"
                borderColor="red.400"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="3xl" color="red.400">⚠</Text>
              </Box>

              <Stack gap={2} align="center">
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  Clear Cart?
                </Text>
                <Text fontSize="md" color="gray.400" lineHeight="1.6">
                  Are you sure you want to remove all items from your cart? This action cannot be undone.
                </Text>
              </Stack>

              <HStack gap={3} width="full">
                <Button
                  flex={1}
                  variant="outline"
                  colorPalette="white"
                  bg="white"
                  onClick={cancelClearCart}
                  size="lg"
                  borderRadius="xl"
                  fontWeight="bold"
                  _hover={{ bg: 'white' }}
                >
                  Cancel
                </Button>
                <Button
                  flex={1}
                  colorPalette="red"
                  onClick={confirmClearCart}
                  size="lg"
                  borderRadius="xl"
                  fontWeight="bold"
                  _hover={{ transform: 'scale(1.02)' }}
                  transition="all 0.2s"
                >
                  Clear Cart
                </Button>
              </HStack>
            </Stack>
          </Box>
        </Box>
      )}
    </Box>,
    document.body
  );
};

