export const getInitials = (name) => {
    if (!name) return '';
    const words = name.split(' ').filter(Boolean);
    if (words.length === 0) return '';
    if (words.length === 1) {
        return words[0].substring(0, 2).toUpperCase();
    }
    return (words[0][0] + (words[1]?.[0] || '')).toUpperCase();
};

export const formatDateTime = (isoString) => {
    if (!isoString) return '';

    const date = new Date(isoString);
    
    // Options for the date part (e.g., "9 Mar 2023")
    const dateOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    };
    
    // Options for the time part (e.g., "10:10 AM")
    const timeOptions = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };

    const formattedDate = date.toLocaleDateString('en-GB', dateOptions);
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions);

    return `${formattedDate} • ${formattedTime}`;
};