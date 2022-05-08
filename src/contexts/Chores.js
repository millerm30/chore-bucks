import React, {useContext, useState, useEffect} from 'react';
import toast from 'react-hot-toast';

const ChoresContext = React.createContext();

export function ChoresProvider({ children }) {
    const [chores, setChores] = useState(getInitialChores());

    useEffect(() => {
        const temp = JSON.stringify(chores)
        localStorage.setItem('chores', temp)
    },[chores]);

    function getInitialChores() {
        const temp = localStorage.getItem('chores')
        const savedChores = JSON.parse(temp)
        return savedChores || []
    }

    const addChore = (chore) => {
        toast.success(`${chore} added to chores list!`);
        setChores([...chores, chore]);
    };

    const removeChore = (chore) => {
        toast.error(`${chore} removed from chores list!`);
        setChores(chores.filter((c) => c !== chore));
    };

    const completeChore = (chore) => {
        toast(`${chore} Completed. Good Job!`, {
            icon: '👏'
        });
        setChores(chores.filter((c) => c !== chore));
    };

    return (
        <ChoresContext.Provider value={{ chores, addChore, removeChore, completeChore }}>
            {children}
        </ChoresContext.Provider>
    );
}

export const useChores = () => useContext(ChoresContext);