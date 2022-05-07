import { ChoresProvider } from "./contexts/Chores";

export default function App({ children }) {
    return <ChoresProvider>{children}</ChoresProvider>;
}