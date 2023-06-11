import {createContext} from "react";
import {User} from "../../../../core/models/user";

export const UserContext = createContext<User | null>(null);
