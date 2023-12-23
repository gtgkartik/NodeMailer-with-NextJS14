"use client";
import { useState } from "react";

export default function Home() {

  const sendContactForm = async (values) =>
  fetch("/api/email", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const [inputvalues, setInputValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setloading] = useState(false);

  const handlesubmit = async(event) => {
    event.preventDefault();
    try {
      setloading(true)
      console.log(inputvalues);
      const response = await sendContactForm(inputvalues);
      // setShowSuccessMessage(true);
      setloading(false)
    } catch (error) {
      setloading(false)
      console.error("Error sending form");
      // Handle error (e.g., show an error message)
    }
  };
  return (
    <>
      <div class="flex items-center justify-center p-12">
        <div class="mx-auto w-full max-w-[550px]">
          <form onSubmit={handlesubmit}>
            <div class="mb-5">
              <label
                for="name"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Full Name
              </label>
              <input
                onChange={handleChange}
                value={inputvalues.name}
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div class="mb-5">
              <label
                for="email"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Email Address
              </label>
              <input
                onChange={handleChange}
                value={inputvalues.email}
                type="email"
                name="email"
                id="email"
                placeholder="example@domain.com"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div class="mb-5">
              <label
                for="message"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Message
              </label>
              <textarea
                onChange={handleChange}
                value={inputvalues.message}
                rows="4"
                name="message"
                id="message"
                placeholder="Type your message"
                class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              ></textarea>
            </div>
            <div>
              <button disabled={loading} class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-2">
                {`${loading ? "Submiting..." : "Submit"}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
