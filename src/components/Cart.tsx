import {
  DrawerRoot,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerBackdrop,
  DrawerCloseTrigger,
  Button,
  Stack,
  HStack,
  Text,
  IconButton,
  Badge,
  Box,
  Image,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const MotionBox = motion.create(Box);

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart = ({ isOpen, onClose }: CartProps) => {
  const { cart, totalSpent, clearCart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleClearCart = () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      clearCart();
    }
  };

  return (
    <DrawerRoot
      open={isOpen}
      onOpenChange={(details) => {
        if (!details.open) {
          onClose();
        }
      }}
      placement="end"
      size="md"
    >
      <DrawerBackdrop bg="blackAlpha.700" backdropFilter="blur(4px)" />
      <DrawerContent
        bg="#1a1a2e"
        borderLeft="1px solid"
        borderColor="whiteAlpha.200"
      >
        <DrawerCloseTrigger
          top={4}
          right={4}
          color="white"
          _hover={{ bg: 'whiteAlpha.200' }}
        />
        <DrawerHeader
          borderBottomWidth="1px"
          borderColor="whiteAlpha.200"
          pb={4}
          pt={6}
        >
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
        </DrawerHeader>

        <DrawerBody py={4}>
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
              <AnimatePresence>
                {cart.map((item) => (
                  <MotionBox
                    key={item.product.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
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
                          aria-label="Remove item"
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
                            aria-label="Decrease quantity"
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
                            aria-label="Increase quantity"
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
                  </MotionBox>
                ))}
              </AnimatePresence>
            </Stack>
          )}
        </DrawerBody>

        {cart.length > 0 && (
          <DrawerFooter
            borderTopWidth="1px"
            borderColor="whiteAlpha.200"
            flexDirection="column"
            gap={4}
            pt={4}
          >
            <Box
              w="full"
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
          </DrawerFooter>
        )}
      </DrawerContent>
    </DrawerRoot>
  );
};

