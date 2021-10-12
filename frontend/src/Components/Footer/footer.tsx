import "./footer.css";

export const Footer = () => {
  return (
    <div>
      <div className="py-2 text-center footer-style">
        @CS3219 Team G23 &nbsp; {new Date().getFullYear()}
      </div>
    </div>
  );
};
