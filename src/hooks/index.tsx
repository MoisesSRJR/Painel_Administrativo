import { ReactNode } from "react";
import { ShopProvider } from "./Shop";

interface AppProviderProps {children:ReactNode}

export function AppProvider({children}:AppProviderProps){
    return(
        <ShopProvider>
            {children}
        </ShopProvider>
    )
}
