import React, {useContext, useState, useEffect} from 'react';
import toast from 'react-hot-toast';
import {v4 as uuid} from 'uuid';

const ChoresContext = React.createContext();

export function ChoresProvider({ children }) {
    const [chores, setChores] = useState(getInitialChores);

    useEffect(() => {
        const temp = JSON.stringify(chores)
        localStorage.setItem('chore', temp)
    },[chores]);

    function getInitialChores() {
        const temp = localStorage.getItem('chore')
        const savedChores = JSON.parse(temp)
        return savedChores || []
    }

    const addChore = (chore, points) => {
        toast.success(`${chore} added to chores list!`);
        setChores([...chores, { id: uuid(), chore, points }]);
    };

    const removeChore = (chore) => {
        toast.error(`${chore.chore} removed from chores list!`);
        setChores(chores.filter((c) => c !== chore));
    };

    const completeChore = (chore) => {
        toast(`${chore.chore} Completed. Good Job!`, {
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