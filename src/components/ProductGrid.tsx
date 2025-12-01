import { SimpleGrid, Box, Input, Stack, HStack, Text } from '@chakra-ui/react';
import { NativeSelectRoot, NativeSelectField } from '@chakra-ui/react';
import { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { products } from '../data/products';

export const ProductGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  return (
    <Stack gap={8} align="stretch">
      <Stack gap={4}>
        <HStack gap={4} flexWrap="wrap">
          <Box flex={1} minW={{ base: 'full', md: '300px' }}>
            <Input
              placeholder="🔍 Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="lg"
              bg="whiteAlpha.100"
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor="whiteAlpha.200"
              color="white"
              borderRadius="xl"
              _placeholder={{ color: 'gray.500' }}
              _focus={{
                borderColor: 'cyan.500',
                boxShadow: '0 0 0 1px rgba(6, 182, 212, 0.5)',
                bg: 'whiteAlpha.200'
              }}
              _hover={{
                borderColor: 'whiteAlpha.300'
              }}
            />
          </Box>

          <NativeSelectRoot size="lg" minW={{ base: 'full', md: '220px' }} maxW={{ md: '250px' }}>
            <NativeSelectField
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              bg="whiteAlpha.100"
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor="whiteAlpha.200"
              color="white"
              borderRadius="xl"
              _focus={{
                borderColor: 'cyan.500',
                boxShadow: '0 0 0 1px rgba(6, 182, 212, 0.5)',
                bg: 'whiteAlpha.200'
              }}
              _hover={{
                borderColor: 'whiteAlpha.300'
              }}
            >
              {categories.map((category) => (
                <option key={category} value={category} style={{ background: '#1a1a2e', color: 'white' }}>
                  {category === 'All' ? 'All Categories' : category}
                </option>
              ))}
            </NativeSelectField>
          </NativeSelectRoot>
        </HStack>

        <Text color="gray.400" fontSize="sm">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </Text>
      </Stack>

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} gap={6}>
        {filteredProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </SimpleGrid>

      {filteredProducts.length === 0 && (
        <Box textAlign="center" py={20}>
          <Text fontSize="6xl" mb={4}>🔍</Text>
          <Text fontSize="2xl" fontWeight="bold" color="gray.400" mb={2}>
            No products found
          </Text>
          <Text color="gray.500">
            Try adjusting your search or filter
          </Text>
        </Box>
      )}
    </Stack>
  );
};



