import styles from "./post.module.scss";
import { useState } from "react";

export function Post() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    photo: null,
  });

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

  return (
    <div className={styles[`form`]}>
      <h2 className={styles[`form__title`]}>Working with POST request</h2>
      <form className={styles[`form__body`]} onSubmit={handleSubmit}>
        <div className={styles[`form__name`]}>
          <input
            className={styles[`form__name-input`]}
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles[`form__email`]}>
          <input
            className={styles[`form__email-input`]}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles[`form__phone`]}>
          <input
            className={styles[`form__phone-input`]}
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
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
              for="form__frontend-input"
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
              for="form__backend-input"
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
              for="form__designer-input"
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
            <label className={styles[`form__qa-label`]} for="form__qa-input">
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
            for="form__upload-input"
          >
            Upload
          </label>
          <p className={styles[`form__upload-file-name`]}>Upload your photo</p>
        </div>
        <button className={styles[`form__button`]} type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
}
