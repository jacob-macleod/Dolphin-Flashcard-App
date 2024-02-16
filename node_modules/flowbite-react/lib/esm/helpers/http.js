export const safeResJson = (res) => {
    if (res.ok) {
        return res.json();
    }
    throw new Error('Internal server error!');
};
