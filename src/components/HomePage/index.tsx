import * as React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import {
  Button,
  Carousel,
  Loader,
  ProductListItem,
  ProductsFeatured
} from "..";
import { ProductsList } from "../../core/types/saleor";
import { generateCategoryUrl, maybe } from "../../core/utils";
import { Error } from "../Error";
import { GET_PRODUCTS_AND_CATEGORIES } from "./queries";

import "./scss/index.scss";

const canDisplay = (data: ProductsList) =>
  maybe(() => !!data.shop.homepageCollection && !!data.categories.edges, false);

const HomePage: React.SFC = () => (
  <div className="home-page">
    <Query
      query={GET_PRODUCTS_AND_CATEGORIES}
      fetchPolicy="cache-and-network"
      errorPolicy="all"
    >
      {({ error, data, loading }) => {
        if (canDisplay(data)) {
          const { backgroundImage } = data.shop.homepageCollection;

          return (
            <>
              <div
                className="home-page__hero"
                style={
                  backgroundImage
                    ? { backgroundImage: `url(${backgroundImage.url})` }
                    : null
                }
              >
                <div className="home-page__hero-text">
                  <div>
                    <span className="home-page__hero__title">
                      <h1>Final reduction</h1>
                    </span>
                  </div>
                  <div>
                    <span className="home-page__hero__title">
                      <h1>Up to 70% off sale</h1>
                    </span>
                  </div>
                </div>
                <div className="home-page__hero-action">
                  {loading && !data ? (
                    <Loader />
                  ) : (
                    <Link
                      to={generateCategoryUrl(
                        data.categories.edges[0].node.id,
                        data.categories.edges[0].node.name
                      )}
                    >
                      <Button>Shop sale</Button>
                    </Link>
                  )}
                </div>
              </div>
              <ProductsFeatured />
              <div className="home-page__categories">
                <div className="container">
                  <h3>Shop by category</h3>
                  <div className="home-page__categories__list">
                    {data.categories.edges.map(({ node: category }) => (
                      <div key={category.id}>
                        <Link
                          to={generateCategoryUrl(category.id, category.name)}
                          key={category.id}
                        >
                          <div
                            className="home-page__categories__list__image"
                            style={{
                              backgroundImage: `url(${
                                category.backgroundImage
                                  ? category.backgroundImage.url
                                  : require("../../images/nophoto.png")
                              })`
                            }}
                          />
                          <h3>{category.name}</h3>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          );
        }
        if (error && !data) {
          return <Error error={error.message} />;
        }
        return <Loader full />;
      }}
    </Query>
  </div>
);

export default HomePage;
