import Image from "next/image";
import styles from "./main.module.css";

export default function Loading() {
  return (
    <Image
      alt="loader"
      src="/loader.png"
      width={64}
      height={64}
      className={styles.loader}
    />
  );
}
