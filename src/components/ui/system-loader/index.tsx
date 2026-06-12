"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils/utils";

import styles from "./system-loader.module.css";

type SystemLoaderProps = {
  className?: string;
  fullScreen?: boolean;
};

const dots = [0, 1, 2];

export default function SystemLoader({
  className,
  fullScreen = true,
}: SystemLoaderProps) {
  return (
    <div
      className={cn(fullScreen ? styles.overlay : styles.inline, className)}
      role="status"
      aria-live="polite"
      aria-label="Loading Cozy Bakes Inc"
    >
      <div className={styles.backdrop} />
      <div className={styles.grain} />
      <motion.div
        className={styles.halo}
        animate={{ scale: [0.92, 1.08, 0.94], opacity: [0.5, 0.85, 0.55] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className={styles.shell}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className={styles.badge}
          animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.span
            className={styles.ring}
            animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.75, 0.35] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className={styles.ringSoft}
            animate={{ scale: [1, 1.14, 1], opacity: [0.2, 0.55, 0.2] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          />
          <Image
            src="/images/logo.png"
            alt="Cozy Bakes Inc."
            width={68}
            height={68}
            priority
            className={styles.logo}
          />
        </motion.div>

        <div className={styles.titleWrap}>
          <motion.span
            className={styles.eyebrow}
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.42em" }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            Freshly Baking
          </motion.span>
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Cozy Bakes Inc
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Preparing a warm, handcrafted experience for you.
          </motion.p>
        </div>

        <div className={styles.meter} aria-hidden="true">
          <motion.div
            className={styles.meterFill}
            animate={{ scaleX: [0.18, 0.82, 0.4, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className={styles.dots} aria-hidden="true">
          {dots.map((dot, index) => (
            <motion.span
              key={dot}
              className={styles.dot}
              animate={{
                y: [0, -8, 0],
                opacity: [0.35, 1, 0.35],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.12,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
