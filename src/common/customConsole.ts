import { consoleTimestamp } from "./consoleTimestamp";

export const customConsole = {
    log: (log: string) => {
        console.log(consoleTimestamp(), log);
    },
    error: (error: any) => {
        console.error(consoleTimestamp, error);
    },
};
