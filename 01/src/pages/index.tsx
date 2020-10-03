import { useState, useEffect } from "react";
import { Title } from "../styles/pages/Home";

interface IProduct {
  id: string;
  title: string;
  price: number;
}

function Home() {
  const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>(
    []
  );

  useEffect(() => {
    const componentDidMount = async () => {
      const res = await fetch("http://localhost:3333/recommended");
      const data = await res.json();
      setRecommendedProducts(data);
    };

    componentDidMount();
  }, []);

  return (
    <div>
      <section>
        <Title>Based on what you've been seeing...</Title>

        <ul>
          {recommendedProducts.map(({ id, title, price }: IProduct) => (
            <li key={id}>
              {title} - {price}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Home;
