import { ChoresProvider } from "./contexts/Chores";
import { ShoppingProvider } from "./contexts/Shopping";
import { WishesProvider } from "./contexts/Wishes";
import { UserProvider } from "./contexts/Login";

export default function App({ children, points, addPoints, removePoints }) {
    return (
        <UserProvider>
            <ShoppingProvider points={points} removePoints={removePoints}>
                <WishesProvider>
                    <ChoresProvider addPoints={addPoints}>{children}</ChoresProvider>
                </WishesProvider>
            </ShoppingProvider>
        </UserProvider>
    );
};