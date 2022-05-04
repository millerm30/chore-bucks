import React, { useState } from 'react'

const Hero = () => {
  const [value, setValue] = useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const chores = [
    { label: '', value: '' },
    { label: 'Feed Pet', value: 'Feed Family Pet', id: 1 },
    { label: 'Make Bed', value: 'Make Bed', id: 2},
    { label: 'Clean Bedroom', value: 'Clean Bedroom', id: 3 },
    { label: 'Wash Dishes', value: 'Wash Dishes', id: 4 },
    { label: 'Empty Dishwasher', value: 'Empty Diswasher', id: 5 },
    { label: 'Fold Laundry', value: 'Fold Laundry', id: 5 },
    { label: 'Pickup Toys', value: 'Pickup Toys', id :6 },
  ];
  return (
    <div className='choreaddContainer text-center'>
      <div className='appInfo pt-10'>
        <h2 className='text-2xl font-semibold p-1'>
          Add your chores below!
        </h2>
      </div>
      <div className='myForm pt-5'>
        <form onChange={handleChange} className='flex flex-col w-1/3 mx-auto'>
          <label htmlFor='chores' className='mb-3'>
            Choose your chore:{' '}
          </label>
          <select
            value={value}
            name='chores'
            className='rounded-md py-2 border border-blue-700 rounded outline-none'>
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
