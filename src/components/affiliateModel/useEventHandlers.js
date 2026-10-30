import { useState } from "react";
import { endpoint } from "../../../endpoint/endpoint";

const useEventHandlers = ({ handleClose, id, reset }) => {
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [affiliateData, setAffiliateData] = useState({});
  const submit = async (data, updateData) => {
    try {
      console.log("data", data, "updatedData", updateData);

      const formData = new FormData();

      setLoading(true);
      let res;
      if (typeof data === "object" && data.title) {
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("link", data.link);
        formData.append("image", file);
        res = await fetch(`${endpoint}/api/addAffiliate`, {
          method: "POST",
          body: formData,
        });
      } else {
        res = await fetch(`${endpoint}/api/updateAffiliate/${data}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: updateData.title,
            description: updateData.description,
            link: updateData.link,
          }),
        });
      }

      const result = await res.json();
      if (result.error) {
        setError(result.error);
        return;
      }
      handleClose();
      setError("");
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
  const fetchAffiliateDataById = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${endpoint}/api/getAffiliateById/${id}`);
      const myData = await response.json();
      setAffiliateData(myData);
      reset({
        title: myData.title || "",
        description: myData.description || "",
        link: myData.link || "",
      });
    } catch (error) {
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

  const resetHandler = () => {
    reset({
      title: affiliateData.title || "",
      description: affiliateData.description || "",
      link: affiliateData.link || "",
    });
  };
  return {
    error,
    fetchAffiliateDataById,
    file,
    fileHandler,
    loading,
    resetHandler,
    submit,
  };
};

export default useEventHandlers;
