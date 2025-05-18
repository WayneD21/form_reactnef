import { useEffect, useState } from "react";
import { Card, Layout } from "antd";
import "../../Styles/HomePage.scss";
import InputNormal from "../../Components/InputComps/InputNormal";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { Button, Checkbox, Form, Input } from "antd";
import Login from "./login";
import useRequestsStore from "../../store/useRequests";
import { apiGet } from "../../utils/api";

const HomePage = () => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     from1.setFieldsValue({
  //       username: "1",
  //       password: "2"
  //     });

  //     // setData({
  //     //   username: "1",
  //     //   password: "2"
  //     // });
  //     console.log("data");
  //   }, 2000);
  // }, []);

  // const [data, setData] = useState({
  //   username: "dfdfggf",
  //   password: "3242344"
  // });

  const [from1] = Form.useForm();

  const { response, onloadApi, open, loading, error, callRequests, setError, setOpen } = useRequestsStore();

  useEffect(() => {
    callRequests("get_user", "GET", "/user");
  }, []);

  useEffect(() => {
    console.log("error", error);
    Object.keys(error).forEach((key) => {
      if (error[key] !== null) {
        console.log("error", error[key]);
        setError({ get_user: null });
      }
    });
  }, [error]);

  useEffect(() => {
    console.log("response", response);
  }, [response]);

  // setOpen({ add: true });

  return (
    <div className="wrap-container-d">
      <Layout className="wrap-content wrap-content-manager">
        <div className="scrollClass">
          <Card className="card-content-container manager-card-container">
            {/* home */}
            {/* {data.username} --- {data.password} */}
            {response.get_user}
            open={open.add}
            <div className="body-container">
              <Login
                usefrom={from1}
                onFinish={(e) => {
                  console.log(e);
                }}
              />
              {/* <button
                onClick={() => {
                  from1.setFieldsValue({
                    username: "aaaa",
                    password: "bbbb"
                  });
                }}
              >
                set 1
              </button>

              <button
                onClick={() => {
                  from1.setFieldsValue({
                    username: "345345",
                    password: "345fdgfgh"
                  });
                }}
              >
                set 2
              </button> */}

              {/* test  Components input*/}
              {/* <InputNormal
                formItem={{
                  label: "nhập văn bản"
                }}
                input={{
                  onChange: (e) => {
                    const value = e.target.value;
                    console.log(value);
                  }
                }}
                footer={{
                  text: "nhập đúng thì ok"
                }}
                fortaweSomeIcon={{
                  icon: faRandom,
                  onClick: () => {       <div>
                    <Input value={data.username} />
                  </div>
                    console.log("icon");
                  }
                }}
              /> */}
            </div>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit" onClick={from1.submit}>
                Submit
              </Button>
            </Form.Item>
          </Card>
        </div>
      </Layout>
    </div>
  );
};

export default HomePage;

// const styles ={
//   wrap_container_d:{
//     overflow: "hidden",
//     height: "100dvh",
//     paddingBottom: 100,
//   }
// }
