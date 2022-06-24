import { ChoresProvider } from "./contexts/Chores";
import { ShoppingProvider } from "./contexts/Shopping";

export default function App({ children, addPoints }) {
    return <ShoppingProvider><ChoresProvider addPoints={addPoints}>{children}</ChoresProvider></ShoppingProvider>;
}