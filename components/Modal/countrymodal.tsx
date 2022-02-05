import { FC } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Size } from "../../types/WindowSizeTypes";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../styles/modal/CountryModal.module.scss";

interface CountryModalProps {
  active: boolean;
  handleCloseCountryModal: (id: string) => void;
  id: string;
  countryTitle: string;
  newConfirmed: number;
  newDeaths: number;
  newRecovered: number;
}

const CloseModalButton = styled(Button)<ButtonProps>(() => ({
  color: "#fff",
  backgroundColor: "hsl(0, 100%, 37%)",
  marginTop: "1.5em",
  "&:hover": {
    backgroundColor: "hsl(0, 100%, 45%)",
  },
}));

const CountryModal: FC<CountryModalProps> = ({
  active,
  handleCloseCountryModal,
  id,
  countryTitle,
  newConfirmed,
  newDeaths,
  newRecovered,
}) => {
  const size: Size = useWindowSize();

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            key={id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              transitionEnd: {
                display: "none",
              },
            }}
            transition={{ duration: 0.5 }}
            onClick={() => handleCloseCountryModal(id)}
            className={styles["country-modal-backdrop"]}
            style={{ height: `${size.height}px` }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <motion.div
            key={id}
            className={styles["country-modal-wrapper"]}
            initial={{ opacity: 0, top: "45%" }}
            animate={{
              opacity: 1,
              top: "50%",
            }}
            exit={{
              opacity: 0,
              top: "45%",
              transitionEnd: {
                display: "none",
              },
            }}
            transition={{
              type: "spring",
              damping: 10,
              stiffness: 100,
              duration: 1,
            }}
          >
            <div className={styles["country-modal-content"]}>
              <h1>{countryTitle}</h1>

              <p className={styles["country-modal-label"]}>New Confirmed:</p>
              <p className={styles["country-modal-text-amount"]}>
                {newConfirmed.toLocaleString()}
              </p>
              <p className={styles["country-modal-label"]}>New Deaths:</p>
              <p className={styles["country-modal-text-amount"]}>
                {newDeaths.toLocaleString()}
              </p>
              <p className={styles["country-modal-label"]}>New Recovered:</p>
              <p className={styles["country-modal-text-amount"]}>
                {newRecovered.toLocaleString()}
              </p>

              <CloseModalButton
                variant="contained"
                onClick={() => handleCloseCountryModal(id)}
              >
                Close
              </CloseModalButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CountryModal;
