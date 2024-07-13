export const consoleTimestamp = (): string => {
    return (new Date)
            .toLocaleString(
                "ja-JP",
                { 
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }
            );
};
