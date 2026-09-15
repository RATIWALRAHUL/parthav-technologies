"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Play } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import styles from "./FinalCTA.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

const lineVariants: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", y: 14 },
  visible: (custom: number) => ({
    clipPath: "inset(0 0 0% 0)",
    y: 0,
    transition: { duration: 0.7, delay: 0.15 + custom * 0.09, ease: EASE },
  }),
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: custom * 0.1, ease: EASE },
  }),
};

function VisualTile({
  depth,
  mouseX,
  mouseY,
  reduceMotion,
  className,
  floatRange = 4,
  floatDuration = 5,
  children,
}: {
  depth: number;
  mouseX: ReturnType<typeof useSpring>;
  mouseY: ReturnType<typeof useSpring>;
  reduceMotion: boolean;
  className?: string;
  floatRange?: number;
  floatDuration?: number;
  children?: React.ReactNode;
}) {
  const px = useTransform(mouseX, [-1, 1], [-depth, depth]);
  const py = useTransform(mouseY, [-1, 1], [-depth, depth]);

  return (
    <motion.div
      className={className}
      style={reduceMotion ? undefined : { x: px, y: py }}
      animate={
        reduceMotion
          ? undefined
          : { y: [0, -floatRange, 0] }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration: floatDuration,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    >
      {children}
    </motion.div>
  );
}

function VisualStage({ reduceMotion }: { reduceMotion: boolean }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [interactive, setInteractive] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness: 120, damping: 20 });
  const mouseY = useSpring(rawY, { stiffness: 120, damping: 20 });

  useEffect(() => {
    setInteractive(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    );
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || reduceMotion) return;
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(relX * 2);
    rawY.set(relY * 2);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      className={styles.visualSide}
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div
        ref={stageRef}
        className={styles.visualStage}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-hidden="true"
      >
        <svg
          className={styles.connectorSvg}
          viewBox="0 0 400 400"
          preserveAspectRatio="none"
        >
          <path
            className={styles.connectorPath}
            d="M60,100 C140,140 170,200 250,190 S330,250 360,230"
            fill="none"
          />
          <circle className={styles.connectorDotBlue} cx="60" cy="100" r="5" />
          <circle className={styles.connectorDotOrange} cx="360" cy="230" r="5" />
        </svg>

        <VisualTile
          depth={2}
          mouseX={mouseX}
          mouseY={mouseY}
          reduceMotion={reduceMotion}
          className={styles.tileGhost}
          floatRange={2}
          floatDuration={6.5}
        />

        <VisualTile
          depth={3}
          mouseX={mouseX}
          mouseY={mouseY}
          reduceMotion={reduceMotion}
          className={styles.tileGlass}
          floatRange={3}
          floatDuration={5.5}
        />

        <VisualTile
          depth={5}
          mouseX={mouseX}
          mouseY={mouseY}
          reduceMotion={reduceMotion}
          className={styles.tileMain}
          floatRange={4}
          floatDuration={5}
        >
          <span className={styles.tileMainSheen} />
        </VisualTile>

        <VisualTile
          depth={6}
          mouseX={mouseX}
          mouseY={mouseY}
          reduceMotion={reduceMotion}
          className={styles.tileAccent}
          floatRange={5}
          floatDuration={4.2}
        />
      </div>
    </motion.div>
  );
}

export function FinalCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className={styles.ctaSection} id="get-started">
      <div className={styles.mapBackground} />

      <Container className={styles.contentContainer}>
        <div className={styles.textSide}>
          <motion.div
            className={styles.eyebrowRow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            custom={0}
            variants={fadeUpVariants}
          >
            <span className={styles.eyebrowLine} aria-hidden="true" />
            <span className={styles.eyebrow}>LET&apos;S WORK TOGETHER</span>
          </motion.div>

          <h2 className={styles.headline}>
            <span className={styles.lineMask}>
              <motion.span
                className={styles.lineInner}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0 }}
                custom={0}
                variants={lineVariants}
              >
                Ready to turn your
              </motion.span>
            </span>
            <span className={styles.lineMask}>
              <motion.span
                className={styles.lineInner}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0 }}
                custom={1}
                variants={lineVariants}
              >
                <span className={styles.orangeText}>idea</span> into reality?
              </motion.span>
            </span>
          </h2>

          <motion.p
            className={styles.description}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            custom={2}
            variants={fadeUpVariants}
          >
            Let&apos;s build digital experiences that create real growth for
            your business.
          </motion.p>

          <motion.div
            className={styles.ctaGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            custom={3}
            variants={fadeUpVariants}
          >
            <MagneticButton maxMovement={10}>
              <Link href="#contact" className={styles.talkBtn}>
                <span>Let&apos;s Talk</span>
                <ArrowRight size={20} strokeWidth={2.25} className={styles.talkBtnIcon} />
              </Link>
            </MagneticButton>

            <MagneticButton maxMovement={6}>
              <Link href="#process" className={styles.workBtn}>
                <span className={styles.playIconWrapper} aria-hidden="true">
                  <Play size={12} fill="currentColor" strokeWidth={0} />
                </span>
                <span>See How We Work</span>
              </Link>
            </MagneticButton>
          </motion.div>

          <motion.div
            className={styles.metaRow}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.55, delay: 0.45, ease: EASE }}
          >
            <div className={styles.locationBadge}>
              <MapPin size={16} strokeWidth={1.85} color="var(--color-orange-light)" />
              <span>
                From <span className={styles.scriptHighlight}>Jaipur</span> to the World
              </span>
            </div>

            <span className={styles.metaDivider} aria-hidden="true" />

            <div className={styles.strategyLine}>
              <span>STRATEGY</span>
              <span className={styles.strategyDot} aria-hidden="true" />
              <span>DESIGN</span>
              <span className={styles.strategyDot} aria-hidden="true" />
              <span>TECHNOLOGY</span>
              <span className={styles.strategyDot} aria-hidden="true" />
              <span>GROWTH</span>
            </div>
          </motion.div>
        </div>

        <VisualStage reduceMotion={!!shouldReduceMotion} />
      </Container>

      <motion.div
        className={styles.curveDivider}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <svg
          className={styles.curveSvg}
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,32 C120,10 220,55 360,48 C520,40 610,0 760,14 C900,27 980,70 1140,58 C1260,49 1360,20 1440,30 L1440,120 L0,120 Z"
            fill="#FFFFFF"
          />
        </svg>
      </motion.div>
    </section>
  );
}
