import ProductItem from './ProductItem';
import classes from './Products.module.css';

const dummy_Products = [
  {
    id: 'p1',
    price: 6,
    description: 'Hakka noodles-spicy hut!',
    title: 'Chowmin',
  },
  {
    id: 'p2',
    price: 5,
    description: 'Sugar free-calory!',
    title: 'Donuts',
  },
  {
    id: 'p3',
    price: 4,
    description: 'Double beaf-sausages!',
    title: 'HamBurger',
  },
  {
    id: 'p4',
    price: 3,
    description: 'Double topping cheesy-spicy!',
    title: 'FarmHouse-Pizza',
  }
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {dummy_Products.map((products) =>
          <ProductItem
            id={products.id}
            key={products.id}
            title={products.title}
            price={products.price}
            description={products.description}
          />)}

      </ul>
    </section>
  );
};

export default Products;
