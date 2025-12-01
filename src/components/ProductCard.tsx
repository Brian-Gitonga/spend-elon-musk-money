import { Box, Text, Button, Stack, Image, Badge, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useToast } from './Toast';

const MotionBox = motion.create(Box);

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
  const { addToCart, removeFromCart, decreaseQuantity, remainingMoney, cart } = useCart();
  const { showToast } = useToast();

  // Find the current quantity of this product in the cart
  const cartItem = cart.find(item => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleBuy = () => {
    if (product.price > remainingMoney) {
      showToast(
        `Not enough money! You need ${formatMoney(product.price - remainingMoney)} more to buy this.`,
        'error',
        4000
      );
      return;
    }
    addToCart(product);
    showToast(`Added ${product.name} to cart!`, 'success');
  };

  const handleSell = () => {
    if (quantity > 1) {
      decreaseQuantity(product.id);
    } else if (quantity === 1) {
      removeFromCart(product.id);
    }
  };

  const canAfford = product.price <= remainingMoney;

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      bg="whiteAlpha.50"
      backdropFilter="blur(10px)"
      borderRadius="2xl"
      overflow="hidden"
      border="1px solid"
      borderColor={canAfford ? "cyan.500" : "red.500"}
      position="relative"
      boxShadow={canAfford
        ? "0 4px 20px rgba(6, 182, 212, 0.2)"
        : "0 4px 20px rgba(239, 68, 68, 0.2)"
      }
      _hover={{
        boxShadow: canAfford
          ? "0 8px 40px rgba(6, 182, 212, 0.4)"
          : "0 8px 40px rgba(239, 68, 68, 0.4)",
        borderColor: canAfford ? "cyan.400" : "red.400"
      }}
    >
      {/* Image Section */}
      <Box position="relative" overflow="hidden" h="200px">
        <Image
          src={product.image}
          alt={product.name}
          w="full"
          h="full"
          objectFit="cover"
          transition="transform 0.3s"
          _hover={{ transform: "scale(1.1)" }}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient="to-t"
          gradientFrom="blackAlpha.800"
          gradientTo="transparent"
        />
        <Badge
          position="absolute"
          top={3}
          right={3}
          colorPalette={canAfford ? "cyan" : "red"}
          fontSize="xs"
          px={3}
          py={1}
          borderRadius="full"
        >
          {product.category}
        </Badge>
      </Box>

      {/* Content Section */}
      <Stack gap={3} p={5}>
        <Stack gap={1}>
          <Text fontSize="lg" fontWeight="bold" color="white" lineClamp={1}>
            {product.name}
          </Text>
          <Text fontSize="sm" color="gray.400" lineClamp={2} minH="40px">
            {product.description}
          </Text>
        </Stack>

        <Stack gap={3}>
          <Text
            fontSize="2xl"
            fontWeight="black"
            color={canAfford ? "cyan.400" : "red.400"}
            fontFamily="mono"
          >
            {formatMoney(product.price)}
          </Text>

          {quantity === 0 ? (
            // Show Buy button when no items in cart
            <Button
              colorPalette={canAfford ? "cyan" : "red"}
              size="lg"
              width="full"
              onClick={handleBuy}
              disabled={!canAfford}
              fontWeight="bold"
              borderRadius="xl"
              _hover={{
                transform: canAfford ? "scale(1.02)" : "none"
              }}
              transition="all 0.2s"
            >
              {canAfford ? "Buy Now" : "Can't Afford"}
            </Button>
          ) : (
            // Show Buy/Sell buttons with quantity when items in cart
            <HStack gap={2} width="full">
              <Button
                colorPalette="red"
                size="lg"
                onClick={handleSell}
                fontWeight="bold"
                borderRadius="xl"
                flex={1}
                _hover={{ transform: "scale(1.02)" }}
                transition="all 0.2s"
              >
                Sell
              </Button>

              <Box
                bg="whiteAlpha.200"
                borderRadius="xl"
                px={4}
                py={3}
                minW="60px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="2px solid"
                borderColor="cyan.400"
              >
                <Text
                  fontSize="lg"
                  fontWeight="black"
                  color="cyan.400"
                  fontFamily="mono"
                >
                  {quantity}
                </Text>
              </Box>

              <Button
                colorPalette={canAfford ? "cyan" : "gray"}
                size="lg"
                onClick={handleBuy}
                disabled={!canAfford}
                fontWeight="bold"
                borderRadius="xl"
                flex={1}
                _hover={{
                  transform: canAfford ? "scale(1.02)" : "none"
                }}
                transition="all 0.2s"
              >
                Buy
              </Button>
            </HStack>
          )}
        </Stack>
      </Stack>
    </MotionBox>
  );
};

