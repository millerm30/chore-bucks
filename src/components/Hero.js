import React, {useState} from 'react'
import { DiBitbucket } from 'react-icons/di'

const Hero = () => {
  const [value, setValue] = useState('')
  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const chores = [
    {label: '', value: ''},
    {label: 'Feed Pet', value: 'Feed Family Pet'},
    {label: 'Make Bed', value: 'Make Bed'},
    {label: 'Clean Bedroom', value: 'Clean Bedroom'},
    {label: 'Wash Dishes', value: 'Wash Dishes'},
    {label: 'Empty Dishwasher', value: 'Empty Diswasher'},
    {label: 'Fold Laundry', value: 'Fold Laundry'},
    {label: 'Pickup Toys', value: 'Pickup Toys'}
  ]
  return (
    <div className="heroContent text-center bg-hero-pattern bg-no-repeat bg-center bg-cover h-96">
      <div className="appInfo pt-10">
        <h2 className="text-2xl font-semibold p-1">
          Kids earn points for completing chores!
        </h2>
        <h4 className="text-1xl font-bold p-1">
          Complete your chore to add points to your bank!
        </h4>
        <p className="p-1">
          Each point earned will value .25&#162; Maximum of 10 points per chore.
        </p>
        <p className="p-1">Drop completed chores into your bucket</p>
      </div>
      <div className="myForm pt-5">
        <form onChange={handleChange} className="flex flex-col w-1/3 mx-auto">
          <label for="chores" className="mb-3">Choose your chore:{" "}</label>
          <select
            value={value}
            name="chores"
            className="rounded-md py-2 border border-blue-700 rounded outline-none">
            {chores.map((chores) => (
              <option value={chores.value}>{chores.label}</option>
            ))}
          </select>
        </form>
        <div className="bucket flex justify-end">
          <DiBitbucket className="text-8xl text-orange-600" />
        </div>
      </div>
      <div className="chores">
        <div className="chore">
          <h1 className="text-4xl">{value}</h1>
        </div>
      </div>
    </div>
  );
}

export default Hero