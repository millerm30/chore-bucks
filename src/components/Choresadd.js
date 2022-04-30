import React, { useState } from "react";

const Hero = () => {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const chores = [
    { label: "", value: "" },
    { label: "Feed Pet", value: "Feed Family Pet" },
    { label: "Make Bed", value: "Make Bed" },
    { label: "Clean Bedroom", value: "Clean Bedroom" },
    { label: "Wash Dishes", value: "Wash Dishes" },
    { label: "Empty Dishwasher", value: "Empty Diswasher" },
    { label: "Fold Laundry", value: "Fold Laundry" },
    { label: "Pickup Toys", value: "Pickup Toys" },
  ];
  return (
    <div className="heroContent text-center bg-hero-pattern bg-no-repeat bg-center bg-cover h-96">
      <div className="appInfo pt-10">
        <h2 className="text-2xl font-semibold p-1">
          Add your chores below!
        </h2>
      </div>
      <div className="myForm pt-5">
        <form onChange={handleChange} className="flex flex-col w-1/3 mx-auto">
          <label for="chores" className="mb-3">
            Choose your chore:{" "}
          </label>
          <select
            value={value}
            name="chores"
            className="rounded-md py-2 border border-blue-700 rounded outline-none"
          >
            {chores.map((chores) => (
              <option value={chores.value}>{chores.label}</option>
            ))}
          </select>
        </form>
      </div>
      <div>
        <h2>{value}</h2>
      </div>
    </div>
  );
};

export default Hero;
