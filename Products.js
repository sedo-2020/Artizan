import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const { addToCart } = useCart();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
        filtered.sort((a, b) => b.featured - a.featured);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, sortBy]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`تم إضافة ${product.name} إلى السلة!`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="products" className="products" ref={ref}>
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          مجموعة منتجاتنا الفاخرة
        </motion.h2>

        {/* Search and Filter Controls */}
        <motion.div
          className="products-controls"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Search Bar */}
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Sort Options */}
          <div className="sort-controls">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="featured">الأكثر تميزاً</option>
              <option value="price-low">السعر: من الأقل للأعلى</option>
              <option value="price-high">السعر: من الأعلى للأقل</option>
              <option value="rating">الأعلى تقييماً</option>
            </select>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          className="categories"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className={category.icon}></i>
              <span>{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${searchTerm}-${sortBy}`}
            className="products-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="product-card"
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  layout
                >
                  <Link to={`/product/${product.id}`} className="product-link">
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                      {product.featured && (
                        <div className="featured-badge">
                          <i className="fas fa-star"></i>
                          مميز
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="product-info">
                    <Link to={`/product/${product.id}`}>
                      <h3>{product.name}</h3>
                    </Link>
                    <p>{product.description}</p>
                    
                    <div className="product-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
                          ></i>
                        ))}
                      </div>
                      <span className="rating-text">({product.reviews} تقييم)</span>
                    </div>

                    <div className="product-price">{product.price} ريال</div>
                    
                    <motion.button
                      className="add-to-cart"
                      onClick={() => handleAddToCart(product)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={!product.inStock}
                    >
                      {product.inStock ? (
                        <>
                          <i className="fas fa-shopping-cart"></i>
                          أضف للسلة
                        </>
                      ) : (
                        'غير متوفر'
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="no-products"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <i className="fas fa-search"></i>
                <h3>لا توجد منتجات</h3>
                <p>جرب تغيير الفلتر أو البحث عن شيء آخر</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Products Count */}
        <motion.div
          className="products-count"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p>عرض {filteredProducts.length} من {products.length} منتج</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Products; 