import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProConfigProvider, ProFormText, ProFormCheckbox } from "@ant-design/pro-components";
import Link from "antd/es/typography/Link";
import { Tabs, theme, message, Modal, Input, Spin } from "antd";
import { useState, useEffect } from "react";
import GoogleButton from "react-google-signin-button";
import "react-google-signin-button/dist/button.css";
import "../../Styles/Login.scss";
import { getSid, saveSid } from "../../utils/auth";
import { apiPost } from "../../utils/api";
import routes from "../../configs/routesPath";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const VITE_SESSION_TEST = import.meta.env.VITE_SESSION_TEST;

const LoginPage = () => {
  const items = [
    { key: "signIn", label: "SignIn" },
    { key: "signUp", label: "SignUp" }
  ];
  const LoginType = { SIGNIN: items[0].key, SIGNUP: items[1].key };

  const [loginType, setLoginType] = useState(LoginType.SIGNIN);
  const [loading, setLoading] = useState(false);
  const [factorOpen, setFactorOpen] = useState(false);
  const [inputs, setInputs] = useState({});
  const [otpI, setOtpI] = useState("");
  const { token } = theme.useToken();
  const [messageApi, contextHolder] = message.useMessage();
  const [loadUrl, setLoadUrl] = useState(false);
  const [autocomplete, setAutocomplete] = useState(window.localStorage.autoLogin == "true" ? true : false);

  useEffect(() => {
    if (getSid()) {
      var urlTo = "";
      if (document.referrer.length < 1 || window.location.href) {
        urlTo = routes.base_url;
      }
      window.location.replace(urlTo);
      return;
    }
  }, [loadUrl]);

  useEffect(() => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      if (input.id == "email" || input.id == "password") {
        input.setAttribute("autocomplete", autocomplete ? input.id : "off");
        // if (!autocomplete) {
        //   input.setAttribute("readonly", "");
        //   input.setAttribute("onclick", "this.removeAttribute('readOnly')");
        // } else {
        //   input.removeAttribute("readOnly");
        // }
      }
    });
  }, [autocomplete]);

  const handleSubmit = async (values) => {

    // chức năng test session
    if(VITE_SESSION_TEST=="1"){
      saveSid("VITE_SESSION_TEST");
      setLoadUrl(!loadUrl);
      return;
    }

    setInputs(values);
    setLoading(true);
    try {
      const login = await apiPost("/auth/signin", values);
      if (login.data?.status_google_2FA) {
        setFactorOpen(true);
      } else {
        saveSid(login?.data?.session_id);
        setLoadUrl(!loadUrl);
      }
    } catch (error) {
      messageApi.error(error);
    }
    setLoading(false);
  };

  const ButtonGoogleLogin = () => {
    const useLogin = useGoogleLogin({
      flow: "auth-code",
      onSuccess: async (codeResponse) => {
        setLoading(true);
        try {
          const login = await apiPost("/auth/google", {
            code: codeResponse.code,
            redirect_uri: window.location.origin
          });
          if (login.data?.status_google_2FA) {
            setInputs({ email: login.data.email });
            setFactorOpen(true);
          } else {
            saveSid(login?.data?.session_id);
            setLoadUrl(!loadUrl);
          }
        } catch (error) {
          messageApi.error(error);
        }
        setLoading(false);
      },
      onError: (errorResponse) => messageApi.error(errorResponse)
    });
    return (
      <GoogleButton
        style={{ borderRadius: 10, marginTop: 20 }}
        label={loginType === LoginType.SIGNIN ? "SignIn with Google" : "SignUp with Google"}
        onClick={useLogin}
      />
    );
  };

  return (
    <>
      {contextHolder}
      <ProConfigProvider hashed={false}>
        <div className="login-content">
          <div className="login-form-nef">
            <Spin spinning={loading}>
              <LoginForm
                logo={"images/logo-devbeta.svg"}
                onFinish={handleSubmit}
                submitter={
                  loginType === LoginType.SIGNIN
                    ? {
                        searchConfig: {
                          submitText: "Login"
                        }
                      }
                    : {
                        submitButtonProps: {
                          style: { display: "none" }
                        }
                      }
                }
                actions={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column"
                    }}
                  >
                    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                      <ButtonGoogleLogin />
                    </GoogleOAuthProvider>
                  </div>
                }
              >
                <Tabs centered activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey)} items={items} />

                {loginType === LoginType.SIGNIN && (
                  <>
                    <ProFormText
                      autocomplete={autocomplete ? "email" : "off"}
                      name="email"
                      fieldProps={{
                        size: "large",
                        prefix: (
                          <UserOutlined
                            style={{
                              color: token.colorText
                            }}
                            className={"prefixIcon"}
                          />
                        )
                      }}
                      placeholder={"Email: yourname@gmai.com"}
                      rules={[
                        {
                          required: true,
                          message: "Email cannot be empty!"
                        }
                      ]}
                    />
                    <ProFormText.Password
                      autocomplete={autocomplete ? "password" : "off"}
                      name="password"
                      fieldProps={{
                        size: "large",
                        prefix: (
                          <LockOutlined
                            style={{
                              color: token.colorText
                            }}
                            className={"prefixIcon"}
                          />
                        )
                      }}
                      placeholder={"Password: ********"}
                      rules={[
                        {
                          required: true,
                          message: "Password cannot be blank!"
                        }
                      ]}
                    />
                    <div
                      style={{
                        marginBlockStart: 10,
                        marginBlockEnd: 24
                      }}
                    >
                      <ProFormCheckbox
                        noStyle
                        initialValue={autocomplete}
                        name="autoLogin"
                        onChange={(e) => {
                          setAutocomplete(e.target.checked);
                          window.localStorage.setItem("autoLogin", e.target.checked);
                        }}
                      >
                        Remember password
                      </ProFormCheckbox>
                      <Link
                        to={""}
                        className="forgot-password"
                        style={{ float: "right" }}
                        onClick={(e) => {
                          messageApi.info("Please contact admin for support");
                        }}
                      >
                        Forgot Password
                      </Link>
                    </div>
                  </>
                )}
              </LoginForm>
            </Spin>
          </div>
          <Modal
            title="2-factor authentication"
            centered
            open={factorOpen}
            onOk={async () => {
              if (otpI.length != 6) {
                messageApi.error("Please enter 6 characters");
              } else {
                setLoading(true);
                try {
                  const respOtp = await apiPost("/auth/signinp-verify-otp", {
                    email: inputs.email,
                    otp: otpI
                  });
                  saveSid(respOtp?.data?.session_id);
                  setLoadUrl(!loadUrl);
                } catch (error) {
                  messageApi.error(error);
                }
                setFactorOpen(false);
                setLoading(false);
              }
            }}
            onCancel={() => setFactorOpen(false)}
            width={250}
            okText="Yes"
            cancelText="Cancel"
          >
            <Input
              name={"input_authentication"}
              placeholder={"Please enter the code..."}
              value={otpI}
              maxLength={6}
              allowClear={true}
              onChange={(e) => setOtpI(e.target.value)}
            />
          </Modal>
        </div>
      </ProConfigProvider>
    </>
  );
};

export default LoginPage;
