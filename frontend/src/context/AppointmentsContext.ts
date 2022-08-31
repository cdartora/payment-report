import { createContext } from "react";
import { Context } from "../types/types";

const AppointmentsContext = createContext<Context>({} as Context);

export default AppointmentsContext;