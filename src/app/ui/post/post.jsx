import styles from "./post.module.scss";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postCard } from "@/redux/slices/peopleSlice";
import { setPositions } from "@/redux/slices/positionsSlice";
import { Preloader } from "../preloader/preloader";

export function Post() {
  const dispatch = useDispatch();
  const [nameIsFocused, setNameIsFocused] = useState(false);
  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [phoneIsFocused, setPhoneIsFocused] = useState(false);
  const positions = useSelector((state) => state.positions.positions);
  const isLoading = useSelector((state) => state.positions.isLoading);
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
    position_id: "",
    photo: null,
  });
  const { name, email, phone, position_id, photo } = formData;

  const [validationErrors, setValidationErrors] = useState({
    name: null,
    email: null,
    phone: null,
    position_id: null,
    photo: null,
  });
  const validateForm = () => {
    const emailRegex =
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    const phoneRegex = /^[\+]{0,1}380([0-9]{9})$/;
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

    if (!position_id) {
      errors.position_id = "Please select a position";
    }

    if (!photo) {
      errors.photo = "Photo is required";
    } else {
      const allowedFormats = ["jpg", "jpeg"];
      const maxFileSize = 5 * 1024 * 1024;

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
    const { name, value, type, id } = e.target;
    console.log(formData);
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "file" ? e.target.files[0] : type === "radio" ? +id : value,
    }));

    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  };
  const isFormFilled = () => {
    const isFormValid =
      name.length > 0 &&
      email.length > 0 &&
      phone.length > 0 &&
      position_id !== "" &&
      photo !== null;
    return isFormValid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(postCard(formData));
    } else {
      console.log("Form has validation errors");
    }
  };
  useEffect(() => {
    isFormFilled();
    dispatch(setPositions());
  }, []);

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
          className={`${styles["form__validation"]} ${
            validationErrors.name && styles["data__invalid"]
          }`}
        >
          {validationErrors.name && `${validationErrors.name}`}
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
        <div
          className={`${styles["form__validation"]} ${
            validationErrors.email && styles["data__invalid"]
          }`}
        >
          {validationErrors.email && `${validationErrors.email}`}
        </div>
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
        <div className={styles[`form__positions`]}>
          <p className={styles[`form__positions-title`]}>
            Select your position
          </p>
          <div className={styles[`form__positions-wrapper`]}>
            {isLoading && <Preloader />}
            {positions.map(({ id, name }) => {
              return (
                <div key={id} className={styles[`form__position-type`]}>
                  <input
                    className={styles[`form__position-input`]}
                    id={id}
                    type="radio"
                    name="position_id"
                    value={name}
                    onChange={handleChange}
                    checked={formData.position_id === +id}
                  />
                  <label
                    className={styles[`form__position-label`]}
                    htmlFor={id}
                  >
                    {name}
                  </label>
                </div>
              );
            })}
          </div>
          <div
            className={`${styles["form__validation"]} ${
              validationErrors.position_id && styles["data__invalid"]
            }`}
          >
            {validationErrors.position_id && `${validationErrors.position_id}`}
          </div>
        </div>
        <div
          className={`${styles["form__upload"]} ${
            validationErrors.photo && styles["data__invalid"]
          }`}
        >
          <input
            className={styles[`form__upload-input`]}
            id="form__upload-input"
            type="file"
            name="photo"
            onChange={handleChange}
            accept="image/*"
          />
          <label
            className={`${styles["form__upload-label"]} ${
              validationErrors.photo && styles["data__invalid"]
            }`}
            htmlFor="form__upload-input"
          >
            Upload
          </label>
          <p className={styles[`form__upload-file-name`]}>
            {photo ? `${photo.name}` : "Upload your photo"}
          </p>
        </div>
        <div
          className={`${styles["form__validation"]} ${
            validationErrors.photo && styles["data__invalid"]
          }`}
        >
          {validationErrors.photo && `${validationErrors.photo}`}
        </div>
        <button
          className={`${styles["form__button"]} ${
            isFormFilled() && styles["enabled"]
          }`}
          type="submit"
          disabled={!isFormFilled()}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
