import { useMemo, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

/**
 * Field config = single source of truth for what is editable and how it renders.
 * Add/remove fields here and the UI/state updates automatically.
 * Supported types: text, textarea, url, select, tags (comma separated string <-> string[])
 */
const FIELD_CONFIG = [
  { key: "firstName", label: "First Name", type: "text", required: true },
  { key: "lastName", label: "Last Name", type: "text", required: true },
  { key: "photoUrl", label: "Photo URL", type: "url" },
  {
    key: "gender",
    label: "Gender",
    type: "select",
    options: ["Male", "Female", "Non-binary", "Prefer not to say"],
  },
  {
    key: "experience",
    label: "Experience",
    type: "select",
    options: ["Fresher", "Junior", "Mid", "Senior", "Lead"],
  },
  { key: "about", label: "About", type: "textarea" },
  {
    key: "skills",
    label: "Skills",
    type: "tags",
    placeholder: "Comma separated e.g. React, SQL",
  },
  {
    key: "interests",
    label: "Interests",
    type: "tags",
    placeholder: "Comma separated e.g. AI, Hackathons",
  },
];

// Fields that must NOT be edited
const NON_EDITABLE = new Set(["location", "emailId", "age", "createdAt"]);

function toEditableInitialState(user) {
  // Start from config, pick values from user, convert arrays->comma string for tags inputs
  return FIELD_CONFIG.reduce((acc, f) => {
    const val = user?.[f.key];
    if (f.type === "tags") {
      acc[f.key] = Array.isArray(val) ? val.join(", ") : val || "";
    } else {
      acc[f.key] = val ?? "";
    }
    return acc;
  }, {});
}

function toPayload(formState) {
  // Convert tags inputs back to arrays, keep only config keys (excludes non-editable automatically)
  return FIELD_CONFIG.reduce((acc, f) => {
    const raw = formState[f.key];
    if (f.type === "tags") {
      const arr = String(raw || "")
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);
      acc[f.key] = arr;
    } else {
      acc[f.key] = raw;
    }
    return acc;
  }, {});
}

const Field = ({ config, value, onChange }) => {
  const { key, label, type, options, placeholder, required } = config;

  const common = {
    id: key,
    value: value ?? "",
    onChange: (e) => onChange(key, e.target.value),
    className: "input input-bordered w-full max-w-xs",
    placeholder,
  };

  return (
    <label htmlFor={key} className="form-control w-full max-w-xs my-2">
      <div className="label">
        <span className="label-text">
          {label}
          {required ? " *" : ""}
        </span>
      </div>

      {type === "textarea" ? (
        <textarea
          {...common}
          className="textarea textarea-bordered w-full max-w-xs"
          rows={4}
        />
      ) : type === "select" ? (
        <select
          id={key}
          value={value ?? ""}
          onChange={(e) => onChange(key, e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="">Select…</option>
          {options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...common}
          type={type === "url" ? "url" : "text"}
          inputMode={type === "url" ? undefined : "text"}
        />
      )}

      {type === "tags" && (
        <span className="text-xs text-gray-500 mt-1">
          Tip: separate items with commas
        </span>
      )}
    </label>
  );
};

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(() => toEditableInitialState(user));
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [saving, setSaving] = useState(false);

  // For the live preview card, combine edited fields with the rest of the user object
  const previewUser = useMemo(() => {
    const converted = toPayload(form); // skills/interests back to arrays
    return {
      ...user,
      ...converted,
    };
  }, [form, user]);

  const onChange = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const saveProfile = async () => {
    setError("");
    setSaving(true);
    try {
      const payload = toPayload(form);

      // (Safety) Ensure we do not accidentally send non-editables
      for (const k of NON_EDITABLE) delete payload[k];

      const res = await axios.put(`${BASE_URL}/profile/edit`, payload, {
        withCredentials: true,
      });

      // Update Redux + toast
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      // Best-effort readable error
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong while saving your profile.";
      setError(msg);
      // Optional: console.log full error for dev visibility
      // console.error("EDIT PROFILE ERROR", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="flex w-full h-full px-10">
        <div className="flex justify-center my-10">
          <div className="card bg-base-300 w-[30rem] h-[80%] overflow-y-auto no-scrollbar shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>

              {/* Dynamic fields from config */}
              <div>
                {FIELD_CONFIG.map((cfg) => (
                  <Field
                    key={cfg.key}
                    config={cfg}
                    value={form[cfg.key]}
                    onChange={onChange}
                  />
                ))}
              </div>

              {error ? <p className="text-red-500">{error}</p> : null}

              <div className="card-actions justify-center m-2">
                <button
                  className={`btn btn-primary ${saving ? "btn-disabled" : ""}`}
                  onClick={saveProfile}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Profile"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live preview */}
        <div className="flex items-start justify-center">
          <UserCard user={previewUser} />
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
