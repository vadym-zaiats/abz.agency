import styles from "./post.module.scss";
import { useEffect, useRef, useState } from "react";
import { setToken } from "@/redux/slices/tokenSlice";
import { useDispatch, useSelector } from "react-redux";
import { postCard } from "@/redux/slices/peopleSlice";
import { setPositions } from "@/redux/slices/positionsSlice";

export function Post() {
  const dispatch = useDispatch();
  const [nameIsFocused, setNameIsFocused] = useState(false);
  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [phoneIsFocused, setPhoneIsFocused] = useState(false);

  const handleNameFocus = () => {
    setNameIsFocused(true);
  };
  const handleNameBlur = () => {
    setNameIsFocused(false);
  };
  const handleEmailFocus = () => {
    setEmailIsFocused(true);
  };
  const handleEmailBlur = () => {
    setEmailIsFocused(false);
  };
  const handlePhoneFocus = () => {
    setPhoneIsFocused(true);
  };
  const handlePhoneBlur = () => {
    setPhoneIsFocused(false);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    photo: null,
  });
  const { name, email, phone, role, photo } = formData;
  console.log(name, email, phone, role, photo?.name);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? e.target.files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  const nameFocus = useRef(null);
  const emailFocus = useRef(null);
  const phoneFocus = useRef(null);
  const handleSelectedName = () => {
    nameFocus.current.focus();
  };
  const handleSelectedEmail = () => {
    emailFocus.current.focus();
  };
  const handleSelectedPhone = () => {
    phoneFocus.current.focus();
  };

  useEffect(() => {
    dispatch(postCard());
    dispatch(setPositions());
  }, [dispatch]);

  return (
    <div className={styles[`form`]}>
      <h2 className={styles[`form__title`]}>Working with POST request</h2>
      <form className={styles[`form__body`]} onSubmit={handleSubmit}>
        <div className={`${styles["form__name"]}`}>
          <input
            className={styles[`form__name-input`]}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={name ? null : handleNameBlur}
            onFocus={handleNameFocus}
            ref={nameFocus}
            required
          />
          <label
            onClick={handleSelectedName}
            className={`${styles["form__name-label"]} ${
              nameIsFocused ? styles["input-focused"] : ""
            }`}
          >
            Your name
          </label>
        </div>
        <div className={styles[`form__email`]}>
          <input
            className={styles[`form__email-input`]}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={email ? null : handleEmailBlur}
            onFocus={handleEmailFocus}
            ref={emailFocus}
            required
          />
          <label
            onClick={handleSelectedEmail}
            className={`${styles["form__email-label"]} ${
              emailIsFocused ? styles["input-focused"] : ""
            }`}
          >
            Email
          </label>
        </div>
        <div className={styles[`form__phone`]}>
          <input
            className={styles[`form__phone-input`]}
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={phone ? null : handlePhoneBlur}
            onFocus={handlePhoneFocus}
            ref={phoneFocus}
            required
          />
          <label
            onClick={handleSelectedPhone}
            className={`${styles["form__phone-label"]} ${
              phoneIsFocused ? styles["input-focused"] : ""
            }`}
          >
            Phone
          </label>
        </div>
        <div className={styles[`form__phone-valid`]}>
          +38 (XXX) XXX - XX - XX
        </div>
        <div className={styles[`form__position`]}>
          <p className={styles[`form__position-title`]}>Select your position</p>
          <div className={styles[`form__frontend`]}>
            <input
              className={styles[`form__frontend-input`]}
              id="form__frontend-input"
              type="radio"
              name="role"
              value="frontend"
              onChange={handleChange}
              checked={formData.role === "frontend"}
            />
            <label
              className={styles[`form__frontend-label`]}
              htmlFor="form__frontend-input"
            >
              Frontend developer
            </label>
          </div>
          <div className={styles[`form__backend`]}>
            <input
              className={styles[`form__backend-input`]}
              id="form__backend-input"
              type="radio"
              name="role"
              value="backend"
              onChange={handleChange}
              checked={formData.role === "backend"}
            />
            <label
              className={styles[`form__backend-label`]}
              htmlFor="form__backend-input"
            >
              Backend developer
            </label>
          </div>
          <div className={styles[`form__designer`]}>
            <input
              className={styles[`form__designer-input`]}
              id="form__designer-input"
              type="radio"
              name="role"
              value="designer"
              onChange={handleChange}
              checked={formData.role === "designer"}
            />
            <label
              className={styles[`form__designer-label`]}
              htmlFor="form__designer-input"
            >
              Designer
            </label>
          </div>
          <div className={styles[`form__qa`]}>
            <input
              className={styles[`form__qa-input`]}
              id="form__qa-input"
              type="radio"
              name="role"
              value="qa"
              onChange={handleChange}
              checked={formData.role === "qa"}
            />
            <label
              className={styles[`form__qa-label`]}
              htmlFor="form__qa-input"
            >
              QA
            </label>
          </div>
        </div>
        <div className={styles[`form__upload`]}>
          <input
            className={styles[`form__upload-input`]}
            id="form__upload-input"
            type="file"
            name="photo"
            onChange={handleChange}
            accept="image/*"
          />
          <label
            className={styles[`form__upload-label`]}
            htmlFor="form__upload-input"
          >
            Upload
          </label>
          <p className={styles[`form__upload-file-name`]}>
            {photo ? `${photo.name}` : "Upload your photo"}
          </p>
        </div>
        <button
          onClick={() => {
            dispatch(setToken());
          }}
          className={styles[`form__button`]}
          type="submit"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
