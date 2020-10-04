import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { Title } from "../styles/pages/Home";

interface IProduct {
  id: string;
  title: string;
  price: number;
}

interface HomeProps {
  recommendedTitle: string;
  recommendedProducts: IProduct[];
}

function Home({ recommendedTitle, recommendedProducts }: HomeProps) {
  return (
    <section>
      <Title>{recommendedTitle}</Title>

      <ul>
        {recommendedProducts.map(({ id, title, price }: IProduct) => (
          <li key={id}>
            {title} - {price}
          </li>
        ))}
      </ul>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const res = await fetch("http://localhost:3333/recommended");
  const recommendedProducts = await res.json();

  return {
    props: {
      recommendedTitle: "Based on what you've been seeing...",
      recommendedProducts,
    },
  };
};

export default Home;
