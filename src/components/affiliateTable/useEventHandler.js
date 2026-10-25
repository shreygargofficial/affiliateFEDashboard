import { useState } from "react";
import { endpoint } from "../../../endpoint/endpoint";

const useEventhandler = () => {
  const [affiliateData, setAffiliateData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchAffiliateData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${endpoint}/api/getAffiliates`);
      const data = await response.json();
      setAffiliateData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${endpoint}/api/deleteAffiliate/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setAffiliateData(
          affiliateData.filter((item) => item.affiliateId !== id),
        );
      } else {
        console.error("Error deleting affiliate:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting affiliate:", error);
    } finally {
      setLoading(false);
    }
  };

  const addClickHandler = () => {
    // Implement the logic to handle the add button click
    setDialogOpen(true);
  };
  const handleUpdate = async (id) => {
    try {
      setLoading(true);
    } catch (error) {
      console.error("Error updating affiliate:", error);
    } finally {
      setLoading(false);
    }

    // Implement the update logic here
  };
  return {
    addClickHandler,
    affiliateData,
    dialogOpen,
    fetchAffiliateData,
    handleDelete,
    handleUpdate,
    loading,
    setDialogOpen,
  };
};

export default useEventhandler;
