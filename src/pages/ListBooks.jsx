import React from "react";
import { useForm } from "react-hook-form";
import { useFirebase } from "../context/Firebase";

const ListBooks = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const { createNewListing } = useFirebase();

  const onSubmit = async (data) => {
    await createNewListing(data.name, data.price, data.isbn, data.coverImg[0]);
    reset();
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[60%] flex flex-col p-4 gap-2 border-2 border-gray-200 rounded-lg shadow-md"
      >
        <h1 className="text-3xl font-semibold text-center mb-5">
          Enter Book Details
        </h1>
        <input
          className="p-2 outline-0 border-2 border-gray-200 rounded"
          placeholder="Name"
          {...register("name", {
            required: "Name is required",
            minLength: { value: 3, message: "Name should be larger than 3" },
            maxLength: { value: 20, message: "Name should be smaller than 20" },
          })}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
        <input
          className="p-2 outline-0 border-2 border-gray-200 rounded"
          placeholder="Price in Rupees"
          type="number"
          {...register("price", {
            required: "Price is required",
            min: { value: 50, message: "minimum price is Rs 50" },
          })}
        />
        {errors.price && (
          <p className="text-sm text-red-500">{errors.price.message}</p>
        )}
        <input
          className="p-2 outline-0 border-2 border-gray-200 rounded"
          placeholder="ISBN number"
          type="number"
          {...register("isbn", {
            required: "ISBN is required",
            pattern: {
              value: /^\d{13}$/,
              message: "must be exactly 13 digits",
            },
          })}
        />
        {errors.isbn && (
          <p className="text-sm text-red-500">{errors.isbn.message}</p>
        )}
        <label className="flex items-center gap-2 p-2 rounded-md cursor-pointer border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-upload"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
          </svg>
          <input
            className=""
            type="file"
            {...register("coverImg", { required: "Cover Image is required" })}
            accept="image/*"
          />
        </label>
        {errors.coverImg && (
          <p className="text-sm text-red-500">{errors.coverImg.message}</p>
        )}
        <input
          type="submit"
          disabled={isSubmitting}
          value={isSubmitting ? "Submitting" : "Submit"}
          className={`${
            isSubmitting ? "bg-gray-500" : "bg-green-500 hover:bg-green-600"
          } mt-3 text-white text-lg py-2 rounded cursor-pointer`}
        />
      </form>
    </div>
  );
};

export default ListBooks;
