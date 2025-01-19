"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const CreateBoard = () => {
  const router = useRouter();
  const createBoard = () => {
    const borardId = Math.random().toString(36).substring(2, 15);
    router.push(`/board/${borardId}`);
  };

  return (
    <>
      <motion.h1
        className="text-6xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Real-Time Collaborative <br /> Whiteboard
      </motion.h1>

      {/* Animated Button */}
      <motion.button
        onClick={createBoard}
        className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Create New Board
      </motion.button>

      {/* Subtle Floating Animation */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-24 h-24 bg-white opacity-20 rounded-full"
        animate={{
          x: [0, -30, 30, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{ repeat: Infinity, duration: 6 }}
      ></motion.div>

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-indigo-300 opacity-10 rounded-full"
        animate={{
          x: [0, 40, -40, 0],
          y: [0, -40, 40, 0],
        }}
        transition={{ repeat: Infinity, duration: 8 }}
      ></motion.div>

    </>
  );
};

export default CreateBoard;
