import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import routes from "../../configs/routesPath";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Oops! The page you're looking for doesn't exist."
      extra={
        <Button type="primary" onClick={() => navigate(routes.base_url)}>
          Go Home
        </Button>
      }
    />
  );
};

export default NotFoundPage;
