export function Footer(props) {
  return(
    <footer className="footer">
      {props.loggedIn && <h2 className="footer__title">&copy; {new Date().getFullYear()} Mesto Russia</h2>}
    </footer>
  );
}