import { useState } from "react";
import { endpoint } from "../../../endpoint/endpoint";

const useEventHandlers = ({ handleClose }) => {
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const submit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("link", data.link);
      formData.append("image", file);

      setLoading(true);
      let res = await fetch(`${endpoint}/api/addAffiliate`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (result.error) {
        setError(result.error);
        return;
      }
      handleClose();
      setError("");
      console.log("result", result);
    } catch (error) {
      console.log("error", error);
      if (error.response) {
        console.log("error.response", error.response.data.error);
      } else {
        console.log("error.message", error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  const fileHandler = (event) => {
    const file = event.target.files?.[0];
    if (!file) setFile(null);
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      event.target.value = "";
      return;
    }
    setFile(file);
    console.log("file", data.target.files[0]);
  };
  return { error, file, fileHandler, loading, submit };
};

export default useEventHandlers;
