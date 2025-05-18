import { useEffect, useState } from "react";
import { Card, Layout } from "antd";
import "../../Styles/HomePage.scss";


const ProductPage = () => {

  return (
    <div className="wrap-container-d">
      <Layout className="wrap-content wrap-content-manager">
        <div className="scrollClass">
          <Card className="card-content-container manager-card-container">
            <div className="body-container">
              Product
            </div>
          </Card>
        </div>
      </Layout>
    </div>
  );
};

export default ProductPage;
