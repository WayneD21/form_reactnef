import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import routes from "../../configs/routesPath";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="500"
      title="500"
      subTitle="something went wrong"
      extra={
        <Button type="primary" onClick={() => navigate(routes.base_url)}>
          Go Home
        </Button>
      }
    />
  );
};

export default ErrorPage;
