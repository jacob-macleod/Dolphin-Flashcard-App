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

export const easeIn = {
    show: {
        opacity: 1,
        y: 0,
        transition: {
          ease: 'easeOut',
          duration: 0.3,
        },
      },
      hide: {
        y: -20,
        opacity: 0,
      },
}

export const zoomIn = {
    show: {
        opacity: 1,
        scale: 1,
        transition: {
          ease: 'easeOut',
          duration: 0.3,
        },
      },
      hide: {
        scale: 1.1,
        opacity: 0,
      },
}

export const flipVariants = {
  hidden: {
      rotateY: 0,
      transition: {
          duration: 0.3,
      },
  },
  visible: {
      rotateY: 180,
      transition: {
          duration: 0.3,
      },
  },
};
