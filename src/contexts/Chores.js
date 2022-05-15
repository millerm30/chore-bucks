import React, {useContext, useState, useEffect} from 'react';
import toast from 'react-hot-toast';
import {v4 as uuid} from 'uuid';

const ChoresContext = React.createContext();

export function ChoresProvider({ children }) {
    const [chores, setChores] = useState(getInitialChores());

    useEffect(() => {
        const temp = JSON.stringify(chores)
        localStorage.setItem('id', temp)
    },[chores]);

    function getInitialChores() {
        const temp = localStorage.getItem('id')
        const savedChores = JSON.parse(temp)
        return savedChores || []
    }

    const addChore = (chore, points) => {
        toast.success(`${chore} added to chores list!`);
        setChores([...chores, { id: uuid(), chore, points }]);
    };

    const removeChore = (id) => {
        toast.error(`${id.chore} removed from chores list!`);
        setChores(chores.filter((i) => i !== id));
    };

    const completeChore = (id) => {
        toast(`${id.chore} Completed. Good Job!`, {
            icon: '👏'
        });
        setChores(chores.filter((i) => i !== id));
    };

    return (
        <ChoresContext.Provider value={{ chores, addChore, removeChore, completeChore }}>
            {children}
        </ChoresContext.Provider>
    );
}

export const useChores = () => useContext(ChoresContext);