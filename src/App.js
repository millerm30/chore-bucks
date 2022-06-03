import { ChoresProvider } from "./contexts/Chores";

export default function App({ children, addPoints }) {
    return <ChoresProvider addPoints={addPoints}>{children}</ChoresProvider>;
}