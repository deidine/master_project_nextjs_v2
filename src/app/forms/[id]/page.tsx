"use client";
import Designer from "@/components/designer/Designer";
import useGeneral from "@/hooks/useGeneral";
import { useEffect, useState } from "react";

export default function FormDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const [form, setForm] = useState<Form >( );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
const {isQuestUser} = useGeneral();
  useEffect(() => {
    fetchForm();
  }, []);

  const fetchForm = async () => {
    if (!isQuestUser) {
      try {
        const response = await fetch(`/api/forms/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setForm(data.form);
      } catch (error) {
        console.error("Error fetching form:", error);
        setError("Error fetching form data");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const forms = JSON.parse(localStorage.getItem("forms") || "[]");
        const form = forms.find((form: Form) => form.id === parseInt(id));
        if (form) {
          setForm(form);
        } else {
          setError("Form not found");
        }
      } catch (error) {
        console.error("Error fetching form from local storage:", error);
        setError("Error fetching form data");
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!form) {
    return <div>Form not found</div>;
  }

  return (
    <>
      
      <Designer form={form} />
    </>
  );
}
