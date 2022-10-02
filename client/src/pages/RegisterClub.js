import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
const initialStateClub = {
  name: "",
  email: "androidclub@vit.ac.in",
  password: "123456",
  isMember: true,
};

const RegisterClub = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialStateClub);
  const { club, isLoading, showAlert, displayAlert, setupClub } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentClub = { name, email, password };
    if (isMember) {
      setupClub({
        currentClub,
        endPoint: "loginClub",
        alertText: "Login Successful! Redirecting...",
      });
    } else {
      setupClub({
        currentClub,
        endPoint: "registerClub",
        alertText: "Club Created! Redirecting...",
      });
    }
  };

  useEffect(() => {
    if (club) {
      setTimeout(() => {
        navigate("/club");
      }, 3000);
    }
  }, [club, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login as a Club" : "Register Your Club"}</h3>
        {showAlert && <Alert />}
        {/* name input */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default RegisterClub;
