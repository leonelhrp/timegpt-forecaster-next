import { motion } from "framer-motion";

const LinearChartMotion = () => {
  return (
    <motion.svg height="auto" viewBox="0 0 2000 1400" xmlns="http://www.w3.org/2000/svg"
      initial={{
        filter: "blur(20px)",
      }}
      animate={{
        filter: "blur(0px)",
      }}
      transition={{
        duration: 1,
        ease: [0.075, 0.82, 0.965, 1],
      }}
      data-transition-in
      id="gradient-canvas"
    >

      <motion.path
        d="M0 824.8c21-64.418 63-287.795 105-322.094 42-34.299 63 96.545 105 150.599 42 54.054 63 200.126 105 119.672 42-80.454 63-440.586 105-521.942 42-81.357 63 67.978 105 115.158 42 47.18 63 110.897 105 120.742 42 9.844 63-43.404 105-71.52 42-28.117 63-200.102 105-69.064 42 131.037 63 578.802 105 724.252 42 145.449 63 167.656 105 2.993s63-752.419 105-826.308c42-73.89 63 295.924 105 456.86 42 160.937 63 283.839 105 347.822 42 63.982 63 25.719 105-27.909s63-83.86 105-240.23 63-539.845 105-541.618c42-1.773 63 373.17 105 532.752 42 159.582 63 365.259 105 265.157 42-100.101 84-612.531 105-765.664L2000 1400H0Z" fill="#444cf71a" />

      <motion.path
        d="M0 824.8c21-64.418 63-287.795 105-322.094 42-34.299 63 96.545 105 150.599 42 54.054 63 200.126 105 119.672 42-80.454 63-440.586 105-521.942 42-81.357 63 67.978 105 115.158 42 47.18 63 110.897 105 120.742 42 9.844 63-43.404 105-71.52 42-28.117 63-200.102 105-69.064 42 131.037 63 578.802 105 724.252 42 145.449 63 167.656 105 2.993s63-752.419 105-826.308c42-73.89 63 295.924 105 456.86 42 160.937 63 283.839 105 347.822 42 63.982 63 25.719 105-27.909s63-83.86 105-240.23 63-539.845 105-541.618c42-1.773 63 373.17 105 532.752 42 159.582 63 365.259 105 265.157 42-100.101 84-612.531 105-765.664" fill="none" stroke="#444cf7" strokeWidth="4" />

      <motion.g fill="#444cf7">
        <motion.circle cy="824.8" r="8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }} />
        <motion.circle cx="105" cy="502.706" r="8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }} />
        <motion.circle cx="210" cy="653.305" r="8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }} />
        <motion.circle cx="315" cy="772.977" r="8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }} />
        <motion.circle cx="420" cy="251.035" r="8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }} />
        <motion.circle cx="525" cy="366.193" r="8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }} />
        <motion.circle cx="630" cy="486.935" r="8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }} />
        <motion.circle cx="735" cy="415.414" r="8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }} />
        <motion.circle cx="840" cy="346.351" r="8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }} />
        <motion.circle cx="945" cy="1070.603" r="8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }} />
        <motion.circle cx="1050" cy="1073.596" r="8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }} />
        <motion.circle cx="1155" cy="247.288" r="8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }} />
        <motion.circle cx="1260" cy="704.148" r="8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }} />
        <motion.circle cx="1365" cy="1051.97" r="8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }} />
        <motion.circle cx="1470" cy="1024.061" r="8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }} />
        <motion.circle cx="1575" cy="783.832" r="8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }} />
        <motion.circle cx="1680" cy="242.213" r="8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }} />
        <motion.circle cx="1785" cy="774.965" r="8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }} />
        <motion.circle cx="1890" cy="1040.122" r="8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }} />
        <motion.circle cx="1995" cy="274.458" r="8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }} />
      </motion.g>

    </motion.svg>
  );
}
export default LinearChartMotion;