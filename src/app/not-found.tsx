import Image from "next/image";
import styles from "./main.module.css";

export default function NotFound() {
  return (
    <Image
      alt="not-found"
      src="/not-found.jpg"
      width={400}
      height={400}
      className={styles.not_found}
    />
  );
}
