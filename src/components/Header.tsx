import { Box, Heading, Text, Stack, HStack, Container } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

const MotionBox = motion.create(Box);

export const Header = () => {
  const { remainingMoney, totalSpent } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatCompact = (amount: number) => {
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(2)}B`;
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(2)}M`;
    if (amount >= 1e3) return `$${(amount / 1e3).toFixed(2)}K`;
    return `$${amount}`;
  };

  return (
    <>
      {/* Main Header - Shows when at top */}
      <MotionBox
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: isScrolled ? 0 : 1,
          height: isScrolled ? 0 : 'auto'
        }}
        transition={{ duration: 0.3 }}
        background="linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
        borderBottom="1px solid"
        borderColor="whiteAlpha.200"
        overflow="hidden"
      >
        <Container maxW="container.xl" py={{ base: 4, md: 6 }}>
          <Stack gap={4} align="center">
            <Heading
              as="h1"
              fontSize={{ base: "2xl", md: "4xl" }}
              textAlign="center"
              fontWeight="black"
              letterSpacing="tight"
              bgGradient="to-r"
              gradientFrom="cyan.400"
              gradientTo="blue.500"
              bgClip="text"
            >
              💰 Spend Elon Musk's Fortune
            </Heading>

            <HStack
              gap={{ base: 3, md: 6 }}
              flexWrap="wrap"
              justify="center"
              w="full"
            >
              <Box
                bg="whiteAlpha.100"
                backdropFilter="blur(10px)"
                borderRadius="xl"
                p={{ base: 3, md: 4 }}
                border="1px solid"
                borderColor="whiteAlpha.200"
                minW={{ base: "120px", md: "160px" }}
              >
                <Stack gap={1} align="center">
                  <Text fontSize="xs" color="gray.400" textTransform="uppercase" fontWeight="bold">
                    Remaining
                  </Text>
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="bold"
                    color="cyan.400"
                    fontFamily="mono"
                  >
                    {formatCompact(remainingMoney)}
                  </Text>
                </Stack>
              </Box>

              <Box
                bg="whiteAlpha.100"
                backdropFilter="blur(10px)"
                borderRadius="xl"
                p={{ base: 3, md: 4 }}
                border="1px solid"
                borderColor="whiteAlpha.200"
                minW={{ base: "120px", md: "160px" }}
              >
                <Stack gap={1} align="center">
                  <Text fontSize="xs" color="gray.400" textTransform="uppercase" fontWeight="bold">
                    Spent
                  </Text>
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="bold"
                    color="pink.400"
                    fontFamily="mono"
                  >
                    {formatCompact(totalSpent)}
                  </Text>
                </Stack>
              </Box>
            </HStack>
          </Stack>
        </Container>
      </MotionBox>

      {/* Sticky Minimal Header - Shows when scrolled */}
      <MotionBox
        initial={{ y: -100 }}
        animate={{
          y: isScrolled ? 0 : -100,
          opacity: isScrolled ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        bg="rgba(26, 26, 46, 0.95)"
        backdropFilter="blur(20px)"
        borderBottom="1px solid"
        borderColor="whiteAlpha.200"
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.3)"
      >
        <Container maxW="container.xl" py={2}>
          <HStack justify="space-between" align="center">
            <Text
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="bold"
              bgGradient="to-r"
              gradientFrom="cyan.400"
              gradientTo="blue.500"
              bgClip="text"
            >
              💰 Elon's Money
            </Text>

            <HStack gap={{ base: 2, md: 4 }}>
              <HStack gap={2} bg="whiteAlpha.100" px={3} py={1} borderRadius="lg">
                <Text fontSize="xs" color="gray.400">Left:</Text>
                <Text fontSize="sm" fontWeight="bold" color="cyan.400" fontFamily="mono">
                  {formatCompact(remainingMoney)}
                </Text>
              </HStack>

              <HStack gap={2} bg="whiteAlpha.100" px={3} py={1} borderRadius="lg">
                <Text fontSize="xs" color="gray.400">Spent:</Text>
                <Text fontSize="sm" fontWeight="bold" color="pink.400" fontFamily="mono">
                  {formatCompact(totalSpent)}
                </Text>
              </HStack>
            </HStack>
          </HStack>
        </Container>
      </MotionBox>
    </>
  );
};

