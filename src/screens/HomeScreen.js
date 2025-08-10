import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { fetchProducts } from '../api/products';
import { ThemeContext } from '../context/ThemeContext'; // <-- import your ThemeContext

export default function HomeScreen({ navigation }) {
  const { isDarkMode } = useContext(ThemeContext); // <-- get dark mode value

  const [products, setProducts] = useState([]);
  const [q, setQ] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [sortOption, setSortOption] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    (async () => {
      const data = await fetchProducts();
      setProducts(data);
    })();
  }, []);

  const filtered = products
    .filter(p => p.title.toLowerCase().includes(q.toLowerCase()))
    .filter(p => {
      if (minPrice && p.price < Number(minPrice)) return false;
      if (maxPrice && p.price > Number(maxPrice)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortOption === 'lowToHigh') return a.price - b.price;
      if (sortOption === 'highToLow') return b.price - a.price;
      if (sortOption === 'newest') return b.id - a.id;
      if (sortOption === 'oldest') return a.id - b.id;
      return 0;
    });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, isDarkMode && styles.cardDark]}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: item.thumbnail || item.images?.[0] }}
          style={styles.image}
        />
      </View>

      <Text
        style={[styles.productTitle, isDarkMode && styles.textDark]}
        numberOfLines={1}
      >
        {item.title}
      </Text>
      <View style={styles.priceRow}>
        <Text style={[styles.price, isDarkMode && styles.textDark]}>
          ${item.price}
        </Text>
        <TouchableOpacity style={styles.heartBtn}>
          <Icon
            name="heart-outline"
            size={20}
            color={isDarkMode ? '#ccc' : '#555'}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const resetFilters = () => {
    setSortOption(null);
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <View
      style={[
        { flex: 1 },
        isDarkMode ? styles.containerDark : styles.container,
      ]}
    >
      <View style={[styles.topSection, isDarkMode && styles.topSectionDark]}>
        <View style={styles.header}>
          <Text style={[styles.name, isDarkMode && styles.nameDark]}>
            Viorra
          </Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={{ marginRight: 12 }}>
              <Icon
                name="notifications-outline"
                size={22}
                color={isDarkMode ? '#ddd' : '#333'}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name="cart-outline"
                size={22}
                color={isDarkMode ? '#ddd' : '#333'}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.searchBar, isDarkMode && styles.searchBarDark]}>
          <Icon
            name="search-outline"
            size={18}
            color={isDarkMode ? '#aaa' : '#777'}
            style={{ marginLeft: 8 }}
          />
          <TextInput
            placeholder="Search for all products"
            placeholderTextColor={isDarkMode ? '#aaa' : 'black'}
            style={[styles.searchInput, isDarkMode && styles.textDark]}
            value={q}
            onChangeText={setQ}
          />
        </View>
      </View>

      <View style={styles.productsHeader}>
        <View>
          <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>
            Best Products
          </Text>
          <Text style={[styles.sectionSub, isDarkMode && styles.textDark]}>
            {filtered.length} products
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.filterBtn, isDarkMode && styles.filterBtnDark]}
          onPress={() => setShowFilters(true)}
        >
          <Text style={[styles.filterText, isDarkMode && styles.textDark]}>
            Apply Filter
          </Text>
          <Icon
            name="chevron-down-outline"
            size={16}
            color={isDarkMode ? '#ddd' : '#333'}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => String(item.id)}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        isVisible={showFilters}
        onBackdropPress={() => setShowFilters(false)}
        style={styles.modal}
      >
        <View
          style={[styles.modalContent, isDarkMode && styles.modalContentDark]}
        >
          <Text style={[styles.modalTitle, isDarkMode && styles.textDark]}>
            Filters
          </Text>

          <Text
            style={[styles.modalSectionTitle, isDarkMode && styles.textDark]}
          >
            Sort By
          </Text>
          {['lowToHigh', 'highToLow', 'newest', 'oldest'].map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionBtn,
                sortOption === option && styles.optionBtnActive,
                isDarkMode && styles.optionBtnDark,
              ]}
              onPress={() => setSortOption(option)}
            >
              <Text
                style={[
                  styles.optionText,
                  sortOption === option && styles.optionTextActive,
                  isDarkMode && styles.textDark,
                ]}
              >
                {option === 'lowToHigh' && 'Price: Low → High'}
                {option === 'highToLow' && 'Price: High → Low'}
                {option === 'newest' && 'Newest First'}
                {option === 'oldest' && 'Oldest First'}
              </Text>
            </TouchableOpacity>
          ))}

          <Text
            style={[styles.modalSectionTitle, isDarkMode && styles.textDark]}
          >
            Price Range
          </Text>
          <View style={styles.priceInputs}>
            <TextInput
              placeholder="Min"
              placeholderTextColor={isDarkMode ? '#aaa' : 'black'}
              keyboardType="numeric"
              value={minPrice}
              onChangeText={setMinPrice}
              style={[
                styles.priceInput,
                isDarkMode && styles.priceInputDark,
                isDarkMode && styles.textDark,
              ]}
            />
            <TextInput
              placeholder="Max"
              placeholderTextColor={isDarkMode ? '#aaa' : 'black'}
              keyboardType="numeric"
              value={maxPrice}
              onChangeText={setMaxPrice}
              style={[
                styles.priceInput,
                isDarkMode && styles.priceInputDark,
                isDarkMode && styles.textDark,
              ]}
            />
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
              <Text style={isDarkMode ? styles.textDark : styles.resetText}>
                Reset
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.applyBtn, isDarkMode && styles.applyBtnDark]}
              onPress={() => setShowFilters(false)}
            >
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDEAE7',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  topSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  topSectionDark: {
    backgroundColor: '#1E1E1E',
    shadowOpacity: 0.2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 45,
  },
  name: { fontSize: 30, fontWeight: '400', color: '#B84953' },
  nameDark: { color: '#FF7961' },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 115,
    marginTop: 16,
    height: 44,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: '#E9E5E4',
  },
  searchBarDark: {
    backgroundColor: '#2C2C2C',
    borderColor: '#555',
  },
  searchInput: { flex: 1, paddingHorizontal: 8, fontSize: 14 },
  textDark: {
    color: '#ddd',
  },

  productsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 16,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#222' },
  sectionSub: { fontSize: 12, color: '#888', marginTop: 2 },

  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9E5E4',
  },
  filterBtnDark: {
    backgroundColor: '#1E1E1E',
    borderColor: '#555',
  },
  filterText: {
    fontSize: 12,
    marginRight: 4,
    fontWeight: '600',
    color: '#333',
  },

  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: '#2C2C2C',
    shadowOpacity: 0.4,
  },
  imageWrapper: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 0.8,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  productTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6,
    color: '#333',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  price: { fontSize: 14, fontWeight: '700', color: '#B84953' },
  heartBtn: { padding: 4 },

  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  modalContentDark: {
    backgroundColor: '#222',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    color: '#222',
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 6,
    color: '#333',
  },
  optionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  optionBtnDark: {
    borderColor: '#555',
  },
  optionBtnActive: {
    backgroundColor: '#B84953',
    borderColor: '#B84953',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  optionTextActive: {
    color: '#fff',
  },
  priceInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginHorizontal: 4,
    color: '#000',
  },
  priceInputDark: {
    borderColor: '#555',
    color: '#ddd',
  },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between' },
  resetBtn: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  resetText: { fontSize: 14, color: '#B84953', fontWeight: '600' },
  applyBtn: {
    backgroundColor: '#B84953',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  applyBtnDark: {
    backgroundColor: '#FF7961',
  },
  applyText: {
    color: 'white',
    fontWeight: '600',
  },
});
