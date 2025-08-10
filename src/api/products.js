import axios from 'axios';

const BASE = 'https://dummyjson.com';

export const fetchProducts = async () => {
  try {
    const res = await axios.get(`${BASE}/products?limit=100`);
    const keywords = ['lipstick','mascara','perfume','foundation','cream','serum','cosmetic','nail','brush','fragrance','soap','shampoo','conditioner','gel'];
    const filtered = res.data.products.filter(p => {
      const title = p.title.toLowerCase();
      const desc = p.description.toLowerCase();
      return keywords.some(k => title.includes(k) || desc.includes(k));
    });
    
    return filtered.length ? filtered : res.data.products;
  } catch (err) {
    console.warn('Products fetch error', err);
    throw err;
  }
};
