export const getInitials = (name) => {
    if (!name) return '';
    const words = name.split(' ').filter(Boolean);
    if (words.length === 0) return '';
    if (words.length === 1) {
        return words[0].substring(0, 2).toUpperCase();
    }
    return (words[0][0] + (words[1]?.[0] || '')).toUpperCase();
};