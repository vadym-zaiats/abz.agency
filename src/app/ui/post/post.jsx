import styles from "./post.module.scss";
import { useEffect, useRef, useState } from "react";
import { setToken } from "@/redux/slices/tokenSlice";
import { useDispatch, useSelector } from "react-redux";
import { setPositions } from "@/redux/slices/positionsSlice";
import { postCard } from "@/redux/slices/peopleSlice";

export function Post() {
  const dispatch = useDispatch();
  const [nameIsFocused, setNameIsFocused] = useState(false);
  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [phoneIsFocused, setPhoneIsFocused] = useState(false);
  const positions = useSelector((state) => state.positions.positions);

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
    position: "",
    photo: null,
  });
  const { name, email, phone, position, photo } = formData;
  console.log(name, email, phone, position, photo?.name);

  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    photo: "",
  });

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+38 \(\d{3}\) \d{3} - \d{2} - \d{2}$/;

    let errors = {};

    if (name.length < 2 || name.length > 60) {
      errors.name = "Name must be between 2 and 60 characters";
    }

    if (!emailRegex.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!phoneRegex.test(phone)) {
      errors.phone = "Invalid Ukrainian phone format";
    }

    if (!position) {
      errors.position = "Please select a position";
    }

    if (photo) {
      const allowedFormats = ["jpg", "jpeg"];
      const maxFileSize = 5 * 1024 * 1024; // 5 MB

      const fileExtension = photo.name.split(".").pop().toLowerCase();
      if (!allowedFormats.includes(fileExtension)) {
        errors.photo = "Invalid photo format. Please use jpg/jpeg.";
      }

      if (photo.size > maxFileSize) {
        errors.photo = "Photo size exceeds the maximum limit of 5 MB.";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? e.target.files[0] : value,
    }));

    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form data submitted:", formData);
    } else {
      console.log("Form has validation errors");
    }
  };

  useEffect(() => {
    dispatch(setPositions());
  }, [dispatch]);

  return (
    <div className={styles[`form`]}>
      <h2 className={styles[`form__title`]}>Working with POST request</h2>
      <form className={styles[`form__body`]} onSubmit={handleSubmit}>
        <div
          className={`${styles["form__name"]} ${
            validationErrors.name && styles["data__invalid"]
          }`}
        >
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
          />
          <label
            onClick={handleSelectedName}
            className={`${styles["form__name-label"]} ${
              nameIsFocused && styles["input-focused"]
            } ${validationErrors.name && styles["data__invalid"]}`}
          >
            Your name
          </label>
        </div>
        <div
          className={`${styles["form__email"]} ${
            validationErrors.email && styles["data__invalid"]
          }`}
        >
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
          />
          <label
            onClick={handleSelectedEmail}
            className={`${styles["form__email-label"]} ${
              emailIsFocused && styles["input-focused"]
            } ${validationErrors.email && styles["data__invalid"]}`}
          >
            Email
          </label>
        </div>
        {/* <div
          className={`${styles["form__validation"]} ${
            validationErrors.email && styles["data__invalid"]
          }`}
        >
          {validationErrors.email && `${validationErrors.email}`}
        </div> */}
        <div
          className={`${styles["form__phone"]} ${
            validationErrors.phone && styles["data__invalid"]
          }`}
        >
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
              phoneIsFocused && styles["input-focused"]
            } ${validationErrors.phone && styles["data__invalid"]}`}
          >
            Phone
          </label>
        </div>
        <div
          className={`${styles["form__validation"]} ${
            validationErrors.phone && styles["data__invalid"]
          }`}
        >
          {validationErrors.phone
            ? `${validationErrors.phone}`
            : "+38 (XXX) XXX - XX - XX"}
        </div>
        <div className={styles[`form__position`]}>
          <p className={styles[`form__position-title`]}>Select your position</p>
          <div className={styles[`form__frontend`]}>
            <input
              className={styles[`form__frontend-input`]}
              id="form__frontend-input"
              type="radio"
              name="position"
              value="frontend"
              onChange={handleChange}
              checked={formData.position === "frontend"}
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
              name="position"
              value="backend"
              onChange={handleChange}
              checked={formData.position === "backend"}
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
              name="position"
              value="designer"
              onChange={handleChange}
              checked={formData.position === "designer"}
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
              name="position"
              value="qa"
              onChange={handleChange}
              checked={formData.position === "qa"}
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
        {/* <div className={styles[`form__error`]}>
          {validationErrors.position && <p>{validationErrors.position}</p>}
          {validationErrors.photo && <p>{validationErrors.photo}</p>}
        </div> */}
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
