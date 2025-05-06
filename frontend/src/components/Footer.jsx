import '../styles/footer.css';

export default function Footer() {
    return (
      <footer>
        <p style={{ textAlign: "center", padding: "1rem" }}>
          &copy; {new Date().getFullYear()} House 18. Alla rättigheter förbehållna.
        </p>
      </footer>
    );
  }
