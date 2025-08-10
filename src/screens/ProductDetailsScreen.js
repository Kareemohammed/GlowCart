import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import { ThemeContext } from '../context/ThemeContext';

export default function ProductDetailsScreen({ route, navigation }) {
  const { isDarkMode } = useContext(ThemeContext);
  const product = route.params?.product || {};
  const productImage =
    product.image ||
    product.thumbnail ||
    (product.images && product.images[0]) ||
    'https://via.placeholder.com/300';

  const imageScale = useRef(new Animated.Value(0.8)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const [btnScale] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(imageScale, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [imageScale, imageOpacity]);

  const animateButtonPressIn = () => {
    Animated.spring(btnScale, {
      toValue: 0.9,
      useNativeDriver: true,
      friction: 3,
      tension: 40,
    }).start();
  };

  const animateButtonPressOut = () => {
    Animated.spring(btnScale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
      tension: 40,
    }).start();
  };

  const renderStars = rating => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<Icon key={i} name="star" size={16} color="#F4C430" />);
      } else if (i - rating < 1) {
        stars.push(<Icon key={i} name="star-half" size={16} color="#F4C430" />);
      } else {
        stars.push(
          <Icon key={i} name="star-outline" size={16} color="#F4C430" />,
        );
      }
    }
    return stars;
  };

  const themeStyles = {
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#FDEAE7',
    },
    backBtn: {
      backgroundColor: isDarkMode ? '#222' : '#fff',
    },
    shareBtn: {
      backgroundColor: isDarkMode ? '#222' : '#fff',
    },
    textPrimary: {
      color: isDarkMode ? '#fff' : '#000',
    },
    textSecondary: {
      color: isDarkMode ? '#bbb' : '#555',
    },
    textTertiary: {
      color: isDarkMode ? '#888' : '#444',
    },
    cardBackground: {
      backgroundColor: isDarkMode ? '#1E1E1E' : '#fff',
    },
    divider: {
      height: 1,
      backgroundColor: isDarkMode ? '#333' : '#ddd',
      marginTop: 8,
      marginBottom: 8,
    },
    price: {
      color: isDarkMode ? '#fff' : '#000',
    },
    discount: {
      color: isDarkMode ? '#aaa' : '#888',
    },
    addBtn: {
      backgroundColor: '#B84B54',
    },
  };

  return (
    <View style={[styles.container, themeStyles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.imageWrapper,
            { backgroundColor: isDarkMode ? '#1E1E1E' : '#fff' },
          ]}
        >
          <Animated.Image
            source={{ uri: productImage }}
            style={[
              styles.productImage,
              {
                transform: [{ scale: imageScale }],
                opacity: imageOpacity,
              },
            ]}
          />
          <TouchableOpacity
            style={[styles.backBtn, themeStyles.backBtn]}
            onPress={() => navigation.goBack()}
          >
            <Icon
              name="arrow-back"
              size={20}
              color={isDarkMode ? '#fff' : '#000'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.cardBtn,
              { backgroundColor: isDarkMode ? 'transparent' : '#fff' },
            ]}
          >
            <Feather
              name="shopping-cart"
              size={20}
              color={isDarkMode ? '#fff' : '#000'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.similarRow}>
          <TouchableOpacity
            style={[
              styles.similarBtn,
              { backgroundColor: isDarkMode ? '#333' : '#fff0f0' },
            ]}
          >
            <Text
              style={[
                styles.similarText,
                { color: isDarkMode ? '#fff' : '#B84B54' },
              ]}
            >
              View Similar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.shareBtnInline]}>
            <Feather
              name="share-2"
              size={20}
              color={isDarkMode ? '#fff' : '#B84B54'}
            />
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 16, marginTop: 6 }}>
          <Text style={[styles.title, themeStyles.textPrimary]}>
            {product.title}
          </Text>
          <Text style={[styles.description, themeStyles.textSecondary]}>
            {product.description}
          </Text>

          <View style={styles.ratingRow}>
            {renderStars(product.rating || 0)}
            <Text style={[styles.ratingValue, themeStyles.textTertiary]}>
              {(product.rating || 0).toFixed(2)}/5
            </Text>
          </View>

          <View style={themeStyles.divider} />

          <Text style={[styles.soldBy, themeStyles.textTertiary]}>
            Sold by :{' '}
            <Text
              style={{ fontWeight: '600', color: isDarkMode ? '#fff' : '#000' }}
            >
              {product.brand || 'Unknown'}
            </Text>
          </Text>

          <View style={styles.priceRow}>
            <Text style={[styles.price, themeStyles.price]}>
              ${product.price}
            </Text>
            {product.discountPercentage ? (
              <Text style={[styles.discount, themeStyles.discount]}>
                $
                {(
                  product.price *
                  (1 + product.discountPercentage / 100)
                ).toFixed(2)}
              </Text>
            ) : null}

            <Pressable
              onPressIn={animateButtonPressIn}
              onPressOut={animateButtonPressOut}
              style={{ marginLeft: 'auto' }}
            >
              <Animated.View
                style={[
                  styles.addBtn,
                  themeStyles.addBtn,
                  { transform: [{ scale: btnScale }] },
                ]}
              >
                <Text style={styles.addText}>Add to Bag</Text>
              </Animated.View>
            </Pressable>
          </View>
        </View>

        <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
          <Text style={[styles.sectionTitle, themeStyles.textPrimary]}>
            Highlights
          </Text>
          <View style={styles.highlightsContainer}>
            <View style={styles.highlightsColumn}>
              <Text style={[styles.highlightLabel, themeStyles.textTertiary]}>
                Width
              </Text>
              <Text style={[styles.highlightValue, themeStyles.textPrimary]}>
                {product.width || '15.14'}
              </Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.highlightsColumn}>
              <Text style={[styles.highlightLabel, themeStyles.textTertiary]}>
                Height
              </Text>
              <Text style={[styles.highlightValue, themeStyles.textPrimary]}>
                {product.height || '13.08'}
              </Text>
            </View>
          </View>

          <View style={styles.highlightsContainer}>
            <View style={styles.highlightsColumn}>
              <Text style={[styles.highlightLabel, themeStyles.textTertiary]}>
                Warranty
              </Text>
              <Text style={[styles.highlightValue, themeStyles.textPrimary]}>
                {product.warranty || '1 week'}
              </Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.highlightsColumn}>
              <Text style={[styles.highlightLabel, themeStyles.textTertiary]}>
                Shipping
              </Text>
              <Text style={[styles.highlightValue, themeStyles.textPrimary]}>
                {product.shipping || 'In 3-5 business days'}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{ paddingHorizontal: 16, marginTop: 20, paddingBottom: 30 }}
        >
          <Text style={[styles.sectionTitle, themeStyles.textPrimary]}>
            Ratings & Reviews
          </Text>

          <View style={[styles.reviewCard, themeStyles.cardBackground]}>
            <View style={styles.reviewHeader}>
              <Text style={[styles.reviewerName, themeStyles.textPrimary]}>
                Eleanor Collins
              </Text>
              <View style={{ flexDirection: 'row' }}>{renderStars(3)}</View>
            </View>
            <Text style={[styles.reviewerEmail, themeStyles.textTertiary]}>
              eleanor.collins@gmail.com
            </Text>
            <Text style={[styles.reviewText, themeStyles.textSecondary]}>
              The quality is very good. I will recommend everyone.
            </Text>
          </View>

          <View style={[styles.reviewCard, themeStyles.cardBackground]}>
            <View style={styles.reviewHeader}>
              <Text style={[styles.reviewerName, themeStyles.textPrimary]}>
                Elena Watson
              </Text>
              <View style={{ flexDirection: 'row' }}>{renderStars(4)}</View>
            </View>
            <Text style={[styles.reviewerEmail, themeStyles.textTertiary]}>
              elena.watson@gmail.com
            </Text>
            <Text style={[styles.reviewText, themeStyles.textSecondary]}>
              I am using it since a year. Worth every penny.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageWrapper: {
    marginHorizontal: 16,
    marginTop: 40,
    borderRadius: 20,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 300,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderRadius: 16,
    resizeMode: 'contain',
  },
  backBtn: {
    position: 'absolute',
    top: 15,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  cardBtn: {
    position: 'absolute',
    top: 15,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  similarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 12,
    alignItems: 'center',
  },
  similarBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderColor: '#B84B54',
    borderWidth: 1,
  },
  similarText: {
    fontWeight: '600',
    fontSize: 14,
  },
  shareBtnInline: {
    padding: 10,
    borderRadius: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  ratingValue: {
    fontSize: 12,
    marginLeft: 6,
    fontWeight: '600',
  },
  soldBy: {
    marginTop: 12,
    fontSize: 14,
  },
  priceRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontWeight: '700',
    fontSize: 20,
  },
  discount: {
    marginLeft: 8,
    textDecorationLine: 'line-through',
    fontWeight: '600',
    fontSize: 14,
  },
  addBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#B84B54',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  addText: {
    fontWeight: '700',
    fontSize: 14,
    color: '#fff',
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 20,
  },
  highlightsContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  highlightsColumn: {
    flex: 1,
    alignItems: 'center',
  },
  verticalDivider: {
    width: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 20,
  },
  highlightLabel: {
    fontSize: 14,
  },
  highlightValue: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
  },
  reviewCard: {
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  reviewerName: {
    fontWeight: '700',
    fontSize: 16,
  },
  reviewerEmail: {
    fontSize: 12,
  },
  reviewText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '400',
  },
});
