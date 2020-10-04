import { GetStaticProps } from "next";
import { Title } from "../styles/pages/Home";

interface IProduct {
  id: string;
  title: string;
  price: number;
}

interface Top10Props {
  sectionTitle: string;
  products: IProduct[];
}

function Top10({ sectionTitle, products }: Top10Props) {
  return (
    <section>
      <Title>{sectionTitle}</Title>

      <ul>
        {products.map(({ id, title, price }: IProduct) => (
          <li key={id}>
            {title} - {price}
          </li>
        ))}
      </ul>
    </section>
  );
}

export const getStaticProps: GetStaticProps<Top10Props> = async () => {
  const res = await fetch("http://localhost:3333/top");
  const products = await res.json();

  return {
    props: {
      sectionTitle: "TOP 10",
      products,
    },
    revalidate: 10,
  };
};

export default Top10;
