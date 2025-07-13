// Simple animations for landing page
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};

export const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const buttonHover = { scale: 1.05 };
export const buttonTap = { scale: 0.95 };

export const scaleIn = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.3 }
};

export const checkmarkVariants = {
  initial: { pathLength: 0 },
  animate: { pathLength: 1 },
  transition: { duration: 0.5, delay: 0.2 }
};