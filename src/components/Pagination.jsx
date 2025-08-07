import React from "react";
import styles from "./Pagination.module.css";

function Pagination({ totalPosts, postsPerPage, setCurrentPage, currentPage }) {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <>
      <div className={styles.pagination}>
        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={
              page === currentPage
                ? `${styles.button} ${styles.active}`
                : styles.button
            }
          >
            {page}
          </button>
        ))}
      </div>
    </>
  );
}

export default Pagination;
