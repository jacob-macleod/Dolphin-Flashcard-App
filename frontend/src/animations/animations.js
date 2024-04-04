// Animation settings for a popup div
export const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};

export const slideRight = {
    hidden: {
        x: "-25vh",
    },
    visible: {
        x: "0",
        transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
        },
    },
    exit: {
        x: "25vh",
    },
}