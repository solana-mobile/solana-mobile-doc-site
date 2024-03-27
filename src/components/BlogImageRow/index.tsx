import React from "react";
import styles from "./styles.module.css";

interface BlogImageRowProps {
  children: React.ReactElement | React.ReactElement[];
}

const BlogImageRow: React.FC<BlogImageRowProps> = ({ children }) => {
  return <div className={styles.blogImageRow}>{children}</div>;
};

export default BlogImageRow;
