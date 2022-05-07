import React, {useContext, useState} from 'react';
import toast from 'react-hot-toast';

const ChoresContext = React.createContext();

export function ChoresProvider({ children }) {
    const [chores, setChores] = useState([]);

    const addChore = (chore) => {
        toast.success(`${chore} added to chores list!`);
        setChores([...chores, chore]);
    };

    const removeChore = (chore) => {
        toast.success(`${chore} removed from chores list!`);
        setChores(chores.filter((c) => c !== chore));
    };

    return (
        <ChoresContext.Provider value={{ chores, addChore, removeChore }}>
            {children}
        </ChoresContext.Provider>
    );
}

export const useChores = () => useContext(ChoresContext);