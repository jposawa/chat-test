import React from "react";

import styles from './App.module.css';

export default function App() {
  const [activeTheme, setActiveTheme] = React.useState("darkMode");

  return (
    <main className={`${styles[activeTheme]} ${styles.mainWrapper}`}>
      <h1>Header 1</h1>
      <h2>Header 2</h2>
      <h3>Header 3</h3>
      <h4>Header 4</h4>
      <h5>Header 5</h5>
      <p>Paragraph</p>
    </main>
  );
}
